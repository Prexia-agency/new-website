## Environment variables (local + production)

Create `ak/.env.local` (not committed) with:

```bash
# Public (safe to expose to the browser)
NEXT_PUBLIC_SANITY_PROJECT_ID=j855mcyw
NEXT_PUBLIC_SANITY_DATASET=production

# Server-only (DO NOT prefix with NEXT_PUBLIC)
SANITY_API_READ_TOKEN=YOUR_VIEWER_READ_TOKEN
```

Notes:

- `SANITY_API_READ_TOKEN` is required if your dataset is not public.
- After editing env vars, restart `npm run dev`.
