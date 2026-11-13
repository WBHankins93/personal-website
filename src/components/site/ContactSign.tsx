// Brown park-sign footer (handoff 7.6).
import { site } from "@/content/site";

export default function ContactSign() {
  return (
    <footer id="contact" className="sign grain">
      <h2 className="sign-title">Say hey.</h2>
      <address className="sign-meta">
        <div>
          {site.name} · {site.role}
        </div>
        <div>{site.coordinates}</div>
        <ul className="sign-links">
          <li>
            <a href={`mailto:${site.email}`}>Email</a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.resume}>Résumé (PDF)</a>
          </li>
        </ul>
      </address>
    </footer>
  );
}
