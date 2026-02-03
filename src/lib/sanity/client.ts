import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j855mcyw";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2026-01-01";

// Server-only token (keep it off the client)
const token = process.env.SANITY_API_READ_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // If you have a token we assume your dataset is private. Avoid CDN so token is honored.
  useCdn: !token,
  token,
  perspective: "published",
});

export type SanitySlug = { current: string };


