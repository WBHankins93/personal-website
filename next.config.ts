import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old resume URL may already be in recruiters' inboxes
      { source: "/Ben_Hankins_SE_Resume.pdf", destination: "/Ben_Hankins_FDE_Resume.pdf", permanent: true },
      // The site is one page. Keep inbound links to the old routes working.
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/projects/:slug*", destination: "/#work", permanent: true },
      { source: "/about", destination: "/#trail", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
