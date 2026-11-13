import type { Metadata } from "next";

export const metadata: Metadata = { title: "Off the trail" };

export default function NotFound() {
  return (
    <main className="notfound">
      <p>&gt; route.resolve failed · 404</p>
      <h1>Off the trail</h1>
      <p>That page is not on the map.</p>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/">Back to the trailhead →</a>
    </main>
  );
}
