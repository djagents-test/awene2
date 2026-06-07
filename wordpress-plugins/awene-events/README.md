# AWENE Events WordPress Plugin

This plugin turns AWENE Events into a small event management system for the headless website.

## What It Adds

- Custom post type: `awene_event`
- Custom post type: `awene_registration`
- Taxonomy: `awene_event_type`
- Admin submenu: `Inscriptions`
- CSV export for registrations
- Headless REST endpoints:
  - `GET /wp-json/awene/v1/events`
  - `GET /wp-json/awene/v1/events/{id}`
  - `POST /wp-json/awene/v1/registrations`
  - `GET /wp-json/awene/v1/registrations` for admins

## Event Fields

- Title and slug through WordPress
- Description through the editor
- Short description
- Event date
- Start time
- End time
- Location type: `online`, `in_person`, `hybrid`
- Location name
- Location address
- Online event URL
- Event type taxonomy
- Language: `fr`, `en`, `ar`
- Capacity
- Available seats
- Registration status: `open`, `full`, `closed`
- Event status: `upcoming`, `past`, `draft`
- Featured image
- CTA label
- SEO title
- Meta description

## Registration Fields

- Registration ID
- Event ID
- Event title
- First name
- Last name
- Email
- Phone
- Message
- Registration date
- Status: `pending`, `confirmed`, `cancelled`
- Source: `website`, `manual`
- Consent
- Language
- Notes

## Frontend Contract

The Next.js website should use:

- `NEXT_PUBLIC_AWENE_CMS_URL=https://cms.awene.net`
- `${NEXT_PUBLIC_AWENE_CMS_URL}/wp-json/awene/v1/events`

Registrations are sent to:

- `${NEXT_PUBLIC_AWENE_CMS_URL}/wp-json/awene/v1/registrations`

## Installation

1. Upload the `awene-events` folder to `wp-content/plugins/awene-events`.
2. Activate `AWENE Events`.
3. Create event types under `Event Types`.
4. Create events under `AWENE Events`.
5. Manage registrations under `AWENE Events -> Inscriptions`.
