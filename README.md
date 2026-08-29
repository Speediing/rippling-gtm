# Rippling x SpaceXAI

Private GTM leave-behind for Rippling. The site shows how Grok Bot can work across sales tools while each rep keeps the review point.

The page keeps the original customer-demo architecture:

- Next.js 15.5 App Router under `src/`
- Geist type
- vgpu hero telemetry
- Password-protected pages and media
- Interactive chat and computer demos
- Sourced Grok Bot quote wall

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Configure `SITE_PASSWORD` in `.env.local` before signing in.

## Brand

The Rippling wordmark comes from the official [Rippling press kit](https://www.rippling.com/company/press). SpaceXAI uses the provided product wordmark.

## Media

Private clips live under `private/media/krista-clips/`. The app serves them through the password-protected `/api/media/...` route.
