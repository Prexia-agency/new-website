import Image from "next/image";
import Link from "next/link";

import { sanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { postsListQuery } from "@/lib/sanity/queries";
import type { PostListItem } from "@/lib/sanity/types";

export const revalidate = 60;

export const metadata = {
  title: "Blog | PREXIA",
  description: "מאמרים ועדכונים על פיתוח, עיצוב ומוצרים דיגיטליים.",
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

const BlogPage = async () => {
  const posts = await sanityClient.fetch<PostListItem[]>(postsListQuery);

  return (
    <main
      className="min-h-screen bg-black text-white pt-28 md:pt-36 safe-paddings"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto p-2">
        <div className="flex flex-col gap-3 mb-10">
          <h1 className="font-ppeiko text-3xl md:text-5xl font-normal text-white">
            Our blog
          </h1>
        </div>

        {posts?.length ? (
          <div>
            <ul className="divide-y divide-white/20">
              {posts.map((post) => {
                const href = `/blog/${post.slug}`;
                const imageUrl =
                  // Some documents may have an image object without an asset if the upload wasn't set.
                  // Only build a URL when an asset exists.
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (post.coverImage as any)?.asset && post.coverImage
                    ? urlFor(post.coverImage)
                        .width(960)
                        .height(640)
                        .fit("crop")
                        .url()
                    : null;
                const dateText = formatDate(post.publishedAt);

                return (
                  <li key={post._id}>
                    <Link
                      href={href}
                      className="group block bg-black hover:bg-white/5 transition-colors"
                    >
                      <div className="py-12 md:py-16 flex flex-col md:flex-row items-start gap-8 md:gap-16">
                        {/* Content */}
                        <div className="flex-1 flex flex-col gap-6">
                          {/* Meta */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm text-white/90">
                              {post.authorName || "PREXIA"}
                            </span>
                            {dateText ? (
                              <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/30 text-xs text-white/90">
                                {dateText}
                              </div>
                            ) : null}
                          </div>

                          {/* Title */}
                          <h2 className="text-2xl md:text-[24px] lg:text-[28px] font-normal text-white leading-tight group-hover:opacity-90 transition-opacity">
                            {post.title || "ללא כותרת"}
                          </h2>

                          {/* Excerpt */}
                          {post.excerpt ? (
                            <p className="text-base md:text-[16px] lg:text-[18px] text-white/90 leading-relaxed max-w-xl">
                              {post.excerpt}
                            </p>
                          ) : null}

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-base font-medium gradient-text-contact group-hover:opacity-80 transition-opacity">
                            <span>קרא עוד</span>
                            <span>→</span>
                          </div>
                        </div>

                        {/* Image */}
                        {imageUrl ? (
                          <div className="relative w-full md:w-[480px] h-[280px] md:h-[320px] shrink-0 overflow-hidden rounded-xl bg-white/5">
                            <Image
                              src={imageUrl}
                              alt={post.title ?? "Blog cover"}
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 480px"
                              fill
                            />
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
            עדיין אין פוסטים. הוסיפו פוסט ראשון ב־Sanity Studio ואז רעננו את
            העמוד.
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogPage;
