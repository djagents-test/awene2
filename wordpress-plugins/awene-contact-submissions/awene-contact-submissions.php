<?php
/**
 * Plugin Name: AWENE Contact Submissions
 * Description: Stores AWENE contact form submissions in WordPress and exposes a headless REST endpoint.
 * Version: 1.0.0
 * Author: OJC LABS
 * Text Domain: awene-contact-submissions
 */

if (!defined('ABSPATH')) {
    exit;
}

final class Awene_Contact_Submissions_Plugin
{
    private const VERSION = '1.0.0';
    private const POST_TYPE = 'awene_contact';
    private const REST_NAMESPACE = 'awene/v1';
    private const META = [
        'first_name' => '_awene_contact_first_name',
        'email' => '_awene_contact_email',
        'subject' => '_awene_contact_subject',
        'source_page' => '_awene_contact_source_page',
        'locale' => '_awene_contact_locale',
        'status' => '_awene_contact_status',
        'ip_hash' => '_awene_contact_ip_hash',
        'user_agent' => '_awene_contact_user_agent',
    ];
    private const STATUSES = [
        'new' => 'Nouveau',
        'reviewed' => 'Lu',
        'replied' => 'Répondu',
        'archived' => 'Archivé',
    ];
    private const META_BOX_NONCE_ACTION = 'awene_contact_meta_save';
    private const META_BOX_NONCE_NAME = 'awene_contact_meta_nonce';
    private const RATE_LIMIT_WINDOW = 900;
    private const RATE_LIMIT_MAX = 3;

    public static function init(): void
    {
        add_action('init', [self::class, 'register_post_type']);
        add_action('init', [self::class, 'register_meta']);
        add_action('rest_api_init', [self::class, 'register_rest_routes']);
        add_action('add_meta_boxes', [self::class, 'add_meta_boxes']);
        add_action('save_post_' . self::POST_TYPE, [self::class, 'save_meta_box']);
        add_filter('manage_' . self::POST_TYPE . '_posts_columns', [self::class, 'columns']);
        add_action('manage_' . self::POST_TYPE . '_posts_custom_column', [self::class, 'column_content'], 10, 2);
    }

    public static function activate(): void
    {
        self::register_post_type();
        flush_rewrite_rules();
    }

    public static function deactivate(): void
    {
        flush_rewrite_rules();
    }

    public static function register_post_type(): void
    {
        register_post_type(self::POST_TYPE, [
            'labels' => [
                'name' => 'Messages contact',
                'singular_name' => 'Message contact',
                'add_new_item' => 'Ajouter un message',
                'edit_item' => 'Modifier le message',
                'new_item' => 'Nouveau message',
                'view_item' => 'Voir le message',
                'search_items' => 'Rechercher des messages',
                'not_found' => 'Aucun message trouvé',
                'menu_name' => 'Messages contact',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => false,
            'menu_icon' => 'dashicons-email-alt',
            'supports' => ['title', 'editor', 'revisions'],
            'capability_type' => 'post',
            'map_meta_cap' => true,
        ]);
    }

    public static function register_meta(): void
    {
        foreach (self::META as $meta_key) {
            register_post_meta(self::POST_TYPE, $meta_key, [
                'type' => 'string',
                'single' => true,
                'show_in_rest' => false,
                'auth_callback' => static function () {
                    return current_user_can('edit_posts');
                },
                'sanitize_callback' => 'sanitize_text_field',
            ]);
        }
    }

    public static function register_rest_routes(): void
    {
        register_rest_route(self::REST_NAMESPACE, '/contact-submissions', [
            'methods' => WP_REST_Server::CREATABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'rest_create_submission'],
        ]);
    }

    public static function rest_create_submission(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        $body = $request->get_json_params();
        if (!is_array($body)) {
            $body = $request->get_body_params();
        }

        $first_name = sanitize_text_field((string) ($body['first_name'] ?? ($body['firstName'] ?? '')));
        $email = sanitize_email((string) ($body['email'] ?? ''));
        $subject = sanitize_text_field((string) ($body['subject'] ?? ''));
        $message = sanitize_textarea_field((string) ($body['message'] ?? ''));
        $source_page = sanitize_text_field((string) ($body['source_page'] ?? 'contact'));
        $locale = sanitize_key((string) ($body['locale'] ?? 'fr'));
        $website = trim((string) ($body['website'] ?? ''));

        if ($website !== '') {
            return new WP_Error('awene_contact_spam', 'Submission rejected.', ['status' => 400]);
        }

        if ($first_name === '' || $email === '' || !is_email($email) || $message === '') {
            return new WP_Error(
                'awene_contact_required_fields',
                'Merci de renseigner un prénom, un email valide et un message.',
                ['status' => 400]
            );
        }

        if (mb_strlen($message) < 10) {
            return new WP_Error(
                'awene_contact_message_too_short',
                'Merci de préciser davantage votre message.',
                ['status' => 400]
            );
        }

        $ip = self::request_ip();
        if (self::rate_limit_exceeded($email, $ip)) {
            return new WP_Error(
                'awene_contact_rate_limited',
                'Merci de reessayer un peu plus tard.',
                ['status' => 429]
            );
        }

        $title = sprintf(
            '%s - %s - %s',
            $first_name,
            ($subject !== '' ? $subject : 'Contact'),
            wp_date('Y-m-d H:i')
        );

        $post_id = wp_insert_post([
            'post_type' => self::POST_TYPE,
            'post_status' => 'private',
            'post_title' => $title,
            'post_content' => $message,
        ], true);

        if (is_wp_error($post_id)) {
            return new WP_Error(
                'awene_contact_insert_failed',
                'Le message n a pas pu etre enregistre.',
                ['status' => 500]
            );
        }

        update_post_meta($post_id, self::META['first_name'], $first_name);
        update_post_meta($post_id, self::META['email'], $email);
        update_post_meta($post_id, self::META['subject'], $subject);
        update_post_meta($post_id, self::META['source_page'], $source_page);
        update_post_meta($post_id, self::META['locale'], $locale ?: 'fr');
        update_post_meta($post_id, self::META['status'], 'new');
        update_post_meta($post_id, self::META['ip_hash'], self::hash_ip($ip));
        update_post_meta($post_id, self::META['user_agent'], sanitize_text_field((string) ($request->get_header('user-agent') ?? '')));

        return rest_ensure_response([
            'success' => true,
            'message' => 'Votre message a bien ete envoye.',
            'submission_id' => (int) $post_id,
            'status' => 'new',
        ]);
    }

    public static function add_meta_boxes(): void
    {
        add_meta_box(
            'awene-contact-details',
            'Détails du message',
            [self::class, 'render_details_box'],
            self::POST_TYPE,
            'normal',
            'high'
        );
    }

    public static function render_details_box(WP_Post $post): void
    {
        wp_nonce_field(self::META_BOX_NONCE_ACTION, self::META_BOX_NONCE_NAME);

        $email = (string) get_post_meta($post->ID, self::META['email'], true);
        $first_name = (string) get_post_meta($post->ID, self::META['first_name'], true);
        $subject = (string) get_post_meta($post->ID, self::META['subject'], true);
        $source_page = (string) get_post_meta($post->ID, self::META['source_page'], true);
        $locale = (string) get_post_meta($post->ID, self::META['locale'], true);
        $status = (string) get_post_meta($post->ID, self::META['status'], true);
        ?>
        <table class="form-table" role="presentation">
            <tbody>
                <tr>
                    <th scope="row"><label for="awene_contact_first_name">Prénom</label></th>
                    <td><input type="text" id="awene_contact_first_name" class="regular-text" value="<?php echo esc_attr($first_name); ?>" readonly /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="awene_contact_email">Email</label></th>
                    <td><input type="email" id="awene_contact_email" class="regular-text" value="<?php echo esc_attr($email); ?>" readonly /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="awene_contact_subject">Sujet</label></th>
                    <td><input type="text" id="awene_contact_subject" class="regular-text" value="<?php echo esc_attr($subject); ?>" readonly /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="awene_contact_source_page">Source</label></th>
                    <td><input type="text" id="awene_contact_source_page" class="regular-text" value="<?php echo esc_attr($source_page); ?>" readonly /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="awene_contact_locale">Locale</label></th>
                    <td><input type="text" id="awene_contact_locale" class="regular-text" value="<?php echo esc_attr($locale); ?>" readonly /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="awene_contact_status">Statut</label></th>
                    <td>
                        <select id="awene_contact_status" name="awene_contact_status">
                            <?php foreach (self::STATUSES as $value => $label) : ?>
                                <option value="<?php echo esc_attr($value); ?>" <?php selected($status, $value); ?>>
                                    <?php echo esc_html($label); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
        <?php
    }

    public static function save_meta_box(int $post_id): void
    {
        if (!isset($_POST[self::META_BOX_NONCE_NAME]) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[self::META_BOX_NONCE_NAME])), self::META_BOX_NONCE_ACTION)) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        $status = sanitize_key((string) ($_POST['awene_contact_status'] ?? 'new'));
        if (!isset(self::STATUSES[$status])) {
            $status = 'new';
        }

        update_post_meta($post_id, self::META['status'], $status);
    }

    public static function columns(array $columns): array
    {
        return [
            'cb' => $columns['cb'] ?? '',
            'title' => 'Message',
            'email' => 'Email',
            'subject' => 'Sujet',
            'source_page' => 'Source',
            'locale' => 'Langue',
            'status' => 'Statut',
            'date' => 'Date',
        ];
    }

    public static function column_content(string $column, int $post_id): void
    {
        switch ($column) {
            case 'email':
                echo esc_html((string) get_post_meta($post_id, self::META['email'], true));
                break;
            case 'subject':
                echo esc_html((string) get_post_meta($post_id, self::META['subject'], true));
                break;
            case 'source_page':
                echo esc_html((string) get_post_meta($post_id, self::META['source_page'], true));
                break;
            case 'locale':
                echo esc_html((string) get_post_meta($post_id, self::META['locale'], true));
                break;
            case 'status':
                $status = (string) get_post_meta($post_id, self::META['status'], true);
                echo esc_html(self::STATUSES[$status] ?? 'Nouveau');
                break;
        }
    }

    private static function request_ip(): string
    {
        $candidates = [
            $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '',
            $_SERVER['REMOTE_ADDR'] ?? '',
        ];

        foreach ($candidates as $candidate) {
            $parts = array_map('trim', explode(',', (string) $candidate));
            foreach ($parts as $part) {
                if ($part !== '' && filter_var($part, FILTER_VALIDATE_IP)) {
                    return $part;
                }
            }
        }

        return '';
    }

    private static function hash_ip(string $ip): string
    {
        return $ip === '' ? '' : wp_hash($ip);
    }

    private static function rate_limit_exceeded(string $email, string $ip): bool
    {
        $key = 'awene_contact_' . md5(strtolower($email) . '|' . $ip);
        $count = (int) get_transient($key);
        if ($count >= self::RATE_LIMIT_MAX) {
            return true;
        }

        set_transient($key, $count + 1, self::RATE_LIMIT_WINDOW);
        return false;
    }
}

Awene_Contact_Submissions_Plugin::init();
register_activation_hook(__FILE__, [Awene_Contact_Submissions_Plugin::class, 'activate']);
register_deactivation_hook(__FILE__, [Awene_Contact_Submissions_Plugin::class, 'deactivate']);
