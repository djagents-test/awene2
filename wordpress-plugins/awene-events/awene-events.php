<?php
/**
 * Plugin Name: AWENE Events
 * Description: Adds a fully managed Events content type for the AWENE headless site.
 * Version: 1.0.0
 * Author: OJC LABS
 * Text Domain: awene-events
 */

if (!defined('ABSPATH')) {
    exit;
}

final class Awene_Events_Plugin
{
    private const POST_TYPE = 'awene_event';
    private const TAXONOMY = 'awene_event_type';
    private const NONCE_ACTION = 'awene_event_save_meta';
    private const NONCE_NAME = 'awene_event_meta_nonce';

    private const META_FIELDS = [
        'start_date' => '_awene_event_start_date',
        'start_time' => '_awene_event_start_time',
        'end_date' => '_awene_event_end_date',
        'end_time' => '_awene_event_end_time',
        'timezone' => '_awene_event_timezone',
        'format' => '_awene_event_format',
        'status' => '_awene_event_status',
        'location_name' => '_awene_event_location_name',
        'address' => '_awene_event_address',
        'city' => '_awene_event_city',
        'country' => '_awene_event_country',
        'online_url' => '_awene_event_online_url',
        'registration_url' => '_awene_event_registration_url',
        'price' => '_awene_event_price',
        'capacity' => '_awene_event_capacity',
        'featured' => '_awene_event_featured',
    ];

    public static function init(): void
    {
        add_action('init', [self::class, 'register_content']);
        add_action('init', [self::class, 'register_meta']);
        add_action('add_meta_boxes', [self::class, 'add_meta_boxes']);
        add_action('save_post_' . self::POST_TYPE, [self::class, 'save_meta']);
        add_action('rest_api_init', [self::class, 'register_rest_fields']);
        add_action('rest_api_init', [self::class, 'register_rest_routes']);
        add_filter('manage_' . self::POST_TYPE . '_posts_columns', [self::class, 'columns']);
        add_action('manage_' . self::POST_TYPE . '_posts_custom_column', [self::class, 'column_content'], 10, 2);
    }

    public static function activate(): void
    {
        self::register_content();
        flush_rewrite_rules();
    }

    public static function deactivate(): void
    {
        flush_rewrite_rules();
    }

    public static function register_content(): void
    {
        register_post_type(self::POST_TYPE, [
            'labels' => [
                'name' => 'Events',
                'singular_name' => 'Event',
                'add_new_item' => 'Add New Event',
                'edit_item' => 'Edit Event',
                'new_item' => 'New Event',
                'view_item' => 'View Event',
                'search_items' => 'Search Events',
                'not_found' => 'No events found',
                'menu_name' => 'AWENE Events',
            ],
            'public' => true,
            'show_in_rest' => true,
            'rest_base' => 'events',
            'menu_icon' => 'dashicons-calendar-alt',
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
            'has_archive' => false,
            'rewrite' => ['slug' => 'events'],
        ]);

        register_taxonomy(self::TAXONOMY, [self::POST_TYPE], [
            'labels' => [
                'name' => 'Event Types',
                'singular_name' => 'Event Type',
                'menu_name' => 'Event Types',
            ],
            'public' => true,
            'show_in_rest' => true,
            'hierarchical' => true,
            'rest_base' => 'event-types',
            'rewrite' => ['slug' => 'event-type'],
        ]);
    }

    public static function register_meta(): void
    {
        foreach (self::META_FIELDS as $public_key => $meta_key) {
            $type = in_array($public_key, ['capacity'], true) ? 'integer' : 'string';
            if ($public_key === 'featured') {
                $type = 'boolean';
            }

            register_post_meta(self::POST_TYPE, $meta_key, [
                'type' => $type,
                'single' => true,
                'show_in_rest' => true,
                'auth_callback' => static function () {
                    return current_user_can('edit_posts');
                },
                'sanitize_callback' => [self::class, 'sanitize_meta_value'],
            ]);
        }
    }

    public static function sanitize_meta_value($value, string $meta_key)
    {
        if ($meta_key === self::META_FIELDS['featured']) {
            return (bool) $value;
        }

        if ($meta_key === self::META_FIELDS['capacity']) {
            return absint($value);
        }

        if (in_array($meta_key, [self::META_FIELDS['online_url'], self::META_FIELDS['registration_url']], true)) {
            return esc_url_raw((string) $value);
        }

        return sanitize_text_field((string) $value);
    }

    public static function add_meta_boxes(): void
    {
        add_meta_box(
            'awene_event_details',
            'Event Details',
            [self::class, 'render_details_box'],
            self::POST_TYPE,
            'normal',
            'high'
        );
    }

    public static function render_details_box(WP_Post $post): void
    {
        wp_nonce_field(self::NONCE_ACTION, self::NONCE_NAME);

        $values = [];
        foreach (self::META_FIELDS as $key => $meta_key) {
            $values[$key] = get_post_meta($post->ID, $meta_key, true);
        }

        $format = $values['format'] ?: 'online';
        $status = $values['status'] ?: 'upcoming';
        ?>
        <style>
            .awene-events-grid { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .awene-events-grid label { display: block; font-weight: 600; margin-bottom: 6px; }
            .awene-events-grid input, .awene-events-grid select { width: 100%; }
            .awene-events-full { grid-column: 1 / -1; }
        </style>
        <div class="awene-events-grid">
            <?php self::field('start_date', 'Start date', 'date', $values['start_date']); ?>
            <?php self::field('start_time', 'Start time', 'time', $values['start_time']); ?>
            <?php self::field('end_date', 'End date', 'date', $values['end_date']); ?>
            <?php self::field('end_time', 'End time', 'time', $values['end_time']); ?>
            <?php self::field('timezone', 'Timezone', 'text', $values['timezone'] ?: 'Africa/Tunis'); ?>
            <p>
                <label for="awene_event_format">Format</label>
                <select id="awene_event_format" name="awene_event_meta[format]">
                    <?php self::option('online', 'Online', $format); ?>
                    <?php self::option('in_person', 'In person', $format); ?>
                    <?php self::option('hybrid', 'Hybrid', $format); ?>
                </select>
            </p>
            <p>
                <label for="awene_event_status">Status</label>
                <select id="awene_event_status" name="awene_event_meta[status]">
                    <?php self::option('upcoming', 'Upcoming', $status); ?>
                    <?php self::option('sold_out', 'Sold out', $status); ?>
                    <?php self::option('cancelled', 'Cancelled', $status); ?>
                    <?php self::option('past', 'Past', $status); ?>
                </select>
            </p>
            <?php self::field('location_name', 'Location name', 'text', $values['location_name']); ?>
            <?php self::field('city', 'City', 'text', $values['city']); ?>
            <?php self::field('country', 'Country', 'text', $values['country']); ?>
            <?php self::field('price', 'Price label', 'text', $values['price']); ?>
            <?php self::field('capacity', 'Capacity', 'number', $values['capacity']); ?>
            <?php self::field('online_url', 'Online event URL', 'url', $values['online_url'], 'awene-events-full'); ?>
            <?php self::field('registration_url', 'Registration URL', 'url', $values['registration_url'], 'awene-events-full'); ?>
            <?php self::field('address', 'Address', 'text', $values['address'], 'awene-events-full'); ?>
            <p class="awene-events-full">
                <label>
                    <input type="checkbox" name="awene_event_meta[featured]" value="1" <?php checked((bool) $values['featured']); ?> />
                    Feature this event
                </label>
            </p>
        </div>
        <?php
    }

    private static function field(string $key, string $label, string $type, $value, string $class = ''): void
    {
        printf(
            '<p class="%5$s"><label for="awene_event_%1$s">%2$s</label><input id="awene_event_%1$s" type="%3$s" name="awene_event_meta[%1$s]" value="%4$s" /></p>',
            esc_attr($key),
            esc_html($label),
            esc_attr($type),
            esc_attr((string) $value),
            esc_attr($class)
        );
    }

    private static function option(string $value, string $label, string $current): void
    {
        printf(
            '<option value="%1$s" %3$s>%2$s</option>',
            esc_attr($value),
            esc_html($label),
            selected($current, $value, false)
        );
    }

    public static function save_meta(int $post_id): void
    {
        if (
            !isset($_POST[self::NONCE_NAME]) ||
            !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[self::NONCE_NAME])), self::NONCE_ACTION) ||
            (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) ||
            !current_user_can('edit_post', $post_id)
        ) {
            return;
        }

        $input = isset($_POST['awene_event_meta']) && is_array($_POST['awene_event_meta'])
            ? wp_unslash($_POST['awene_event_meta'])
            : [];

        foreach (self::META_FIELDS as $key => $meta_key) {
            $value = $input[$key] ?? '';
            if ($key === 'featured') {
                $value = !empty($input[$key]);
            }
            update_post_meta($post_id, $meta_key, self::sanitize_meta_value($value, $meta_key));
        }
    }

    public static function register_rest_fields(): void
    {
        register_rest_field(self::POST_TYPE, 'awene_event', [
            'get_callback' => static function (array $post) {
                return self::event_payload((int) $post['id']);
            },
            'schema' => [
                'description' => 'Normalized AWENE event data.',
                'type' => 'object',
                'context' => ['view', 'edit'],
            ],
        ]);
    }

    public static function register_rest_routes(): void
    {
        register_rest_route('awene/v1', '/events', [
            'methods' => WP_REST_Server::READABLE,
            'permission_callback' => '__return_true',
            'args' => [
                'per_page' => [
                    'default' => 20,
                    'sanitize_callback' => 'absint',
                ],
                'include_past' => [
                    'default' => false,
                    'sanitize_callback' => 'rest_sanitize_boolean',
                ],
            ],
            'callback' => [self::class, 'rest_events'],
        ]);
    }

    public static function rest_events(WP_REST_Request $request): WP_REST_Response
    {
        $today = gmdate('Y-m-d');
        $meta_query = [];

        if (!$request->get_param('include_past')) {
            $meta_query[] = [
                'relation' => 'OR',
                [
                    'key' => self::META_FIELDS['start_date'],
                    'value' => $today,
                    'compare' => '>=',
                    'type' => 'DATE',
                ],
                [
                    'key' => self::META_FIELDS['start_date'],
                    'compare' => 'NOT EXISTS',
                ],
                [
                    'key' => self::META_FIELDS['start_date'],
                    'value' => '',
                    'compare' => '=',
                ],
            ];
        }

        $query = new WP_Query([
            'post_type' => self::POST_TYPE,
            'post_status' => 'publish',
            'posts_per_page' => min(100, max(1, (int) $request->get_param('per_page'))),
            'meta_key' => self::META_FIELDS['start_date'],
            'orderby' => 'meta_value',
            'order' => 'ASC',
            'meta_query' => $meta_query,
        ]);

        $events = array_map(
            static fn (WP_Post $post) => self::event_payload($post->ID),
            $query->posts
        );

        return rest_ensure_response($events);
    }

    private static function event_payload(int $post_id): array
    {
        $meta = [];
        foreach (self::META_FIELDS as $key => $meta_key) {
            $meta[$key] = get_post_meta($post_id, $meta_key, true);
        }

        $types = wp_get_post_terms($post_id, self::TAXONOMY, ['fields' => 'all']);
        $image_id = get_post_thumbnail_id($post_id);

        return [
            'id' => $post_id,
            'slug' => get_post_field('post_name', $post_id),
            'title' => get_the_title($post_id),
            'excerpt' => wp_strip_all_tags(get_the_excerpt($post_id)),
            'content' => apply_filters('the_content', get_post_field('post_content', $post_id)),
            'date_label' => self::date_label($meta),
            'time_label' => self::time_label($meta),
            'start_date' => (string) $meta['start_date'],
            'start_time' => (string) $meta['start_time'],
            'end_date' => (string) $meta['end_date'],
            'end_time' => (string) $meta['end_time'],
            'timezone' => (string) $meta['timezone'],
            'format' => (string) ($meta['format'] ?: 'online'),
            'status' => (string) ($meta['status'] ?: 'upcoming'),
            'location' => [
                'name' => (string) $meta['location_name'],
                'address' => (string) $meta['address'],
                'city' => (string) $meta['city'],
                'country' => (string) $meta['country'],
            ],
            'online_url' => (string) $meta['online_url'],
            'registration_url' => (string) $meta['registration_url'],
            'price' => (string) $meta['price'],
            'capacity' => absint($meta['capacity']),
            'featured' => (bool) $meta['featured'],
            'types' => is_wp_error($types) ? [] : array_map(static function (WP_Term $term) {
                return [
                    'id' => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                ];
            }, $types),
            'image' => $image_id ? [
                'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: get_the_title($post_id),
                'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail') ?: null,
                'medium' => wp_get_attachment_image_url($image_id, 'medium') ?: null,
                'large' => wp_get_attachment_image_url($image_id, 'large') ?: null,
                'full' => wp_get_attachment_image_url($image_id, 'full') ?: null,
            ] : null,
        ];
    }

    private static function date_label(array $meta): string
    {
        if (empty($meta['start_date'])) {
            return 'A venir';
        }

        $timestamp = strtotime((string) $meta['start_date']);
        if (!$timestamp) {
            return (string) $meta['start_date'];
        }

        return date_i18n('j F Y', $timestamp);
    }

    private static function time_label(array $meta): string
    {
        $start = (string) ($meta['start_time'] ?? '');
        $end = (string) ($meta['end_time'] ?? '');

        if ($start && $end) {
            return $start . ' - ' . $end;
        }

        return $start;
    }

    public static function columns(array $columns): array
    {
        $columns['awene_event_date'] = 'Event date';
        $columns['awene_event_status'] = 'Status';
        return $columns;
    }

    public static function column_content(string $column, int $post_id): void
    {
        if ($column === 'awene_event_date') {
            echo esc_html(get_post_meta($post_id, self::META_FIELDS['start_date'], true) ?: 'A venir');
        }

        if ($column === 'awene_event_status') {
            echo esc_html(get_post_meta($post_id, self::META_FIELDS['status'], true) ?: 'upcoming');
        }
    }
}

Awene_Events_Plugin::init();
register_activation_hook(__FILE__, ['Awene_Events_Plugin', 'activate']);
register_deactivation_hook(__FILE__, ['Awene_Events_Plugin', 'deactivate']);
