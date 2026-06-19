import { permanentRedirect } from "next/navigation";

// The site consolidated to a single editorial page. Preserve inbound links
// and SEO equity by permanently redirecting the old /contact route.
export default function ContactPage() {
  permanentRedirect("/#contact");
}
