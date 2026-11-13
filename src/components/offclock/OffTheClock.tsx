// Off the Clock (handoff 7.5): four illustrated postcards and one
// conservation line. No link, logo or donate button yet.
import { postcards } from "@/content/postcards";
import { conservationLine } from "@/content/site";
import PostcardArt from "./scenes";

export default function OffTheClock() {
  return (
    <section id="off-the-clock" className="section off grain" aria-labelledby="off-title">
      <p className="eyebrow">Off the clock · field notes</p>
      <h2 id="off-title" className="section-title">
        Outside the editor
      </h2>
      <ul className="cards">
        {postcards.map((card) => (
          <li key={card.title} className="card">
            <div className="card-pic grain">
              <PostcardArt scene={card.scene} />
            </div>
            <div className="card-caption">
              <span className="card-title">{card.title}</span>
              <span className="card-note">{card.caption}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="conservation">{conservationLine}</p>
    </section>
  );
}
