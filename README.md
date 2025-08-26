# musik-hjalpen — small API proxy

This repository provides a tiny TypeScript + Express service that fetches collection/fundraiser data from a Musikhjalpen site and an external fundraiser service, and exposes a simple JSON endpoint.

## What it includes

- TypeScript project configured with `tsconfig.json`
- ESLint + Prettier configuration
- An Express server in `src/index.ts` with rate limiting and CORS
- Types in `src/types.ts`

## Getting started

Install dependencies (already done if you followed prior setup):

```bash
npm install
```

Development (runs TypeScript directly with watch):

```bash
npm run dev
```

Build and run:

```bash
npm run build
npm start
```

Type check only:

```bash
npm run typecheck
```

Lint and format:

```bash
npm run lint
npm run lint:fix
npm run format
```

## API

GET /api/collection/:id

- Description: Returns normalized collection/fundraiser data for the given collection `id`.
- Params:
	- `id` — the collection identifier (alpha-numeric, dashes and underscores allowed)
- Response: JSON object with properties such as `collectionId`, `title`, `path`, `description`, `goal`, `image`, `amount`, `prev_amount`, and date fields.

Example:

```http
GET /api/collection/some-collection-id
```

Notes:
- The server fetches page data from the Musikhjalpen site and an external fundraiser service. If those upstream services change, the endpoint may return 404 or errors.
- Rate limiting and CORS are enabled by default.

## Files of interest

- `src/index.ts` — Express application and routes
- `src/types.ts` — Type definitions used by the endpoint
- `tsconfig.json`, `eslint.config.js`, `.prettierrc` — toolchain configs

## Next steps / suggestions

- Add tests for the endpoint
- Add caching for upstream responses to reduce network calls
- Add better error logging and monitoring

If you want, I can add tests and caching next — tell me which you prefer.
