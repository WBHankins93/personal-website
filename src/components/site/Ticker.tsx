// Stack ticker (handoff 7.2). Decorative: the same stack appears in the
// project details, so the whole band is aria-hidden. Pauses on hover and
// stands still under reduced motion (globals.css).
import { stack } from "@/content/site";

function Group() {
  return (
    <span className="ticker-group">
      {stack.map((item) => (
        <span key={item}>
          {item}
          <span className="ticker-sep">✦</span>
        </span>
      ))}
    </span>
  );
}

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      {/* Four copies: two fill any screen, the second pair makes the -50% loop seamless. */}
      <div className="ticker-track">
        <Group />
        <Group />
        <Group />
        <Group />
      </div>
    </div>
  );
}
