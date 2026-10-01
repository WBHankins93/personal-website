import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "qtrypzzcjebvfcihiynt.supabase.co" }],
  },
  async redirects() {
    return [
      // Old resume URL may already be in recruiters' inboxes
      { source: "/Ben_Hankins_SE_Resume.pdf", destination: "/Ben_Hankins_FDE_Resume.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
