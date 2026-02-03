import groq from "groq";

export const postsListQuery = groq`*[
  _type == "post" &&
  defined(slug.current) &&
  (!defined(publishedAt) || publishedAt <= now())
] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  authorName,
  coverImage
}`;

export const postBySlugQuery = groq`*[
  _type == "post" &&
  slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  authorName,
  coverImage,
  body,
  seo
}`;

export const postSlugsQuery = groq`*[
  _type == "post" &&
  defined(slug.current) &&
  (!defined(publishedAt) || publishedAt <= now())
].slug.current`;


