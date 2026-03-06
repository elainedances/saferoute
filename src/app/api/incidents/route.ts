import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface NewsItem {
  title: string;
  url: string;
  description: string;
  published?: string;
}

const BRAVE_API_KEY = process.env.BRAVE_API_KEY || "";

async function fetchNews(): Promise<NewsItem[]> {
  if (!BRAVE_API_KEY) return [];

  const queries = [
    "Iran UAE missile strike attack 2026",
    "UAE airspace airport flights status",
    "Iran Gulf states war escalation",
  ];

  const allResults: NewsItem[] = [];

  for (const query of queries) {
    try {
      const url = `https://api.search.brave.com/res/v1/news/search?q=${encodeURIComponent(query)}&count=5&freshness=pd`;
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip",
          "X-Subscription-Token": BRAVE_API_KEY,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      });

      if (!res.ok) continue;
      const data = await res.json();
      const results = data.results || [];
      for (const r of results) {
        allResults.push({
          title: r.title || "",
          url: r.url || "",
          description: r.description || "",
          published: r.age || r.page_age || undefined,
        });
      }
    } catch {}
  }

  // Deduplicate by URL
  const seen = new Set<string>();
  const unique = allResults.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });

  return unique.slice(0, 20);
}

export async function GET() {
  try {
    const news = await fetchNews();
    return NextResponse.json({ news, count: news.length, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ news: [], count: 0, timestamp: Date.now(), error: "Failed to fetch news" });
  }
}
