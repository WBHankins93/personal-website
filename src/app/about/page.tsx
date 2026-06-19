import { permanentRedirect } from "next/navigation";

// The site consolidated to a single editorial page. Preserve inbound links
// and SEO equity by permanently redirecting the old /about route.
export default function AboutPage() {
  permanentRedirect("/#experience");
}
