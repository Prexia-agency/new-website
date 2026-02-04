import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import CodeBlock from "@/components/blog/CodeBlock";
import { sanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { postBySlugQuery, postSlugsQuery } from "@/lib/sanity/queries";
import type { Post } from "@/lib/sanity/types";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date?: string) {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  } catch {
    return "";
  }
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(postSlugsQuery);
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await sanityClient.fetch<Post | null>(postBySlugQuery, { slug });
  if (!post) return {};

  const title = post.seo?.metaTitle || post.title || "Blog | PREXIA";
  const description =
    post.seo?.metaDescription ||
    post.excerpt ||
    "מאמרים ועדכונים על פיתוח, עיצוב ומוצרים דיגיטליים.";

  // Only build Sanity image URLs when an asset exists (image fields can be saved with alt text only).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasOgAsset = (post.seo?.ogImage as any)?.asset;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasCoverAsset = (post.coverImage as any)?.asset;

  const ogImageUrl = hasOgAsset
    ? urlFor(post.seo!.ogImage!).width(1200).height(630).fit("crop").url()
    : hasCoverAsset
      ? urlFor(post.coverImage!).width(1200).height(630).fit("crop").url()
      : "/images/LOGO-AK.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: ogImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `https://www.prexia.io/blog/${post.slug}`,
    },
  };
}

const BlogPostPage = async (props: PageProps) => {
  const { slug } = await props.params;
  const post = await sanityClient.fetch<Post | null>(postBySlugQuery, { slug });
  if (!post) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const coverUrl = (post.coverImage as any)?.asset
    ? urlFor(post.coverImage!).width(2000).height(1200).fit("crop").url()
    : null;
  const dateText = formatDate(post.publishedAt);

  return (
    <main
      className="min-h-screen bg-black text-gray-50 pt-28 md:pt-36 safe-paddings"
      dir="rtl"
    >
      <article className="max-w-3xl mx-auto pb-20">
        <header className="mb-8">
          <div className="flex items-center justify-between gap-3 text-xs text-gray-50 mb-3">
            <span className="truncate">{post.authorName || "PREXIA"}</span>
            {dateText ? <span className="shrink-0">{dateText}</span> : null}
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold text-gray-50 leading-tight">
            {post.title || "ללא כותרת"}
          </h1>

          {post.excerpt ? (
            <p className="mt-4 text-gray-50 text-base md:text-lg">
              {post.excerpt}
            </p>
          ) : null}
        </header>

        {coverUrl ? (
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-10">
            <Image
              src={coverUrl}
              alt={post.title ?? "Cover"}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              fill
              priority
            />
          </div>
        ) : null}

        <div className="text-gray-50 max-w-none pl-4">
          <PortableText
            value={post.body || []}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="mb-6 leading-[1.9] text-gray-50">{children}</p>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-14 mb-4 text-2xl font-semibold text-gray-50">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-10 mb-3 text-xl font-semibold text-gray-50">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-8 border-r-2 border-white/20 pr-6 italic text-gray-50/80">
                    {children}
                  </blockquote>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="my-6 mr-6 list-disc space-y-2">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="my-6 mr-6 list-decimal space-y-2">
                    {children}
                  </ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => (
                  <li className="leading-[1.8]">{children}</li>
                ),
                number: ({ children }) => (
                  <li className="leading-[1.8]">{children}</li>
                ),
              },
              types: {
                codeSnippet: ({ value }) => {
                  const code = value?.code as string | undefined;
                  if (!code) return null;
                  return (
                    <CodeBlock
                      code={code}
                      language={value?.language as string | undefined}
                      filename={value?.filename as string | undefined}
                    />
                  );
                },
                image: ({ value }) => {
                  const img = value?.asset ? value : null;
                  if (!img) return null;
                  const src = urlFor(img)
                    .width(1600)
                    .fit("max")
                    .auto("format")
                    .url();
                  const alt = value?.alt || post.title || "";
                  return (
                    <figure className="my-12">
                      <Image
                        src={src}
                        alt={alt}
                        width={1600}
                        height={900}
                        className="rounded-xl border border-white/10 bg-white/5 w-full h-auto"
                      />
                      {value?.caption ? (
                        <figcaption className="mt-3 text-sm text-gray-50">
                          {value.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  );
                },
              },
            }}
          />
        </div>
      </article>
    </main>
  );
};

export default BlogPostPage;
