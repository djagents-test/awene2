<?php
/**
 * Plugin Name: AWENE Formations
 * Description: Training CRM for AWENE formations, registrations, dashboard, settings, and public REST API.
 * Version: 2.0.0
 * Author: OJC LABS
 * Text Domain: awene-formations
 */

if (!defined('ABSPATH')) {
    exit;
}

final class Awene_Formations_Plugin
{
    private const VERSION = '2.0.0';
    private const POST_TYPE = 'formation';
    private const OPTION_KEY = 'awene_formations_settings';
    private const REGISTRATION_TABLE = 'awene_formation_registrations';
    private const META_BOX_NONCE_ACTION = 'awene_formation_save_meta';
    private const META_BOX_NONCE_NAME = 'awene_formation_meta_nonce';
    private const REGISTRATION_ACTION_NONCE = 'awene_registration_admin_action';
    private const SETTINGS_NONCE_ACTION = 'awene_formations_save_settings';
    private const BREVO_OPTION_KEY = 'awene_brevo_notifications_settings';
    private const BREVO_NOTIFY_NONCE = 'awene_formations_brevo_notify_send';
    private const MENU_SLUG_DASHBOARD = 'awene-formations-dashboard';
    private const MENU_SLUG_REGISTRATIONS = 'awene-formations-registrations';
    private const MENU_SLUG_SETTINGS = 'awene-formations-settings';

    private const META_FIELDS = [
        'short_description' => '_awene_formation_short_description',
        'start_date' => '_awene_formation_start_date',
        'start_time' => '_awene_formation_start_time',
        'end_date' => '_awene_formation_end_date',
        'end_time' => '_awene_formation_end_time',
        'duration' => '_awene_formation_duration',
        'format' => '_awene_formation_format',
        'location' => '_awene_formation_location',
        'online_link' => '_awene_formation_online_link',
        'language' => '_awene_formation_language',
        'audience' => '_awene_formation_audience',
        'capacity_total' => '_awene_formation_capacity_total',
        'capacity_remaining' => '_awene_formation_capacity_remaining',
        'registration_link' => '_awene_formation_registration_link',
        'status' => '_awene_formation_status',
        'featured' => '_awene_formation_featured',
        'crm_tag' => '_awene_formation_crm_tag',
        'price' => '_awene_formation_price',
        'trainer_name' => '_awene_formation_trainer_name',
        'what_you_will_learn' => '_awene_formation_what_you_will_learn',
        'who_it_is_for' => '_awene_formation_who_it_is_for',
        'requirements' => '_awene_formation_requirements',
        'confirmation_email_message' => '_awene_formation_confirmation_email_message',
        'admin_notification_email' => '_awene_formation_admin_notification_email',
        'internal_notes' => '_awene_formation_internal_notes',
    ];

    private const FORMATS = [
        'online' => 'En ligne',
        'presentiel' => 'Présentiel',
        'hybride' => 'Hybride',
    ];

    private const LANGUAGES = [
        'fr' => 'Français',
        'ar' => 'Arabe',
        'en' => 'Anglais',
    ];

    private const AUDIENCES = [
        'particuliers' => 'Particuliers',
        'entreprises' => 'Entreprises',
        'professionnels' => 'Professionnels de santé et bien-être',
    ];

    private const FORMATION_STATUSES = [
        'draft_custom' => 'Brouillon',
        'upcoming' => 'À venir',
        'full' => 'Complet',
        'completed' => 'Terminé',
        'cancelled' => 'Annulé',
    ];

    private const REGISTRATION_STATUSES = [
        'new' => 'Nouveau',
        'contacted' => 'Contacté',
        'confirmed' => 'Confirmé',
        'cancelled' => 'Annulé',
        'attended' => 'Présent',
        'no_show' => 'Absent',
    ];

    public static function init(): void
    {
        add_action('init', [self::class, 'register_post_type']);
        add_action('init', [self::class, 'register_meta']);
        add_action('add_meta_boxes', [self::class, 'add_meta_boxes']);
        add_action('save_post_' . self::POST_TYPE, [self::class, 'save_meta']);
        add_action('admin_menu', [self::class, 'register_admin_menu']);
        add_action('admin_init', [self::class, 'handle_admin_requests']);
        add_action('rest_api_init', [self::class, 'register_rest_routes']);
        add_filter('manage_' . self::POST_TYPE . '_posts_columns', [self::class, 'formation_columns']);
        add_action('manage_' . self::POST_TYPE . '_posts_custom_column', [self::class, 'formation_column_content'], 10, 2);
        add_filter('manage_edit-' . self::POST_TYPE . '_sortable_columns', [self::class, 'formation_sortable_columns']);
        add_action('pre_get_posts', [self::class, 'handle_admin_query']);
        add_action('restrict_manage_posts', [self::class, 'render_formation_filters']);
        add_filter('posts_clauses', [self::class, 'maybe_sort_by_registration_count'], 10, 2);
        add_shortcode('awene_formations', [self::class, 'shortcode']);
        add_action('admin_post_awene_formations_send_brevo_campaign', [self::class, 'send_brevo_campaign']);
    }

    public static function activate(): void
    {
        self::register_post_type();
        self::create_or_update_registration_table();
        if (!get_option(self::OPTION_KEY)) {
            add_option(self::OPTION_KEY, self::default_settings(), '', false);
        }
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
                'name' => 'Formations',
                'singular_name' => 'Formation',
                'add_new_item' => 'Ajouter une formation',
                'edit_item' => 'Modifier la formation',
                'new_item' => 'Nouvelle formation',
                'view_item' => 'Voir la formation',
                'search_items' => 'Rechercher des formations',
                'not_found' => 'Aucune formation trouvée',
                'menu_name' => 'Formations',
            ],
            'public' => true,
            'show_in_rest' => true,
            'show_in_menu' => false,
            'rest_base' => 'formations',
            'menu_icon' => 'dashicons-welcome-learn-more',
            'supports' => ['title', 'editor', 'thumbnail', 'revisions'],
            'has_archive' => false,
            'rewrite' => ['slug' => 'formations'],
        ]);
    }

    public static function register_meta(): void
    {
        foreach (self::META_FIELDS as $field => $meta_key) {
            $type = 'string';
            if (in_array($field, ['capacity_total', 'capacity_remaining'], true)) {
                $type = 'integer';
            } elseif ($field === 'featured') {
                $type = 'boolean';
            } elseif ($field === 'audience') {
                $type = 'array';
            }

            register_post_meta(self::POST_TYPE, $meta_key, [
                'type' => $type,
                'single' => true,
                'show_in_rest' => false,
                'auth_callback' => static function () {
                    return current_user_can('edit_posts');
                },
                'sanitize_callback' => [self::class, 'sanitize_meta_value'],
            ]);
        }
    }

    public static function sanitize_meta_value($value, string $meta_key)
    {
        $field = array_search($meta_key, self::META_FIELDS, true);
        if ($field === false) {
            return '';
        }

        switch ($field) {
            case 'short_description':
            case 'what_you_will_learn':
            case 'who_it_is_for':
            case 'requirements':
            case 'confirmation_email_message':
            case 'internal_notes':
                return sanitize_textarea_field((string) $value);

            case 'start_date':
            case 'end_date':
                return self::sanitize_date((string) $value);

            case 'start_time':
            case 'end_time':
                return self::sanitize_time((string) $value);

            case 'capacity_total':
            case 'capacity_remaining':
                return self::sanitize_optional_integer($value);

            case 'featured':
                return !empty($value);

            case 'audience':
                return self::sanitize_audience($value);

            case 'format':
                return self::sanitize_whitelist((string) $value, self::FORMATS, 'online');

            case 'language':
                return self::sanitize_whitelist((string) $value, self::LANGUAGES, 'fr');

            case 'status':
                return self::sanitize_whitelist((string) $value, self::FORMATION_STATUSES, 'upcoming');

            case 'online_link':
            case 'registration_link':
                return esc_url_raw((string) $value);

            case 'admin_notification_email':
                return sanitize_email((string) $value);

            case 'duration':
            case 'location':
            case 'crm_tag':
            case 'price':
            case 'trainer_name':
            default:
                return sanitize_text_field((string) $value);
        }
    }

    private static function default_settings(): array
    {
        return [
            'admin_notification_email' => get_option('admin_email'),
            'default_confirmation_email_text' => "Votre inscription a bien ete prise en compte. L'equipe AWENE vous recontactera bientot.",
            'enable_capacity_auto_reduction' => 1,
            'allow_duplicate_registrations' => 0,
            'privacy_text' => "Vos donnees sont utilisees uniquement pour traiter votre inscription et le suivi AWENE.",
            'crm_email_sender_name' => 'AWENE',
            'crm_email_sender_address' => get_option('admin_email'),
        ];
    }

    private static function settings(): array
    {
        return wp_parse_args((array) get_option(self::OPTION_KEY, []), self::default_settings());
    }

    public static function send_brevo_campaign(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        check_admin_referer(self::BREVO_NOTIFY_NONCE);

        $post_id = absint($_POST['post_id'] ?? 0);
        $post = $post_id ? get_post($post_id) : null;
        if (!$post || $post->post_type !== self::POST_TYPE) {
            wp_die('Formation not found.');
        }

        $settings = self::brevo_settings();
        $api_key = self::brevo_api_key();
        $language = (string) get_post_meta($post_id, self::META_FIELDS['language'], true) ?: 'fr';
        $public_url = esc_url_raw((string) ($_POST['public_url'] ?? self::formation_public_url($post_id, $language, $settings)));
        $list_id = sanitize_text_field((string) ($_POST['list_id'] ?? ''));
        $subject = sanitize_text_field((string) ($_POST['subject'] ?? ''));
        $preview = sanitize_text_field((string) ($_POST['preview_text'] ?? ''));
        $intro = sanitize_textarea_field((string) ($_POST['intro_text'] ?? ''));
        $cta_label = sanitize_text_field((string) ($_POST['cta_label'] ?? ''));
        $redirect = get_edit_post_link($post_id, 'raw') ?: admin_url();

        if (!$api_key || empty($settings['enabled']) || $post->post_status !== 'publish' || !$public_url || !$list_id || !$subject || empty($settings['sender_email'])) {
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
                'sender' => ['name' => $settings['sender_name'], 'email' => $settings['sender_email']],
                'replyTo' => $settings['reply_to_email'] ? ['email' => $settings['reply_to_email']] : null,
                'type' => 'classic',
                'htmlContent' => $html,
                'recipients' => ['listIds' => [(int) $list_id]],
            ]),
            'timeout' => 30,
        ]);

        $log = [
            'campaign_id' => '',
            'list_id' => $list_id,
            'subject' => $subject,
            'status' => 'Failed',
            'sent_at' => current_time('mysql'),
        ];

        if (!is_wp_error($create)) {
            $create_body = json_decode((string) wp_remote_retrieve_body($create), true);
            $campaign_id = (string) ($create_body['id'] ?? '');
            $log['campaign_id'] = $campaign_id;
            if ($campaign_id) {
                $send = wp_remote_post('https://api.brevo.com/v3/emailCampaigns/' . rawurlencode($campaign_id) . '/sendNow', [
                    'headers' => [
                        'api-key' => $api_key,
                        'Content-Type' => 'application/json',
                        'Accept' => 'application/json',
                    ],
                    'body' => wp_json_encode(new stdClass()),
                    'timeout' => 30,
                ]);
                if (!is_wp_error($send) && wp_remote_retrieve_response_code($send) < 300) {
                    $log['status'] = 'Sent';
                }
            }
        }

        $history = get_post_meta($post_id, '_awene_brevo_notification_logs', true);
        $history = is_array($history) ? $history : [];
        $history[] = $log;
        update_post_meta($post_id, '_awene_brevo_notification_logs', $history);

        wp_safe_redirect($redirect);
        exit;
    }

    private static function formation_public_url(int $post_id, string $language, array $settings): string
    {
        $base = untrailingslashit((string) ($settings['public_website_url'] ?: home_url('/')));
        $slug = get_post_field('post_name', $post_id);
        if (!$slug) {
            return '';
        }
        return $base . '/' . ($language === 'en' ? 'en/training/' : 'fr/formations/') . $slug;
    }

    private static function default_list_id_for_language(string $language, array $settings): string
    {
        return (string) ($language === 'en' ? $settings['en_list_id'] : ($language === 'ar' ? $settings['ar_list_id'] : $settings['fr_list_id']));
    }

    private static function notification_defaults(int $post_id, string $language, string $public_url): array
    {
        $title = get_the_title($post_id);
        $is_en = $language === 'en';
        return [
            'subject' => $is_en ? "New AWENE training: {$title}" : "Nouvelle formation AWENE : {$title}",
            'preview' => $is_en ? 'Discover this AWENE training and its practical details.' : 'Découvrez cette formation AWENE et ses informations pratiques.',
            'intro' => $is_en ? 'A new AWENE training is now available. View the programme, details and practical information using the link below.' : 'Une nouvelle formation AWENE est disponible. Consultez le programme, les détails et les modalités depuis le lien ci-dessous.',
            'cta' => $is_en ? 'View training' : 'Voir la formation',
            'url' => $public_url,
        ];
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

    private static function notification_history(int $post_id): array
    {
        $history = get_post_meta($post_id, '_awene_brevo_notification_logs', true);
        return is_array($history) ? $history : [];
    }

    private static function brevo_settings(): array
    {
        return wp_parse_args((array) get_option(self::BREVO_OPTION_KEY, []), [
            'enabled' => 0,
            'sender_name' => 'AWENE',
            'sender_email' => get_option('admin_email'),
            'reply_to_email' => get_option('admin_email'),
            'fr_list_id' => '',
            'en_list_id' => '',
            'ar_list_id' => '',
            'public_website_url' => home_url('/'),
            'campaign_footer' => 'AWENE',
        ]);
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

    public static function add_meta_boxes(): void
    {
        add_meta_box(
            'awene_formation_details',
            'Details de la formation',
            [self::class, 'render_details_box'],
            self::POST_TYPE,
            'normal',
            'high'
        );
        add_meta_box(
            'awene_formation_brevo_notifications',
            'Brevo Notifications',
            [self::class, 'render_brevo_notification_box'],
            self::POST_TYPE,
            'side',
            'high'
        );
    }

    public static function render_details_box(WP_Post $post): void
    {
        wp_nonce_field(self::META_BOX_NONCE_ACTION, self::META_BOX_NONCE_NAME);
        $values = self::meta_values($post->ID);
        $audience = is_array($values['audience']) ? $values['audience'] : [];
        ?>
        <style>
            .awene-formations-section { border: 1px solid #dcdcde; border-radius: 8px; margin: 0 0 18px; padding: 16px; background: #fff; }
            .awene-formations-section h3 { margin: 0 0 14px; font-size: 14px; }
            .awene-formations-grid { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .awene-formations-grid label, .awene-formations-section > label { display: block; font-weight: 600; margin-bottom: 6px; }
            .awene-formations-grid input, .awene-formations-grid select, .awene-formations-grid textarea, .awene-formations-section textarea { width: 100%; }
            .awene-formations-full { grid-column: 1 / -1; }
            .awene-formations-help { color: #646970; display: block; font-size: 12px; margin-top: 4px; }
            .awene-formations-checks label { font-weight: 400; margin-right: 18px; }
            @media (max-width: 782px) { .awene-formations-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="awene-formations-section">
            <h3>Description</h3>
            <label for="awene_formation_short_description">Description courte</label>
            <textarea id="awene_formation_short_description" name="awene_formation_meta[short_description]" rows="4"><?php echo esc_textarea((string) $values['short_description']); ?></textarea>
        </div>

        <div class="awene-formations-section">
            <h3>Planning</h3>
            <div class="awene-formations-grid">
                <?php self::field('start_date', 'Date de debut', 'date', $values['start_date']); ?>
                <?php self::field('start_time', 'Heure de debut', 'time', $values['start_time']); ?>
                <?php self::field('end_date', 'Date de fin', 'date', $values['end_date']); ?>
                <?php self::field('end_time', 'Heure de fin', 'time', $values['end_time']); ?>
                <?php self::field('duration', 'Duree', 'text', $values['duration']); ?>
                <?php self::field('trainer_name', 'Nom du formateur', 'text', $values['trainer_name']); ?>
            </div>
        </div>

        <div class="awene-formations-section">
            <h3>Format et lieu</h3>
            <div class="awene-formations-grid">
                <p>
                    <label for="awene_formation_format">Format</label>
                    <select id="awene_formation_format" name="awene_formation_meta[format]">
                        <?php self::options(self::FORMATS, (string) $values['format']); ?>
                    </select>
                </p>
                <?php self::field('location', 'Lieu', 'text', $values['location']); ?>
                <?php self::field('price', 'Prix', 'text', $values['price']); ?>
                <?php self::field('online_link', 'Lien en ligne', 'url', $values['online_link'], 'awene-formations-full'); ?>
            </div>
        </div>

        <div class="awene-formations-section">
            <h3>Public et langue</h3>
            <div class="awene-formations-grid">
                <p>
                    <label for="awene_formation_language">Langue</label>
                    <select id="awene_formation_language" name="awene_formation_meta[language]">
                        <?php self::options(self::LANGUAGES, (string) $values['language']); ?>
                    </select>
                </p>
                <p>
                    <label>Public cible</label>
                    <span class="awene-formations-checks">
                        <?php foreach (self::AUDIENCES as $key => $label) : ?>
                            <label>
                                <input type="checkbox" name="awene_formation_meta[audience][]" value="<?php echo esc_attr($key); ?>" <?php checked(in_array($key, $audience, true)); ?> />
                                <?php echo esc_html($label); ?>
                            </label>
                        <?php endforeach; ?>
                    </span>
                </p>
                <?php self::textarea_field('what_you_will_learn', 'Ce que vous allez apprendre', $values['what_you_will_learn'], 'awene-formations-full', 4); ?>
                <?php self::textarea_field('who_it_is_for', 'Pour qui', $values['who_it_is_for'], 'awene-formations-full', 4); ?>
                <?php self::textarea_field('requirements', 'Prerequis', $values['requirements'], 'awene-formations-full', 4); ?>
            </div>
        </div>

        <div class="awene-formations-section">
            <h3>Capacite</h3>
            <div class="awene-formations-grid">
                <?php self::field('capacity_total', 'Nombre total de places', 'number', $values['capacity_total']); ?>
                <?php self::field('capacity_remaining', 'Places restantes', 'number', $values['capacity_remaining']); ?>
            </div>
        </div>

        <div class="awene-formations-section">
            <h3>Inscription et CRM</h3>
            <div class="awene-formations-grid">
                <?php self::field('registration_link', 'Lien d inscription externe optionnel', 'url', $values['registration_link']); ?>
                <?php self::field('crm_tag', 'CRM tag', 'text', $values['crm_tag']); ?>
                <?php self::field('admin_notification_email', 'Email notification admin', 'email', $values['admin_notification_email']); ?>
                <p>
                    <label for="awene_formation_status">Statut</label>
                    <select id="awene_formation_status" name="awene_formation_meta[status]">
                        <?php self::options(self::FORMATION_STATUSES, (string) $values['status']); ?>
                    </select>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name="awene_formation_meta[featured]" value="1" <?php checked((bool) $values['featured']); ?> />
                        Formation mise en avant
                    </label>
                </p>
                <?php self::textarea_field('confirmation_email_message', 'Message email de confirmation', $values['confirmation_email_message'], 'awene-formations-full', 5); ?>
            </div>
        </div>

        <div class="awene-formations-section">
            <h3>Notes internes</h3>
            <label for="awene_formation_internal_notes">Notes privees non exposees publiquement</label>
            <textarea id="awene_formation_internal_notes" name="awene_formation_meta[internal_notes]" rows="5"><?php echo esc_textarea((string) $values['internal_notes']); ?></textarea>
        </div>
        <?php
    }

    public static function render_brevo_notification_box(WP_Post $post): void
    {
        $settings = self::brevo_settings();
        $api_key = self::brevo_api_key();
        $language = (string) get_post_meta($post->ID, self::META_FIELDS['language'], true) ?: 'fr';
        $public_url = self::formation_public_url($post->ID, $language, $settings);
        $can_send = current_user_can('manage_options') && $api_key && !empty($settings['enabled']) && $post->post_status === 'publish' && $public_url && get_the_title($post->ID) && $language;
        $history = self::notification_history($post->ID);
        $defaults = self::notification_defaults($post->ID, $language, $public_url);
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
            <p style="color:#646970;"><?php echo esc_html('Last notification: ' . ($last['status'] ?? '') . ' | Campaign ' . ($last['campaign_id'] ?? '-') . ' | ' . ($last['sent_at'] ?? '')); ?></p>
        <?php endif; ?>
        <p><button type="button" class="button" onclick="var panel=this.parentNode.nextElementSibling;panel.style.display=panel.style.display==='none'?'block':'none';"><?php echo esc_html($language === 'en' ? 'Notify your list' : 'Informer votre liste'); ?></button></p>
        <div style="display:none; margin-top:12px;">
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <?php wp_nonce_field(self::BREVO_NOTIFY_NONCE); ?>
                <input type="hidden" name="action" value="awene_formations_send_brevo_campaign" />
                <input type="hidden" name="post_id" value="<?php echo esc_attr((string) $post->ID); ?>" />
                <p><label><?php echo esc_html($language === 'en' ? 'List ID' : 'ID de liste'); ?><br /><input type="text" name="list_id" class="widefat" value="<?php echo esc_attr((string) $list_id); ?>" /></label></p>
                <p><label>Subject<br /><input type="text" name="subject" class="widefat" value="<?php echo esc_attr($defaults['subject']); ?>" /></label></p>
                <p><label>Preview text<br /><input type="text" name="preview_text" class="widefat" value="<?php echo esc_attr($defaults['preview']); ?>" /></label></p>
                <p><label>Intro text<br /><textarea name="intro_text" class="widefat" rows="4"><?php echo esc_textarea($defaults['intro']); ?></textarea></label></p>
                <p><label>CTA label<br /><input type="text" name="cta_label" class="widefat" value="<?php echo esc_attr($defaults['cta']); ?>" /></label></p>
                <p><label>Public page link<br /><input type="url" name="public_url" class="widefat" value="<?php echo esc_attr((string) $public_url); ?>" /></label></p>
                <p><button type="submit" class="button button-primary" <?php disabled(!$can_send); ?>><?php echo esc_html($language === 'en' ? 'Send now' : 'Envoyer maintenant'); ?></button></p>
            </form>
        </div>
        <?php
    }

    private static function field(string $key, string $label, string $type, $value, string $class = ''): void
    {
        printf(
            '<p class="%5$s"><label for="awene_formation_%1$s">%2$s</label><input id="awene_formation_%1$s" type="%3$s" name="awene_formation_meta[%1$s]" value="%4$s" min="0" /></p>',
            esc_attr($key),
            esc_html($label),
            esc_attr($type),
            esc_attr((string) $value),
            esc_attr($class)
        );
    }

    private static function textarea_field(string $key, string $label, $value, string $class = '', int $rows = 4): void
    {
        printf(
            '<p class="%4$s"><label for="awene_formation_%1$s">%2$s</label><textarea id="awene_formation_%1$s" name="awene_formation_meta[%1$s]" rows="%5$d">%3$s</textarea></p>',
            esc_attr($key),
            esc_html($label),
            esc_textarea((string) $value),
            esc_attr($class),
            $rows
        );
    }

    private static function options(array $options, string $current): void
    {
        foreach ($options as $value => $label) {
            printf(
                '<option value="%1$s" %3$s>%2$s</option>',
                esc_attr((string) $value),
                esc_html((string) $label),
                selected($current, (string) $value, false)
            );
        }
    }

    public static function save_meta(int $post_id): void
    {
        if (
            !isset($_POST[self::META_BOX_NONCE_NAME]) ||
            !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[self::META_BOX_NONCE_NAME])), self::META_BOX_NONCE_ACTION) ||
            (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) ||
            !current_user_can('edit_post', $post_id)
        ) {
            return;
        }

        $input = isset($_POST['awene_formation_meta']) && is_array($_POST['awene_formation_meta'])
            ? wp_unslash($_POST['awene_formation_meta'])
            : [];

        $input['featured'] = !empty($input['featured']);
        $input['audience'] = isset($input['audience']) && is_array($input['audience']) ? $input['audience'] : [];
        $total = self::sanitize_optional_integer($input['capacity_total'] ?? '');
        $remaining = self::sanitize_optional_integer($input['capacity_remaining'] ?? '');
        if ($total !== '' && $remaining !== '' && $remaining > $total) {
            $remaining = $total;
        }
        $input['capacity_total'] = $total;
        $input['capacity_remaining'] = $remaining;

        foreach (self::META_FIELDS as $key => $meta_key) {
            $value = $input[$key] ?? '';
            update_post_meta($post_id, $meta_key, self::sanitize_meta_value($value, $meta_key));
        }
    }

    public static function register_admin_menu(): void
    {
        add_menu_page(
            'AWENE Formations',
            'AWENE Formations',
            'edit_posts',
            self::MENU_SLUG_DASHBOARD,
            [self::class, 'render_dashboard_page'],
            'dashicons-welcome-learn-more',
            25
        );

        add_submenu_page(
            self::MENU_SLUG_DASHBOARD,
            'Dashboard',
            'Dashboard',
            'edit_posts',
            self::MENU_SLUG_DASHBOARD,
            [self::class, 'render_dashboard_page']
        );

        add_submenu_page(
            self::MENU_SLUG_DASHBOARD,
            'Formations',
            'Formations',
            'edit_posts',
            'edit.php?post_type=' . self::POST_TYPE
        );

        add_submenu_page(
            self::MENU_SLUG_DASHBOARD,
            'Inscriptions',
            'Inscriptions',
            'edit_posts',
            self::MENU_SLUG_REGISTRATIONS,
            [self::class, 'render_registrations_page']
        );

        add_submenu_page(
            self::MENU_SLUG_DASHBOARD,
            'Reglages',
            'Reglages',
            'edit_posts',
            self::MENU_SLUG_SETTINGS,
            [self::class, 'render_settings_page']
        );
    }

    public static function handle_admin_requests(): void
    {
        if (!is_admin() || !current_user_can('edit_posts')) {
            return;
        }

        self::create_or_update_registration_table();

        $page = isset($_GET['page']) ? sanitize_key((string) wp_unslash($_GET['page'])) : '';

        if ($page === self::MENU_SLUG_SETTINGS && isset($_POST['awene_formations_settings_submit'])) {
            self::save_settings();
        }

        if ($page === self::MENU_SLUG_REGISTRATIONS) {
            self::handle_registration_admin_actions();
        }
    }

    private static function save_settings(): void
    {
        check_admin_referer(self::SETTINGS_NONCE_ACTION);

        $input = isset($_POST['awene_formations_settings']) && is_array($_POST['awene_formations_settings'])
            ? wp_unslash($_POST['awene_formations_settings'])
            : [];

        $settings = [
            'admin_notification_email' => sanitize_email((string) ($input['admin_notification_email'] ?? '')),
            'default_confirmation_email_text' => sanitize_textarea_field((string) ($input['default_confirmation_email_text'] ?? '')),
            'enable_capacity_auto_reduction' => !empty($input['enable_capacity_auto_reduction']) ? 1 : 0,
            'allow_duplicate_registrations' => !empty($input['allow_duplicate_registrations']) ? 1 : 0,
            'privacy_text' => sanitize_textarea_field((string) ($input['privacy_text'] ?? '')),
            'crm_email_sender_name' => sanitize_text_field((string) ($input['crm_email_sender_name'] ?? '')),
            'crm_email_sender_address' => sanitize_email((string) ($input['crm_email_sender_address'] ?? '')),
        ];

        update_option(self::OPTION_KEY, $settings, false);
        add_settings_error('awene_formations', 'settings_updated', 'Reglages enregistres.', 'updated');
    }

    private static function handle_registration_admin_actions(): void
    {
        $action = isset($_REQUEST['crm_action']) ? sanitize_key((string) wp_unslash($_REQUEST['crm_action'])) : '';
        if ($action === '') {
            return;
        }

        check_admin_referer(self::REGISTRATION_ACTION_NONCE);

        if ($action === 'export_csv') {
            self::export_registrations_csv();
        }

        $registration_id = isset($_REQUEST['registration_id']) ? absint($_REQUEST['registration_id']) : 0;
        if ($registration_id <= 0) {
            return;
        }

        if ($action === 'update_registration') {
            self::update_registration_admin($registration_id);
        } elseif ($action === 'delete_registration') {
            self::delete_registration_admin($registration_id);
        }
    }

    private static function update_registration_admin(int $registration_id): void
    {
        global $wpdb;

        $status = isset($_POST['registration_status']) ? sanitize_key((string) wp_unslash($_POST['registration_status'])) : 'new';
        $crm_notes = isset($_POST['crm_notes']) ? sanitize_textarea_field((string) wp_unslash($_POST['crm_notes'])) : '';
        if (!isset(self::REGISTRATION_STATUSES[$status])) {
            $status = 'new';
        }

        $wpdb->update(
            self::table_name(),
            [
                'status' => $status,
                'crm_notes' => $crm_notes,
                'updated_at' => current_time('mysql'),
            ],
            ['id' => $registration_id],
            ['%s', '%s', '%s'],
            ['%d']
        );

        add_settings_error('awene_formations', 'registration_updated', 'Inscription mise a jour.', 'updated');
    }

    private static function delete_registration_admin(int $registration_id): void
    {
        global $wpdb;
        $wpdb->delete(self::table_name(), ['id' => $registration_id], ['%d']);
        add_settings_error('awene_formations', 'registration_deleted', 'Inscription supprimee.', 'updated');
    }

    private static function create_or_update_registration_table(): void
    {
        global $wpdb;

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $table = self::table_name();
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table} (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            formation_id BIGINT UNSIGNED NOT NULL,
            formation_title_snapshot TEXT NOT NULL,
            formation_date_snapshot VARCHAR(20) NOT NULL DEFAULT '',
            first_name VARCHAR(120) NOT NULL DEFAULT '',
            last_name VARCHAR(120) NOT NULL DEFAULT '',
            email VARCHAR(190) NOT NULL DEFAULT '',
            phone VARCHAR(80) NOT NULL DEFAULT '',
            profession VARCHAR(190) NOT NULL DEFAULT '',
            organization VARCHAR(190) NOT NULL DEFAULT '',
            audience_type VARCHAR(80) NOT NULL DEFAULT '',
            message TEXT NULL,
            consent TINYINT(1) NOT NULL DEFAULT 0,
            utm_source VARCHAR(190) NOT NULL DEFAULT '',
            utm_medium VARCHAR(190) NOT NULL DEFAULT '',
            utm_campaign VARCHAR(190) NOT NULL DEFAULT '',
            source_page VARCHAR(80) NOT NULL DEFAULT '',
            status VARCHAR(40) NOT NULL DEFAULT 'new',
            crm_notes TEXT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY  (id),
            KEY formation_id (formation_id),
            KEY email (email),
            KEY status (status),
            KEY created_at (created_at)
        ) {$charset_collate};";

        dbDelta($sql);
        update_option('awene_formations_version', self::VERSION, false);
    }

    private static function table_name(): string
    {
        global $wpdb;
        return $wpdb->prefix . self::REGISTRATION_TABLE;
    }

    public static function render_dashboard_page(): void
    {
        if (!current_user_can('edit_posts')) {
            wp_die('Permission refusee.');
        }

        global $wpdb;
        $table = self::table_name();
        $cards = self::dashboard_metrics();
        $recent = $wpdb->get_results("SELECT * FROM {$table} ORDER BY created_at DESC LIMIT 10", ARRAY_A);
        $performance = self::formations_performance_rows();

        settings_errors('awene_formations');
        ?>
        <div class="wrap">
            <h1>AWENE Formations Dashboard</h1>
            <?php self::render_admin_styles(); ?>
            <div class="awene-crm-cards awene-crm-cards-six">
                <?php foreach ($cards as $label => $value) : ?>
                    <div class="awene-crm-card">
                        <strong><?php echo esc_html((string) $value); ?></strong>
                        <span><?php echo esc_html($label); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>

            <h2>Inscriptions recentes</h2>
            <table class="widefat striped">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Formation</th>
                        <th>Date</th>
                        <th>Statut</th>
                        <th>Cree le</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$recent) : ?>
                        <tr><td colspan="6">Aucune inscription pour le moment.</td></tr>
                    <?php endif; ?>
                    <?php foreach ($recent as $row) : ?>
                        <tr>
                            <td><?php echo esc_html(trim((string) $row['first_name'] . ' ' . (string) $row['last_name'])); ?></td>
                            <td><?php echo esc_html((string) $row['email']); ?></td>
                            <td><?php echo esc_html((string) $row['formation_title_snapshot']); ?></td>
                            <td><?php echo esc_html((string) $row['formation_date_snapshot']); ?></td>
                            <td><?php echo esc_html(self::REGISTRATION_STATUSES[(string) $row['status']] ?? (string) $row['status']); ?></td>
                            <td><?php echo esc_html(mysql2date('d/m/Y H:i', (string) $row['created_at'])); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>

            <h2 style="margin-top: 28px;">Performance des formations</h2>
            <table class="widefat striped">
                <thead>
                    <tr>
                        <th>Formation</th>
                        <th>Date</th>
                        <th>Capacite</th>
                        <th>Inscriptions</th>
                        <th>Places restantes</th>
                        <th>Statut conversion</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$performance) : ?>
                        <tr><td colspan="6">Aucune formation publiee.</td></tr>
                    <?php endif; ?>
                    <?php foreach ($performance as $row) : ?>
                        <tr>
                            <td><a href="<?php echo esc_url(get_edit_post_link((int) $row['id'])); ?>"><?php echo esc_html((string) $row['title']); ?></a></td>
                            <td><?php echo esc_html((string) $row['date']); ?></td>
                            <td><?php echo esc_html((string) $row['capacity']); ?></td>
                            <td><?php echo esc_html((string) $row['registrations']); ?></td>
                            <td><?php echo esc_html((string) $row['remaining']); ?></td>
                            <td><?php echo esc_html((string) $row['conversion']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php
    }

    public static function render_registrations_page(): void
    {
        if (!current_user_can('edit_posts')) {
            wp_die('Permission refusee.');
        }

        settings_errors('awene_formations');

        $registration_id = isset($_GET['registration_id']) ? absint($_GET['registration_id']) : 0;
        if ($registration_id > 0) {
            self::render_single_registration_page($registration_id);
            return;
        }

        [$where_sql, $params, $filters] = self::registration_filters_sql();
        global $wpdb;
        $table = self::table_name();

        $sql = "SELECT * FROM {$table} {$where_sql} ORDER BY created_at DESC LIMIT 250";
        $rows = $params ? $wpdb->get_results($wpdb->prepare($sql, $params), ARRAY_A) : $wpdb->get_results($sql, ARRAY_A);
        $formations = get_posts([
            'post_type' => self::POST_TYPE,
            'post_status' => ['publish', 'draft'],
            'numberposts' => -1,
            'orderby' => 'title',
            'order' => 'ASC',
        ]);
        ?>
        <div class="wrap">
            <h1>Inscriptions</h1>
            <?php self::render_admin_styles(); ?>
            <form method="get" class="awene-filters">
                <input type="hidden" name="page" value="<?php echo esc_attr(self::MENU_SLUG_REGISTRATIONS); ?>" />
                <select name="formation_id">
                    <option value="">Toutes les formations</option>
                    <?php foreach ($formations as $formation) : ?>
                        <option value="<?php echo esc_attr((string) $formation->ID); ?>" <?php selected($filters['formation_id'], (string) $formation->ID); ?>>
                            <?php echo esc_html(get_the_title($formation)); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                <select name="status">
                    <option value="">Tous les statuts</option>
                    <?php foreach (self::REGISTRATION_STATUSES as $status => $label) : ?>
                        <option value="<?php echo esc_attr($status); ?>" <?php selected($filters['status'], $status); ?>><?php echo esc_html($label); ?></option>
                    <?php endforeach; ?>
                </select>
                <select name="audience_type">
                    <option value="">Tous les publics</option>
                    <?php foreach (self::AUDIENCES as $audience => $label) : ?>
                        <option value="<?php echo esc_attr($audience); ?>" <?php selected($filters['audience_type'], $audience); ?>><?php echo esc_html($label); ?></option>
                    <?php endforeach; ?>
                </select>
                <input type="date" name="date_from" value="<?php echo esc_attr($filters['date_from']); ?>" />
                <input type="date" name="date_to" value="<?php echo esc_attr($filters['date_to']); ?>" />
                <?php submit_button('Filtrer', 'secondary', '', false); ?>
            </form>

            <form method="post" style="margin: 16px 0 22px;">
                <?php wp_nonce_field(self::REGISTRATION_ACTION_NONCE); ?>
                <input type="hidden" name="page" value="<?php echo esc_attr(self::MENU_SLUG_REGISTRATIONS); ?>" />
                <input type="hidden" name="crm_action" value="export_csv" />
                <input type="hidden" name="formation_id" value="<?php echo esc_attr($filters['formation_id']); ?>" />
                <input type="hidden" name="status" value="<?php echo esc_attr($filters['status']); ?>" />
                <input type="hidden" name="audience_type" value="<?php echo esc_attr($filters['audience_type']); ?>" />
                <input type="hidden" name="date_from" value="<?php echo esc_attr($filters['date_from']); ?>" />
                <input type="hidden" name="date_to" value="<?php echo esc_attr($filters['date_to']); ?>" />
                <?php submit_button('Exporter CSV', 'secondary', '', false); ?>
            </form>

            <table class="widefat striped">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th>Formation</th>
                        <th>Audience</th>
                        <th>Statut</th>
                        <th>Cree le</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$rows) : ?>
                        <tr><td colspan="7">Aucune inscription trouvee.</td></tr>
                    <?php endif; ?>
                    <?php foreach ($rows as $row) : ?>
                        <tr>
                            <td><a href="<?php echo esc_url(admin_url('admin.php?page=' . self::MENU_SLUG_REGISTRATIONS . '&registration_id=' . absint($row['id']))); ?>"><?php echo esc_html(trim((string) $row['first_name'] . ' ' . (string) $row['last_name'])); ?></a></td>
                            <td><?php echo esc_html((string) $row['email']); ?></td>
                            <td><?php echo esc_html((string) $row['phone']); ?></td>
                            <td><?php echo esc_html((string) $row['formation_title_snapshot']); ?></td>
                            <td><?php echo esc_html(self::AUDIENCES[(string) $row['audience_type']] ?? (string) $row['audience_type']); ?></td>
                            <td><?php echo esc_html(self::REGISTRATION_STATUSES[(string) $row['status']] ?? (string) $row['status']); ?></td>
                            <td><?php echo esc_html(mysql2date('d/m/Y H:i', (string) $row['created_at'])); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php
    }

    private static function render_single_registration_page(int $registration_id): void
    {
        global $wpdb;
        $row = $wpdb->get_row($wpdb->prepare('SELECT * FROM ' . self::table_name() . ' WHERE id = %d', $registration_id), ARRAY_A);
        if (!$row) {
            wp_die('Inscription introuvable.');
        }

        ?>
        <div class="wrap">
            <h1>Inscription #<?php echo esc_html((string) $registration_id); ?></h1>
            <?php self::render_admin_styles(); ?>
            <table class="form-table">
                <tbody>
                    <?php self::registration_detail_row('Formation', '<a href="' . esc_url(get_edit_post_link((int) $row['formation_id'])) . '">' . esc_html((string) $row['formation_title_snapshot']) . '</a>'); ?>
                    <?php self::registration_detail_row('Date formation', esc_html((string) $row['formation_date_snapshot'])); ?>
                    <?php self::registration_detail_row('Nom', esc_html(trim((string) $row['first_name'] . ' ' . (string) $row['last_name']))); ?>
                    <?php self::registration_detail_row('Email', esc_html((string) $row['email'])); ?>
                    <?php self::registration_detail_row('Telephone', esc_html((string) $row['phone'])); ?>
                    <?php self::registration_detail_row('Profession', esc_html((string) $row['profession'])); ?>
                    <?php self::registration_detail_row('Organisation', esc_html((string) $row['organization'])); ?>
                    <?php self::registration_detail_row('Audience', esc_html(self::AUDIENCES[(string) $row['audience_type']] ?? (string) $row['audience_type'])); ?>
                    <?php self::registration_detail_row('Message', nl2br(esc_html((string) $row['message']))); ?>
                    <?php self::registration_detail_row('UTM source', esc_html((string) $row['utm_source'])); ?>
                    <?php self::registration_detail_row('UTM medium', esc_html((string) $row['utm_medium'])); ?>
                    <?php self::registration_detail_row('UTM campaign', esc_html((string) $row['utm_campaign'])); ?>
                    <?php self::registration_detail_row('Source page', esc_html((string) $row['source_page'])); ?>
                </tbody>
            </table>

            <form method="post" style="max-width: 720px; margin-top: 20px;">
                <?php wp_nonce_field(self::REGISTRATION_ACTION_NONCE); ?>
                <input type="hidden" name="page" value="<?php echo esc_attr(self::MENU_SLUG_REGISTRATIONS); ?>" />
                <input type="hidden" name="registration_id" value="<?php echo esc_attr((string) $registration_id); ?>" />
                <input type="hidden" name="crm_action" value="update_registration" />
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="registration_status">Statut</label></th>
                        <td>
                            <select id="registration_status" name="registration_status">
                                <?php self::options(self::REGISTRATION_STATUSES, (string) $row['status']); ?>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="crm_notes">Notes CRM</label></th>
                        <td>
                            <textarea id="crm_notes" name="crm_notes" rows="6" class="large-text"><?php echo esc_textarea((string) $row['crm_notes']); ?></textarea>
                        </td>
                    </tr>
                </table>
                <?php submit_button('Mettre a jour'); ?>
            </form>

            <form method="post" onsubmit="return confirm('Supprimer cette inscription ?');" style="margin-top: 16px;">
                <?php wp_nonce_field(self::REGISTRATION_ACTION_NONCE); ?>
                <input type="hidden" name="page" value="<?php echo esc_attr(self::MENU_SLUG_REGISTRATIONS); ?>" />
                <input type="hidden" name="registration_id" value="<?php echo esc_attr((string) $registration_id); ?>" />
                <input type="hidden" name="crm_action" value="delete_registration" />
                <?php submit_button('Supprimer', 'delete', '', false); ?>
            </form>
        </div>
        <?php
    }

    private static function registration_detail_row(string $label, string $value): void
    {
        echo '<tr><th scope="row">' . esc_html($label) . '</th><td>' . $value . '</td></tr>';
    }

    public static function render_settings_page(): void
    {
        if (!current_user_can('edit_posts')) {
            wp_die('Permission refusee.');
        }

        $settings = self::settings();
        settings_errors('awene_formations');
        ?>
        <div class="wrap">
            <h1>Reglages AWENE Formations</h1>
            <form method="post">
                <?php wp_nonce_field(self::SETTINGS_NONCE_ACTION); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="admin_notification_email">Email notification admin</label></th>
                        <td><input id="admin_notification_email" name="awene_formations_settings[admin_notification_email]" type="email" class="regular-text" value="<?php echo esc_attr((string) $settings['admin_notification_email']); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="default_confirmation_email_text">Texte email confirmation par defaut</label></th>
                        <td><textarea id="default_confirmation_email_text" name="awene_formations_settings[default_confirmation_email_text]" rows="6" class="large-text"><?php echo esc_textarea((string) $settings['default_confirmation_email_text']); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Reduction auto des places</th>
                        <td><label><input type="checkbox" name="awene_formations_settings[enable_capacity_auto_reduction]" value="1" <?php checked(!empty($settings['enable_capacity_auto_reduction'])); ?> /> Activer</label></td>
                    </tr>
                    <tr>
                        <th scope="row">Autoriser les doublons</th>
                        <td><label><input type="checkbox" name="awene_formations_settings[allow_duplicate_registrations]" value="1" <?php checked(!empty($settings['allow_duplicate_registrations'])); ?> /> Activer</label></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="privacy_text">Texte de confidentialite</label></th>
                        <td><textarea id="privacy_text" name="awene_formations_settings[privacy_text]" rows="5" class="large-text"><?php echo esc_textarea((string) $settings['privacy_text']); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="crm_email_sender_name">Nom expediteur email CRM</label></th>
                        <td><input id="crm_email_sender_name" name="awene_formations_settings[crm_email_sender_name]" type="text" class="regular-text" value="<?php echo esc_attr((string) $settings['crm_email_sender_name']); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="crm_email_sender_address">Adresse expediteur email CRM</label></th>
                        <td><input id="crm_email_sender_address" name="awene_formations_settings[crm_email_sender_address]" type="email" class="regular-text" value="<?php echo esc_attr((string) $settings['crm_email_sender_address']); ?>" /></td>
                    </tr>
                </table>
                <p class="submit">
                    <button type="submit" name="awene_formations_settings_submit" class="button button-primary">Enregistrer les reglages</button>
                </p>
            </form>
        </div>
        <?php
    }

    private static function render_admin_styles(): void
    {
        ?>
        <style>
            .awene-crm-cards { display: grid; gap: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 18px 0 26px; }
            .awene-crm-cards-six { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .awene-crm-card { background: #fff; border: 1px solid #dcdcde; border-radius: 8px; padding: 18px; }
            .awene-crm-card strong { display: block; font-size: 28px; line-height: 1.1; margin-bottom: 6px; color: #4b1f7a; }
            .awene-crm-card span { color: #646970; }
            .awene-filters { display: flex; gap: 10px; flex-wrap: wrap; margin: 18px 0; align-items: center; }
            .awene-filters select, .awene-filters input { min-width: 180px; }
            @media (max-width: 782px) { .awene-crm-cards, .awene-crm-cards-six { grid-template-columns: 1fr; } }
        </style>
        <?php
    }

    private static function dashboard_metrics(): array
    {
        global $wpdb;

        $table = self::table_name();
        $today = current_time('Y-m-d');
        $week_start = gmdate('Y-m-d H:i:s', strtotime('-7 days', current_time('timestamp')));

        $total_formations = (int) wp_count_posts(self::POST_TYPE)->publish;
        $upcoming_formations = (int) (new WP_Query([
            'post_type' => self::POST_TYPE,
            'post_status' => 'publish',
            'fields' => 'ids',
            'posts_per_page' => 1,
            'meta_query' => [[
                'key' => self::META_FIELDS['start_date'],
                'value' => $today,
                'compare' => '>=',
                'type' => 'DATE',
            ]],
        ]))->found_posts;
        $full_formations = (int) (new WP_Query([
            'post_type' => self::POST_TYPE,
            'post_status' => 'publish',
            'fields' => 'ids',
            'posts_per_page' => 1,
            'meta_query' => [[
                'key' => self::META_FIELDS['status'],
                'value' => 'full',
                'compare' => '=',
            ]],
        ]))->found_posts;
        $total_registrations = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table}");
        $week_registrations = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$table} WHERE created_at >= %s", $week_start));

        $remaining_total = 0;
        $formation_ids = get_posts([
            'post_type' => self::POST_TYPE,
            'post_status' => 'publish',
            'fields' => 'ids',
            'numberposts' => -1,
        ]);
        foreach ($formation_ids as $formation_id) {
            $meta = self::meta_values((int) $formation_id);
            if ($meta['capacity_remaining'] !== '') {
                $remaining_total += absint($meta['capacity_remaining']);
            }
        }

        return [
            'Total formations' => $total_formations,
            'Formations a venir' => $upcoming_formations,
            'Total inscriptions' => $total_registrations,
            'Inscriptions cette semaine' => $week_registrations,
            'Formations completes' => $full_formations,
            'Places restantes total' => $remaining_total,
        ];
    }

    private static function formations_performance_rows(): array
    {
        $formations = get_posts([
            'post_type' => self::POST_TYPE,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => 'meta_value',
            'meta_key' => self::META_FIELDS['start_date'],
            'order' => 'ASC',
        ]);

        $rows = [];
        foreach ($formations as $formation) {
            $meta = self::meta_values((int) $formation->ID);
            $remaining = $meta['capacity_remaining'] === '' ? '-' : (string) absint($meta['capacity_remaining']);
            $total = $meta['capacity_total'] === '' ? '-' : (string) absint($meta['capacity_total']);
            $rows[] = [
                'id' => (int) $formation->ID,
                'title' => get_the_title($formation),
                'date' => self::date_label($meta),
                'capacity' => $remaining === '-' && $total === '-' ? '-' : $remaining . ' / ' . $total,
                'registrations' => self::registration_count((int) $formation->ID),
                'remaining' => $remaining,
                'conversion' => self::formation_conversion_status($meta),
            ];
        }

        return $rows;
    }

    private static function formation_conversion_status(array $meta): string
    {
        $status = (string) ($meta['status'] ?? 'upcoming');
        if ($status === 'full') {
            return 'Complet';
        }
        if ($status === 'completed') {
            return 'Terminee';
        }
        if ($status === 'cancelled') {
            return 'Annulee';
        }
        if ($meta['capacity_total'] !== '' && $meta['capacity_remaining'] === 0) {
            return 'Complet';
        }
        return 'Ouverte';
    }

    private static function registration_filters_sql(): array
    {
        $where = [];
        $params = [];
        $filters = [
            'formation_id' => isset($_REQUEST['formation_id']) ? sanitize_text_field((string) wp_unslash($_REQUEST['formation_id'])) : '',
            'status' => isset($_REQUEST['status']) ? sanitize_key((string) wp_unslash($_REQUEST['status'])) : '',
            'audience_type' => isset($_REQUEST['audience_type']) ? sanitize_key((string) wp_unslash($_REQUEST['audience_type'])) : '',
            'date_from' => isset($_REQUEST['date_from']) ? self::sanitize_date((string) wp_unslash($_REQUEST['date_from'])) : '',
            'date_to' => isset($_REQUEST['date_to']) ? self::sanitize_date((string) wp_unslash($_REQUEST['date_to'])) : '',
        ];

        if ($filters['formation_id'] !== '') {
            $where[] = 'formation_id = %d';
            $params[] = absint($filters['formation_id']);
        }
        if ($filters['status'] !== '' && isset(self::REGISTRATION_STATUSES[$filters['status']])) {
            $where[] = 'status = %s';
            $params[] = $filters['status'];
        }
        if ($filters['audience_type'] !== '' && isset(self::AUDIENCES[$filters['audience_type']])) {
            $where[] = 'audience_type = %s';
            $params[] = $filters['audience_type'];
        }
        if ($filters['date_from'] !== '') {
            $where[] = 'DATE(created_at) >= %s';
            $params[] = $filters['date_from'];
        }
        if ($filters['date_to'] !== '') {
            $where[] = 'DATE(created_at) <= %s';
            $params[] = $filters['date_to'];
        }

        return [$where ? 'WHERE ' . implode(' AND ', $where) : '', $params, $filters];
    }

    private static function export_registrations_csv(): void
    {
        global $wpdb;
        [$where_sql, $params] = self::registration_filters_sql();
        $sql = 'SELECT * FROM ' . self::table_name() . ' ' . $where_sql . ' ORDER BY created_at DESC';
        $rows = $params ? $wpdb->get_results($wpdb->prepare($sql, $params), ARRAY_A) : $wpdb->get_results($sql, ARRAY_A);

        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=awene-registrations-' . gmdate('Ymd-His') . '.csv');

        $output = fopen('php://output', 'w');
        if ($output === false) {
            exit;
        }

        fputcsv($output, ['id', 'formation_id', 'formation_title', 'formation_date', 'first_name', 'last_name', 'email', 'phone', 'profession', 'organization', 'audience_type', 'status', 'source_page', 'utm_source', 'utm_medium', 'utm_campaign', 'created_at']);
        foreach ($rows as $row) {
            fputcsv($output, [
                $row['id'],
                $row['formation_id'],
                $row['formation_title_snapshot'],
                $row['formation_date_snapshot'],
                $row['first_name'],
                $row['last_name'],
                $row['email'],
                $row['phone'],
                $row['profession'],
                $row['organization'],
                $row['audience_type'],
                $row['status'],
                $row['source_page'],
                $row['utm_source'],
                $row['utm_medium'],
                $row['utm_campaign'],
                $row['created_at'],
            ]);
        }

        fclose($output);
        exit;
    }

    public static function register_rest_routes(): void
    {
        register_rest_route('awene/v1', '/formations', [
            'methods' => WP_REST_Server::READABLE,
            'permission_callback' => '__return_true',
            'args' => [
                'status' => ['sanitize_callback' => 'sanitize_key'],
                'format' => ['sanitize_callback' => 'sanitize_key'],
                'language' => ['sanitize_callback' => 'sanitize_key'],
                'audience' => ['sanitize_callback' => 'sanitize_key'],
                'featured' => ['sanitize_callback' => 'rest_sanitize_boolean'],
                'upcoming_only' => ['sanitize_callback' => 'rest_sanitize_boolean', 'default' => false],
                'limit' => ['sanitize_callback' => 'absint', 'default' => 20],
                'page' => ['sanitize_callback' => 'absint', 'default' => 1],
            ],
            'callback' => [self::class, 'rest_formations'],
        ]);

        register_rest_route('awene/v1', '/formations/(?P<id>\d+)', [
            'methods' => WP_REST_Server::READABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'rest_formation'],
        ]);

        register_rest_route('awene/v1', '/formations/slug/(?P<slug>[a-zA-Z0-9_-]+)', [
            'methods' => WP_REST_Server::READABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'rest_formation_by_slug'],
        ]);

        register_rest_route('awene/v1', '/formations/(?P<id>\d+)/register', [
            'methods' => WP_REST_Server::CREATABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'rest_register_formation'],
        ]);

        register_rest_route('awene/v1', '/formations/(?P<id>\d+)/registrations', [
            'methods' => WP_REST_Server::CREATABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'rest_register_formation'],
        ]);
    }

    public static function rest_formations(WP_REST_Request $request): WP_REST_Response
    {
        $limit = min(100, max(1, (int) $request->get_param('limit')));
        $page = max(1, (int) $request->get_param('page'));
        $query = new WP_Query([
            'post_type' => self::POST_TYPE,
            'post_status' => 'publish',
            'posts_per_page' => $limit,
            'paged' => $page,
            'meta_query' => self::rest_meta_query($request),
        ]);

        $items = array_map(static fn (WP_Post $post) => self::formation_payload((int) $post->ID), $query->posts);
        usort($items, [self::class, 'sort_payloads']);

        $response = rest_ensure_response($items);
        $response->header('X-WP-Total', (string) $query->found_posts);
        $response->header('X-WP-TotalPages', (string) $query->max_num_pages);
        return $response;
    }

    public static function rest_formation(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        $post_id = absint($request->get_param('id'));
        $post = get_post($post_id);
        if (!$post || $post->post_type !== self::POST_TYPE || $post->post_status !== 'publish') {
            return new WP_Error('awene_formation_not_found', 'Formation not found.', ['status' => 404]);
        }
        return rest_ensure_response(self::formation_payload($post_id));
    }

    public static function rest_formation_by_slug(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        $slug = sanitize_title((string) $request->get_param('slug'));
        $post = get_page_by_path($slug, OBJECT, self::POST_TYPE);
        if (!$post || $post->post_type !== self::POST_TYPE || $post->post_status !== 'publish') {
            return new WP_Error('awene_formation_not_found', 'Formation not found.', ['status' => 404]);
        }
        return rest_ensure_response(self::formation_payload((int) $post->ID));
    }

    public static function rest_register_formation(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        global $wpdb;

        $post_id = absint($request->get_param('id'));
        $post = get_post($post_id);
        if (!$post || $post->post_type !== self::POST_TYPE || $post->post_status !== 'publish') {
            return new WP_Error('awene_formation_not_found', 'Formation not found.', ['status' => 404]);
        }

        $nonce = $request->get_header('X-WP-Nonce');
        if ($nonce && !wp_verify_nonce($nonce, 'wp_rest')) {
            return new WP_Error('awene_invalid_nonce', 'Nonce invalide.', ['status' => 403]);
        }

        $meta = self::meta_values($post_id);
        if ((string) $meta['status'] !== 'upcoming') {
            $error = (string) $meta['status'] === 'full' ? 'Formation complete.' : (((string) $meta['status'] === 'cancelled') ? 'Formation annulee.' : 'Formation non disponible.');
            return new WP_Error('awene_formation_unavailable', $error, ['status' => 409]);
        }

        $remaining = $meta['capacity_remaining'] === '' ? null : absint($meta['capacity_remaining']);
        if ($remaining !== null && $remaining <= 0) {
            return new WP_Error('awene_formation_full', 'Formation complete.', ['status' => 409]);
        }

        $body = $request->get_json_params();
        if (!is_array($body)) {
            $body = $request->get_body_params();
        }

        $first_name = sanitize_text_field((string) ($body['first_name'] ?? ($body['firstName'] ?? '')));
        $last_name = sanitize_text_field((string) ($body['last_name'] ?? ($body['lastName'] ?? '')));
        $email = sanitize_email((string) ($body['email'] ?? ''));
        $phone = sanitize_text_field((string) ($body['phone'] ?? ''));
        $profession = sanitize_text_field((string) ($body['profession'] ?? ''));
        $organization = sanitize_text_field((string) ($body['organization'] ?? ($body['profession_or_organization'] ?? '')));
        $audience_type = sanitize_key((string) ($body['audience_type'] ?? ($body['audienceType'] ?? '')));
        $message = sanitize_textarea_field((string) ($body['message'] ?? ''));
        $consent = rest_sanitize_boolean($body['consent'] ?? false);
        $source_page = sanitize_key((string) ($body['source_page'] ?? 'single_formation'));
        $utm_source = sanitize_text_field((string) ($body['utm_source'] ?? ''));
        $utm_medium = sanitize_text_field((string) ($body['utm_medium'] ?? ''));
        $utm_campaign = sanitize_text_field((string) ($body['utm_campaign'] ?? ''));

        if ($first_name === '' || $last_name === '' || $email === '' || !is_email($email)) {
            return new WP_Error('awene_registration_required_fields', 'Merci de renseigner un nom et un email valide.', ['status' => 400]);
        }

        if (!$consent) {
            return new WP_Error('awene_registration_consent_required', 'Le consentement est requis.', ['status' => 400]);
        }

        if ($audience_type !== '' && !isset(self::AUDIENCES[$audience_type])) {
            $audience_type = '';
        }

        $settings = self::settings();
        if (empty($settings['allow_duplicate_registrations']) && self::registration_exists_for_email($post_id, $email)) {
            return new WP_Error('awene_duplicate_registration', 'Une inscription existe deja pour cet email sur cette formation.', ['status' => 409]);
        }

        if (self::rate_limit_exceeded($post_id, $email)) {
            return new WP_Error('awene_registration_rate_limited', 'Merci de reessayer plus tard.', ['status' => 429]);
        }

        $inserted = $wpdb->insert(
            self::table_name(),
            [
                'formation_id' => $post_id,
                'formation_title_snapshot' => get_the_title($post_id),
                'formation_date_snapshot' => (string) $meta['start_date'],
                'first_name' => $first_name,
                'last_name' => $last_name,
                'email' => $email,
                'phone' => $phone,
                'profession' => $profession,
                'organization' => $organization,
                'audience_type' => $audience_type,
                'message' => $message,
                'consent' => $consent ? 1 : 0,
                'utm_source' => $utm_source,
                'utm_medium' => $utm_medium,
                'utm_campaign' => $utm_campaign,
                'source_page' => $source_page,
                'status' => 'new',
                'crm_notes' => '',
                'created_at' => current_time('mysql'),
                'updated_at' => current_time('mysql'),
            ],
            ['%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s']
        );

        if (!$inserted) {
            return new WP_Error('awene_registration_insert_failed', 'L inscription n a pas pu etre enregistree.', ['status' => 500]);
        }

        if (!empty($settings['enable_capacity_auto_reduction']) && $remaining !== null && $remaining > 0) {
            update_post_meta($post_id, self::META_FIELDS['capacity_remaining'], max(0, $remaining - 1));
        }

        self::maybe_send_admin_notification($post_id, $meta, [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'phone' => $phone,
            'profession' => $profession,
            'organization' => $organization,
            'audience_type' => $audience_type,
            'message' => $message,
        ]);
        self::maybe_send_confirmation_email($post_id, $meta, $email, $first_name);

        return rest_ensure_response([
            'success' => true,
            'message' => "Votre inscription a bien ete envoyee. L'equipe AWENE vous contactera bientot.",
            'registration_id' => (int) $wpdb->insert_id,
            'formation_id' => $post_id,
            'formation_title' => get_the_title($post_id),
            'status' => 'new',
        ]);
    }

    private static function maybe_send_admin_notification(int $post_id, array $meta, array $registration): void
    {
        $settings = self::settings();
        $recipient = (string) ($meta['admin_notification_email'] ?: $settings['admin_notification_email']);
        if ($recipient === '' || !is_email($recipient)) {
            return;
        }

        $subject = 'Nouvelle inscription AWENE - ' . get_the_title($post_id);
        $body = "Formation: " . get_the_title($post_id) . "\n"
            . "Date: " . (string) $meta['start_date'] . "\n"
            . "Nom: " . $registration['first_name'] . ' ' . $registration['last_name'] . "\n"
            . "Email: " . $registration['email'] . "\n"
            . "Telephone: " . $registration['phone'] . "\n"
            . "Profession: " . $registration['profession'] . "\n"
            . "Organisation: " . $registration['organization'] . "\n"
            . "Audience: " . (self::AUDIENCES[$registration['audience_type']] ?? $registration['audience_type']) . "\n"
            . "Message: " . $registration['message'];

        self::send_mail($recipient, $subject, $body);
    }

    private static function maybe_send_confirmation_email(int $post_id, array $meta, string $email, string $first_name): void
    {
        if ($email === '' || !is_email($email)) {
            return;
        }

        $settings = self::settings();
        $message = trim((string) ($meta['confirmation_email_message'] ?: $settings['default_confirmation_email_text']));
        if ($message === '') {
            return;
        }

        $subject = 'Confirmation inscription - ' . get_the_title($post_id);
        $body = "Bonjour {$first_name},\n\n" . $message . "\n\nFormation: " . get_the_title($post_id);
        self::send_mail($email, $subject, $body);
    }

    private static function send_mail(string $to, string $subject, string $message): void
    {
        $settings = self::settings();
        $headers = [];
        $name = trim((string) $settings['crm_email_sender_name']);
        $address = trim((string) $settings['crm_email_sender_address']);
        if ($address !== '' && is_email($address)) {
            $headers[] = 'From: ' . ($name !== '' ? $name . ' <' . $address . '>' : $address);
        }
        wp_mail($to, $subject, $message, $headers);
    }

    private static function registration_exists_for_email(int $formation_id, string $email): bool
    {
        global $wpdb;
        $count = (int) $wpdb->get_var($wpdb->prepare(
            'SELECT COUNT(*) FROM ' . self::table_name() . ' WHERE formation_id = %d AND email = %s',
            $formation_id,
            $email
        ));
        return $count > 0;
    }

    private static function rate_limit_exceeded(int $formation_id, string $email): bool
    {
        global $wpdb;
        $window_start = gmdate('Y-m-d H:i:s', strtotime('-1 hour', current_time('timestamp')));
        $count = (int) $wpdb->get_var($wpdb->prepare(
            'SELECT COUNT(*) FROM ' . self::table_name() . ' WHERE formation_id = %d AND email = %s AND created_at >= %s',
            $formation_id,
            $email,
            $window_start
        ));
        return $count >= 3;
    }

    private static function rest_meta_query(WP_REST_Request $request): array
    {
        $meta_query = [];

        $status = (string) $request->get_param('status');
        if ($status !== '' && isset(self::FORMATION_STATUSES[$status])) {
            $meta_query[] = ['key' => self::META_FIELDS['status'], 'value' => $status, 'compare' => '='];
        }

        $format = (string) $request->get_param('format');
        if ($format !== '' && isset(self::FORMATS[$format])) {
            $meta_query[] = ['key' => self::META_FIELDS['format'], 'value' => $format, 'compare' => '='];
        }

        $language = (string) $request->get_param('language');
        if ($language !== '' && isset(self::LANGUAGES[$language])) {
            $meta_query[] = ['key' => self::META_FIELDS['language'], 'value' => $language, 'compare' => '='];
        }

        $audience = (string) $request->get_param('audience');
        if ($audience !== '' && isset(self::AUDIENCES[$audience])) {
            $meta_query[] = ['key' => self::META_FIELDS['audience'], 'value' => '"' . $audience . '"', 'compare' => 'LIKE'];
        }

        if ($request->has_param('featured')) {
            $meta_query[] = ['key' => self::META_FIELDS['featured'], 'value' => rest_sanitize_boolean($request->get_param('featured')) ? '1' : '0', 'compare' => '='];
        }

        if ($request->get_param('upcoming_only')) {
            $meta_query[] = ['key' => self::META_FIELDS['start_date'], 'value' => current_time('Y-m-d'), 'compare' => '>=', 'type' => 'DATE'];
        }

        if (count($meta_query) > 1) {
            $meta_query['relation'] = 'AND';
        }

        return $meta_query;
    }

    private static function formation_payload(int $post_id): array
    {
        $meta = self::meta_values($post_id);
        $audience = is_array($meta['audience']) ? array_values($meta['audience']) : [];
        $registration_count = self::registration_count($post_id);
        $remaining = $meta['capacity_remaining'] === '' ? null : absint($meta['capacity_remaining']);
        $available = (string) $meta['status'] === 'upcoming' && ($remaining === null || $remaining > 0);

        return [
            'id' => $post_id,
            'title' => get_the_title($post_id),
            'slug' => get_post_field('post_name', $post_id),
            'public_url' => home_url('/formations/' . get_post_field('post_name', $post_id)),
            'excerpt' => (string) $meta['short_description'],
            'content' => apply_filters('the_content', get_post_field('post_content', $post_id)),
            'start_date' => (string) $meta['start_date'],
            'start_time' => (string) $meta['start_time'],
            'end_date' => (string) $meta['end_date'],
            'end_time' => (string) $meta['end_time'],
            'duration' => (string) $meta['duration'],
            'date_label' => self::date_label($meta),
            'time_label' => self::time_label($meta),
            'format' => (string) $meta['format'],
            'format_label' => self::FORMATS[(string) $meta['format']] ?? self::FORMATS['online'],
            'location' => (string) $meta['location'],
            'language' => (string) $meta['language'],
            'language_label' => self::LANGUAGES[(string) $meta['language']] ?? self::LANGUAGES['fr'],
            'audience' => $audience,
            'audience_labels' => array_map(static fn (string $key) => self::AUDIENCES[$key] ?? $key, $audience),
            'capacity_total' => $meta['capacity_total'] === '' ? null : absint($meta['capacity_total']),
            'capacity_remaining' => $remaining,
            'remaining_seats' => $remaining,
            'registration_count' => $registration_count,
            'registration_available' => $available,
            'status' => (string) $meta['status'],
            'status_label' => self::FORMATION_STATUSES[(string) $meta['status']] ?? self::FORMATION_STATUSES['upcoming'],
            'featured' => (bool) $meta['featured'],
            'cover_image' => self::cover_image(get_post_thumbnail_id($post_id), $post_id),
            'crm_tag' => (string) $meta['crm_tag'],
            'price' => (string) $meta['price'],
            'trainer_name' => (string) $meta['trainer_name'],
            'what_you_will_learn' => (string) $meta['what_you_will_learn'],
            'who_it_is_for' => (string) $meta['who_it_is_for'],
            'requirements' => (string) $meta['requirements'],
        ];
    }

    private static function registration_count(int $post_id): int
    {
        global $wpdb;
        return (int) $wpdb->get_var($wpdb->prepare('SELECT COUNT(*) FROM ' . self::table_name() . ' WHERE formation_id = %d', $post_id));
    }

    private static function meta_values(int $post_id): array
    {
        $values = [];
        foreach (self::META_FIELDS as $key => $meta_key) {
            $values[$key] = get_post_meta($post_id, $meta_key, true);
        }

        $values['format'] = self::sanitize_whitelist((string) ($values['format'] ?: 'online'), self::FORMATS, 'online');
        $values['language'] = self::sanitize_whitelist((string) ($values['language'] ?: 'fr'), self::LANGUAGES, 'fr');
        $values['status'] = self::sanitize_whitelist((string) ($values['status'] ?: 'upcoming'), self::FORMATION_STATUSES, 'upcoming');
        $values['audience'] = self::sanitize_audience($values['audience']);
        $values['featured'] = !empty($values['featured']);

        return $values;
    }

    private static function cover_image(int|false $image_id, int $post_id): ?array
    {
        if (!$image_id) {
            return null;
        }

        return [
            'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: get_the_title($post_id),
            'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail') ?: null,
            'medium' => wp_get_attachment_image_url($image_id, 'medium') ?: null,
            'large' => wp_get_attachment_image_url($image_id, 'large') ?: null,
            'full' => wp_get_attachment_image_url($image_id, 'full') ?: null,
        ];
    }

    private static function sort_payloads(array $a, array $b): int
    {
        $today = current_time('Y-m-d');
        $a_date = (string) ($a['start_date'] ?? '');
        $b_date = (string) ($b['start_date'] ?? '');
        $a_upcoming = $a_date !== '' && $a_date >= $today ? 0 : 1;
        $b_upcoming = $b_date !== '' && $b_date >= $today ? 0 : 1;

        if ($a_upcoming !== $b_upcoming) {
            return $a_upcoming <=> $b_upcoming;
        }

        if ($a_date === $b_date) {
            return strcmp((string) $a['title'], (string) $b['title']);
        }

        return $a_date <=> $b_date;
    }

    public static function formation_columns(array $columns): array
    {
        $new_columns = [];
        foreach ($columns as $key => $label) {
            $new_columns[$key] = $label;
            if ($key === 'title') {
                $new_columns['awene_formation_date'] = 'Date';
                $new_columns['awene_formation_format'] = 'Format';
                $new_columns['awene_formation_language'] = 'Langue';
                $new_columns['awene_formation_status'] = 'Statut';
                $new_columns['awene_formation_capacity'] = 'Capacite';
                $new_columns['awene_formation_registrations'] = 'Inscriptions';
                $new_columns['awene_formation_featured'] = 'Mise en avant';
            }
        }
        return $new_columns;
    }

    public static function formation_column_content(string $column, int $post_id): void
    {
        $meta = self::meta_values($post_id);
        if ($column === 'awene_formation_date') {
            echo esc_html((string) ($meta['start_date'] ?: 'A venir'));
        } elseif ($column === 'awene_formation_format') {
            echo esc_html(self::FORMATS[(string) $meta['format']] ?? '');
        } elseif ($column === 'awene_formation_language') {
            echo esc_html(self::LANGUAGES[(string) $meta['language']] ?? '');
        } elseif ($column === 'awene_formation_status') {
            echo esc_html(self::FORMATION_STATUSES[(string) $meta['status']] ?? '');
        } elseif ($column === 'awene_formation_capacity') {
            $total = $meta['capacity_total'];
            $remaining = $meta['capacity_remaining'];
            echo esc_html($remaining === '' && $total === '' ? '-' : ($remaining === '' ? '-' : (string) $remaining) . ' / ' . ($total === '' ? '-' : (string) $total));
        } elseif ($column === 'awene_formation_registrations') {
            echo esc_html((string) self::registration_count($post_id));
        } elseif ($column === 'awene_formation_featured') {
            echo !empty($meta['featured']) ? 'Oui' : 'Non';
        }
    }

    public static function formation_sortable_columns(array $columns): array
    {
        $columns['awene_formation_date'] = 'awene_formation_date';
        $columns['awene_formation_registrations'] = 'awene_formation_registrations';
        return $columns;
    }

    public static function handle_admin_query(WP_Query $query): void
    {
        if (!is_admin() || !$query->is_main_query()) {
            return;
        }

        if ($query->get('post_type') === self::POST_TYPE) {
            if ($query->get('orderby') === 'awene_formation_date') {
                $query->set('meta_key', self::META_FIELDS['start_date']);
                $query->set('orderby', 'meta_value');
                $query->set('meta_type', 'DATE');
            }

            $meta_query = (array) $query->get('meta_query');
            $filters = [
                'awene_formation_status' => ['field' => 'status', 'options' => self::FORMATION_STATUSES],
                'awene_formation_format' => ['field' => 'format', 'options' => self::FORMATS],
                'awene_formation_language' => ['field' => 'language', 'options' => self::LANGUAGES],
            ];
            foreach ($filters as $request_key => $config) {
                $value = isset($_GET[$request_key]) ? sanitize_key((string) wp_unslash($_GET[$request_key])) : '';
                if ($value !== '' && isset($config['options'][$value])) {
                    $meta_query[] = ['key' => self::META_FIELDS[$config['field']], 'value' => $value, 'compare' => '='];
                }
            }
            if ($meta_query) {
                $meta_query['relation'] = 'AND';
                $query->set('meta_query', $meta_query);
            }
        }
    }

    public static function maybe_sort_by_registration_count(array $clauses, WP_Query $query): array
    {
        global $wpdb;

        if (!is_admin() || !$query->is_main_query() || $query->get('post_type') !== self::POST_TYPE || $query->get('orderby') !== 'awene_formation_registrations') {
            return $clauses;
        }

        $table = self::table_name();
        $clauses['fields'] .= ", COUNT(regs.id) AS awene_registration_count";
        $clauses['join'] .= " LEFT JOIN {$table} regs ON {$wpdb->posts}.ID = regs.formation_id";
        $clauses['groupby'] = "{$wpdb->posts}.ID";
        $order = strtoupper((string) $query->get('order')) === 'ASC' ? 'ASC' : 'DESC';
        $clauses['orderby'] = "awene_registration_count {$order}, {$wpdb->posts}.post_title ASC";

        return $clauses;
    }

    public static function render_formation_filters(string $post_type): void
    {
        if ($post_type !== self::POST_TYPE) {
            return;
        }
        self::admin_filter_select('awene_formation_status', 'Tous les statuts', self::FORMATION_STATUSES);
        self::admin_filter_select('awene_formation_format', 'Tous les formats', self::FORMATS);
        self::admin_filter_select('awene_formation_language', 'Toutes les langues', self::LANGUAGES);
    }

    private static function admin_filter_select(string $name, string $placeholder, array $options): void
    {
        $current = isset($_GET[$name]) ? sanitize_key((string) wp_unslash($_GET[$name])) : '';
        printf('<select name="%1$s"><option value="">%2$s</option>', esc_attr($name), esc_html($placeholder));
        foreach ($options as $value => $label) {
            printf(
                '<option value="%1$s" %3$s>%2$s</option>',
                esc_attr((string) $value),
                esc_html((string) $label),
                selected($current, (string) $value, false)
            );
        }
        echo '</select>';
    }

    public static function shortcode(): string
    {
        $query = new WP_Query([
            'post_type' => self::POST_TYPE,
            'post_status' => 'publish',
            'posts_per_page' => 10,
            'meta_key' => self::META_FIELDS['start_date'],
            'orderby' => 'meta_value',
            'order' => 'ASC',
        ]);

        if (!$query->have_posts()) {
            return '<p>Aucune formation programmee pour le moment.</p>';
        }

        $html = '<ul class="awene-formations-list">';
        while ($query->have_posts()) {
            $query->the_post();
            $meta = self::meta_values(get_the_ID());
            $html .= sprintf(
                '<li><strong>%1$s</strong><br><span>%2$s · %3$s · %4$s</span></li>',
                esc_html(get_the_title()),
                esc_html(self::date_label($meta)),
                esc_html(self::FORMATS[(string) $meta['format']] ?? ''),
                esc_html(self::FORMATION_STATUSES[(string) $meta['status']] ?? '')
            );
        }
        wp_reset_postdata();
        return $html . '</ul>';
    }

    private static function sanitize_date(string $value): string
    {
        $value = trim($value);
        if ($value === '') {
            return '';
        }
        $date = DateTime::createFromFormat('Y-m-d', $value);
        return $date && $date->format('Y-m-d') === $value ? $value : '';
    }

    private static function sanitize_time(string $value): string
    {
        $value = trim($value);
        if ($value === '') {
            return '';
        }
        return preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d$/', $value) ? $value : '';
    }

    private static function sanitize_whitelist(string $value, array $allowed, string $default): string
    {
        return isset($allowed[$value]) ? $value : $default;
    }

    private static function sanitize_audience($value): array
    {
        if (!is_array($value)) {
            return [];
        }

        return array_values(array_filter(array_map('sanitize_key', $value), static function (string $item) {
            return isset(self::AUDIENCES[$item]);
        }));
    }

    private static function sanitize_optional_integer($value): int|string
    {
        if ($value === '' || $value === null) {
            return '';
        }
        return max(0, absint($value));
    }

    private static function date_label(array $meta): string
    {
        if (empty($meta['start_date'])) {
            return 'Date a venir';
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
}

Awene_Formations_Plugin::init();
register_activation_hook(__FILE__, ['Awene_Formations_Plugin', 'activate']);
register_deactivation_hook(__FILE__, ['Awene_Formations_Plugin', 'deactivate']);
