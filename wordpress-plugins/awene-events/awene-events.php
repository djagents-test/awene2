<?php
/**
 * Plugin Name: AWENE Events
 * Description: Adds a managed Events and Registrations system for the AWENE headless site.
 * Version: 2.1.0
 * Author: OJC LABS
 * Text Domain: awene-events
 */

if (!defined('ABSPATH')) {
    exit;
}

final class Awene_Events_Plugin
{
    private const EVENT_POST_TYPE = 'awene_event';
    private const REGISTRATION_POST_TYPE = 'awene_registration';
    private const EVENT_PV_POST_TYPE = 'awene_event_pv';
    private const SATISFACTION_POST_TYPE = 'awene_sat_form';
    private const SATISFACTION_RESPONSE_POST_TYPE = 'awene_sat_entry';
    private const TAXONOMY = 'awene_event_type';
    private const EVENT_NONCE_ACTION = 'awene_event_save_meta';
    private const EVENT_NONCE_NAME = 'awene_event_meta_nonce';
    private const REGISTRATION_NONCE_ACTION = 'awene_registration_save_meta';
    private const REGISTRATION_NONCE_NAME = 'awene_registration_meta_nonce';
    private const EXPORT_NONCE_ACTION = 'awene_events_export_registrations';
    private const BREVO_OPTION_KEY = 'awene_brevo_notifications_settings';
    private const BREVO_SETTINGS_NONCE = 'awene_brevo_settings_save';
    private const BREVO_NOTIFY_NONCE = 'awene_brevo_notify_send';
    private const BREVO_NOTIFY_NONCE_NAME = 'awene_brevo_notify_nonce';
    private const BREVO_TEST_NONCE = 'awene_brevo_test_send';
    private const BREVO_MENU_SLUG = 'awene-events-brevo-settings';
    private const PV_DASHBOARD_SLUG = 'awene-events-pv-dashboard';
    private const RATE_LIMIT_SECONDS = 60;

    private const EVENT_META_FIELDS = [
        'short_description' => '_awene_event_short_description',
        'start_date' => '_awene_event_start_date',
        'start_time' => '_awene_event_start_time',
        'end_date' => '_awene_event_end_date',
        'end_time' => '_awene_event_end_time',
        'timezone' => '_awene_event_timezone',
        'location_type' => '_awene_event_location_type',
        'location_name' => '_awene_event_location_name',
        'location_address' => '_awene_event_location_address',
        'online_url' => '_awene_event_online_url',
        'language' => '_awene_event_language',
        'capacity' => '_awene_event_capacity',
        'available_seats' => '_awene_event_available_seats',
        'registration_status' => '_awene_event_registration_status',
        'event_status' => '_awene_event_event_status',
        'cta_label' => '_awene_event_cta_label',
        'seo_title' => '_awene_event_seo_title',
        'meta_description' => '_awene_event_meta_description',
        'price' => '_awene_event_price',
        'registration_url' => '_awene_event_registration_url',
        'featured' => '_awene_event_featured',
    ];

    private const REGISTRATION_META_FIELDS = [
        'event_id' => '_awene_registration_event_id',
        'event_title' => '_awene_registration_event_title',
        'first_name' => '_awene_registration_first_name',
        'last_name' => '_awene_registration_last_name',
        'email' => '_awene_registration_email',
        'phone' => '_awene_registration_phone',
        'message' => '_awene_registration_message',
        'registration_date' => '_awene_registration_date',
        'status' => '_awene_registration_status',
        'source' => '_awene_registration_source',
        'consent' => '_awene_registration_consent',
        'language' => '_awene_registration_language',
        'notes' => '_awene_registration_notes',
    ];

    private const PV_META_FIELDS = [
        'event_id' => '_awene_event_pv_event_id',
        'pv_title' => '_awene_event_pv_title',
        'short_description' => '_awene_event_pv_short_description',
        'full_description' => '_awene_event_pv_full_description',
        'key_takeaways' => '_awene_event_pv_key_takeaways',
        'speaker_notes' => '_awene_event_pv_speaker_notes',
        'attendance_notes' => '_awene_event_pv_attendance_notes',
        'internal_notes' => '_awene_event_pv_internal_notes',
        'public_recap_status' => '_awene_event_pv_public_recap_status',
        'pdf_url' => '_awene_event_pv_pdf_url',
        'pdf_is_public' => '_awene_event_pv_pdf_is_public',
        'video_url' => '_awene_event_pv_video_url',
        'gallery' => '_awene_event_pv_gallery',
        'external_gallery_url' => '_awene_event_pv_external_gallery_url',
        'satisfaction_form_id' => '_awene_event_pv_satisfaction_form_id',
        'completion_status' => '_awene_event_pv_completion_status',
    ];

    private const SATISFACTION_META_FIELDS = [
        'event_id' => '_awene_satisfaction_event_id',
        'intro_text' => '_awene_satisfaction_intro_text',
        'questions' => '_awene_satisfaction_questions',
        'thank_you_message' => '_awene_satisfaction_thank_you_message',
        'active' => '_awene_satisfaction_active',
        'anonymous_allowed' => '_awene_satisfaction_anonymous_allowed',
        'require_email' => '_awene_satisfaction_require_email',
        'language' => '_awene_satisfaction_language',
        'pdf_after_submission_url' => '_awene_satisfaction_pdf_after_submission_url',
        'pdf_attachment_id' => '_awene_satisfaction_pdf_attachment_id',
    ];

    private const SATISFACTION_RESPONSE_META_FIELDS = [
        'form_id' => '_awene_satisfaction_response_form_id',
        'event_id' => '_awene_satisfaction_response_event_id',
        'event_title' => '_awene_satisfaction_response_event_title',
        'first_name' => '_awene_satisfaction_response_first_name',
        'last_name' => '_awene_satisfaction_response_last_name',
        'email' => '_awene_satisfaction_response_email',
        'answers_json' => '_awene_satisfaction_response_answers_json',
        'submitted_at' => '_awene_satisfaction_response_submitted_at',
        'consent' => '_awene_satisfaction_response_consent',
        'language' => '_awene_satisfaction_response_language',
        'pdf_sent_status' => '_awene_satisfaction_response_pdf_sent_status',
    ];

    public static function init(): void
    {
        add_action('init', [self::class, 'register_content']);
        add_action('init', [self::class, 'register_meta']);
        add_action('add_meta_boxes', [self::class, 'add_meta_boxes']);
        add_action('save_post_' . self::EVENT_POST_TYPE, [self::class, 'save_event_meta']);
        add_action('save_post_' . self::REGISTRATION_POST_TYPE, [self::class, 'save_registration_meta']);
        add_action('save_post_' . self::EVENT_PV_POST_TYPE, [self::class, 'save_pv_meta']);
        add_action('save_post_' . self::SATISFACTION_POST_TYPE, [self::class, 'save_satisfaction_meta']);
        add_action('rest_api_init', [self::class, 'register_rest_fields']);
        add_action('rest_api_init', [self::class, 'register_rest_routes']);
        add_filter('manage_' . self::EVENT_POST_TYPE . '_posts_columns', [self::class, 'event_columns']);
        add_action('manage_' . self::EVENT_POST_TYPE . '_posts_custom_column', [self::class, 'event_column_content'], 10, 2);
        add_filter('manage_' . self::REGISTRATION_POST_TYPE . '_posts_columns', [self::class, 'registration_columns']);
        add_action('manage_' . self::REGISTRATION_POST_TYPE . '_posts_custom_column', [self::class, 'registration_column_content'], 10, 2);
        add_action('restrict_manage_posts', [self::class, 'registration_filters']);
        add_action('pre_get_posts', [self::class, 'apply_registration_filters']);
        add_action('admin_menu', [self::class, 'register_export_page']);
        add_action('admin_post_awene_events_export_registrations', [self::class, 'export_registrations_csv']);
        add_action('admin_post_awene_events_save_brevo_settings', [self::class, 'save_brevo_settings']);
        add_action('admin_post_awene_events_send_brevo_test', [self::class, 'send_brevo_test_email']);
        add_action('admin_post_awene_events_send_brevo_campaign', [self::class, 'send_brevo_campaign']);
        add_action('admin_post_awene_events_create_pv', [self::class, 'create_pv_from_event']);
        add_action('admin_post_awene_events_export_satisfaction', [self::class, 'export_satisfaction_csv']);
        add_action('admin_enqueue_scripts', [self::class, 'enqueue_admin_assets']);
        add_filter('manage_' . self::SATISFACTION_RESPONSE_POST_TYPE . '_posts_columns', [self::class, 'satisfaction_response_columns']);
        add_action('manage_' . self::SATISFACTION_RESPONSE_POST_TYPE . '_posts_custom_column', [self::class, 'satisfaction_response_column_content'], 10, 2);
        add_filter('manage_' . self::SATISFACTION_POST_TYPE . '_posts_columns', [self::class, 'satisfaction_form_columns']);
        add_action('manage_' . self::SATISFACTION_POST_TYPE . '_posts_custom_column', [self::class, 'satisfaction_form_column_content'], 10, 2);
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

    public static function enqueue_admin_assets(): void
    {
        global $post_type, $pagenow;
        if (!in_array($pagenow, ['post.php', 'post-new.php'], true)) {
            return;
        }
        if (!in_array($post_type, [self::EVENT_PV_POST_TYPE, self::SATISFACTION_POST_TYPE, self::SATISFACTION_RESPONSE_POST_TYPE], true)) {
            return;
        }
        wp_enqueue_media();
        wp_enqueue_script('jquery-ui-sortable');
    }

    public static function register_content(): void
    {
        register_post_type(self::EVENT_POST_TYPE, [
            'labels' => [
                'name' => 'AWENE Events',
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

        register_post_type(self::REGISTRATION_POST_TYPE, [
            'labels' => [
                'name' => 'Inscriptions',
                'singular_name' => 'Inscription',
                'add_new_item' => 'Add Registration',
                'edit_item' => 'Edit Registration',
                'new_item' => 'New Registration',
                'view_item' => 'View Registration',
                'search_items' => 'Search Registrations',
                'not_found' => 'No registrations found',
                'menu_name' => 'Inscriptions',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'edit.php?post_type=' . self::EVENT_POST_TYPE,
            'supports' => ['title'],
            'map_meta_cap' => true,
        ]);

        register_post_type(self::EVENT_PV_POST_TYPE, [
            'labels' => [
                'name' => 'Events PV',
                'singular_name' => 'Event PV',
                'add_new_item' => 'Add Event PV',
                'edit_item' => 'Edit PV',
                'menu_name' => 'Events PV',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => false,
            'supports' => ['title'],
            'map_meta_cap' => true,
        ]);

        register_post_type(self::SATISFACTION_POST_TYPE, [
            'labels' => [
                'name' => 'Satisfaction Forms',
                'singular_name' => 'Satisfaction Form',
                'add_new' => 'Add New',
                'add_new_item' => 'Add New Satisfaction Form',
                'edit_item' => 'Edit Satisfaction Form',
                'new_item' => 'New Satisfaction Form',
                'view_item' => 'View Satisfaction Form',
                'search_items' => 'Search Satisfaction Forms',
                'not_found' => 'No satisfaction forms found',
                'menu_name' => 'Satisfaction Forms',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'rest_base' => 'satisfaction-forms',
            'show_in_menu' => false,
            'capability_type' => 'post',
            'supports' => ['title'],
            'map_meta_cap' => true,
        ]);

        register_post_type(self::SATISFACTION_RESPONSE_POST_TYPE, [
            'labels' => [
                'name' => 'Satisfaction Responses',
                'singular_name' => 'Satisfaction Response',
                'menu_name' => 'Satisfaction Responses',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => false,
            'capability_type' => 'post',
            'supports' => ['title'],
            'map_meta_cap' => true,
        ]);

        register_taxonomy(self::TAXONOMY, [self::EVENT_POST_TYPE], [
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
        foreach (self::EVENT_META_FIELDS as $field => $meta_key) {
            register_post_meta(self::EVENT_POST_TYPE, $meta_key, [
                'single' => true,
                'type' => in_array($field, ['capacity', 'available_seats'], true) ? 'integer' : (in_array($field, ['featured'], true) ? 'boolean' : 'string'),
                'show_in_rest' => true,
                'auth_callback' => static function () {
                    return current_user_can('edit_posts');
                },
                'sanitize_callback' => static function ($value) use ($field) {
                    return self::sanitize_event_value($field, $value);
                },
            ]);
        }

        foreach (self::REGISTRATION_META_FIELDS as $field => $meta_key) {
            register_post_meta(self::REGISTRATION_POST_TYPE, $meta_key, [
                'single' => true,
                'type' => in_array($field, ['event_id'], true) ? 'integer' : (in_array($field, ['consent'], true) ? 'boolean' : 'string'),
                'show_in_rest' => false,
                'auth_callback' => static function () {
                    return current_user_can('edit_posts');
                },
                'sanitize_callback' => static function ($value) use ($field) {
                    return self::sanitize_registration_value($field, $value);
                },
            ]);
        }

        foreach (self::PV_META_FIELDS as $field => $meta_key) {
            register_post_meta(self::EVENT_PV_POST_TYPE, $meta_key, [
                'single' => true,
                'type' => in_array($field, ['event_id', 'satisfaction_form_id'], true) ? 'integer' : (in_array($field, ['pdf_is_public'], true) ? 'boolean' : 'string'),
                'show_in_rest' => false,
                'auth_callback' => static function () {
                    return current_user_can('edit_posts');
                },
                'sanitize_callback' => static function ($value) use ($field) {
                    return self::sanitize_pv_value($field, $value);
                },
            ]);
        }

        foreach (self::SATISFACTION_META_FIELDS as $field => $meta_key) {
            register_post_meta(self::SATISFACTION_POST_TYPE, $meta_key, [
                'single' => true,
                'type' => in_array($field, ['event_id', 'pdf_attachment_id'], true) ? 'integer' : (in_array($field, ['active', 'anonymous_allowed', 'require_email'], true) ? 'boolean' : 'string'),
                'show_in_rest' => false,
                'auth_callback' => static function () {
                    return current_user_can('edit_posts');
                },
                'sanitize_callback' => static function ($value) use ($field) {
                    return self::sanitize_satisfaction_value($field, $value);
                },
            ]);
        }

        foreach (self::SATISFACTION_RESPONSE_META_FIELDS as $field => $meta_key) {
            register_post_meta(self::SATISFACTION_RESPONSE_POST_TYPE, $meta_key, [
                'single' => true,
                'type' => in_array($field, ['form_id', 'event_id'], true) ? 'integer' : (in_array($field, ['consent', 'pdf_sent_status'], true) ? 'boolean' : 'string'),
                'show_in_rest' => false,
                'auth_callback' => static function () {
                    return current_user_can('edit_posts');
                },
                'sanitize_callback' => static function ($value) use ($field) {
                    return self::sanitize_satisfaction_response_value($field, $value);
                },
            ]);
        }
    }

    public static function add_meta_boxes(): void
    {
        add_meta_box(
            'awene_event_details',
            'Event Details',
            [self::class, 'render_event_box'],
            self::EVENT_POST_TYPE,
            'normal',
            'high'
        );

        add_meta_box(
            'awene_registration_details',
            'Registration Details',
            [self::class, 'render_registration_box'],
            self::REGISTRATION_POST_TYPE,
            'normal',
            'high'
        );

        add_meta_box(
            'awene_event_pv_details',
            'Events PV Details',
            [self::class, 'render_pv_box'],
            self::EVENT_PV_POST_TYPE,
            'normal',
            'high'
        );

        add_meta_box(
            'awene_satisfaction_details',
            'Form Builder',
            [self::class, 'render_satisfaction_box'],
            self::SATISFACTION_POST_TYPE,
            'normal',
            'high'
        );

        add_meta_box(
            'awene_satisfaction_status',
            'Form Status',
            [self::class, 'render_satisfaction_status_sidebar_box'],
            self::SATISFACTION_POST_TYPE,
            'side',
            'high'
        );

        add_meta_box(
            'awene_brevo_notifications',
            'Brevo Notifications',
            [self::class, 'render_brevo_notification_box'],
            self::EVENT_POST_TYPE,
            'side',
            'high'
        );

        add_meta_box(
            'awene_brevo_notifications_pv',
            'Brevo Notifications',
            [self::class, 'render_brevo_notification_box'],
            self::EVENT_PV_POST_TYPE,
            'side',
            'high'
        );
    }

    public static function render_event_box(WP_Post $post): void
    {
        wp_nonce_field(self::EVENT_NONCE_ACTION, self::EVENT_NONCE_NAME);

        $values = [];
        foreach (self::EVENT_META_FIELDS as $field => $meta_key) {
            $values[$field] = get_post_meta($post->ID, $meta_key, true);
        }

        $location_type = $values['location_type'] ?: 'online';
        $registration_status = $values['registration_status'] ?: 'open';
        $event_status = $values['event_status'] ?: 'upcoming';
        $language = $values['language'] ?: 'fr';
        ?>
        <style>
            .awene-events-grid { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .awene-events-grid label { display: block; font-weight: 600; margin-bottom: 6px; }
            .awene-events-grid input, .awene-events-grid select, .awene-events-grid textarea { width: 100%; }
            .awene-events-full { grid-column: 1 / -1; }
        </style>
        <div class="awene-events-grid">
            <?php self::render_field('short_description', 'Short description', 'textarea', $values['short_description'], 'awene-events-full'); ?>
            <?php self::render_field('start_date', 'Event date', 'date', $values['start_date']); ?>
            <?php self::render_field('start_time', 'Start time', 'time', $values['start_time']); ?>
            <?php self::render_field('end_date', 'End date', 'date', $values['end_date']); ?>
            <?php self::render_field('end_time', 'End time', 'time', $values['end_time']); ?>
            <?php self::render_field('timezone', 'Timezone', 'text', $values['timezone'] ?: 'Africa/Tunis'); ?>
            <p>
                <label for="awene_event_location_type">Location type</label>
                <select id="awene_event_location_type" name="awene_event_meta[location_type]">
                    <?php self::render_option('online', 'Online', $location_type); ?>
                    <?php self::render_option('in_person', 'In person', $location_type); ?>
                    <?php self::render_option('hybrid', 'Hybrid', $location_type); ?>
                </select>
            </p>
            <p>
                <label for="awene_event_language">Language</label>
                <select id="awene_event_language" name="awene_event_meta[language]">
                    <?php self::render_option('fr', 'FR', $language); ?>
                    <?php self::render_option('en', 'EN', $language); ?>
                    <?php self::render_option('ar', 'AR', $language); ?>
                </select>
            </p>
            <?php self::render_field('location_name', 'Location name', 'text', $values['location_name']); ?>
            <?php self::render_field('location_address', 'Location address', 'text', $values['location_address'], 'awene-events-full'); ?>
            <?php self::render_field('online_url', 'Online event URL', 'url', $values['online_url'], 'awene-events-full'); ?>
            <?php self::render_field('capacity', 'Capacity', 'number', $values['capacity']); ?>
            <?php self::render_field('available_seats', 'Available seats', 'number', $values['available_seats']); ?>
            <p>
                <label for="awene_event_registration_status">Registration status</label>
                <select id="awene_event_registration_status" name="awene_event_meta[registration_status]">
                    <?php self::render_option('open', 'Open', $registration_status); ?>
                    <?php self::render_option('full', 'Full', $registration_status); ?>
                    <?php self::render_option('closed', 'Closed', $registration_status); ?>
                </select>
            </p>
            <p>
                <label for="awene_event_event_status">Event status</label>
                <select id="awene_event_event_status" name="awene_event_meta[event_status]">
                    <?php self::render_option('upcoming', 'Upcoming', $event_status); ?>
                    <?php self::render_option('past', 'Past', $event_status); ?>
                    <?php self::render_option('draft', 'Draft', $event_status); ?>
                </select>
            </p>
            <?php self::render_field('cta_label', 'CTA label', 'text', $values['cta_label']); ?>
            <?php self::render_field('price', 'Price label', 'text', $values['price']); ?>
            <?php self::render_field('registration_url', 'Registration URL', 'url', $values['registration_url'], 'awene-events-full'); ?>
            <?php self::render_field('seo_title', 'SEO title', 'text', $values['seo_title'], 'awene-events-full'); ?>
            <?php self::render_field('meta_description', 'Meta description', 'textarea', $values['meta_description'], 'awene-events-full'); ?>
            <p class="awene-events-full">
                <label>
                    <input type="checkbox" name="awene_event_meta[featured]" value="1" <?php checked((bool) $values['featured']); ?> />
                    Feature this event
                </label>
            </p>
        </div>
        <?php
    }

    public static function render_registration_box(WP_Post $post): void
    {
        wp_nonce_field(self::REGISTRATION_NONCE_ACTION, self::REGISTRATION_NONCE_NAME);

        $values = [];
        foreach (self::REGISTRATION_META_FIELDS as $field => $meta_key) {
            $values[$field] = get_post_meta($post->ID, $meta_key, true);
        }

        $status = $values['status'] ?: 'pending';
        $source = $values['source'] ?: 'manual';
        $language = $values['language'] ?: 'fr';
        ?>
        <style>
            .awene-registrations-grid { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .awene-registrations-grid label { display: block; font-weight: 600; margin-bottom: 6px; }
            .awene-registrations-grid input, .awene-registrations-grid select, .awene-registrations-grid textarea { width: 100%; }
            .awene-registrations-full { grid-column: 1 / -1; }
        </style>
        <div class="awene-registrations-grid">
            <?php self::render_registration_field('event_id', 'Event ID', 'number', $values['event_id']); ?>
            <?php self::render_registration_field('event_title', 'Event title', 'text', $values['event_title']); ?>
            <?php self::render_registration_field('first_name', 'First name', 'text', $values['first_name']); ?>
            <?php self::render_registration_field('last_name', 'Last name', 'text', $values['last_name']); ?>
            <?php self::render_registration_field('email', 'Email', 'email', $values['email']); ?>
            <?php self::render_registration_field('phone', 'Phone number', 'text', $values['phone']); ?>
            <?php self::render_registration_field('registration_date', 'Registration date', 'datetime-local', $values['registration_date']); ?>
            <p>
                <label for="awene_registration_status">Status</label>
                <select id="awene_registration_status" name="awene_registration_meta[status]">
                    <?php self::render_option('pending', 'Pending', $status); ?>
                    <?php self::render_option('confirmed', 'Confirmed', $status); ?>
                    <?php self::render_option('cancelled', 'Cancelled', $status); ?>
                </select>
            </p>
            <p>
                <label for="awene_registration_source">Source</label>
                <select id="awene_registration_source" name="awene_registration_meta[source]">
                    <?php self::render_option('website', 'Website', $source); ?>
                    <?php self::render_option('manual', 'Manual', $source); ?>
                </select>
            </p>
            <p>
                <label for="awene_registration_language">Language</label>
                <select id="awene_registration_language" name="awene_registration_meta[language]">
                    <?php self::render_option('fr', 'FR', $language); ?>
                    <?php self::render_option('en', 'EN', $language); ?>
                    <?php self::render_option('ar', 'AR', $language); ?>
                </select>
            </p>
            <p>
                <label>
                    <input type="checkbox" name="awene_registration_meta[consent]" value="1" <?php checked((bool) $values['consent']); ?> />
                    Consent given
                </label>
            </p>
            <?php self::render_registration_field('message', 'Message', 'textarea', $values['message'], 'awene-registrations-full'); ?>
            <?php self::render_registration_field('notes', 'Notes', 'textarea', $values['notes'], 'awene-registrations-full'); ?>
        </div>
        <?php
    }

    public static function render_pv_box(WP_Post $post): void
    {
        wp_nonce_field(self::EVENT_NONCE_ACTION, self::EVENT_NONCE_NAME);
        $values = [];
        foreach (self::PV_META_FIELDS as $field => $meta_key) {
            $values[$field] = get_post_meta($post->ID, $meta_key, true);
        }
        $event_id = absint($values['event_id']);
        $event = $event_id ? self::event_payload($event_id) : null;
        $gallery_ids_raw = (string) get_post_meta($post->ID, '_awene_event_pv_gallery_ids', true);
        $gallery_ids = array_filter(array_map('absint', explode(',', $gallery_ids_raw)));
        $completion_status = (string) ($values['completion_status'] ?: 'pending');
        $public_recap_status = (string) ($values['public_recap_status'] ?: 'draft');

        // Query satisfaction forms for the dropdown
        $satisfaction_forms = get_posts([
            'post_type' => self::SATISFACTION_POST_TYPE,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => 'title',
            'order' => 'ASC',
        ]);
        $linked_form_id = absint($values['satisfaction_form_id']);
        $linked_form_responses = $linked_form_id ? (new WP_Query([
            'post_type' => self::SATISFACTION_RESPONSE_POST_TYPE,
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'fields' => 'ids',
            'meta_query' => [[
                'key' => self::SATISFACTION_META_FIELDS['event_id'],
                'value' => $event_id,
                'compare' => '=',
            ]],
        ]))->found_posts : 0;

        // PDF preview data
        $pdf_url = (string) ($values['pdf_url'] ?: '');
        $pdf_filename = $pdf_url ? basename(parse_url($pdf_url, PHP_URL_PATH)) : '';
        ?>
        <style>
        .awene-pv-editor { max-width: 100%; }
        .awene-pv-section { background: #fff; border: 1px solid #e8dff0; border-radius: 12px; padding: 20px 22px; margin-bottom: 16px; }
        .awene-pv-section h3 { margin: 0 0 14px; padding-bottom: 10px; border-bottom: 1px solid #f0eaf8; font-size: 13px; text-transform: uppercase; letter-spacing: .08em; color: #4B1F7A; }
        .awene-pv-section label { display: block; font-weight: 600; margin-bottom: 5px; font-size: 13px; color: #2E2438; }
        .awene-pv-section input[type=text], .awene-pv-section input[type=url], .awene-pv-section textarea, .awene-pv-section select { width: 100%; margin-bottom: 14px; }
        .awene-pv-section .awene-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .awene-pv-event-card { background: #f8f4fb; border: 1px solid #e8dff0; border-radius: 10px; padding: 14px 16px; margin-bottom: 4px; }
        .awene-pv-event-card strong { display: block; margin-bottom: 4px; }
        .awene-gallery-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
        .awene-gallery-item { position: relative; width: 80px; height: 80px; }
        .awene-gallery-item img { width: 80px; height: 80px; object-fit: cover; border-radius: 6px; }
        .awene-gallery-item .remove { position: absolute; top: -6px; right: -6px; background: #b32d2e; color: #fff; border: none; border-radius: 999px; width: 18px; height: 18px; cursor: pointer; font-size: 11px; display: flex; align-items: center; justify-content: center; }
        .awene-pdf-preview { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 12px; color: #646970; }
        .awene-questions-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        .awene-questions-table th { text-align: left; padding: 6px 8px; background: #f8f4fb; font-size: 12px; border: 1px solid #e8dff0; }
        .awene-questions-table td { padding: 6px 8px; border: 1px solid #e8dff0; vertical-align: top; }
        .awene-questions-table textarea { min-height: 50px; margin: 0; }
        .awene-questions-table select { margin: 0; width: 140px; }
        .awene-collapsible-toggle { background: none; border: 1px solid #e8dff0; border-radius: 6px; padding: 6px 12px; cursor: pointer; font-size: 13px; color: #4B1F7A; width: 100%; text-align: left; margin-bottom: 10px; }
        </style>

        <div class="awene-pv-editor">

            <!-- Section 1: Event Overview -->
            <div class="awene-pv-section">
                <h3>Event Overview</h3>
                <?php if ($event) : ?>
                    <div class="awene-pv-event-card">
                        <strong><?php echo esc_html($event['title']); ?></strong>
                        <div style="color:#646970; font-size:13px;">
                            <?php echo esc_html($event['date_label']); ?> &bull;
                            <?php echo esc_html($event['locationLabel'] ?: 'Location to be confirmed'); ?> &bull;
                            <?php echo esc_html($event['type']); ?>
                        </div>
                        <div style="color:#646970; font-size:12px; margin-top:6px;">
                            <?php echo esc_html($event['registrationCount'] ?? self::registration_count_for_event($event_id)); ?> registrations &bull;
                            <?php echo esc_html(strtoupper((string) ($event['language'] ?? 'fr'))); ?>
                        </div>
                    </div>
                    <input type="hidden" name="awene_event_pv_meta[event_id]" value="<?php echo esc_attr((string) $event_id); ?>" />
                <?php else : ?>
                    <p style="color:#646970;">No linked event. Please set Event ID below if this PV was created manually.</p>
                <?php endif; ?>
            </div>

            <!-- Section 2: Public Recap -->
            <div class="awene-pv-section">
                <h3>Public Recap</h3>
                <div class="awene-two-col">
                    <div>
                        <label for="awene_pv_completion_status">Completion status</label>
                        <select id="awene_pv_completion_status" name="awene_event_pv_meta[completion_status]">
                            <?php self::render_option('pending', 'Pending', $completion_status); ?>
                            <?php self::render_option('in_progress', 'In progress', $completion_status); ?>
                            <?php self::render_option('complete', 'Complete', $completion_status); ?>
                        </select>
                    </div>
                    <div>
                        <label for="awene_event_pv_public_recap_status">Public recap status</label>
                        <select id="awene_event_pv_public_recap_status" name="awene_event_pv_meta[public_recap_status]">
                            <?php self::render_option('draft', 'Draft', $public_recap_status); ?>
                            <?php self::render_option('published', 'Published', $public_recap_status); ?>
                            <?php self::render_option('hidden', 'Hidden', $public_recap_status); ?>
                        </select>
                    </div>
                </div>
                <label for="awene_event_pv_pv_title">PV title</label>
                <input id="awene_event_pv_pv_title" type="text" name="awene_event_pv_meta[pv_title]" value="<?php echo esc_attr((string) $values['pv_title']); ?>" />

                <label for="awene_event_pv_short_description">Short description</label>
                <textarea id="awene_event_pv_short_description" name="awene_event_pv_meta[short_description]" rows="3"><?php echo esc_textarea((string) $values['short_description']); ?></textarea>

                <label>Full recap</label>
                <?php
                wp_editor(
                    (string) $values['full_description'],
                    'awene_pv_full_description',
                    [
                        'textarea_name' => 'awene_event_pv_meta[full_description]',
                        'media_buttons' => false,
                        'teeny' => true,
                        'quicktags' => false,
                        'editor_height' => 200,
                    ]
                );
                ?>

                <label for="awene_event_pv_key_takeaways" style="margin-top:14px;">Key takeaways</label>
                <textarea id="awene_event_pv_key_takeaways" name="awene_event_pv_meta[key_takeaways]" rows="4"><?php echo esc_textarea((string) $values['key_takeaways']); ?></textarea>
            </div>

            <!-- Section 3: Resources -->
            <div class="awene-pv-section">
                <h3>Resources</h3>

                <label>PDF</label>
                <div class="awene-pdf-preview" id="awene_pv_pdf_preview" style="<?php echo $pdf_url ? '' : 'display:none;'; ?>">
                    <span><?php echo esc_html($pdf_filename); ?></span>
                    <a href="#" onclick="aweneClearMedia('awene_pv_pdf_url','awene_pv_pdf_preview');return false;" style="color:#b32d2e;">Remove</a>
                </div>
                <input type="hidden" id="awene_pv_pdf_url" name="awene_event_pv_meta[pdf_url]" value="<?php echo esc_attr($pdf_url); ?>" />
                <button type="button" class="button" onclick="aweneOpenMediaPicker('awene_pv_pdf_url','awene_pv_pdf_preview','application/pdf')">Choose PDF</button>
                <br /><br />

                <label style="font-weight:400;">
                    <input type="checkbox" name="awene_event_pv_meta[pdf_is_public]" value="1" <?php checked((bool) $values['pdf_is_public']); ?> />
                    Public Recap PDF
                </label>

                <label for="awene_event_pv_video_url" style="margin-top:14px;">Video URL</label>
                <input id="awene_event_pv_video_url" type="url" name="awene_event_pv_meta[video_url]" value="<?php echo esc_attr((string) $values['video_url']); ?>" />
            </div>

            <!-- Section 4: Photo Gallery -->
            <div class="awene-pv-section">
                <h3>Photo Gallery</h3>
                <div class="awene-gallery-grid" id="awene_pv_gallery_grid">
                    <?php foreach ($gallery_ids as $gid) :
                        $thumb = wp_get_attachment_image_url($gid, 'thumbnail');
                        if (!$thumb) continue;
                    ?>
                        <div class="awene-gallery-item">
                            <img src="<?php echo esc_url($thumb); ?>" alt="" />
                            <button type="button" class="remove" onclick="aweneRemoveGalleryItem(<?php echo esc_js((string) $gid); ?>,'awene_pv_gallery_ids','awene_pv_gallery_grid')" title="Remove">&#215;</button>
                        </div>
                    <?php endforeach; ?>
                </div>
                <input type="hidden" id="awene_pv_gallery_ids" name="awene_event_pv_meta[gallery_ids]" value="<?php echo esc_attr($gallery_ids_raw); ?>" />
                <button type="button" class="button" onclick="aweneOpenGalleryPicker('awene_pv_gallery_ids','awene_pv_gallery_grid')">Add photos</button>
            </div>

            <!-- Section 5: Satisfaction Survey -->
            <div class="awene-pv-section">
                <h3>Satisfaction Survey</h3>
                <label for="awene_pv_satisfaction_form_id">Linked satisfaction form</label>
                <select id="awene_pv_satisfaction_form_id" name="awene_event_pv_meta[satisfaction_form_id]">
                    <option value="">— None —</option>
                    <?php foreach ($satisfaction_forms as $sf) : ?>
                        <option value="<?php echo esc_attr((string) $sf->ID); ?>" <?php selected($linked_form_id, $sf->ID); ?>>
                            <?php echo esc_html($sf->post_title); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                <?php if ($linked_form_id) : ?>
                    <p>
                        <a href="<?php echo esc_url(admin_url('post.php?post=' . $linked_form_id . '&action=edit')); ?>" class="button">
                            View responses (<?php echo esc_html((string) $linked_form_responses); ?>)
                        </a>
                    </p>
                <?php endif; ?>
                <p>
                    <a href="<?php echo esc_url(admin_url('post-new.php?post_type=' . self::SATISFACTION_POST_TYPE)); ?>">Create new form</a>
                </p>
            </div>

            <!-- Section 6: Internal Notes (collapsible) -->
            <div class="awene-pv-section">
                <button type="button" class="awene-collapsible-toggle" onclick="aweneToggleSection('awene_pv_internal_section')">Internal notes &#9658;</button>
                <div id="awene_pv_internal_section" style="display:none;">
                    <label for="awene_event_pv_speaker_notes">Speaker notes</label>
                    <textarea id="awene_event_pv_speaker_notes" name="awene_event_pv_meta[speaker_notes]" rows="3"><?php echo esc_textarea((string) $values['speaker_notes']); ?></textarea>

                    <label for="awene_event_pv_attendance_notes">Attendance notes</label>
                    <textarea id="awene_event_pv_attendance_notes" name="awene_event_pv_meta[attendance_notes]" rows="3"><?php echo esc_textarea((string) $values['attendance_notes']); ?></textarea>

                    <label for="awene_event_pv_internal_notes">Internal notes</label>
                    <textarea id="awene_event_pv_internal_notes" name="awene_event_pv_meta[internal_notes]" rows="4"><?php echo esc_textarea((string) $values['internal_notes']); ?></textarea>
                </div>
            </div>

        </div><!-- /.awene-pv-editor -->

        <script>
        function aweneOpenMediaPicker(inputId, previewId, type) {
            var frame = wp.media({ title: 'Select file', multiple: false, library: { type: type } });
            frame.on('select', function() {
                var attachment = frame.state().get('selection').first().toJSON();
                document.getElementById(inputId).value = attachment.url;
                var preview = document.getElementById(previewId);
                if (preview) {
                    preview.innerHTML = '<span>' + attachment.filename + '</span> <a href="#" onclick="aweneClearMedia(\'' + inputId + '\',\'' + previewId + '\');return false;" style="color:#b32d2e;">Remove</a>';
                    preview.style.display = 'flex';
                }
            });
            frame.open();
        }
        function aweneClearMedia(inputId, previewId) {
            document.getElementById(inputId).value = '';
            var preview = document.getElementById(previewId);
            if (preview) { preview.innerHTML = ''; preview.style.display = 'none'; }
        }
        function aweneOpenGalleryPicker(idsInputId, gridId) {
            var frame = wp.media({ title: 'Select photos', multiple: true, library: { type: 'image' } });
            var existingIds = document.getElementById(idsInputId).value.split(',').filter(Boolean).map(Number);
            frame.on('open', function() {
                var selection = frame.state().get('selection');
                existingIds.forEach(function(id) {
                    var attachment = wp.media.attachment(id);
                    attachment.fetch();
                    selection.add(attachment);
                });
            });
            frame.on('select', function() {
                var selected = frame.state().get('selection').toJSON();
                var ids = selected.map(function(a) { return a.id; });
                document.getElementById(idsInputId).value = ids.join(',');
                var grid = document.getElementById(gridId);
                grid.innerHTML = '';
                selected.forEach(function(a) {
                    var src = (a.sizes && a.sizes.thumbnail) ? a.sizes.thumbnail.url : a.url;
                    var item = document.createElement('div');
                    item.className = 'awene-gallery-item';
                    item.innerHTML = '<img src="' + src + '" /><button type="button" class="remove" onclick="aweneRemoveGalleryItem(' + a.id + ', \'' + idsInputId + '\', \'' + gridId + '\')" title="Remove">×</button>';
                    grid.appendChild(item);
                });
            });
            frame.open();
        }
        function aweneRemoveGalleryItem(id, idsInputId, gridId) {
            var input = document.getElementById(idsInputId);
            var ids = input.value.split(',').filter(Boolean).map(Number).filter(function(i) { return i !== id; });
            input.value = ids.join(',');
            event.target.closest('.awene-gallery-item').remove();
        }
        function aweneToggleSection(id) {
            var el = document.getElementById(id);
            var btn = el.previousElementSibling;
            if (el.style.display === 'none') {
                el.style.display = 'block';
                btn.textContent = btn.textContent.replace('▸', '▾');
            } else {
                el.style.display = 'none';
                btn.textContent = btn.textContent.replace('▾', '▸');
            }
        }
        </script>
        <?php
    }

    // ── Satisfaction Form Builder ─────────────────────────────────────────────

    private static function render_question_card_html(int $index, array $q): void
    {
        $type     = (string) ($q['type'] ?? 'rating_5');
        $required = !empty($q['required']);
        $options  = is_array($q['options'] ?? null) ? $q['options'] : [];
        $has_opts = in_array($type, ['multiple_choice', 'checkbox'], true);

        $type_labels = [
            'rating_5'        => '⭐ Rating 1–5',
            'rating_10'       => '⭐ Rating 1–10',
            'yes_no'          => '✅ Yes / No',
            'text'            => '💬 Short text',
            'textarea'        => '📝 Long text',
            'multiple_choice' => '🔘 Multiple choice',
            'checkbox'        => '☑️ Checkboxes',
            'email'           => '📧 Email',
            'nps'             => '📈 NPS 0–10',
        ];
        $type_label = $type_labels[$type] ?? $type;
        ?>
        <div class="awene-sf-question-card" data-index="<?php echo esc_attr((string) $index); ?>">
            <div class="awene-sf-q-header">
                <span class="awene-sf-drag-handle">⠿</span>
                <span class="awene-sf-q-num"><?php echo esc_html((string) ($index + 1)); ?></span>
                <span class="awene-sf-q-type-badge"><?php echo esc_html($type_label); ?></span>
                <?php if ($required) : ?><span class="awene-sf-q-required-badge">Required</span><?php endif; ?>
                <button type="button" class="awene-sf-q-remove" onclick="aweneSfRemoveQuestion(this)" title="Remove">&#215;</button>
            </div>
            <div class="awene-sf-q-body">
                <div class="awene-sf-q-row">
                    <div>
                        <label class="awene-sf-q-sublabel">Question</label>
                        <input type="text" class="awene-sf-input awene-sf-q-text" value="<?php echo esc_attr((string) ($q['question'] ?? '')); ?>" placeholder="Type your question here…" oninput="aweneSfSyncQuestions()" />
                    </div>
                    <div>
                        <label class="awene-sf-q-sublabel">Type</label>
                        <select class="awene-sf-type-select awene-sf-q-type-sel" onchange="aweneSfOnTypeChange(this)">
                            <?php foreach ($type_labels as $val => $lbl) : ?>
                                <option value="<?php echo esc_attr($val); ?>" <?php selected($type, $val); ?>><?php echo esc_html($lbl); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div>
                        <label class="awene-sf-q-sublabel">Required</label>
                        <label class="awene-sf-req-toggle">
                            <input type="checkbox" class="awene-sf-q-required" <?php checked($required); ?> onchange="aweneSfSyncQuestions();aweneSfUpdateRequiredBadge(this);" />
                            <span>Required</span>
                        </label>
                    </div>
                </div>
                <div class="awene-sf-options-editor<?php echo $has_opts ? ' visible' : ''; ?>">
                    <label class="awene-sf-q-sublabel" style="margin-bottom:8px;">Choices</label>
                    <?php $opts = $options ?: ['', '']; foreach ($opts as $opt) : ?>
                        <div class="awene-sf-option-row">
                            <input type="text" class="awene-sf-option-input" value="<?php echo esc_attr((string) $opt); ?>" placeholder="Option…" onchange="aweneSfSyncQuestions()" oninput="aweneSfSyncQuestions()" />
                            <button type="button" onclick="aweneSfRemoveOption(this)" class="awene-sf-opt-remove">&#215;</button>
                        </div>
                    <?php endforeach; ?>
                    <button type="button" class="awene-sf-btn-add-option" onclick="aweneSfAddOption(this)">+ Add option</button>
                </div>
            </div>
        </div>
        <?php
    }

    public static function render_satisfaction_status_sidebar_box(WP_Post $post): void
    {
        $values = [];
        foreach (self::SATISFACTION_META_FIELDS as $field => $meta_key) {
            $values[$field] = get_post_meta($post->ID, $meta_key, true);
        }
        $linked_event_id = absint($values['event_id']);
        $active          = (bool) $values['active'];
        $questions_data  = json_decode((string) ($values['questions'] ?: '[]'), true);
        $q_count         = is_array($questions_data) ? count($questions_data) : 0;
        $pdf_url         = (string) $values['pdf_after_submission_url'];

        $response_count = $post->ID > 0 ? (new WP_Query([
            'post_type'      => self::SATISFACTION_RESPONSE_POST_TYPE,
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'fields'         => 'ids',
            'meta_query'     => [[
                'key'     => self::SATISFACTION_RESPONSE_META_FIELDS['form_id'],
                'value'   => $post->ID,
                'compare' => '=',
            ]],
        ]))->found_posts : 0;
        ?>
        <style>
        .awene-sf-sb-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f5f0fb; font-size:13px; }
        .awene-sf-sb-row:last-child { border-bottom:none; padding-bottom:0; }
        .awene-sf-sb-key { color:#6d5b8a; font-weight:500; }
        .awene-sf-sb-val { font-weight:700; color:#2E2438; text-align:right; max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .awene-sf-sb-badge { padding:3px 9px; border-radius:999px; font-size:11px; font-weight:700; }
        .awene-sf-sb-badge.active { background:#e6f9ef; color:#1a7c3e; }
        .awene-sf-sb-badge.inactive { background:#fef2f2; color:#b32d2e; }
        </style>
        <div>
            <div class="awene-sf-sb-row">
                <span class="awene-sf-sb-key">Status</span>
                <span class="awene-sf-sb-badge <?php echo $active ? 'active' : 'inactive'; ?>">
                    <?php echo $active ? '● Active' : '● Inactive'; ?>
                </span>
            </div>
            <div class="awene-sf-sb-row">
                <span class="awene-sf-sb-key">Linked event</span>
                <span class="awene-sf-sb-val" title="<?php echo $linked_event_id ? esc_attr(get_the_title($linked_event_id)) : ''; ?>">
                    <?php echo $linked_event_id ? esc_html(get_the_title($linked_event_id)) : '—'; ?>
                </span>
            </div>
            <div class="awene-sf-sb-row">
                <span class="awene-sf-sb-key">Questions</span>
                <span class="awene-sf-sb-val"><?php echo esc_html((string) $q_count); ?></span>
            </div>
            <div class="awene-sf-sb-row">
                <span class="awene-sf-sb-key">Responses</span>
                <span class="awene-sf-sb-val"><?php echo esc_html((string) $response_count); ?></span>
            </div>
            <div class="awene-sf-sb-row">
                <span class="awene-sf-sb-key">PDF attached</span>
                <span class="awene-sf-sb-val"><?php echo $pdf_url ? '✓ Yes' : '—'; ?></span>
            </div>
        </div>
        <?php
    }

    public static function render_satisfaction_box(WP_Post $post): void
    {
        wp_nonce_field(self::EVENT_NONCE_ACTION, self::EVENT_NONCE_NAME);
        $values = [];
        foreach (self::SATISFACTION_META_FIELDS as $field => $meta_key) {
            $values[$field] = get_post_meta($post->ID, $meta_key, true);
        }

        $questions_json = (string) ($values['questions'] ?: '[]');
        $questions_data = json_decode($questions_json, true);
        if (!is_array($questions_data)) {
            $questions_data = [];
        }

        $all_events = get_posts([
            'post_type'   => self::EVENT_POST_TYPE,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby'     => 'title',
            'order'       => 'ASC',
        ]);
        $linked_event_id = absint($values['event_id']);

        $linked_event    = $linked_event_id ? self::event_payload($linked_event_id) : null;
        $pdf_att_id      = absint($values['pdf_attachment_id']);
        $pdf_sub_url     = (string) ($values['pdf_after_submission_url'] ?: ($pdf_att_id ? wp_get_attachment_url($pdf_att_id) : ''));
        $pdf_sub_name    = $pdf_att_id ? basename((string) get_attached_file($pdf_att_id)) : ($pdf_sub_url ? basename((string) parse_url($pdf_sub_url, PHP_URL_PATH)) : '');
        $active          = (bool) $values['active'];
        $anon            = (bool) $values['anonymous_allowed'];
        $req_email       = (bool) ($values['require_email'] ?? false);
        $language        = (string) ($values['language'] ?: 'fr');

        // Response stats
        $response_count    = 0;
        $last_response_date = '';
        if ($post->ID > 0) {
            $r_query = new WP_Query([
                'post_type'      => self::SATISFACTION_RESPONSE_POST_TYPE,
                'post_status'    => 'publish',
                'posts_per_page' => 1,
                'orderby'        => 'date',
                'order'          => 'DESC',
                'meta_query'     => [['key' => self::SATISFACTION_RESPONSE_META_FIELDS['form_id'], 'value' => $post->ID, 'compare' => '=']],
            ]);
            $response_count = (new WP_Query([
                'post_type'      => self::SATISFACTION_RESPONSE_POST_TYPE,
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'fields'         => 'ids',
                'meta_query'     => [['key' => self::SATISFACTION_RESPONSE_META_FIELDS['form_id'], 'value' => $post->ID, 'compare' => '=']],
            ]))->found_posts;
            if ($r_query->have_posts()) {
                $last_response_date = (string) get_post_meta($r_query->posts[0]->ID, self::SATISFACTION_RESPONSE_META_FIELDS['submitted_at'], true);
            }
        }
        ?>

        <style>
        /* ── Satisfaction Form Builder ───────────────────────────────────── */
        .awene-sf-builder { max-width:100%; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
        .awene-sf-card { background:#fff; border:1.5px solid #e5e0f0; border-radius:14px; padding:22px 24px; margin-bottom:20px; }
        .awene-sf-card-header { display:flex; align-items:center; gap:10px; margin-bottom:20px; padding-bottom:14px; border-bottom:1px solid #f0eaf8; }
        .awene-sf-card-icon { width:34px; height:34px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
        .awene-sf-card-icon.purple { background:#f0e8fd; }
        .awene-sf-card-icon.green  { background:#e6f9ef; }
        .awene-sf-card-icon.blue   { background:#e8f1fd; }
        .awene-sf-card-icon.orange { background:#fef3e7; }
        .awene-sf-card-icon.teal   { background:#e6f7f7; }
        .awene-sf-card-title { font-size:14px; font-weight:700; color:#2E2438; margin:0; line-height:1.3; }
        .awene-sf-card-subtitle { font-size:11px; color:#8b7fa0; margin:2px 0 0; }

        .awene-sf-field { margin-bottom:18px; }
        .awene-sf-field:last-child { margin-bottom:0; }
        .awene-sf-label { display:block; font-size:13px; font-weight:600; color:#3a2e4a; margin-bottom:6px; }
        .awene-sf-helper { display:block; font-size:11px; color:#8b7fa0; margin-top:4px; line-height:1.5; }
        .awene-sf-input,.awene-sf-textarea,.awene-sf-select {
            width:100%; border:1.5px solid #e0d9ee; border-radius:8px;
            padding:9px 12px; font-size:13px; color:#2E2438; background:#faf8fd;
            transition:border-color .15s; box-sizing:border-box;
        }
        .awene-sf-input:focus,.awene-sf-textarea:focus,.awene-sf-select:focus {
            border-color:#7c3aed; outline:none; background:#fff;
        }
        .awene-sf-textarea { resize:vertical; min-height:76px; }
        .awene-sf-two-col { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

        /* Toggles */
        .awene-sf-toggle-group { border:1.5px solid #e5e0f0; border-radius:10px; padding:2px 14px; margin-bottom:20px; }
        .awene-sf-toggle-row { display:flex; align-items:center; justify-content:space-between; padding:11px 0; border-bottom:1px solid #f5f0fb; }
        .awene-sf-toggle-row:last-child { border-bottom:none; }
        .awene-sf-toggle-info { flex:1; padding-right:12px; }
        .awene-sf-toggle-label { font-size:13px; font-weight:600; color:#2E2438; display:block; }
        .awene-sf-toggle-desc  { font-size:11px; color:#8b7fa0; display:block; margin-top:2px; }
        .awene-sf-switch { position:relative; display:inline-block; width:42px; height:23px; flex-shrink:0; }
        .awene-sf-switch input { opacity:0; width:0; height:0; }
        .awene-sf-slider { position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:#d8d0e8; border-radius:23px; transition:.2s; }
        .awene-sf-slider:before { position:absolute; content:""; height:17px; width:17px; left:3px; bottom:3px; background:#fff; border-radius:50%; transition:.2s; box-shadow:0 1px 3px rgba(0,0,0,.2); }
        .awene-sf-switch input:checked + .awene-sf-slider { background:#7c3aed; }
        .awene-sf-switch input:checked + .awene-sf-slider:before { transform:translateX(19px); }

        /* Active badge */
        .awene-sf-status-badge { display:inline-flex; align-items:center; gap:5px; border-radius:999px; padding:4px 11px; font-size:11px; font-weight:700; }
        .awene-sf-status-badge.active   { background:#e6f9ef; color:#1a7c3e; }
        .awene-sf-status-badge.inactive { background:#fef2f2; color:#b32d2e; }
        .awene-sf-status-dot { width:7px; height:7px; border-radius:50%; display:inline-block; }
        .awene-sf-status-badge.active .awene-sf-status-dot   { background:#22c55e; }
        .awene-sf-status-badge.inactive .awene-sf-status-dot { background:#ef4444; }

        /* Event summary */
        .awene-sf-event-summary { background:#f8f4fb; border:1px solid #e5e0f0; border-radius:10px; padding:14px 16px; margin-top:14px; display:none; }
        .awene-sf-event-summary.visible { display:block; }
        .awene-sf-event-title { font-size:14px; font-weight:700; color:#4B1F7A; margin-bottom:8px; }
        .awene-sf-event-chips { display:flex; flex-wrap:wrap; gap:6px; }
        .awene-sf-event-chip { display:inline-flex; align-items:center; gap:4px; background:#fff; border:1px solid #e5e0f0; border-radius:999px; padding:3px 9px; font-size:11px; color:#4a3860; }

        /* Questions builder */
        .awene-sf-questions-list { min-height:56px; margin-bottom:14px; }
        .awene-sf-question-card { background:#faf8fd; border:1.5px solid #e5e0f0; border-radius:12px; margin-bottom:10px; transition:border-color .15s,box-shadow .15s; }
        .awene-sf-question-card:hover { border-color:#c4b5de; box-shadow:0 2px 8px rgba(76,31,122,.07); }
        .awene-sf-question-card.sortable-placeholder { border:2px dashed #c4b5de; background:#f5f0fb; min-height:76px; border-radius:12px; }
        .awene-sf-q-header { display:flex; align-items:center; gap:8px; padding:10px 14px; background:#f0eaf8; border-radius:10px 10px 0 0; border-bottom:1px solid #e5e0f0; cursor:grab; user-select:none; }
        .awene-sf-q-header:active { cursor:grabbing; }
        .awene-sf-drag-handle { color:#a090be; font-size:15px; line-height:1; }
        .awene-sf-q-num { background:#7c3aed; color:#fff; border-radius:999px; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; flex-shrink:0; }
        .awene-sf-q-type-badge { background:#fff; border:1px solid #d8d0e8; border-radius:6px; padding:2px 8px; font-size:11px; color:#6d5b8a; font-weight:600; flex:1; }
        .awene-sf-q-required-badge { background:#fef3e7; color:#d97706; border-radius:999px; padding:2px 8px; font-size:11px; font-weight:600; }
        .awene-sf-q-remove { background:none; border:none; cursor:pointer; color:#b0a0c8; font-size:17px; padding:1px 4px; border-radius:4px; line-height:1; margin-left:auto; }
        .awene-sf-q-remove:hover { color:#b32d2e; background:#fef2f2; }
        .awene-sf-q-body { padding:14px; }
        .awene-sf-q-row { display:grid; grid-template-columns:1fr 180px 110px; gap:10px; align-items:start; }
        .awene-sf-q-sublabel { display:block; font-size:11px; font-weight:600; color:#6d5b8a; margin-bottom:5px; }
        .awene-sf-type-select { border:1.5px solid #e0d9ee; border-radius:8px; padding:8px 10px; font-size:12px; background:#fff; color:#3a2e4a; width:100%; }
        .awene-sf-req-toggle { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:600; color:#6d5b8a; cursor:pointer; margin-top:4px; }
        .awene-sf-options-editor { margin-top:10px; padding-top:10px; border-top:1px solid #ede8f5; display:none; }
        .awene-sf-options-editor.visible { display:block; }
        .awene-sf-option-row { display:flex; align-items:center; gap:8px; margin-bottom:7px; }
        .awene-sf-option-input { flex:1; border:1.5px solid #e0d9ee; border-radius:7px; padding:7px 10px; font-size:12px; }
        .awene-sf-opt-remove { background:none; border:none; color:#b32d2e; cursor:pointer; font-size:16px; padding:2px 4px; line-height:1; }
        .awene-sf-btn-add-option { background:none; border:1px dashed #c4b5de; border-radius:7px; padding:5px 12px; font-size:11px; color:#7c3aed; cursor:pointer; }
        .awene-sf-btn-add-option:hover { background:#f5f0fb; }

        /* Add question */
        .awene-sf-add-q-btn { width:100%; border:2px dashed #c4b5de; background:#faf8fd; border-radius:12px; padding:14px; font-size:13px; font-weight:700; color:#7c3aed; cursor:pointer; transition:all .15s; display:flex; align-items:center; justify-content:center; gap:8px; }
        .awene-sf-add-q-btn:hover { background:#f0e8fd; border-color:#9f65e8; }

        /* Empty */
        .awene-sf-empty { text-align:center; padding:28px 16px; color:#8b7fa0; border:2px dashed #e5e0f0; border-radius:10px; }
        .awene-sf-empty-icon { font-size:36px; margin-bottom:8px; }

        /* PDF */
        .awene-sf-pdf-preview { display:flex; align-items:center; gap:10px; background:#f8f4fb; border:1px solid #e5e0f0; border-radius:8px; padding:10px 14px; margin-bottom:10px; }
        .awene-sf-pdf-icon { font-size:20px; }
        .awene-sf-pdf-name { font-size:13px; color:#4a3860; font-weight:600; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .awene-sf-pdf-remove { color:#b32d2e; font-size:11px; cursor:pointer; background:none; border:none; text-decoration:underline; }
        .awene-sf-choose-pdf { border:1.5px solid #e0d9ee; background:#faf8fd; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:600; color:#4a3860; cursor:pointer; }
        .awene-sf-choose-pdf:hover { background:#f0e8fd; border-color:#c4b5de; }
        .awene-sf-pdf-warning { background:#fff8eb; border:1px solid #f8c962; border-radius:8px; padding:9px 13px; font-size:12px; color:#92400e; margin-top:10px; display:none; }
        .awene-sf-pdf-warning.visible { display:block; }

        /* Responses */
        .awene-sf-stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:16px; }
        .awene-sf-stat { background:#f8f4fb; border:1px solid #e5e0f0; border-radius:10px; padding:14px; text-align:center; }
        .awene-sf-stat-value { font-size:24px; font-weight:700; color:#4B1F7A; display:block; }
        .awene-sf-stat-label { font-size:11px; color:#8b7fa0; display:block; margin-top:2px; }
        .awene-sf-btn-view { display:inline-flex; align-items:center; gap:6px; background:#4B1F7A; color:#fff; text-decoration:none; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:600; margin-right:8px; }
        .awene-sf-btn-view:hover { background:#6d2ea8; color:#fff; }
        .awene-sf-btn-export { display:inline-flex; align-items:center; gap:6px; background:#f5f0fb; color:#4B1F7A; text-decoration:none; border:1.5px solid #d8d0e8; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:600; }
        .awene-sf-btn-export:hover { background:#ede8f8; }
        .awene-sf-no-responses { text-align:center; padding:24px 16px; color:#8b7fa0; border:2px dashed #e5e0f0; border-radius:10px; font-size:13px; }
        .awene-sf-q-count { margin-left:auto; font-size:12px; color:#8b7fa0; }

        @media (max-width:782px) {
            .awene-sf-two-col,.awene-sf-stats-grid { grid-template-columns:1fr; }
            .awene-sf-q-row { grid-template-columns:1fr; }
        }
        </style>

        <div class="awene-sf-builder">

        <!-- ── Card 1: Linked Event ── -->
        <div class="awene-sf-card">
            <div class="awene-sf-card-header">
                <div class="awene-sf-card-icon purple">📅</div>
                <div>
                    <p class="awene-sf-card-title">Linked Event</p>
                    <p class="awene-sf-card-subtitle">Connect this form to a specific event</p>
                </div>
            </div>
            <div class="awene-sf-field">
                <label class="awene-sf-label" for="awene_satisfaction_event_id">Event</label>
                <select id="awene_satisfaction_event_id" name="awene_satisfaction_meta[event_id]" class="awene-sf-select" onchange="aweneSfUpdateEventSummary(this)">
                    <option value="">— Select an event —</option>
                    <?php foreach ($all_events as $ev) :
                        $ev_date = (string) get_post_meta($ev->ID, self::EVENT_META_FIELDS['start_date'], true);
                        $ev_loc  = trim(implode(', ', array_filter([(string) get_post_meta($ev->ID, self::EVENT_META_FIELDS['location_name'], true), (string) get_post_meta($ev->ID, self::EVENT_META_FIELDS['location_address'], true)])));
                        $ev_stat = (string) get_post_meta($ev->ID, self::EVENT_META_FIELDS['event_status'], true);
                        $ev_reg  = self::registration_count_for_event($ev->ID);
                    ?>
                        <option value="<?php echo esc_attr((string) $ev->ID); ?>"
                            data-date="<?php echo esc_attr($ev_date); ?>"
                            data-location="<?php echo esc_attr($ev_loc); ?>"
                            data-status="<?php echo esc_attr($ev_stat ?: 'upcoming'); ?>"
                            data-reg="<?php echo esc_attr((string) $ev_reg); ?>"
                            <?php selected($linked_event_id, $ev->ID); ?>
                        ><?php echo esc_html($ev->post_title); ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="awene-sf-event-summary <?php echo $linked_event ? 'visible' : ''; ?>" id="awene_sf_event_summary">
                <?php if ($linked_event) : ?>
                    <div class="awene-sf-event-title"><?php echo esc_html($linked_event['title']); ?></div>
                    <div class="awene-sf-event-chips">
                        <span class="awene-sf-event-chip">📅 <?php echo esc_html($linked_event['date_label']); ?></span>
                        <span class="awene-sf-event-chip">📍 <?php echo esc_html($linked_event['locationLabel'] ?: 'TBC'); ?></span>
                        <span class="awene-sf-event-chip">🔖 <?php echo esc_html(ucfirst($linked_event['eventStatus'])); ?></span>
                        <span class="awene-sf-event-chip">👥 <?php echo esc_html((string) self::registration_count_for_event($linked_event_id)); ?> registrations</span>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- ── Card 2: Form Settings ── -->
        <div class="awene-sf-card">
            <div class="awene-sf-card-header">
                <div class="awene-sf-card-icon green">⚙️</div>
                <div>
                    <p class="awene-sf-card-title">Form Settings</p>
                    <p class="awene-sf-card-subtitle">Behaviour, language and messages</p>
                </div>
                <div style="margin-left:auto;">
                    <span class="awene-sf-status-badge <?php echo $active ? 'active' : 'inactive'; ?>" id="awene_sf_active_badge">
                        <span class="awene-sf-status-dot"></span>
                        <?php echo $active ? 'Active' : 'Inactive'; ?>
                    </span>
                </div>
            </div>

            <div class="awene-sf-toggle-group">
                <div class="awene-sf-toggle-row">
                    <div class="awene-sf-toggle-info">
                        <span class="awene-sf-toggle-label">Form active</span>
                        <span class="awene-sf-toggle-desc">Allow participants to submit responses</span>
                    </div>
                    <label class="awene-sf-switch">
                        <input type="checkbox" name="awene_satisfaction_meta[active]" value="1" <?php checked($active); ?> onchange="aweneSfUpdateActiveBadge(this.checked)">
                        <span class="awene-sf-slider"></span>
                    </label>
                </div>
                <div class="awene-sf-toggle-row">
                    <div class="awene-sf-toggle-info">
                        <span class="awene-sf-toggle-label">Allow anonymous responses</span>
                        <span class="awene-sf-toggle-desc">Participants can respond without providing their email</span>
                    </div>
                    <label class="awene-sf-switch">
                        <input type="checkbox" name="awene_satisfaction_meta[anonymous_allowed]" value="1" <?php checked($anon); ?>>
                        <span class="awene-sf-slider"></span>
                    </label>
                </div>
                <div class="awene-sf-toggle-row">
                    <div class="awene-sf-toggle-info">
                        <span class="awene-sf-toggle-label">Require email</span>
                        <span class="awene-sf-toggle-desc">Email address is mandatory to submit</span>
                    </div>
                    <label class="awene-sf-switch">
                        <input type="checkbox" id="awene_sf_require_email" name="awene_satisfaction_meta[require_email]" value="1" <?php checked($req_email); ?>>
                        <span class="awene-sf-slider"></span>
                    </label>
                </div>
            </div>

            <div class="awene-sf-field">
                <label class="awene-sf-label" for="awene_sf_language">Language</label>
                <select id="awene_sf_language" name="awene_satisfaction_meta[language]" class="awene-sf-select" style="max-width:220px;">
                    <option value="fr" <?php selected($language, 'fr'); ?>>🇫🇷 Français</option>
                    <option value="en" <?php selected($language, 'en'); ?>>🇬🇧 English</option>
                    <option value="ar" <?php selected($language, 'ar'); ?>>🇹🇳 العربية</option>
                </select>
            </div>

            <div class="awene-sf-field">
                <label class="awene-sf-label" for="awene_sf_intro">Intro text</label>
                <textarea id="awene_sf_intro" name="awene_satisfaction_meta[intro_text]" class="awene-sf-textarea" rows="3" placeholder="e.g. We'd love your feedback — it only takes 2 minutes."><?php echo esc_textarea((string) $values['intro_text']); ?></textarea>
                <span class="awene-sf-helper">Shown at the top of the form, before the questions.</span>
            </div>

            <div class="awene-sf-field">
                <label class="awene-sf-label" for="awene_sf_thankyou">Thank you message</label>
                <textarea id="awene_sf_thankyou" name="awene_satisfaction_meta[thank_you_message]" class="awene-sf-textarea" rows="3" placeholder="e.g. Thank you! Your feedback helps us improve our events."><?php echo esc_textarea((string) $values['thank_you_message']); ?></textarea>
                <span class="awene-sf-helper">Displayed on screen after the participant submits.</span>
            </div>
        </div>

        <!-- ── Card 3: Questions Builder ── -->
        <div class="awene-sf-card">
            <div class="awene-sf-card-header">
                <div class="awene-sf-card-icon blue">❓</div>
                <div>
                    <p class="awene-sf-card-title">Questions Builder</p>
                    <p class="awene-sf-card-subtitle">Drag to reorder &bull; Click ✕ to remove</p>
                </div>
                <span class="awene-sf-q-count" id="awene_sf_q_count_label"><?php echo esc_html(count($questions_data) . ' question' . (count($questions_data) !== 1 ? 's' : '')); ?></span>
            </div>

            <div class="awene-sf-questions-list" id="awene_sf_questions_list">
                <?php if (empty($questions_data)) : ?>
                    <div class="awene-sf-empty" id="awene_sf_empty_state">
                        <div class="awene-sf-empty-icon">📋</div>
                        <div>No questions yet.<br>Click <strong>+ Add question</strong> below to start.</div>
                    </div>
                <?php else : ?>
                    <?php foreach ($questions_data as $qi => $q) : self::render_question_card_html((int) $qi, $q); endforeach; ?>
                <?php endif; ?>
            </div>

            <input type="hidden" id="awene_questions_json" name="awene_satisfaction_meta[questions]" value="<?php echo esc_attr($questions_json); ?>" />

            <button type="button" class="awene-sf-add-q-btn" onclick="aweneSfAddQuestion()">
                <span style="font-size:19px;line-height:1;">+</span> Add question
            </button>
        </div>

        <!-- ── Card 4: Resource After Submission ── -->
        <div class="awene-sf-card">
            <div class="awene-sf-card-header">
                <div class="awene-sf-card-icon orange">📎</div>
                <div>
                    <p class="awene-sf-card-title">Resource After Submission</p>
                    <p class="awene-sf-card-subtitle">Optionally send a PDF to participants after they respond</p>
                </div>
            </div>
            <div class="awene-sf-field">
                <label class="awene-sf-label">PDF after submission</label>
                <div class="awene-sf-pdf-preview" id="awene_sf_pdf_preview" style="<?php echo $pdf_sub_url ? '' : 'display:none;'; ?>">
                    <span class="awene-sf-pdf-icon">📄</span>
                    <span class="awene-sf-pdf-name" id="awene_sf_pdf_name"><?php echo esc_html($pdf_sub_name ?: basename((string) parse_url($pdf_sub_url, PHP_URL_PATH))); ?></span>
                    <?php if ($pdf_sub_url) : ?><a href="<?php echo esc_url($pdf_sub_url); ?>" target="_blank" rel="noopener" style="font-size:11px;color:#7c3aed;text-decoration:none;margin-right:8px;">Preview ↗</a><?php endif; ?>
                    <button type="button" class="awene-sf-pdf-remove" onclick="aweneSfClearPdf()">Remove</button>
                </div>
                <input type="hidden" id="awene_sf_pdf_attachment_id" name="awene_satisfaction_meta[pdf_attachment_id]" value="<?php echo esc_attr((string) $pdf_att_id ?: ''); ?>" />
                <input type="hidden" id="awene_sat_pdf_url" name="awene_satisfaction_meta[pdf_after_submission_url]" value="<?php echo esc_attr($pdf_sub_url); ?>" />
                <button type="button" class="awene-sf-choose-pdf" onclick="aweneSfOpenPdfPicker()">📎 Choose PDF</button>
                <span class="awene-sf-helper">The PDF will be emailed to the participant after they submit. A valid email address is required.</span>
            </div>
            <div class="awene-sf-pdf-warning<?php echo $pdf_sub_url ? ' visible' : ''; ?>" id="awene_sf_pdf_warning">
                ⚠️ <strong>Email required:</strong> A PDF is attached — participants must provide their email. "Require email" will be enforced automatically.
            </div>
        </div>

        <!-- ── Card 5: Responses ── -->
        <div class="awene-sf-card">
            <div class="awene-sf-card-header">
                <div class="awene-sf-card-icon teal">📊</div>
                <div>
                    <p class="awene-sf-card-title">Responses</p>
                    <p class="awene-sf-card-subtitle">Review and export participant feedback</p>
                </div>
            </div>
            <?php if ($response_count > 0) : ?>
                <div class="awene-sf-stats-grid">
                    <div class="awene-sf-stat">
                        <span class="awene-sf-stat-value"><?php echo esc_html((string) $response_count); ?></span>
                        <span class="awene-sf-stat-label">Total responses</span>
                    </div>
                    <div class="awene-sf-stat">
                        <span class="awene-sf-stat-value"><?php echo esc_html((string) count($questions_data)); ?></span>
                        <span class="awene-sf-stat-label">Questions</span>
                    </div>
                    <div class="awene-sf-stat">
                        <span class="awene-sf-stat-value" style="font-size:13px;padding-top:5px;"><?php echo esc_html($last_response_date ?: '—'); ?></span>
                        <span class="awene-sf-stat-label">Last response</span>
                    </div>
                </div>
                <div>
                    <a href="<?php echo esc_url(admin_url('edit.php?post_type=' . self::SATISFACTION_RESPONSE_POST_TYPE)); ?>" class="awene-sf-btn-view">👁 View responses</a>
                    <?php $export_url = wp_nonce_url(admin_url('admin-post.php?action=awene_events_export_satisfaction&form_id=' . $post->ID), 'awene_events_export_satisfaction'); ?>
                    <a href="<?php echo esc_url($export_url); ?>" class="awene-sf-btn-export">↓ Export CSV</a>
                </div>
            <?php else : ?>
                <div class="awene-sf-no-responses">
                    <div style="font-size:30px;margin-bottom:8px;">📭</div>
                    No responses yet. Share the form link with participants after the event.
                </div>
            <?php endif; ?>
        </div>

        </div><!-- /.awene-sf-builder -->

        <script>
        (function($) {
            var Q_TYPES = [
                { value:'rating_5',        label:'⭐ Rating 1–5' },
                { value:'rating_10',       label:'⭐ Rating 1–10' },
                { value:'yes_no',          label:'✅ Yes / No' },
                { value:'text',            label:'💬 Short text' },
                { value:'textarea',        label:'📝 Long text' },
                { value:'multiple_choice', label:'🔘 Multiple choice' },
                { value:'checkbox',        label:'☑️ Checkboxes' },
                { value:'email',           label:'📧 Email' },
                { value:'nps',             label:'📈 NPS 0–10' },
            ];
            var HAS_OPTIONS = ['multiple_choice', 'checkbox'];

            function escH(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
            window.escH = escH;

            function typeLabel(val) {
                for (var i = 0; i < Q_TYPES.length; i++) { if (Q_TYPES[i].value === val) return Q_TYPES[i].label; }
                return val;
            }

            function buildTypeDropdown(sel) {
                var html = '<select class="awene-sf-type-select awene-sf-q-type-sel" onchange="aweneSfOnTypeChange(this)">';
                Q_TYPES.forEach(function(t) {
                    html += '<option value="' + t.value + '"' + (t.value === sel ? ' selected' : '') + '>' + escH(t.label) + '</option>';
                });
                return html + '</select>';
            }

            function buildOptionsEditor(opts, type) {
                var vis = HAS_OPTIONS.indexOf(type) !== -1;
                var html = '<div class="awene-sf-options-editor' + (vis ? ' visible' : '') + '">';
                html += '<span class="awene-sf-q-sublabel" style="display:block;margin-bottom:8px;">Choices</span>';
                var list = (opts && opts.length) ? opts : ['', ''];
                list.forEach(function(o) {
                    html += '<div class="awene-sf-option-row">'
                        + '<input type="text" class="awene-sf-option-input" value="' + escH(o) + '" placeholder="Option…" onchange="aweneSfSyncQuestions()" oninput="aweneSfSyncQuestions()" />'
                        + '<button type="button" class="awene-sf-opt-remove" onclick="aweneSfRemoveOption(this)">&#215;</button>'
                        + '</div>';
                });
                return html + '<button type="button" class="awene-sf-btn-add-option" onclick="aweneSfAddOption(this)">+ Add option</button></div>';
            }

            window.aweneSfBuildCard = function(idx, q) {
                var type = q.type || 'rating_5';
                var req  = q.required || false;
                var opts = q.options  || [];
                return '<div class="awene-sf-question-card" data-index="' + idx + '">'
                    + '<div class="awene-sf-q-header">'
                    + '<span class="awene-sf-drag-handle">⠿</span>'
                    + '<span class="awene-sf-q-num">' + (idx + 1) + '</span>'
                    + '<span class="awene-sf-q-type-badge">' + escH(typeLabel(type)) + '</span>'
                    + (req ? '<span class="awene-sf-q-required-badge">Required</span>' : '')
                    + '<button type="button" class="awene-sf-q-remove" onclick="aweneSfRemoveQuestion(this)" title="Remove">&#215;</button>'
                    + '</div>'
                    + '<div class="awene-sf-q-body">'
                    + '<div class="awene-sf-q-row">'
                    + '<div><span class="awene-sf-q-sublabel">Question</span><input type="text" class="awene-sf-input awene-sf-q-text" value="' + escH(q.question || '') + '" placeholder="Type your question here…" oninput="aweneSfSyncQuestions()" /></div>'
                    + '<div><span class="awene-sf-q-sublabel">Type</span>' + buildTypeDropdown(type) + '</div>'
                    + '<div><span class="awene-sf-q-sublabel">Required</span><label class="awene-sf-req-toggle"><input type="checkbox" class="awene-sf-q-required"' + (req ? ' checked' : '') + ' onchange="aweneSfSyncQuestions();aweneSfUpdateRequiredBadge(this);" /> <span>Required</span></label></div>'
                    + '</div>'
                    + buildOptionsEditor(opts, type)
                    + '</div></div>';
            };

            window.aweneSfAddQuestion = function() {
                var list = document.getElementById('awene_sf_questions_list');
                var empty = document.getElementById('awene_sf_empty_state');
                if (empty) empty.remove();
                var idx = list.querySelectorAll('.awene-sf-question-card').length;
                list.insertAdjacentHTML('beforeend', aweneSfBuildCard(idx, { type:'rating_5', question:'', required:false, options:[] }));
                aweneSfSyncQuestions();
                aweneSfRenumber();
                aweneSfCountLabel();
                initSortable();
                var cards = list.querySelectorAll('.awene-sf-question-card');
                var last  = cards[cards.length - 1];
                if (last) { var inp = last.querySelector('.awene-sf-q-text'); if (inp) setTimeout(function() { inp.focus(); }, 80); }
            };

            window.aweneSfRemoveQuestion = function(btn) {
                var card = btn.closest('.awene-sf-question-card');
                if (card) card.remove();
                aweneSfSyncQuestions();
                aweneSfRenumber();
                aweneSfCountLabel();
                var list = document.getElementById('awene_sf_questions_list');
                if (!list.querySelector('.awene-sf-question-card')) {
                    list.innerHTML = '<div class="awene-sf-empty" id="awene_sf_empty_state"><div class="awene-sf-empty-icon">📋</div><div>No questions yet.<br>Click <strong>+ Add question</strong> below to start.</div></div>';
                }
            };

            window.aweneSfOnTypeChange = function(sel) {
                var type = sel.value;
                var card = sel.closest('.awene-sf-question-card');
                if (!card) return;
                var oe = card.querySelector('.awene-sf-options-editor');
                if (oe) { HAS_OPTIONS.indexOf(type) !== -1 ? oe.classList.add('visible') : oe.classList.remove('visible'); }
                var badge = card.querySelector('.awene-sf-q-type-badge');
                if (badge) badge.textContent = typeLabel(type);
                aweneSfSyncQuestions();
            };

            window.aweneSfUpdateRequiredBadge = function(cb) {
                var card = cb.closest('.awene-sf-question-card');
                if (!card) return;
                var header = card.querySelector('.awene-sf-q-header');
                var existing = header.querySelector('.awene-sf-q-required-badge');
                if (cb.checked && !existing) {
                    var badge = document.createElement('span');
                    badge.className = 'awene-sf-q-required-badge';
                    badge.textContent = 'Required';
                    header.insertBefore(badge, header.querySelector('.awene-sf-q-remove'));
                } else if (!cb.checked && existing) {
                    existing.remove();
                }
            };

            window.aweneSfAddOption = function(btn) {
                var editor = btn.closest('.awene-sf-options-editor');
                var row = document.createElement('div');
                row.className = 'awene-sf-option-row';
                row.innerHTML = '<input type="text" class="awene-sf-option-input" value="" placeholder="Option…" onchange="aweneSfSyncQuestions()" oninput="aweneSfSyncQuestions()" />'
                    + '<button type="button" class="awene-sf-opt-remove" onclick="aweneSfRemoveOption(this)">&#215;</button>';
                editor.insertBefore(row, btn);
                row.querySelector('input').focus();
            };

            window.aweneSfRemoveOption = function(btn) {
                var row = btn.closest('.awene-sf-option-row');
                if (row) row.remove();
                aweneSfSyncQuestions();
            };

            window.aweneSfSyncQuestions = function() {
                var cards = document.querySelectorAll('#awene_sf_questions_list .awene-sf-question-card');
                var questions = [];
                cards.forEach(function(card) {
                    var typeEl = card.querySelector('.awene-sf-q-type-sel');
                    var textEl = card.querySelector('.awene-sf-q-text');
                    var reqEl  = card.querySelector('.awene-sf-q-required');
                    var type   = typeEl ? typeEl.value : 'rating_5';
                    var optEls = card.querySelectorAll('.awene-sf-option-input');
                    var opts   = [];
                    optEls.forEach(function(el) { if (el.value.trim()) opts.push(el.value.trim()); });
                    questions.push({ type:type, question:textEl ? textEl.value : '', required:reqEl ? reqEl.checked : false, options:opts });
                });
                document.getElementById('awene_questions_json').value = JSON.stringify(questions);
            };

            window.aweneSfRenumber = function() {
                document.querySelectorAll('#awene_sf_questions_list .awene-sf-question-card').forEach(function(card, i) {
                    var num = card.querySelector('.awene-sf-q-num');
                    if (num) num.textContent = i + 1;
                    card.dataset.index = i;
                });
            };

            window.aweneSfCountLabel = function() {
                var count = document.querySelectorAll('#awene_sf_questions_list .awene-sf-question-card').length;
                var el = document.getElementById('awene_sf_q_count_label');
                if (el) el.textContent = count + ' question' + (count !== 1 ? 's' : '');
            };

            window.aweneSfUpdateActiveBadge = function(checked) {
                var badge = document.getElementById('awene_sf_active_badge');
                if (!badge) return;
                badge.className = 'awene-sf-status-badge ' + (checked ? 'active' : 'inactive');
                badge.innerHTML = '<span class="awene-sf-status-dot"></span>' + (checked ? 'Active' : 'Inactive');
            };

            window.aweneSfUpdateEventSummary = function(sel) {
                var opt = sel.options[sel.selectedIndex];
                var summary = document.getElementById('awene_sf_event_summary');
                if (!sel.value || !opt) { summary.classList.remove('visible'); summary.innerHTML = ''; return; }
                summary.innerHTML = '<div class="awene-sf-event-title">' + escH(opt.text) + '</div>'
                    + '<div class="awene-sf-event-chips">'
                    + '<span class="awene-sf-event-chip">📅 ' + escH(opt.dataset.date || '—') + '</span>'
                    + '<span class="awene-sf-event-chip">📍 ' + escH(opt.dataset.location || 'TBC') + '</span>'
                    + '<span class="awene-sf-event-chip">🔖 ' + escH(opt.dataset.status || '—') + '</span>'
                    + '<span class="awene-sf-event-chip">👥 ' + escH(opt.dataset.reg || '0') + ' registrations</span>'
                    + '</div>';
                summary.classList.add('visible');
            };

            window.aweneSfOpenPdfPicker = function() {
                var frame = wp.media({ title:'Select PDF', multiple:false, library:{ type:'application/pdf' } });
                frame.on('select', function() {
                    var a = frame.state().get('selection').first().toJSON();
                    document.getElementById('awene_sf_pdf_attachment_id').value = a.id;
                    document.getElementById('awene_sat_pdf_url').value = a.url;
                    document.getElementById('awene_sf_pdf_name').textContent = a.filename || a.url.split('/').pop();
                    document.getElementById('awene_sf_pdf_preview').style.display = 'flex';
                    document.getElementById('awene_sf_pdf_warning').classList.add('visible');
                    document.getElementById('awene_sf_require_email').checked = true;
                });
                frame.open();
            };

            window.aweneSfClearPdf = function() {
                document.getElementById('awene_sf_pdf_attachment_id').value = '';
                document.getElementById('awene_sat_pdf_url').value = '';
                document.getElementById('awene_sf_pdf_preview').style.display = 'none';
                document.getElementById('awene_sf_pdf_warning').classList.remove('visible');
            };

            function initSortable() {
                $('#awene_sf_questions_list').sortable({
                    handle: '.awene-sf-q-header',
                    placeholder: 'awene-sf-question-card sortable-placeholder',
                    tolerance: 'pointer',
                    update: function() { aweneSfSyncQuestions(); aweneSfRenumber(); }
                }).disableSelection();
            }

            $(function() {
                var form = document.querySelector('#post');
                if (form) form.addEventListener('submit', aweneSfSyncQuestions);
                var listEl = document.getElementById('awene_sf_questions_list');
                if (listEl) {
                    listEl.addEventListener('change', aweneSfSyncQuestions);
                    listEl.addEventListener('input', aweneSfSyncQuestions);
                }
                initSortable();
            });
        })(jQuery);
        </script>
        <?php
    }

    public static function render_brevo_notification_box(WP_Post $post): void
    {
        $settings = self::brevo_settings();
        $api_key = self::brevo_api_key();
        $language = self::notification_language_for_post($post);
        $public_url = self::public_url_for_post($post, $language, $settings);
        $can_send = current_user_can('manage_options') && $api_key && !empty($settings['enabled']) && $post->post_status === 'publish' && $public_url && get_the_title($post->ID) && $language;
        $history = self::notification_history($post->ID);
        $defaults = self::notification_defaults($post, $language, $public_url);
        $list_id = self::default_list_id_for_language($language, $settings);
        ?>
        <p>
            <?php if ($api_key) : ?>
                <strong>Brevo API key detected from environment.</strong>
            <?php else : ?>
                <strong style="color:#b32d2e;">Brevo API key is missing from environment variables.</strong>
            <?php endif; ?>
        </p>
        <?php if (!$can_send) : ?>
            <p style="color:#646970;">
                <?php echo !$api_key
                    ? esc_html('Brevo API key is missing from environment variables.')
                    : ($post->post_status !== 'publish'
                        ? esc_html('Publiez ce contenu avant d’informer votre liste.')
                        : esc_html('Brevo notifications are disabled or this content has no public URL.')); ?>
            </p>
        <?php endif; ?>
        <?php if ($history) : $last = end($history); ?>
            <p style="color:#646970;">
                <?php echo esc_html('Last notification: ' . ($last['status'] ?? '') . ' | Campaign ' . ($last['campaign_id'] ?? '-') . ' | ' . ($last['sent_at'] ?? '')); ?>
            </p>
            <p style="color:#b32d2e;"><?php echo esc_html('Une notification a déjà été envoyée pour ce contenu.'); ?></p>
        <?php endif; ?>
        <p><button type="button" class="button" onclick="var panel=this.parentNode.nextElementSibling;panel.style.display=panel.style.display==='none'?'block':'none';"><?php echo esc_html($language === 'en' ? 'Notify your list' : 'Informer votre liste'); ?></button></p>
        <div style="display:none; margin-top:12px;">
            <?php wp_nonce_field(self::BREVO_NOTIFY_NONCE, self::BREVO_NOTIFY_NONCE_NAME); ?>
            <input type="hidden" name="post_id" value="<?php echo esc_attr((string) $post->ID); ?>" />
            <input type="hidden" name="post_type" value="<?php echo esc_attr($post->post_type); ?>" />
            <p><label><?php echo esc_html($language === 'en' ? 'List ID' : 'ID de liste'); ?><br /><input type="text" name="list_id" class="widefat" value="<?php echo esc_attr((string) $list_id); ?>" /></label></p>
            <p><label>Subject<br /><input type="text" name="subject" class="widefat" value="<?php echo esc_attr($defaults['subject']); ?>" /></label></p>
            <p><label>Preview text<br /><input type="text" name="preview_text" class="widefat" value="<?php echo esc_attr($defaults['preview']); ?>" /></label></p>
            <p><label>Intro text<br /><textarea name="intro_text" class="widefat" rows="4"><?php echo esc_textarea($defaults['intro']); ?></textarea></label></p>
            <p><label>CTA label<br /><input type="text" name="cta_label" class="widefat" value="<?php echo esc_attr($defaults['cta']); ?>" /></label></p>
            <p><label>Public page link<br /><input type="url" name="public_url" class="widefat" value="<?php echo esc_attr((string) $public_url); ?>" /></label></p>
            <p>
                <button
                    type="submit"
                    name="action"
                    value="awene_events_send_brevo_campaign"
                    class="button button-primary"
                    formaction="<?php echo esc_url(admin_url('admin-post.php')); ?>"
                    formmethod="post"
                    formnovalidate
                    <?php disabled(!$can_send); ?>
                ><?php echo esc_html($language === 'en' ? 'Send now' : 'Envoyer maintenant'); ?></button>
            </p>
        </div>
        <?php
    }

    public static function save_event_meta(int $post_id): void
    {
        if (
            !isset($_POST[self::EVENT_NONCE_NAME]) ||
            !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[self::EVENT_NONCE_NAME])), self::EVENT_NONCE_ACTION) ||
            (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) ||
            !current_user_can('edit_post', $post_id)
        ) {
            return;
        }

        $input = isset($_POST['awene_event_meta']) && is_array($_POST['awene_event_meta'])
            ? wp_unslash($_POST['awene_event_meta'])
            : [];

        foreach (self::EVENT_META_FIELDS as $field => $meta_key) {
            $value = $input[$field] ?? '';
            if ($field === 'featured') {
                $value = !empty($input[$field]);
            }
            update_post_meta($post_id, $meta_key, self::sanitize_event_value($field, $value));
        }

        $derived_status = self::normalized_event_status(
            (string) get_post_meta($post_id, self::EVENT_META_FIELDS['event_status'], true),
            (string) get_post_meta($post_id, self::EVENT_META_FIELDS['start_date'], true)
        );
        update_post_meta($post_id, self::EVENT_META_FIELDS['event_status'], $derived_status);

        self::sync_event_capacity($post_id);
    }

    public static function save_registration_meta(int $post_id): void
    {
        if (
            !isset($_POST[self::REGISTRATION_NONCE_NAME]) ||
            !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[self::REGISTRATION_NONCE_NAME])), self::REGISTRATION_NONCE_ACTION) ||
            (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) ||
            !current_user_can('edit_post', $post_id)
        ) {
            return;
        }

        $input = isset($_POST['awene_registration_meta']) && is_array($_POST['awene_registration_meta'])
            ? wp_unslash($_POST['awene_registration_meta'])
            : [];

        foreach (self::REGISTRATION_META_FIELDS as $field => $meta_key) {
            $value = $input[$field] ?? '';
            if ($field === 'consent') {
                $value = !empty($input[$field]);
            }
            update_post_meta($post_id, $meta_key, self::sanitize_registration_value($field, $value));
        }

        $title = trim(sprintf(
            '%s %s | %s | %s',
            get_post_meta($post_id, self::REGISTRATION_META_FIELDS['first_name'], true),
            get_post_meta($post_id, self::REGISTRATION_META_FIELDS['last_name'], true),
            get_post_meta($post_id, self::REGISTRATION_META_FIELDS['email'], true),
            get_post_meta($post_id, self::REGISTRATION_META_FIELDS['event_title'], true)
        ));

        remove_action('save_post_' . self::REGISTRATION_POST_TYPE, [self::class, 'save_registration_meta']);
        wp_update_post([
            'ID' => $post_id,
            'post_title' => $title ?: 'Registration',
        ]);
        add_action('save_post_' . self::REGISTRATION_POST_TYPE, [self::class, 'save_registration_meta']);

        $event_id = absint(get_post_meta($post_id, self::REGISTRATION_META_FIELDS['event_id'], true));
        if ($event_id > 0) {
            self::sync_event_capacity($event_id);
        }
    }

    public static function save_pv_meta(int $post_id): void
    {
        if (
            !isset($_POST[self::EVENT_NONCE_NAME]) ||
            !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[self::EVENT_NONCE_NAME])), self::EVENT_NONCE_ACTION) ||
            (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) ||
            !current_user_can('edit_post', $post_id)
        ) {
            return;
        }

        $input = isset($_POST['awene_event_pv_meta']) && is_array($_POST['awene_event_pv_meta'])
            ? wp_unslash($_POST['awene_event_pv_meta'])
            : [];

        foreach (self::PV_META_FIELDS as $field => $meta_key) {
            $value = $input[$field] ?? '';
            if ($field === 'pdf_is_public') {
                $value = !empty($input[$field]);
            }
            update_post_meta($post_id, $meta_key, self::sanitize_pv_value($field, $value));
        }

        // Save gallery_ids (comma-separated attachment IDs)
        $gallery_ids = isset($input['gallery_ids']) ? sanitize_text_field((string) $input['gallery_ids']) : '';
        update_post_meta($post_id, '_awene_event_pv_gallery_ids', $gallery_ids);
    }

    public static function save_satisfaction_meta(int $post_id): void
    {
        if (
            !isset($_POST[self::EVENT_NONCE_NAME]) ||
            !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[self::EVENT_NONCE_NAME])), self::EVENT_NONCE_ACTION) ||
            (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) ||
            !current_user_can('edit_post', $post_id)
        ) {
            return;
        }

        $input = isset($_POST['awene_satisfaction_meta']) && is_array($_POST['awene_satisfaction_meta'])
            ? wp_unslash($_POST['awene_satisfaction_meta'])
            : [];

        foreach (self::SATISFACTION_META_FIELDS as $field => $meta_key) {
            $value = $input[$field] ?? '';
            if (in_array($field, ['active', 'anonymous_allowed', 'require_email'], true)) {
                $value = !empty($input[$field]);
            }
            update_post_meta($post_id, $meta_key, self::sanitize_satisfaction_value($field, $value));
        }
    }

    public static function register_rest_fields(): void
    {
        register_rest_field(self::EVENT_POST_TYPE, 'awene_event', [
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
                'per_page' => ['default' => 20, 'sanitize_callback' => 'absint'],
                'status' => ['sanitize_callback' => 'sanitize_text_field'],
                'type' => ['sanitize_callback' => 'sanitize_text_field'],
                'language' => ['sanitize_callback' => 'sanitize_text_field'],
            ],
            'callback' => [self::class, 'rest_events'],
        ]);

        register_rest_route('awene/v1', '/events/(?P<id>\d+)', [
            'methods' => WP_REST_Server::READABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'rest_event'],
        ]);

        register_rest_route('awene/v1', '/registrations', [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'permission_callback' => '__return_true',
                'callback' => [self::class, 'create_registration'],
            ],
            [
                'methods' => WP_REST_Server::READABLE,
                'permission_callback' => static function () {
                    return current_user_can('edit_posts');
                },
                'args' => [
                    'per_page' => ['default' => 50, 'sanitize_callback' => 'absint'],
                    'status' => ['sanitize_callback' => 'sanitize_text_field'],
                    'event_id' => ['sanitize_callback' => 'absint'],
                ],
                'callback' => [self::class, 'rest_registrations'],
            ],
        ]);

        register_rest_route('awene/v1', '/events-pv', [
            'methods' => WP_REST_Server::READABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'rest_events_pv'],
        ]);

        register_rest_route('awene/v1', '/events-pv/(?P<eventId>\d+)', [
            'methods' => WP_REST_Server::READABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'rest_event_pv'],
        ]);

        register_rest_route('awene/v1', '/satisfaction/(?P<eventId>\d+)', [
            'methods' => WP_REST_Server::READABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'rest_satisfaction_form'],
        ]);

        register_rest_route('awene/v1', '/satisfaction/(?P<eventId>\d+)/submit', [
            'methods' => WP_REST_Server::CREATABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'submit_satisfaction'],
        ]);
    }

    public static function rest_events(WP_REST_Request $request): WP_REST_Response
    {
        $tax_query = [];
        $type_filter = sanitize_text_field((string) $request->get_param('type'));
        if ($type_filter !== '') {
            $tax_query[] = [
                'taxonomy' => self::TAXONOMY,
                'field' => is_numeric($type_filter) ? 'term_id' : 'slug',
                'terms' => is_numeric($type_filter) ? absint($type_filter) : sanitize_title($type_filter),
            ];
        }

        $query = new WP_Query([
            'post_type' => self::EVENT_POST_TYPE,
            'post_status' => 'publish',
            'posts_per_page' => min(100, max(1, (int) $request->get_param('per_page'))),
            'meta_key' => self::EVENT_META_FIELDS['start_date'],
            'orderby' => 'meta_value',
            'order' => 'ASC',
            'tax_query' => $tax_query,
        ]);

        $status_filter = sanitize_text_field((string) $request->get_param('status'));
        $language_filter = sanitize_text_field((string) $request->get_param('language'));

        $events = [];
        foreach ($query->posts as $post) {
            $payload = self::event_payload($post->ID);
            if ($status_filter !== '' && $payload['eventStatus'] !== $status_filter) {
                continue;
            }
            if ($language_filter !== '' && $payload['language'] !== $language_filter) {
                continue;
            }
            $events[] = $payload;
        }

        return rest_ensure_response($events);
    }

    public static function rest_event(WP_REST_Request $request)
    {
        $post_id = absint($request->get_param('id'));
        $post = get_post($post_id);

        if (!$post || $post->post_type !== self::EVENT_POST_TYPE || $post->post_status !== 'publish') {
            return new WP_Error('awene_event_not_found', 'Event not found.', ['status' => 404]);
        }

        return rest_ensure_response(self::event_payload($post_id));
    }

    public static function create_registration(WP_REST_Request $request)
    {
        $body = $request->get_json_params();
        $event_id = absint($body['eventId'] ?? 0);
        $first_name = sanitize_text_field((string) ($body['firstName'] ?? ''));
        $last_name = sanitize_text_field((string) ($body['lastName'] ?? ''));
        $email = sanitize_email((string) ($body['email'] ?? ''));
        $phone = sanitize_text_field((string) ($body['phone'] ?? ''));
        $message = sanitize_textarea_field((string) ($body['message'] ?? ''));
        $consent = !empty($body['consent']);
        $language = sanitize_text_field((string) ($body['language'] ?? 'fr'));
        $honeypot = sanitize_text_field((string) ($body['website'] ?? ''));

        if ($honeypot !== '') {
            return new WP_REST_Response(['message' => 'Spam rejected.'], 400);
        }

        if ($event_id < 1 || !$first_name || !$last_name || !$email || !$consent) {
            return new WP_REST_Response(['message' => 'Missing required fields.'], 400);
        }

        if (!is_email($email)) {
            return new WP_REST_Response(['message' => 'Invalid email address.'], 400);
        }

        $event_post = get_post($event_id);
        if (!$event_post || $event_post->post_type !== self::EVENT_POST_TYPE || $event_post->post_status !== 'publish') {
            return new WP_REST_Response(['message' => 'Event not found.'], 404);
        }

        $event = self::event_payload($event_id);
        if ($event['eventStatus'] !== 'upcoming') {
            return new WP_REST_Response(['message' => 'This event is no longer open for registration.'], 409);
        }

        if ($event['registrationStatus'] !== 'open') {
            return new WP_REST_Response(['message' => 'Registrations are closed for this event.'], 409);
        }

        $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';
        $rate_key = 'awene_events_' . md5($event_id . '|' . $email . '|' . $ip);
        if (get_transient($rate_key)) {
            return new WP_REST_Response(['message' => 'Please wait before sending another registration.'], 429);
        }
        set_transient($rate_key, 1, self::RATE_LIMIT_SECONDS);

        $registration_id = wp_insert_post([
            'post_type' => self::REGISTRATION_POST_TYPE,
            'post_status' => 'publish',
            'post_title' => trim($first_name . ' ' . $last_name . ' | ' . $email . ' | ' . $event['title']),
        ], true);

        if (is_wp_error($registration_id)) {
            return new WP_REST_Response(['message' => 'The registration could not be saved.'], 500);
        }

        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['event_id'], $event_id);
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['event_title'], $event['title']);
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['first_name'], $first_name);
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['last_name'], $last_name);
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['email'], $email);
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['phone'], $phone);
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['message'], $message);
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['registration_date'], current_time('mysql'));
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['status'], 'confirmed');
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['source'], 'website');
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['consent'], true);
        update_post_meta($registration_id, self::REGISTRATION_META_FIELDS['language'], $language ?: 'fr');

        self::sync_event_capacity($event_id);
        $updated_event = self::event_payload($event_id);

        return new WP_REST_Response([
            'message' => 'Registration saved successfully.',
            'registrationId' => $registration_id,
            'availableSeats' => $updated_event['availableSeats'],
            'registrationStatus' => $updated_event['registrationStatus'],
        ], 201);
    }

    public static function rest_registrations(WP_REST_Request $request): WP_REST_Response
    {
        $meta_query = [];
        $event_id = absint($request->get_param('event_id'));
        $status = sanitize_text_field((string) $request->get_param('status'));

        if ($event_id > 0) {
            $meta_query[] = [
                'key' => self::REGISTRATION_META_FIELDS['event_id'],
                'value' => $event_id,
                'compare' => '=',
            ];
        }

        if ($status !== '') {
            $meta_query[] = [
                'key' => self::REGISTRATION_META_FIELDS['status'],
                'value' => $status,
                'compare' => '=',
            ];
        }

        $query = new WP_Query([
            'post_type' => self::REGISTRATION_POST_TYPE,
            'post_status' => 'publish',
            'posts_per_page' => min(200, max(1, (int) $request->get_param('per_page'))),
            'orderby' => 'date',
            'order' => 'DESC',
            'meta_query' => $meta_query,
        ]);

        return rest_ensure_response(array_map([self::class, 'registration_payload'], $query->posts));
    }

    public static function rest_events_pv(): WP_REST_Response
    {
        $pvs = get_posts([
            'post_type' => self::EVENT_PV_POST_TYPE,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => 'modified',
            'order' => 'DESC',
        ]);

        $payloads = [];
        foreach ($pvs as $pv) {
            $payload = self::pv_payload($pv->ID);
            if ($payload && $payload['eventStatus'] === 'past') {
                $payloads[] = $payload;
            }
        }

        return rest_ensure_response($payloads);
    }

    public static function rest_event_pv(WP_REST_Request $request)
    {
        $event_id = absint($request->get_param('eventId'));
        $pv = self::find_pv_by_event_id($event_id);
        if (!$pv) {
            return new WP_Error('awene_event_pv_not_found', 'Event PV not found.', ['status' => 404]);
        }

        $payload = self::pv_payload($pv->ID);
        if (!$payload || $payload['publicRecapStatus'] !== 'published') {
            return new WP_Error('awene_event_pv_hidden', 'Public recap unavailable.', ['status' => 404]);
        }

        return rest_ensure_response($payload);
    }

    public static function rest_satisfaction_form(WP_REST_Request $request)
    {
        $event_id = absint($request->get_param('eventId'));
        $form = self::find_satisfaction_form_by_event_id($event_id);
        if (!$form) {
            return new WP_Error('awene_satisfaction_not_found', 'Satisfaction form not found.', ['status' => 404]);
        }

        $payload = self::satisfaction_form_payload($form->ID);
        if (!$payload || !$payload['active']) {
            return new WP_Error('awene_satisfaction_inactive', 'Satisfaction form inactive.', ['status' => 404]);
        }

        return rest_ensure_response($payload);
    }

    public static function submit_satisfaction(WP_REST_Request $request)
    {
        $body = $request->get_json_params();
        $event_id = absint($request->get_param('eventId'));
        $form = self::find_satisfaction_form_by_event_id($event_id);
        if (!$form) {
            return new WP_REST_Response(['message' => 'Satisfaction form not found.'], 404);
        }

        $payload = self::satisfaction_form_payload($form->ID);
        if (!$payload['active']) {
            return new WP_REST_Response(['message' => 'Satisfaction form inactive.'], 409);
        }

        $honeypot = sanitize_text_field((string) ($body['website'] ?? ''));
        if ($honeypot !== '') {
            return new WP_REST_Response(['message' => 'Spam rejected.'], 400);
        }

        $email = sanitize_email((string) ($body['email'] ?? ''));
        $consent = !empty($body['consent']);
        if ((!$payload['anonymousAllowed'] || !empty($payload['pdfAfterSubmissionUrl'])) && !is_email($email)) {
            return new WP_REST_Response(['message' => 'Valid email required.'], 400);
        }

        $response_id = wp_insert_post([
            'post_type' => self::SATISFACTION_RESPONSE_POST_TYPE,
            'post_status' => 'publish',
            'post_title' => 'Satisfaction response #' . time() . ' | ' . $event_id,
        ], true);

        if (is_wp_error($response_id)) {
            return new WP_REST_Response(['message' => 'Response could not be saved.'], 500);
        }

        $event = self::event_payload($event_id);
        update_post_meta($response_id, self::SATISFACTION_RESPONSE_META_FIELDS['form_id'], $form->ID);
        update_post_meta($response_id, self::SATISFACTION_RESPONSE_META_FIELDS['event_id'], $event_id);
        update_post_meta($response_id, self::SATISFACTION_RESPONSE_META_FIELDS['event_title'], $event['title']);
        update_post_meta($response_id, self::SATISFACTION_RESPONSE_META_FIELDS['email'], $email);
        update_post_meta($response_id, self::SATISFACTION_RESPONSE_META_FIELDS['answers_json'], wp_json_encode($body['answers'] ?? []));
        update_post_meta($response_id, self::SATISFACTION_RESPONSE_META_FIELDS['submitted_at'], current_time('mysql'));
        update_post_meta($response_id, self::SATISFACTION_RESPONSE_META_FIELDS['consent'], $consent);
        update_post_meta($response_id, self::SATISFACTION_RESPONSE_META_FIELDS['language'], sanitize_text_field((string) ($body['language'] ?? 'fr')));

        $pdf_sent = false;
        if (!empty($payload['pdfAfterSubmissionUrl']) && is_email($email)) {
            $subject = sanitize_text_field((string) (($body['language'] ?? 'fr') === 'fr' ? 'Votre ressource AWENE' : 'Your AWENE Resource'));
            $message = ($body['language'] ?? 'fr') === 'fr'
                ? "Bonjour,\n\nMerci pour votre retour.\nVous trouverez la ressource liée à l’événement ici : " . $payload['pdfAfterSubmissionUrl'] . "\n\nL’équipe AWENE"
                : "Hello,\n\nThank you for your feedback.\nYou will find the resource linked to the event here: " . $payload['pdfAfterSubmissionUrl'] . "\n\nThe AWENE team";
            $pdf_sent = wp_mail($email, $subject, $message);
            if (!$pdf_sent) {
                error_log('AWENE satisfaction email failed for response ' . $response_id);
            }
        }
        update_post_meta($response_id, self::SATISFACTION_RESPONSE_META_FIELDS['pdf_sent_status'], $pdf_sent);

        return new WP_REST_Response([
            'message' => 'Satisfaction response saved.',
            'responseId' => $response_id,
            'pdfSent' => $pdf_sent,
        ], 201);
    }

    public static function event_columns(array $columns): array
    {
        $columns['awene_event_date'] = 'Event date';
        $columns['awene_event_registration_status'] = 'Registration status';
        $columns['awene_event_event_status'] = 'Event status';
        $columns['awene_event_seats'] = 'Remaining seats';
        $columns['awene_event_registrations'] = 'Registrations';
        return $columns;
    }

    public static function event_column_content(string $column, int $post_id): void
    {
        if ($column === 'awene_event_date') {
            echo esc_html(get_post_meta($post_id, self::EVENT_META_FIELDS['start_date'], true) ?: 'Date to be confirmed');
            return;
        }

        if ($column === 'awene_event_registration_status') {
            echo esc_html(get_post_meta($post_id, self::EVENT_META_FIELDS['registration_status'], true) ?: 'open');
            return;
        }

        if ($column === 'awene_event_event_status') {
            echo esc_html(get_post_meta($post_id, self::EVENT_META_FIELDS['event_status'], true) ?: 'upcoming');
            return;
        }

        if ($column === 'awene_event_seats') {
            $available = self::get_available_seats($post_id);
            $capacity = absint(get_post_meta($post_id, self::EVENT_META_FIELDS['capacity'], true));
            echo esc_html($capacity > 0 ? sprintf('%d / %d', $available, $capacity) : 'Unlimited');
            return;
        }

        if ($column === 'awene_event_registrations') {
            echo esc_html((string) self::registration_count_for_event($post_id));
        }
    }

    public static function registration_columns(array $columns): array
    {
        $columns['awene_registration_event'] = 'Event';
        $columns['awene_registration_email'] = 'Email';
        $columns['awene_registration_status'] = 'Status';
        $columns['awene_registration_date'] = 'Registered on';
        return $columns;
    }

    public static function registration_column_content(string $column, int $post_id): void
    {
        if ($column === 'awene_registration_event') {
            echo esc_html((string) get_post_meta($post_id, self::REGISTRATION_META_FIELDS['event_title'], true));
            return;
        }

        if ($column === 'awene_registration_email') {
            echo esc_html((string) get_post_meta($post_id, self::REGISTRATION_META_FIELDS['email'], true));
            return;
        }

        if ($column === 'awene_registration_status') {
            echo esc_html((string) get_post_meta($post_id, self::REGISTRATION_META_FIELDS['status'], true));
            return;
        }

        if ($column === 'awene_registration_date') {
            echo esc_html((string) get_post_meta($post_id, self::REGISTRATION_META_FIELDS['registration_date'], true));
        }
    }

    public static function registration_filters(string $post_type): void
    {
        if ($post_type !== self::REGISTRATION_POST_TYPE) {
            return;
        }

        $selected_event = isset($_GET['awene_event_id']) ? absint($_GET['awene_event_id']) : 0;
        $selected_status = isset($_GET['awene_registration_status']) ? sanitize_text_field(wp_unslash($_GET['awene_registration_status'])) : '';
        $events = get_posts([
            'post_type' => self::EVENT_POST_TYPE,
            'post_status' => ['publish', 'draft'],
            'numberposts' => 200,
            'orderby' => 'title',
            'order' => 'ASC',
        ]);
        ?>
        <select name="awene_event_id">
            <option value="">All events</option>
            <?php foreach ($events as $event) : ?>
                <option value="<?php echo esc_attr((string) $event->ID); ?>" <?php selected($selected_event, $event->ID); ?>>
                    <?php echo esc_html($event->post_title); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <select name="awene_registration_status">
            <option value="">All statuses</option>
            <option value="pending" <?php selected($selected_status, 'pending'); ?>>Pending</option>
            <option value="confirmed" <?php selected($selected_status, 'confirmed'); ?>>Confirmed</option>
            <option value="cancelled" <?php selected($selected_status, 'cancelled'); ?>>Cancelled</option>
        </select>
        <?php
    }

    public static function apply_registration_filters(WP_Query $query): void
    {
        if (!is_admin() || !$query->is_main_query()) {
            return;
        }

        if ($query->get('post_type') !== self::REGISTRATION_POST_TYPE) {
            return;
        }

        $meta_query = (array) $query->get('meta_query');
        if (!empty($_GET['awene_event_id'])) {
            $meta_query[] = [
                'key' => self::REGISTRATION_META_FIELDS['event_id'],
                'value' => absint($_GET['awene_event_id']),
                'compare' => '=',
            ];
        }

        if (!empty($_GET['awene_registration_status'])) {
            $meta_query[] = [
                'key' => self::REGISTRATION_META_FIELDS['status'],
                'value' => sanitize_text_field(wp_unslash($_GET['awene_registration_status'])),
                'compare' => '=',
            ];
        }

        if ($meta_query) {
            $query->set('meta_query', $meta_query);
        }
    }

    public static function register_export_page(): void
    {
        add_submenu_page(
            'edit.php?post_type=' . self::EVENT_POST_TYPE,
            'Events PV',
            'Events PV',
            'edit_posts',
            self::PV_DASHBOARD_SLUG,
            [self::class, 'render_pv_dashboard_page']
        );
        add_submenu_page(
            'edit.php?post_type=' . self::EVENT_POST_TYPE,
            'Export registrations',
            'Export CSV',
            'edit_posts',
            'awene-events-export',
            [self::class, 'render_export_page']
        );
        add_submenu_page(
            'edit.php?post_type=' . self::EVENT_POST_TYPE,
            'Brevo Settings',
            'Brevo Settings',
            'manage_options',
            self::BREVO_MENU_SLUG,
            [self::class, 'render_brevo_settings_page']
        );

        // Satisfaction Forms submenu
        add_submenu_page(
            'edit.php?post_type=' . self::EVENT_POST_TYPE,
            'Satisfaction Forms',
            'Satisfaction Forms',
            'edit_posts',
            'edit.php?post_type=' . self::SATISFACTION_POST_TYPE
        );
        add_submenu_page(
            'edit.php?post_type=' . self::EVENT_POST_TYPE,
            'Add New Satisfaction Form',
            'Add New Form',
            'edit_posts',
            'post-new.php?post_type=' . self::SATISFACTION_POST_TYPE
        );
        add_submenu_page(
            'edit.php?post_type=' . self::EVENT_POST_TYPE,
            'Satisfaction Responses',
            'Responses',
            'edit_posts',
            'edit.php?post_type=' . self::SATISFACTION_RESPONSE_POST_TYPE
        );
    }

    public static function render_export_page(): void
    {
        $url = wp_nonce_url(
            admin_url('admin-post.php?action=awene_events_export_registrations'),
            self::EXPORT_NONCE_ACTION
        );
        ?>
        <div class="wrap">
            <h1>Export registrations</h1>
            <p>Download a CSV export of all event registrations.</p>
            <p><a class="button button-primary" href="<?php echo esc_url($url); ?>">Download CSV</a></p>
        </div>
        <?php
    }

    public static function render_brevo_settings_page(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }

        $settings = self::brevo_settings();
        $api_key = self::brevo_api_key();
        settings_errors('awene_events_brevo');
        ?>
        <div class="wrap">
            <h1>Brevo Settings</h1>
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <?php wp_nonce_field(self::BREVO_SETTINGS_NONCE); ?>
                <input type="hidden" name="action" value="awene_events_save_brevo_settings" />
                <table class="form-table">
                    <tr>
                        <th scope="row">Brevo API key</th>
                        <td>
                            <?php if ($api_key) : ?>
                                <p><strong>Brevo API key detected from environment.</strong></p>
                            <?php else : ?>
                                <p style="color:#b32d2e;"><strong>Brevo API key is missing from environment variables.</strong></p>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <tr><th scope="row"><label for="sender_name">Default sender name</label></th><td><input id="sender_name" name="awene_brevo_settings[sender_name]" type="text" class="regular-text" value="<?php echo esc_attr((string) $settings['sender_name']); ?>" /></td></tr>
                    <tr><th scope="row"><label for="sender_email">Default sender email</label></th><td><input id="sender_email" name="awene_brevo_settings[sender_email]" type="email" class="regular-text" value="<?php echo esc_attr((string) $settings['sender_email']); ?>" /></td></tr>
                    <tr><th scope="row"><label for="reply_to_email">Reply-to email</label></th><td><input id="reply_to_email" name="awene_brevo_settings[reply_to_email]" type="email" class="regular-text" value="<?php echo esc_attr((string) $settings['reply_to_email']); ?>" /></td></tr>
                    <tr><th scope="row"><label for="fr_list_id">Default FR list ID</label></th><td><input id="fr_list_id" name="awene_brevo_settings[fr_list_id]" type="text" class="regular-text" value="<?php echo esc_attr((string) $settings['fr_list_id']); ?>" /></td></tr>
                    <tr><th scope="row"><label for="en_list_id">Default EN list ID</label></th><td><input id="en_list_id" name="awene_brevo_settings[en_list_id]" type="text" class="regular-text" value="<?php echo esc_attr((string) $settings['en_list_id']); ?>" /></td></tr>
                    <tr><th scope="row"><label for="ar_list_id">Default AR list ID</label></th><td><input id="ar_list_id" name="awene_brevo_settings[ar_list_id]" type="text" class="regular-text" value="<?php echo esc_attr((string) $settings['ar_list_id']); ?>" /></td></tr>
                    <tr><th scope="row"><label for="test_email">Test email address</label></th><td><input id="test_email" name="awene_brevo_settings[test_email]" type="email" class="regular-text" value="<?php echo esc_attr((string) $settings['test_email']); ?>" /></td></tr>
                    <tr><th scope="row">Enable / disable Brevo notifications</th><td><label><input type="checkbox" name="awene_brevo_settings[enabled]" value="1" <?php checked(!empty($settings['enabled'])); ?> /> Enable</label></td></tr>
                    <tr><th scope="row"><label for="campaign_footer">Default campaign footer text</label></th><td><textarea id="campaign_footer" name="awene_brevo_settings[campaign_footer]" rows="4" class="large-text"><?php echo esc_textarea((string) $settings['campaign_footer']); ?></textarea></td></tr>
                    <tr><th scope="row"><label for="public_website_url">Public Website URL</label></th><td><input id="public_website_url" name="awene_brevo_settings[public_website_url]" type="url" class="regular-text" value="<?php echo esc_attr((string) $settings['public_website_url']); ?>" /></td></tr>
                </table>
                <p class="submit">
                    <button type="submit" class="button button-primary">Save settings</button>
                </p>
            </form>
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="margin-top:20px;">
                <?php wp_nonce_field(self::BREVO_TEST_NONCE); ?>
                <input type="hidden" name="action" value="awene_events_send_brevo_test" />
                <button type="submit" class="button" <?php disabled(!$api_key || empty($settings['test_email'])); ?>>Send test email</button>
            </form>
        </div>
        <?php
    }

    public static function render_pv_dashboard_page(): void
    {
        if (!current_user_can('edit_posts')) {
            wp_die('Unauthorized');
        }

        $filters = self::pv_dashboard_filters();
        $events = self::dashboard_events($filters);
        $pending = [];
        $existing = [];
        $upcoming = [];

        foreach ($events as $event) {
            $pv = self::find_pv_by_event_id((int) $event['id']);
            if ($event['eventStatus'] === 'past') {
                if ($pv) {
                    $existing[] = ['event' => $event, 'pv' => self::pv_payload($pv->ID), 'pv_post' => $pv];
                } else {
                    $pending[] = ['event' => $event];
                }
            } else {
                $upcoming[] = ['event' => $event];
            }
        }

        $stats = [
            'Pending PVs' => count($pending),
            'Completed PVs' => count($existing),
            'Past Events' => count($pending) + count($existing),
            'Upcoming Events' => count($upcoming),
            'Events With Satisfaction Form' => count(array_filter($existing, static fn ($item) => !empty($item['pv']['satisfactionFormId']))),
            'Events Without Satisfaction Form' => count(array_filter($existing, static fn ($item) => empty($item['pv']['satisfactionFormId']))),
        ];

        ?>
        <div class="wrap">
            <h1>Events PV</h1>
            <style>
                .awene-pv-cards { display:grid; gap:16px; grid-template-columns:repeat(3, minmax(0,1fr)); margin:20px 0 28px; }
                .awene-pv-card { background:#fff; border:1px solid #e8dff0; border-radius:16px; padding:18px; }
                .awene-pv-card strong { display:block; font-size:28px; color:#4B1F7A; margin-bottom:6px; }
                .awene-pv-panel { background:#fff; border:1px solid #e8dff0; border-radius:20px; padding:22px; margin:0 0 24px; }
                .awene-pv-badge { display:inline-flex; align-items:center; border-radius:999px; padding:4px 10px; font-size:12px; font-weight:600; }
                .awene-pv-filters { display:flex; flex-wrap:wrap; gap:10px; margin:0 0 18px; }
                .awene-pv-filters input, .awene-pv-filters select { min-width:180px; }
                @media (max-width: 782px) { .awene-pv-cards { grid-template-columns:1fr; } }
            </style>

            <div class="awene-pv-cards">
                <?php foreach ($stats as $label => $value) : ?>
                    <div class="awene-pv-card">
                        <strong><?php echo esc_html((string) $value); ?></strong>
                        <span><?php echo esc_html($label); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>

            <form method="get" class="awene-pv-filters">
                <input type="hidden" name="post_type" value="<?php echo esc_attr(self::EVENT_POST_TYPE); ?>" />
                <input type="hidden" name="page" value="<?php echo esc_attr(self::PV_DASHBOARD_SLUG); ?>" />
                <input type="search" name="s" placeholder="Search event title or location" value="<?php echo esc_attr($filters['search']); ?>" />
                <select name="event_type">
                    <option value="">All event types</option>
                    <?php foreach (self::event_type_options() as $slug => $label) : ?>
                        <option value="<?php echo esc_attr($slug); ?>" <?php selected($filters['event_type'], $slug); ?>><?php echo esc_html($label); ?></option>
                    <?php endforeach; ?>
                </select>
                <select name="pv_status">
                    <option value="">All PV states</option>
                    <option value="pending" <?php selected($filters['pv_status'], 'pending'); ?>>Pending PV</option>
                    <option value="created" <?php selected($filters['pv_status'], 'created'); ?>>PV Created</option>
                </select>
                <select name="satisfaction_status">
                    <option value="">All satisfaction states</option>
                    <option value="with_form" <?php selected($filters['satisfaction_status'], 'with_form'); ?>>With satisfaction</option>
                    <option value="without_form" <?php selected($filters['satisfaction_status'], 'without_form'); ?>>Without satisfaction</option>
                </select>
                <select name="language">
                    <option value="">All languages</option>
                    <option value="fr" <?php selected($filters['language'], 'fr'); ?>>FR</option>
                    <option value="en" <?php selected($filters['language'], 'en'); ?>>EN</option>
                    <option value="ar" <?php selected($filters['language'], 'ar'); ?>>AR</option>
                </select>
                <input type="date" name="date_from" value="<?php echo esc_attr($filters['date_from']); ?>" />
                <input type="date" name="date_to" value="<?php echo esc_attr($filters['date_to']); ?>" />
                <button type="submit" class="button">Filter</button>
            </form>

            <div class="awene-pv-panel">
                <h2>Pending Past Event PV</h2>
                <table class="widefat striped">
                    <thead><tr><th>Event title</th><th>Date</th><th>Location</th><th>Type</th><th>Registrations</th><th>Days since event ended</th><th>Action</th></tr></thead>
                    <tbody>
                    <?php if (!$pending) : ?>
                        <tr><td colspan="7">No pending past event PV.</td></tr>
                    <?php else : foreach ($pending as $row) :
                        $event = $row['event'];
                        $days = self::days_since_event($event['start_date']);
                    ?>
                        <tr>
                            <td><?php echo esc_html($event['title']); ?></td>
                            <td><?php echo esc_html($event['date_label']); ?></td>
                            <td><?php echo esc_html($event['locationLabel'] ?: 'Location to be confirmed'); ?></td>
                            <td><?php echo esc_html($event['type']); ?></td>
                            <td><?php echo esc_html((string) self::registration_count_for_event((int) $event['id'])); ?></td>
                            <td><?php echo esc_html((string) $days); ?></td>
                            <td>
                                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                                    <?php wp_nonce_field(self::EVENT_NONCE_ACTION); ?>
                                    <input type="hidden" name="action" value="awene_events_create_pv" />
                                    <input type="hidden" name="event_id" value="<?php echo esc_attr((string) $event['id']); ?>" />
                                    <button type="submit" class="button button-primary">Create PV</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; endif; ?>
                    </tbody>
                </table>
            </div>

            <div class="awene-pv-panel">
                <h2>Existing Event PVs</h2>
                <table class="widefat striped">
                    <thead><tr><th>Event title</th><th>Event date</th><th>PV status</th><th>Public recap status</th><th>Satisfaction linked</th><th>PDF attached</th><th>Gallery count</th><th>Last updated</th><th>Actions</th></tr></thead>
                    <tbody>
                    <?php if (!$existing) : ?>
                        <tr><td colspan="9">No PV created yet.</td></tr>
                    <?php else : foreach ($existing as $row) :
                        $event = $row['event'];
                        $pv = $row['pv'];
                        $pv_post = $row['pv_post'];
                    ?>
                        <tr>
                            <td><?php echo esc_html($event['title']); ?></td>
                            <td><?php echo esc_html($event['date_label']); ?></td>
                            <td><span class="awene-pv-badge" style="background:#F3ECFB;color:#6F3FD6;">Created</span></td>
                            <td><?php echo esc_html(ucfirst((string) $pv['publicRecapStatus'])); ?></td>
                            <td><?php echo !empty($pv['satisfactionFormId']) ? 'Yes' : 'No'; ?></td>
                            <td><?php echo !empty($pv['pdfUrl']) ? 'Yes' : 'No'; ?></td>
                            <td><?php echo esc_html((string) count($pv['gallery'] ?? [])); ?></td>
                            <td><?php echo esc_html(get_the_modified_date('Y-m-d H:i', $pv_post)); ?></td>
                            <td>
                                <a class="button" href="<?php echo esc_url(get_edit_post_link($pv_post->ID, 'raw') ?: '#'); ?>">Edit PV</a>
                                <?php if (($pv['publicRecapStatus'] ?? '') === 'published') : ?>
                                    <a class="button" href="<?php echo esc_url(home_url('/' . (($event['language'] ?? 'fr') === 'en' ? 'en/events/' : 'fr/evenements/') . $event['slug'])); ?>" target="_blank" rel="noopener noreferrer">View recap</a>
                                <?php endif; ?>
                                <?php if (!empty($pv['satisfactionFormId'])) : ?>
                                    <a class="button" href="<?php echo esc_url(admin_url('post.php?post=' . absint($pv['satisfactionFormId']) . '&action=edit')); ?>">View satisfaction results</a>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; endif; ?>
                    </tbody>
                </table>
            </div>

            <div class="awene-pv-panel">
                <h2>Upcoming Events</h2>
                <table class="widefat striped">
                    <thead><tr><th>Event title</th><th>Date</th><th>Days remaining</th><th>Registrations</th></tr></thead>
                    <tbody>
                    <?php if (!$upcoming) : ?>
                        <tr><td colspan="4">No upcoming events.</td></tr>
                    <?php else : foreach ($upcoming as $row) :
                        $event = $row['event'];
                    ?>
                        <tr>
                            <td><?php echo esc_html($event['title']); ?></td>
                            <td><?php echo esc_html($event['date_label']); ?></td>
                            <td><?php echo esc_html((string) self::days_until_event($event['start_date'])); ?></td>
                            <td><?php echo esc_html((string) self::registration_count_for_event((int) $event['id'])); ?></td>
                        </tr>
                    <?php endforeach; endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }

    public static function export_registrations_csv(): void
    {
        if (!current_user_can('edit_posts')) {
            wp_die('Unauthorized');
        }

        check_admin_referer(self::EXPORT_NONCE_ACTION);

        $posts = get_posts([
            'post_type' => self::REGISTRATION_POST_TYPE,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => 'date',
            'order' => 'DESC',
        ]);

        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=awene-event-registrations.csv');

        $output = fopen('php://output', 'w');
        if ($output === false) {
            exit;
        }

        fputcsv($output, ['Registration ID', 'Event ID', 'Event title', 'First name', 'Last name', 'Email', 'Phone', 'Message', 'Registration date', 'Status', 'Source', 'Consent', 'Language', 'Notes']);

        foreach ($posts as $post) {
            $payload = self::registration_payload($post);
            fputcsv($output, [
                $payload['id'],
                $payload['eventId'],
                $payload['eventTitle'],
                $payload['firstName'],
                $payload['lastName'],
                $payload['email'],
                $payload['phone'],
                $payload['message'],
                $payload['registrationDate'],
                $payload['status'],
                $payload['source'],
                $payload['consent'] ? '1' : '0',
                $payload['language'],
                $payload['notes'],
            ]);
        }

        fclose($output);
        exit;
    }

    // ── Satisfaction Form admin columns ──────────────────────────────────────

    public static function satisfaction_form_columns(array $columns): array
    {
        $columns['awene_sat_event'] = 'Linked event';
        $columns['awene_sat_active'] = 'Active';
        $columns['awene_sat_responses'] = 'Responses';
        $columns['awene_sat_language'] = 'Language';
        return $columns;
    }

    public static function satisfaction_form_column_content(string $column, int $post_id): void
    {
        if ($column === 'awene_sat_event') {
            $event_id = absint(get_post_meta($post_id, self::SATISFACTION_META_FIELDS['event_id'], true));
            echo $event_id ? esc_html(get_the_title($event_id)) : '—';
            return;
        }
        if ($column === 'awene_sat_active') {
            echo get_post_meta($post_id, self::SATISFACTION_META_FIELDS['active'], true) ? '<span style="color:#2d7a1f;">&#10003; Active</span>' : '<span style="color:#b32d2e;">&#10007; Inactive</span>';
            return;
        }
        if ($column === 'awene_sat_responses') {
            $event_id = absint(get_post_meta($post_id, self::SATISFACTION_META_FIELDS['event_id'], true));
            $count = $event_id ? (new WP_Query([
                'post_type' => self::SATISFACTION_RESPONSE_POST_TYPE,
                'post_status' => 'publish',
                'posts_per_page' => -1,
                'fields' => 'ids',
                'meta_query' => [['key' => self::SATISFACTION_META_FIELDS['event_id'], 'value' => $event_id, 'compare' => '=']],
            ]))->found_posts : 0;
            echo esc_html((string) $count);
            return;
        }
        if ($column === 'awene_sat_language') {
            $event_id = absint(get_post_meta($post_id, self::SATISFACTION_META_FIELDS['event_id'], true));
            $lang = $event_id ? (string) get_post_meta($event_id, self::EVENT_META_FIELDS['language'], true) : '';
            echo esc_html(strtoupper($lang ?: 'FR'));
        }
    }

    // ── Satisfaction Response admin columns ──────────────────────────────────

    public static function satisfaction_response_columns(array $columns): array
    {
        unset($columns['date']);
        $columns['awene_sr_form']        = 'Form';
        $columns['awene_sr_event']       = 'Event';
        $columns['awene_sr_email']       = 'Email';
        $columns['awene_sr_submitted']   = 'Submitted at';
        $columns['awene_sr_pdf_sent']    = 'PDF sent';
        $columns['awene_sr_language']    = 'Language';
        return $columns;
    }

    public static function satisfaction_response_column_content(string $column, int $post_id): void
    {
        if ($column === 'awene_sr_form') {
            $form_id = absint(get_post_meta($post_id, self::SATISFACTION_RESPONSE_META_FIELDS['form_id'], true));
            echo $form_id ? esc_html(get_the_title($form_id)) : '—';
            return;
        }
        if ($column === 'awene_sr_event') {
            echo esc_html((string) get_post_meta($post_id, self::SATISFACTION_RESPONSE_META_FIELDS['event_title'], true) ?: '—');
            return;
        }
        if ($column === 'awene_sr_email') {
            echo esc_html((string) get_post_meta($post_id, self::SATISFACTION_RESPONSE_META_FIELDS['email'], true) ?: 'Anonymous');
            return;
        }
        if ($column === 'awene_sr_submitted') {
            echo esc_html((string) get_post_meta($post_id, self::SATISFACTION_RESPONSE_META_FIELDS['submitted_at'], true) ?: '—');
            return;
        }
        if ($column === 'awene_sr_pdf_sent') {
            echo get_post_meta($post_id, self::SATISFACTION_RESPONSE_META_FIELDS['pdf_sent_status'], true) ? '&#10003;' : '—';
            return;
        }
        if ($column === 'awene_sr_language') {
            echo esc_html(strtoupper((string) get_post_meta($post_id, self::SATISFACTION_RESPONSE_META_FIELDS['language'], true) ?: 'FR'));
        }
    }

    // ── Satisfaction Response CSV export ─────────────────────────────────────

    public static function export_satisfaction_csv(): void
    {
        if (!current_user_can('edit_posts')) {
            wp_die('Unauthorized');
        }
        check_admin_referer('awene_events_export_satisfaction');

        $form_id   = absint($_GET['form_id'] ?? 0);
        $event_id  = absint($_GET['event_id'] ?? 0);

        $meta_query = [];
        if ($form_id > 0) {
            $meta_query[] = ['key' => self::SATISFACTION_RESPONSE_META_FIELDS['form_id'], 'value' => $form_id, 'compare' => '='];
        }
        if ($event_id > 0) {
            $meta_query[] = ['key' => self::SATISFACTION_RESPONSE_META_FIELDS['event_id'], 'value' => $event_id, 'compare' => '='];
        }

        $posts = get_posts([
            'post_type'   => self::SATISFACTION_RESPONSE_POST_TYPE,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby'     => 'date',
            'order'       => 'DESC',
            'meta_query'  => $meta_query ?: [],
        ]);

        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=awene-satisfaction-responses.csv');

        $output = fopen('php://output', 'w');
        if ($output === false) {
            exit;
        }

        fputcsv($output, ['Response ID', 'Form ID', 'Event title', 'Email', 'First name', 'Last name', 'Submitted at', 'Language', 'Consent', 'PDF sent', 'Answers']);

        foreach ($posts as $post) {
            fputcsv($output, [
                $post->ID,
                get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['form_id'], true),
                get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['event_title'], true),
                get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['email'], true),
                get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['first_name'], true),
                get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['last_name'], true),
                get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['submitted_at'], true),
                get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['language'], true),
                get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['consent'], true) ? '1' : '0',
                get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['pdf_sent_status'], true) ? '1' : '0',
                (string) get_post_meta($post->ID, self::SATISFACTION_RESPONSE_META_FIELDS['answers_json'], true),
            ]);
        }

        fclose($output);
        exit;
    }

    private static function render_field(string $field, string $label, string $type, $value, string $class = ''): void
    {
        if ($type === 'textarea') {
            printf(
                '<p class="%4$s"><label for="awene_event_%1$s">%2$s</label><textarea id="awene_event_%1$s" name="awene_event_meta[%1$s]" rows="4">%3$s</textarea></p>',
                esc_attr($field),
                esc_html($label),
                esc_textarea((string) $value),
                esc_attr($class)
            );
            return;
        }

        printf(
            '<p class="%5$s"><label for="awene_event_%1$s">%2$s</label><input id="awene_event_%1$s" type="%3$s" name="awene_event_meta[%1$s]" value="%4$s" /></p>',
            esc_attr($field),
            esc_html($label),
            esc_attr($type),
            esc_attr((string) $value),
            esc_attr($class)
        );
    }

    private static function render_registration_field(string $field, string $label, string $type, $value, string $class = ''): void
    {
        if ($type === 'textarea') {
            printf(
                '<p class="%4$s"><label for="awene_registration_%1$s">%2$s</label><textarea id="awene_registration_%1$s" name="awene_registration_meta[%1$s]" rows="4">%3$s</textarea></p>',
                esc_attr($field),
                esc_html($label),
                esc_textarea((string) $value),
                esc_attr($class)
            );
            return;
        }

        printf(
            '<p class="%5$s"><label for="awene_registration_%1$s">%2$s</label><input id="awene_registration_%1$s" type="%3$s" name="awene_registration_meta[%1$s]" value="%4$s" /></p>',
            esc_attr($field),
            esc_html($label),
            esc_attr($type),
            esc_attr((string) $value),
            esc_attr($class)
        );
    }

    private static function render_pv_field(string $field, string $label, string $type, $value, string $class = ''): void
    {
        if ($type === 'textarea') {
            printf(
                '<p class="%4$s"><label for="awene_event_pv_%1$s">%2$s</label><textarea id="awene_event_pv_%1$s" name="awene_event_pv_meta[%1$s]" rows="4">%3$s</textarea></p>',
                esc_attr($field),
                esc_html($label),
                esc_textarea((string) $value),
                esc_attr($class)
            );
            return;
        }

        printf(
            '<p class="%5$s"><label for="awene_event_pv_%1$s">%2$s</label><input id="awene_event_pv_%1$s" type="%3$s" name="awene_event_pv_meta[%1$s]" value="%4$s" /></p>',
            esc_attr($field),
            esc_html($label),
            esc_attr($type),
            esc_attr((string) $value),
            esc_attr($class)
        );
    }

    private static function render_satisfaction_field(string $field, string $label, string $type, $value, string $class = ''): void
    {
        if ($type === 'textarea') {
            printf(
                '<p class="%4$s"><label for="awene_satisfaction_%1$s">%2$s</label><textarea id="awene_satisfaction_%1$s" name="awene_satisfaction_meta[%1$s]" rows="4">%3$s</textarea></p>',
                esc_attr($field),
                esc_html($label),
                esc_textarea((string) $value),
                esc_attr($class)
            );
            return;
        }

        printf(
            '<p class="%5$s"><label for="awene_satisfaction_%1$s">%2$s</label><input id="awene_satisfaction_%1$s" type="%3$s" name="awene_satisfaction_meta[%1$s]" value="%4$s" /></p>',
            esc_attr($field),
            esc_html($label),
            esc_attr($type),
            esc_attr((string) $value),
            esc_attr($class)
        );
    }

    private static function render_option(string $value, string $label, string $current): void
    {
        printf(
            '<option value="%1$s" %3$s>%2$s</option>',
            esc_attr($value),
            esc_html($label),
            selected($current, $value, false)
        );
    }

    private static function sanitize_event_value(string $field, $value)
    {
        if ($field === 'featured') {
            return (bool) $value;
        }

        if (in_array($field, ['capacity', 'available_seats'], true)) {
            return max(0, absint($value));
        }

        if (in_array($field, ['online_url', 'registration_url'], true)) {
            return esc_url_raw((string) $value);
        }

        if (in_array($field, ['short_description', 'meta_description'], true)) {
            return sanitize_textarea_field((string) $value);
        }

        return sanitize_text_field((string) $value);
    }

    private static function sanitize_registration_value(string $field, $value)
    {
        if ($field === 'event_id') {
            return absint($value);
        }

        if ($field === 'consent') {
            return (bool) $value;
        }

        if ($field === 'email') {
            return sanitize_email((string) $value);
        }

        if (in_array($field, ['message', 'notes'], true)) {
            return sanitize_textarea_field((string) $value);
        }

        return sanitize_text_field((string) $value);
    }

    private static function sanitize_pv_value(string $field, $value)
    {
        if (in_array($field, ['event_id', 'satisfaction_form_id'], true)) {
            return absint($value);
        }
        if ($field === 'pdf_is_public') {
            return (bool) $value;
        }
        if (in_array($field, ['pdf_url', 'video_url', 'external_gallery_url'], true)) {
            return esc_url_raw((string) $value);
        }
        if ($field === 'gallery') {
            $lines = preg_split('/\r\n|\r|\n/', (string) $value) ?: [];
            $urls = array_filter(array_map('esc_url_raw', $lines));
            return implode("\n", $urls);
        }
        if ($field === 'full_description') {
            return wp_kses_post((string) $value);
        }
        if (in_array($field, ['short_description', 'key_takeaways', 'speaker_notes', 'attendance_notes', 'internal_notes'], true)) {
            return sanitize_textarea_field((string) $value);
        }
        return sanitize_text_field((string) $value);
    }

    private static function sanitize_satisfaction_value(string $field, $value)
    {
        if ($field === 'event_id') {
            return absint($value);
        }
        if ($field === 'pdf_attachment_id') {
            return absint($value);
        }
        if (in_array($field, ['active', 'anonymous_allowed', 'require_email'], true)) {
            return (bool) $value;
        }
        if ($field === 'pdf_after_submission_url') {
            return esc_url_raw((string) $value);
        }
        if (in_array($field, ['intro_text', 'questions', 'thank_you_message'], true)) {
            return sanitize_textarea_field((string) $value);
        }
        return sanitize_text_field((string) $value);
    }

    private static function sanitize_satisfaction_response_value(string $field, $value)
    {
        if (in_array($field, ['form_id', 'event_id'], true)) {
            return absint($value);
        }
        if (in_array($field, ['consent', 'pdf_sent_status'], true)) {
            return (bool) $value;
        }
        if ($field === 'email') {
            return sanitize_email((string) $value);
        }
        if ($field === 'answers_json') {
            return wp_json_encode(json_decode((string) $value, true));
        }
        return sanitize_text_field((string) $value);
    }

    private static function default_brevo_settings(): array
    {
        return [
            'enabled' => 0,
            'sender_name' => 'AWENE',
            'sender_email' => get_option('admin_email'),
            'reply_to_email' => get_option('admin_email'),
            'fr_list_id' => '',
            'en_list_id' => '',
            'ar_list_id' => '',
            'test_email' => get_option('admin_email'),
            'campaign_footer' => 'AWENE',
            'public_website_url' => home_url('/'),
        ];
    }

    private static function brevo_settings(): array
    {
        return wp_parse_args((array) get_option(self::BREVO_OPTION_KEY, []), self::default_brevo_settings());
    }

    private static function brevo_api_key(): string
    {
        foreach (['BREVO_API_KEY', 'BREVO_API', 'BREVO_KEY'] as $env) {
            $value = getenv($env);
            if (is_string($value) && trim($value) !== '') {
                return trim($value);
            }
            if (isset($_ENV[$env]) && is_string($_ENV[$env]) && trim($_ENV[$env]) !== '') {
                return trim($_ENV[$env]);
            }
        }

        return '';
    }

    public static function save_brevo_settings(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        check_admin_referer(self::BREVO_SETTINGS_NONCE);

        $input = isset($_POST['awene_brevo_settings']) && is_array($_POST['awene_brevo_settings'])
            ? wp_unslash($_POST['awene_brevo_settings'])
            : [];

        $settings = [
            'enabled' => !empty($input['enabled']) ? 1 : 0,
            'sender_name' => sanitize_text_field((string) ($input['sender_name'] ?? '')),
            'sender_email' => sanitize_email((string) ($input['sender_email'] ?? '')),
            'reply_to_email' => sanitize_email((string) ($input['reply_to_email'] ?? '')),
            'fr_list_id' => sanitize_text_field((string) ($input['fr_list_id'] ?? '')),
            'en_list_id' => sanitize_text_field((string) ($input['en_list_id'] ?? '')),
            'ar_list_id' => sanitize_text_field((string) ($input['ar_list_id'] ?? '')),
            'test_email' => sanitize_email((string) ($input['test_email'] ?? '')),
            'campaign_footer' => sanitize_textarea_field((string) ($input['campaign_footer'] ?? '')),
            'public_website_url' => esc_url_raw((string) ($input['public_website_url'] ?? '')),
        ];

        update_option(self::BREVO_OPTION_KEY, $settings, false);
        add_settings_error('awene_events_brevo', 'settings_updated', 'Brevo settings saved.', 'updated');
        wp_safe_redirect(admin_url('edit.php?post_type=' . self::EVENT_POST_TYPE . '&page=' . self::BREVO_MENU_SLUG));
        exit;
    }

    public static function send_brevo_test_email(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        check_admin_referer(self::BREVO_TEST_NONCE);
        $settings = self::brevo_settings();
        $api_key = self::brevo_api_key();

        if (!$api_key) {
          add_settings_error('awene_events_brevo', 'test_failed', 'Brevo API key is missing from environment variables.', 'error');
          wp_safe_redirect(admin_url('edit.php?post_type=' . self::EVENT_POST_TYPE . '&page=' . self::BREVO_MENU_SLUG));
          exit;
        }

        $result = self::send_brevo_transactional_email(
            $api_key,
            $settings['test_email'],
            'AWENE Brevo test',
            '<p>This is a test email from AWENE CMS.</p>',
            $settings
        );

        add_settings_error('awene_events_brevo', $result['success'] ? 'test_ok' : 'test_fail', $result['message'], $result['success'] ? 'updated' : 'error');
        wp_safe_redirect(admin_url('edit.php?post_type=' . self::EVENT_POST_TYPE . '&page=' . self::BREVO_MENU_SLUG));
        exit;
    }

    public static function send_brevo_campaign(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        if (
            !isset($_POST[self::BREVO_NOTIFY_NONCE_NAME]) ||
            !wp_verify_nonce(
                sanitize_text_field(wp_unslash($_POST[self::BREVO_NOTIFY_NONCE_NAME])),
                self::BREVO_NOTIFY_NONCE
            )
        ) {
            wp_die('Invalid nonce');
        }

        $post_id = absint($_POST['post_id'] ?? 0);
        $post = $post_id ? get_post($post_id) : null;
        if (!$post) {
            wp_die('Content not found.');
        }

        $settings = self::brevo_settings();
        $api_key = self::brevo_api_key();
        $language = self::notification_language_for_post($post);
        $public_url = esc_url_raw((string) ($_POST['public_url'] ?? self::public_url_for_post($post, $language, $settings)));
        $list_id = sanitize_text_field((string) ($_POST['list_id'] ?? ''));
        $subject = sanitize_text_field((string) ($_POST['subject'] ?? ''));
        $preview = sanitize_text_field((string) ($_POST['preview_text'] ?? ''));
        $intro = sanitize_textarea_field((string) ($_POST['intro_text'] ?? ''));
        $cta_label = sanitize_text_field((string) ($_POST['cta_label'] ?? ''));

        $redirect = get_edit_post_link($post_id, 'raw') ?: admin_url();

        if (!$api_key) {
            add_settings_error('awene_events_brevo', 'notify_fail', 'Brevo API key is missing from environment variables.', 'error');
            wp_safe_redirect($redirect);
            exit;
        }
        if (empty($settings['enabled'])) {
            add_settings_error('awene_events_brevo', 'notify_fail', 'Brevo notifications are disabled.', 'error');
            wp_safe_redirect($redirect);
            exit;
        }
        if ($post->post_status !== 'publish') {
            add_settings_error('awene_events_brevo', 'notify_fail', 'Publiez ce contenu avant d’informer votre liste.', 'error');
            wp_safe_redirect($redirect);
            exit;
        }
        if (!$subject || !$list_id || !$public_url || empty($settings['sender_email'])) {
            add_settings_error('awene_events_brevo', 'notify_fail', 'Sender email, list ID, public URL, and subject are required.', 'error');
            wp_safe_redirect($redirect);
            exit;
        }

        $html = self::brevo_campaign_html([
            'title' => get_the_title($post_id),
            'preview' => $preview,
            'intro' => $intro,
            'cta_label' => $cta_label,
            'public_url' => $public_url,
            'footer' => (string) $settings['campaign_footer'],
        ]);

        $create = wp_remote_post('https://api.brevo.com/v3/emailCampaigns', [
            'headers' => [
                'api-key' => $api_key,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
            'body' => wp_json_encode([
                'name' => $subject,
                'subject' => $subject,
                'previewText' => $preview,
                'sender' => [
                    'name' => $settings['sender_name'],
                    'email' => $settings['sender_email'],
                ],
                'replyTo' => $settings['reply_to_email'] ? ['email' => $settings['reply_to_email']] : null,
                'type' => 'classic',
                'htmlContent' => $html,
                'recipients' => [
                    'listIds' => [(int) $list_id],
                ],
            ]),
            'timeout' => 30,
        ]);

        $log = [
            'content_id' => $post_id,
            'content_type' => $post->post_type,
            'content_title' => get_the_title($post_id),
            'language' => $language,
            'public_url' => $public_url,
            'brevo_list_id' => $list_id,
            'campaign_id' => '',
            'subject' => $subject,
            'sent_by' => get_current_user_id(),
            'sent_at' => current_time('mysql'),
            'status' => 'Failed',
            'error_message' => '',
        ];

        if (is_wp_error($create)) {
            $log['error_message'] = $create->get_error_message();
            self::append_notification_log($post_id, $log);
            add_settings_error('awene_events_brevo', 'notify_fail', 'Campaign creation failed: ' . $log['error_message'], 'error');
            wp_safe_redirect($redirect);
            exit;
        }

        $create_body = json_decode((string) wp_remote_retrieve_body($create), true);
        $campaign_id = (string) ($create_body['id'] ?? '');
        $log['campaign_id'] = $campaign_id;
        if (!$campaign_id) {
            $log['error_message'] = 'Missing campaign ID.';
            self::append_notification_log($post_id, $log);
            add_settings_error('awene_events_brevo', 'notify_fail', 'Campaign creation failed: Missing campaign ID.', 'error');
            wp_safe_redirect($redirect);
            exit;
        }

        $send = wp_remote_post('https://api.brevo.com/v3/emailCampaigns/' . rawurlencode($campaign_id) . '/sendNow', [
            'headers' => [
                'api-key' => $api_key,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
            'body' => wp_json_encode(new stdClass()),
            'timeout' => 30,
        ]);

        if (is_wp_error($send) || wp_remote_retrieve_response_code($send) >= 300) {
            $log['error_message'] = is_wp_error($send) ? $send->get_error_message() : (string) wp_remote_retrieve_body($send);
            self::append_notification_log($post_id, $log);
            add_settings_error('awene_events_brevo', 'notify_fail', 'Campaign send failed: ' . $log['error_message'], 'error');
            wp_safe_redirect($redirect);
            exit;
        }

        $log['status'] = 'Sent';
        self::append_notification_log($post_id, $log);
        add_settings_error('awene_events_brevo', 'notify_ok', 'Brevo campaign sent successfully.', 'updated');
        wp_safe_redirect($redirect);
        exit;
    }

    public static function create_pv_from_event(): void
    {
        if (!current_user_can('edit_posts')) {
            wp_die('Unauthorized');
        }
        check_admin_referer(self::EVENT_NONCE_ACTION);

        $event_id = absint($_POST['event_id'] ?? 0);
        if ($event_id < 1) {
            wp_die('Missing event ID.');
        }

        $existing = self::find_pv_by_event_id($event_id);
        if ($existing) {
            wp_safe_redirect(get_edit_post_link($existing->ID, 'raw') ?: admin_url());
            exit;
        }

        $event = self::event_payload($event_id);
        if (($event['eventStatus'] ?? '') !== 'past') {
            wp_die('Only past events can create a PV.');
        }

        $pv_id = wp_insert_post([
            'post_type' => self::EVENT_PV_POST_TYPE,
            'post_status' => 'publish',
            'post_title' => $event['title'] . ' PV',
        ], true);

        if (is_wp_error($pv_id)) {
            wp_die('PV could not be created.');
        }

        update_post_meta($pv_id, self::PV_META_FIELDS['event_id'], $event_id);
        update_post_meta($pv_id, self::PV_META_FIELDS['pv_title'], $event['title']);
        update_post_meta($pv_id, self::PV_META_FIELDS['short_description'], $event['shortDescription'] ?? '');
        update_post_meta($pv_id, self::PV_META_FIELDS['full_description'], wp_strip_all_tags((string) $event['description']));
        update_post_meta($pv_id, self::PV_META_FIELDS['public_recap_status'], 'draft');
        update_post_meta($pv_id, self::PV_META_FIELDS['completion_status'], 'Pending');

        wp_safe_redirect(get_edit_post_link($pv_id, 'raw') ?: admin_url());
        exit;
    }

    private static function send_brevo_transactional_email(string $api_key, string $to, string $subject, string $html, array $settings): array
    {
        $response = wp_remote_post('https://api.brevo.com/v3/smtp/email', [
            'headers' => [
                'api-key' => $api_key,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
            'body' => wp_json_encode([
                'sender' => ['name' => $settings['sender_name'], 'email' => $settings['sender_email']],
                'to' => [['email' => $to]],
                'subject' => $subject,
                'htmlContent' => $html,
            ]),
            'timeout' => 30,
        ]);

        if (is_wp_error($response)) {
            return ['success' => false, 'message' => $response->get_error_message()];
        }

        $code = wp_remote_retrieve_response_code($response);
        return ['success' => $code < 300, 'message' => $code < 300 ? 'Test email sent.' : 'Brevo API error: ' . wp_remote_retrieve_body($response)];
    }

    private static function brevo_campaign_html(array $data): string
    {
        return '<div style="background:#f7f2fb;padding:32px 16px;font-family:Arial,sans-serif;">'
            . '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;padding:40px 32px;">'
            . '<div style="font-size:28px;font-weight:700;color:#4B1F7A;margin-bottom:16px;">AWENE</div>'
            . '<p style="color:#6E6478;font-size:15px;line-height:1.6;margin:0 0 12px;">' . esc_html($data['preview']) . '</p>'
            . '<h1 style="color:#4B1F7A;font-size:30px;line-height:1.2;margin:0 0 16px;">' . esc_html($data['title']) . '</h1>'
            . '<p style="color:#2E2438;font-size:16px;line-height:1.7;margin:0 0 24px;">' . nl2br(esc_html($data['intro'])) . '</p>'
            . '<p style="margin:0 0 28px;"><a href="' . esc_url($data['public_url']) . '" style="display:inline-block;background:#F68B2C;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700;">' . esc_html($data['cta_label']) . '</a></p>'
            . '<p style="color:#6E6478;font-size:13px;line-height:1.6;margin:0;">' . esc_html($data['footer']) . '</p>'
            . '</div></div>';
    }

    private static function notification_language_for_post(WP_Post $post): string
    {
        if ($post->post_type === self::EVENT_PV_POST_TYPE) {
            $event_id = absint(get_post_meta($post->ID, self::PV_META_FIELDS['event_id'], true));
            return (string) get_post_meta($event_id, self::EVENT_META_FIELDS['language'], true) ?: 'fr';
        }

        return (string) get_post_meta($post->ID, self::EVENT_META_FIELDS['language'], true) ?: 'fr';
    }

    private static function public_url_for_post(WP_Post $post, string $language, array $settings): string
    {
        $base = untrailingslashit((string) ($settings['public_website_url'] ?: home_url('/')));
        if ($post->post_type === self::EVENT_PV_POST_TYPE) {
            $event_id = absint(get_post_meta($post->ID, self::PV_META_FIELDS['event_id'], true));
            $slug = get_post_field('post_name', $event_id);
            return $slug ? $base . '/' . ($language === 'en' ? 'en/events/' : 'fr/evenements/') . $slug : '';
        }

        $slug = get_post_field('post_name', $post->ID);
        return $slug ? $base . '/' . ($language === 'en' ? 'en/events/' : 'fr/evenements/') . $slug : '';
    }

    private static function default_list_id_for_language(string $language, array $settings): string
    {
        return (string) ($language === 'en' ? $settings['en_list_id'] : ($language === 'ar' ? $settings['ar_list_id'] : $settings['fr_list_id']));
    }

    private static function notification_defaults(WP_Post $post, string $language, string $public_url): array
    {
        $title = get_the_title($post->ID);
        $type = $post->post_type === self::EVENT_PV_POST_TYPE ? 'pv' : 'event';
        $is_en = $language === 'en';
        if ($type === 'pv') {
            return [
                'subject' => $is_en ? "AWENE event recap: {$title}" : "Retour sur l’événement AWENE : {$title}",
                'preview' => $is_en ? 'Review the key moments and access event resources.' : 'Revivez les moments clés et accédez aux ressources de l’événement.',
                'intro' => $is_en ? 'The recap for this AWENE event is now available. You can view the key moments, resources and shared content.' : 'Le récapitulatif de cet événement AWENE est maintenant disponible. Vous pouvez consulter les moments clés, les ressources et les contenus partagés.',
                'cta' => $is_en ? 'View recap' : 'Voir le récapitulatif',
                'url' => $public_url,
            ];
        }
        return [
            'subject' => $is_en ? "New AWENE event: {$title}" : "Nouvel événement AWENE : {$title}",
            'preview' => $is_en ? 'Discover the next AWENE event and register.' : 'Découvrez le prochain événement AWENE et inscrivez-vous.',
            'intro' => $is_en ? 'A new AWENE event is now available. You can view the details and register using the link below.' : 'Un nouvel événement AWENE est disponible. Vous pouvez consulter les détails et vous inscrire depuis le lien ci-dessous.',
            'cta' => $is_en ? 'View event' : 'Voir l’événement',
            'url' => $public_url,
        ];
    }

    private static function notification_history(int $post_id): array
    {
        $history = get_post_meta($post_id, '_awene_brevo_notification_logs', true);
        return is_array($history) ? $history : [];
    }

    private static function append_notification_log(int $post_id, array $log): void
    {
        $history = self::notification_history($post_id);
        $history[] = $log;
        update_post_meta($post_id, '_awene_brevo_notification_logs', $history);
    }

    private static function pv_dashboard_filters(): array
    {
        return [
            'search' => sanitize_text_field((string) ($_GET['s'] ?? '')),
            'event_type' => sanitize_text_field((string) ($_GET['event_type'] ?? '')),
            'pv_status' => sanitize_text_field((string) ($_GET['pv_status'] ?? '')),
            'satisfaction_status' => sanitize_text_field((string) ($_GET['satisfaction_status'] ?? '')),
            'language' => sanitize_text_field((string) ($_GET['language'] ?? '')),
            'date_from' => sanitize_text_field((string) ($_GET['date_from'] ?? '')),
            'date_to' => sanitize_text_field((string) ($_GET['date_to'] ?? '')),
        ];
    }

    private static function dashboard_events(array $filters): array
    {
        $query = new WP_Query([
            'post_type' => self::EVENT_POST_TYPE,
            'post_status' => ['publish', 'draft'],
            'posts_per_page' => 500,
            'orderby' => 'meta_value',
            'meta_key' => self::EVENT_META_FIELDS['start_date'],
            'order' => 'DESC',
        ]);

        $events = [];
        foreach ($query->posts as $post) {
            $event = self::event_payload($post->ID);
            if (self::event_matches_dashboard_filters($event, $filters)) {
                $events[] = $event;
            }
        }

        return $events;
    }

    private static function event_matches_dashboard_filters(array $event, array $filters): bool
    {
        $search = strtolower($filters['search']);
        if ($search !== '') {
            $haystack = strtolower(($event['title'] ?? '') . ' ' . ($event['locationLabel'] ?? ''));
            if (strpos($haystack, $search) === false) {
                return false;
            }
        }

        if ($filters['event_type'] !== '' && ($event['typeSlug'] ?? '') !== $filters['event_type']) {
            return false;
        }

        if ($filters['language'] !== '' && ($event['language'] ?? '') !== $filters['language']) {
            return false;
        }

        $startDate = (string) ($event['start_date'] ?? '');
        if ($filters['date_from'] !== '' && $startDate !== '' && $startDate < $filters['date_from']) {
            return false;
        }
        if ($filters['date_to'] !== '' && $startDate !== '' && $startDate > $filters['date_to']) {
            return false;
        }

        $pv = self::find_pv_by_event_id((int) $event['id']);
        if ($filters['pv_status'] === 'pending' && $pv) {
            return false;
        }
        if ($filters['pv_status'] === 'created' && !$pv) {
            return false;
        }

        if ($filters['satisfaction_status'] !== '') {
            $hasSatisfaction = false;
            if ($pv) {
                $payload = self::pv_payload($pv->ID);
                $hasSatisfaction = !empty($payload['satisfactionFormId']);
            }
            if ($filters['satisfaction_status'] === 'with_form' && !$hasSatisfaction) {
                return false;
            }
            if ($filters['satisfaction_status'] === 'without_form' && $hasSatisfaction) {
                return false;
            }
        }

        return true;
    }

    private static function event_type_options(): array
    {
        $terms = get_terms([
            'taxonomy' => self::TAXONOMY,
            'hide_empty' => false,
        ]);

        if (is_wp_error($terms)) {
            return [];
        }

        $options = [];
        foreach ($terms as $term) {
            $options[$term->slug] = $term->name;
        }

        return $options;
    }

    private static function days_since_event(string $date): int
    {
        if ($date === '') {
            return 0;
        }
        $diff = strtotime(gmdate('Y-m-d')) - strtotime($date);
        return max(0, (int) floor($diff / DAY_IN_SECONDS));
    }

    private static function days_until_event(string $date): int
    {
        if ($date === '') {
            return 0;
        }
        $diff = strtotime($date) - strtotime(gmdate('Y-m-d'));
        return max(0, (int) floor($diff / DAY_IN_SECONDS));
    }

    private static function registration_count_for_event(int $event_id): int
    {
        $registrations = get_posts([
            'post_type' => self::REGISTRATION_POST_TYPE,
            'post_status' => 'publish',
            'numberposts' => -1,
            'fields' => 'ids',
            'meta_query' => [
                [
                    'key' => self::REGISTRATION_META_FIELDS['event_id'],
                    'value' => $event_id,
                    'compare' => '=',
                ],
                [
                    'key' => self::REGISTRATION_META_FIELDS['status'],
                    'value' => 'cancelled',
                    'compare' => '!=',
                ],
            ],
        ]);

        return is_array($registrations) ? count($registrations) : 0;
    }

    private static function get_available_seats(int $event_id): int
    {
        $capacity = absint(get_post_meta($event_id, self::EVENT_META_FIELDS['capacity'], true));
        $stored = get_post_meta($event_id, self::EVENT_META_FIELDS['available_seats'], true);
        $stored_value = $stored !== '' ? absint($stored) : null;

        if ($capacity < 1) {
            return $stored_value ?? 0;
        }

        $remaining = max(0, $capacity - self::registration_count_for_event($event_id));
        return $stored_value === null ? $remaining : min($remaining, $stored_value);
    }

    private static function sync_event_capacity(int $event_id): void
    {
        $capacity = absint(get_post_meta($event_id, self::EVENT_META_FIELDS['capacity'], true));
        if ($capacity < 1) {
            return;
        }

        $remaining = max(0, $capacity - self::registration_count_for_event($event_id));
        update_post_meta($event_id, self::EVENT_META_FIELDS['available_seats'], $remaining);
        update_post_meta($event_id, self::EVENT_META_FIELDS['registration_status'], $remaining > 0 ? 'open' : 'full');
    }

    private static function event_payload(int $post_id): array
    {
        $meta = [];
        foreach (self::EVENT_META_FIELDS as $field => $meta_key) {
            $meta[$field] = get_post_meta($post_id, $meta_key, true);
        }

        $types = wp_get_post_terms($post_id, self::TAXONOMY, ['fields' => 'all']);
        $image_id = get_post_thumbnail_id($post_id);
        $image = $image_id ? [
            'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: get_the_title($post_id),
            'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail') ?: null,
            'medium' => wp_get_attachment_image_url($image_id, 'medium') ?: null,
            'large' => wp_get_attachment_image_url($image_id, 'large') ?: null,
            'full' => wp_get_attachment_image_url($image_id, 'full') ?: null,
        ] : null;
        $capacity = absint($meta['capacity']);
        $available_seats = self::get_available_seats($post_id);
        $event_status = self::normalized_event_status($meta['event_status'], $meta['start_date']);
        $registration_status = self::normalized_registration_status($meta['registration_status'], $capacity, $available_seats, $event_status);
        $type_name = !is_wp_error($types) && !empty($types) ? $types[0]->name : 'Event';
        $type_slug = !is_wp_error($types) && !empty($types) ? $types[0]->slug : 'event';
        $location = trim(implode(', ', array_filter([$meta['location_name'], $meta['location_address']])));

        return [
            'id' => $post_id,
            'title' => get_the_title($post_id),
            'slug' => get_post_field('post_name', $post_id),
            'description' => apply_filters('the_content', get_post_field('post_content', $post_id)),
            'shortDescription' => (string) ($meta['short_description'] ?: wp_strip_all_tags(get_the_excerpt($post_id))),
            'excerpt' => (string) ($meta['short_description'] ?: wp_strip_all_tags(get_the_excerpt($post_id))),
            'content' => apply_filters('the_content', get_post_field('post_content', $post_id)),
            'date' => (string) $meta['start_date'],
            'date_label' => self::date_label((string) $meta['start_date']),
            'start_date' => (string) $meta['start_date'],
            'start_time' => (string) $meta['start_time'],
            'end_date' => (string) $meta['end_date'],
            'end_time' => (string) $meta['end_time'],
            'time_label' => self::time_label((string) $meta['start_time'], (string) $meta['end_time']),
            'locationType' => (string) ($meta['location_type'] ?: 'online'),
            'locationName' => (string) $meta['location_name'],
            'locationAddress' => (string) $meta['location_address'],
            'onlineUrl' => (string) $meta['online_url'],
            'format' => (string) ($meta['location_type'] ?: 'online'),
            'type' => $type_name,
            'types' => is_wp_error($types) ? [] : array_map(static function (WP_Term $term) {
                return [
                    'id' => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                ];
            }, $types),
            'language' => (string) ($meta['language'] ?: 'fr'),
            'capacity' => $capacity,
            'availableSeats' => $available_seats,
            'registrationStatus' => $registration_status,
            'eventStatus' => $event_status,
            'status' => $registration_status,
            'location' => [
                'name' => (string) $meta['location_name'],
                'address' => (string) $meta['location_address'],
            ],
            'locationLabel' => $location,
            'registration_url' => (string) $meta['registration_url'],
            'price' => (string) $meta['price'],
            'ctaLabel' => $event_status === 'past'
                ? ($meta['language'] === 'en' ? 'Learn more' : 'En savoir plus')
                : (string) ($meta['cta_label'] ?: ($meta['language'] === 'en' ? 'Register' : 'S\'inscrire')),
            'seoTitle' => (string) $meta['seo_title'],
            'metaDescription' => (string) $meta['meta_description'],
            'featuredImage' => $image,
            'image' => $image,
            'featured' => (bool) $meta['featured'],
            'typeSlug' => $type_slug,
            'recapPublished' => self::has_published_pv($post_id),
        ];
    }

    private static function pv_payload(int $post_id): ?array
    {
        $event_id = absint(get_post_meta($post_id, self::PV_META_FIELDS['event_id'], true));
        if ($event_id < 1) {
            return null;
        }
        $event = self::event_payload($event_id);

        // Try new gallery_ids first
        $gallery_ids_raw = (string) get_post_meta($post_id, '_awene_event_pv_gallery_ids', true);
        if ($gallery_ids_raw !== '') {
            $ids = array_filter(array_map('absint', explode(',', $gallery_ids_raw)));
            $gallery = array_values(array_filter(array_map(function ($id) {
                return wp_get_attachment_image_url($id, 'large') ?: wp_get_attachment_url($id);
            }, $ids)));
        } else {
            // Fallback to old newline-separated URLs
            $gallery_raw = preg_split('/\r\n|\r|\n/', (string) get_post_meta($post_id, self::PV_META_FIELDS['gallery'], true)) ?: [];
            $gallery = array_values(array_filter(array_map('trim', $gallery_raw)));
        }

        return [
            'eventId' => $event_id,
            'eventSlug' => $event['slug'],
            'eventStatus' => $event['eventStatus'],
            'pvTitle' => (string) get_post_meta($post_id, self::PV_META_FIELDS['pv_title'], true),
            'shortDescription' => (string) get_post_meta($post_id, self::PV_META_FIELDS['short_description'], true),
            'fullDescription' => wp_kses_post((string) get_post_meta($post_id, self::PV_META_FIELDS['full_description'], true)),
            'keyTakeaways' => (string) get_post_meta($post_id, self::PV_META_FIELDS['key_takeaways'], true),
            'speakerNotes' => (string) get_post_meta($post_id, self::PV_META_FIELDS['speaker_notes'], true),
            'attendanceNotes' => (string) get_post_meta($post_id, self::PV_META_FIELDS['attendance_notes'], true),
            'internalNotes' => (string) get_post_meta($post_id, self::PV_META_FIELDS['internal_notes'], true),
            'publicRecapStatus' => (string) (get_post_meta($post_id, self::PV_META_FIELDS['public_recap_status'], true) ?: 'draft'),
            'pdfUrl' => (string) get_post_meta($post_id, self::PV_META_FIELDS['pdf_url'], true),
            'pdfIsPublic' => (bool) get_post_meta($post_id, self::PV_META_FIELDS['pdf_is_public'], true),
            'videoUrl' => (string) get_post_meta($post_id, self::PV_META_FIELDS['video_url'], true),
            'gallery' => $gallery,
            'externalGalleryUrl' => (string) get_post_meta($post_id, self::PV_META_FIELDS['external_gallery_url'], true),
            'satisfactionFormId' => absint(get_post_meta($post_id, self::PV_META_FIELDS['satisfaction_form_id'], true)),
            'completionStatus' => (string) get_post_meta($post_id, self::PV_META_FIELDS['completion_status'], true),
            'registrationCount' => self::registration_count_for_event($event_id),
            'location' => $event['locationLabel'],
            'eventDate' => $event['date_label'],
            'eventType' => $event['type'],
        ];
    }

    private static function satisfaction_form_payload(int $post_id): array
    {
        $questions = json_decode((string) get_post_meta($post_id, self::SATISFACTION_META_FIELDS['questions'], true), true);
        return [
            'id'                    => $post_id,
            'eventId'               => absint(get_post_meta($post_id, self::SATISFACTION_META_FIELDS['event_id'], true)),
            'title'                 => get_the_title($post_id),
            'introText'             => (string) get_post_meta($post_id, self::SATISFACTION_META_FIELDS['intro_text'], true),
            'thankYouMessage'       => (string) get_post_meta($post_id, self::SATISFACTION_META_FIELDS['thank_you_message'], true),
            'active'                => (bool) get_post_meta($post_id, self::SATISFACTION_META_FIELDS['active'], true),
            'anonymousAllowed'      => (bool) get_post_meta($post_id, self::SATISFACTION_META_FIELDS['anonymous_allowed'], true),
            'requireEmail'          => (bool) get_post_meta($post_id, self::SATISFACTION_META_FIELDS['require_email'], true),
            'language'              => (string) (get_post_meta($post_id, self::SATISFACTION_META_FIELDS['language'], true) ?: 'fr'),
            'pdfAfterSubmissionUrl' => (string) get_post_meta($post_id, self::SATISFACTION_META_FIELDS['pdf_after_submission_url'], true),
            'questions'             => is_array($questions) ? $questions : [],
        ];
    }

    private static function find_pv_by_event_id(int $event_id): ?WP_Post
    {
        $posts = get_posts([
            'post_type' => self::EVENT_PV_POST_TYPE,
            'post_status' => 'publish',
            'numberposts' => 1,
            'meta_query' => [[
                'key' => self::PV_META_FIELDS['event_id'],
                'value' => $event_id,
                'compare' => '=',
            ]],
        ]);

        return $posts[0] ?? null;
    }

    private static function has_published_pv(int $event_id): bool
    {
        $pv = self::find_pv_by_event_id($event_id);
        if (!$pv) {
            return false;
        }
        return (string) get_post_meta($pv->ID, self::PV_META_FIELDS['public_recap_status'], true) === 'published';
    }

    private static function find_satisfaction_form_by_event_id(int $event_id): ?WP_Post
    {
        $posts = get_posts([
            'post_type' => self::SATISFACTION_POST_TYPE,
            'post_status' => 'publish',
            'numberposts' => 1,
            'meta_query' => [[
                'key' => self::SATISFACTION_META_FIELDS['event_id'],
                'value' => $event_id,
                'compare' => '=',
            ]],
        ]);

        return $posts[0] ?? null;
    }

    private static function registration_payload(WP_Post $post): array
    {
        $meta = [];
        foreach (self::REGISTRATION_META_FIELDS as $field => $meta_key) {
            $meta[$field] = get_post_meta($post->ID, $meta_key, true);
        }

        return [
            'id' => $post->ID,
            'eventId' => absint($meta['event_id']),
            'eventTitle' => (string) $meta['event_title'],
            'firstName' => (string) $meta['first_name'],
            'lastName' => (string) $meta['last_name'],
            'email' => (string) $meta['email'],
            'phone' => (string) $meta['phone'],
            'message' => (string) $meta['message'],
            'registrationDate' => (string) $meta['registration_date'],
            'status' => (string) ($meta['status'] ?: 'pending'),
            'source' => (string) ($meta['source'] ?: 'website'),
            'consent' => (bool) $meta['consent'],
            'language' => (string) ($meta['language'] ?: 'fr'),
            'notes' => (string) $meta['notes'],
        ];
    }

    private static function normalized_event_status(string $stored_status, string $start_date): string
    {
        if ($start_date !== '') {
            $today = gmdate('Y-m-d');
            return $start_date < $today ? 'past' : 'upcoming';
        }

        $normalized = strtolower(trim($stored_status));
        if (in_array($normalized, ['upcoming', 'past', 'draft'], true)) {
            return $normalized;
        }

        return 'upcoming';
    }

    private static function normalized_registration_status(string $stored_status, int $capacity, int $available_seats, string $event_status): string
    {
        $normalized = strtolower(trim($stored_status));
        if ($event_status === 'past') {
            return 'closed';
        }
        if (in_array($normalized, ['open', 'full', 'closed'], true)) {
            return $normalized;
        }
        if ($capacity > 0 && $available_seats < 1) {
            return 'full';
        }
        return 'open';
    }

    private static function date_label(string $date): string
    {
        if ($date === '') {
            return 'Date to be confirmed';
        }

        $timestamp = strtotime($date);
        if (!$timestamp) {
            return $date;
        }

        return date_i18n('j F Y', $timestamp);
    }

    private static function time_label(string $start, string $end): string
    {
        if ($start && $end) {
            return $start . ' - ' . $end;
        }

        return $start;
    }
}

Awene_Events_Plugin::init();
register_activation_hook(__FILE__, ['Awene_Events_Plugin', 'activate']);
register_deactivation_hook(__FILE__, ['Awene_Events_Plugin', 'deactivate']);
