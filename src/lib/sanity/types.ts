import type { SanityImageSource } from "@sanity/image-url";

export type PostListItem = {
  _id: string;
  title?: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  authorName?: string;
  coverImage?: SanityImageSource;
};

export type Post = PostListItem & {
  body?: unknown;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
};
