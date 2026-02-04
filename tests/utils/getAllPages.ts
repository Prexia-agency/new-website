import { XMLParser } from "fast-xml-parser";

interface SitemapUrl {
  loc: string;
}

interface SitemapData {
  urlset: {
    url: SitemapUrl[];
  };
}

export const getAllPages = async (baseUrl: string): Promise<string[]> => {
  const res = await fetch(`${baseUrl}/sitemap.xml`);
  const xml = await res.text();

  const parser = new XMLParser();
  const json = parser.parse(xml) as SitemapData;

  const urls = json.urlset.url.map((u: SitemapUrl) => new URL(u.loc).pathname);

  return urls;
};
