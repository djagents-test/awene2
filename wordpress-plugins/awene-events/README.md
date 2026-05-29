# AWENE Events WordPress Plugin

This plugin adds a CMS-managed Events system for the AWENE headless website.

## What It Adds

- Custom post type: `awene_event`
- WordPress REST base: `/wp-json/wp/v2/events`
- Normalized headless endpoint: `/wp-json/awene/v1/events`
- Event type taxonomy: `awene_event_type`
- Featured image support
- Event fields in wp-admin:
  - Start date and time
  - End date and time
  - Timezone
  - Format: online, in person, hybrid
  - Status: upcoming, sold out, cancelled, past
  - Location name, address, city, country
  - Online event URL
  - Registration URL
  - Price label
  - Capacity
  - Featured event toggle

## Installation

1. Upload the `awene-events` folder to:

   `wp-content/plugins/awene-events`

2. In WordPress admin, go to `Plugins`.
3. Activate `AWENE Events`.
4. Go to `AWENE Events` in the admin menu.
5. Create events and assign event types.
6. Set a Featured Image for event thumbnails.

## API Used By The Website

The Next.js website reads:

`/wp-json/awene/v1/events?per_page=20`

The site derives the full CMS origin from `WORDPRESS_API_URL` in `.env.local`.
