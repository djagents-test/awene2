<?php

if (!defined('ABSPATH')) {
    exit("This script must be run with wp eval-file.\n");
}

$json_path = '/home/u937212274/articles.json';

if (!file_exists($json_path)) {
    WP_CLI::error("JSON file not found at {$json_path}");
}

$raw = file_get_contents($json_path);
$items = json_decode($raw, true);

if (!is_array($items)) {
    WP_CLI::error('Invalid JSON payload.');
}

$status_map = [
    'published' => 'publish',
    'draft' => 'draft',
    'pending' => 'pending',
];

$imported = 0;
$updated = 0;

foreach ($items as $item) {
    if (!is_array($item)) {
        continue;
    }

    $slug = sanitize_title($item['slug'] ?? '');
    $title = wp_strip_all_tags((string) ($item['title'] ?? ''));
    $content = (string) ($item['contentHtml'] ?? '');
    $excerpt = wp_strip_all_tags((string) ($item['excerpt'] ?? ''));
    $status = $status_map[$item['status'] ?? 'published'] ?? 'draft';
    $published_at = (string) ($item['publishedAt'] ?? '');
    $lang = sanitize_key((string) ($item['lang'] ?? 'fr'));
    $category_name = trim((string) ($item['category'] ?? ''));
    $tags = is_array($item['tags'] ?? null) ? $item['tags'] : [];

    if ($slug === '' || $title === '' || $content === '') {
        WP_CLI::warning('Skipping malformed article entry.');
        continue;
    }

    $existing = get_page_by_path($slug, OBJECT, 'post');

    $postarr = [
        'post_type' => 'post',
        'post_status' => $status,
        'post_name' => $slug,
        'post_title' => $title,
        'post_content' => $content,
        'post_excerpt' => $excerpt,
        'post_author' => 1,
    ];

    if ($published_at !== '') {
        $timestamp = strtotime($published_at);
        if ($timestamp !== false) {
            $postarr['post_date'] = gmdate('Y-m-d H:i:s', $timestamp + (int) (get_option('gmt_offset') * HOUR_IN_SECONDS));
            $postarr['post_date_gmt'] = gmdate('Y-m-d H:i:s', $timestamp);
        }
    }

    if ($existing instanceof WP_Post) {
        $postarr['ID'] = $existing->ID;
        $post_id = wp_update_post(wp_slash($postarr), true, false);
        $updated++;
    } else {
        $post_id = wp_insert_post(wp_slash($postarr), true, false);
        $imported++;
    }

    if (is_wp_error($post_id)) {
        WP_CLI::warning("Failed to import {$slug}: " . $post_id->get_error_message());
        continue;
    }

    $category_ids = [];

    if ($category_name !== '') {
        $term = term_exists($category_name, 'category');
        if (!$term) {
            $term = wp_insert_term($category_name, 'category');
        }
        if (!is_wp_error($term) && isset($term['term_id'])) {
            $category_ids[] = (int) $term['term_id'];
        }
    }

    if (!in_array($lang, ['fr', 'en', 'ar'], true)) {
        $lang = 'fr';
    }

    $lang_term_name = strtoupper($lang);
    $lang_term = term_exists($lang_term_name, 'post_tag');
    if (!$lang_term) {
        $lang_term = wp_insert_term($lang_term_name, 'post_tag', ['slug' => $lang]);
    }

    wp_set_post_categories($post_id, $category_ids, false);

    $tag_names = array_values(array_filter(array_map(
        static fn ($tag) => trim((string) $tag),
        $tags
    )));
    $tag_names[] = $lang_term_name;
    wp_set_post_terms($post_id, $tag_names, 'post_tag', false);

    update_post_meta($post_id, '_awene_meta_title', (string) ($item['metaTitle'] ?? ''));
    update_post_meta($post_id, '_awene_meta_description', (string) ($item['metaDescription'] ?? ''));
    update_post_meta($post_id, '_awene_reading_time', (string) ($item['readingTime'] ?? ''));
    update_post_meta($post_id, '_awene_featured', !empty($item['featured']) ? '1' : '0');
    update_post_meta($post_id, '_awene_source_id', (string) ($item['id'] ?? ''));
    update_post_meta($post_id, '_awene_references_json', wp_json_encode($item['references'] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
  }

WP_CLI::success("Import complete. Created {$imported} posts, updated {$updated} posts.");
