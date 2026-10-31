import { event } from './content';

/** Original geometric lettering; no font glyphs or official wordmark paths are used. */
export function EclipseWordmark() {
  return <svg className="eclipse-wordmark" viewBox="0 0 980 176" fill="none" aria-hidden="true">
    <defs><mask id="lettering-cuts"><rect width="980" height="176" fill="white"/><circle cx="94" cy="80" r="6" fill="black"/><circle cx="835" cy="80" r="6" fill="black"/></mask></defs>
    <g className="letter-strokes" mask="url(#lettering-cuts)">
      <path d="M108 18H26Q18 18 18 26V134Q18 142 26 142H108M18 80H94"/>
      <path d="M250 34C228 9 181 9 158 34C135 58 135 103 158 127C181 151 228 151 250 127"/>
      <path d="M291 18V134Q291 142 299 142H382"/>
      <path d="M424 18V142"/>
      <path d="M481 142V26Q481 18 489 18H531C582 18 582 82 531 82H481"/>
      <path d="M706 32C684 9 635 9 614 31C588 58 618 80 658 80C699 80 725 104 704 129C684 153 635 153 611 131"/>
      <path d="M850 18H768Q760 18 760 26V134Q760 142 768 142H850M760 80H835"/>
    </g>
    <path className="letter-eclipse-arc" d="M154 145C120 118 117 66 143 31C168 -3 223 -6 261 15"/>
    <path className="letter-eclipse-cut" d="M537 14Q563 45 537 86"/>
    <path className="wordmark-edition-rule" d="M890 39H960"/>
    <text className="wordmark-edition" x="885" y="140">7.0</text>
  </svg>;
}

/** One deterministic, non-repeating star field spans the document, not the viewport. */
export function PageStars() {
  let seed = 70127;
  function random() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  const stars = Array.from({ length: 168 }, (_, index) => {
    const x = 2 + random() * 96;
    const y = random() * 100;
    const size = 1 + random() * 1.3;
    const opacity = .32 + random() * .44;
    return <i key={index} style={{left:`${x}%`,top:`${y}%`,width:size,height:size,opacity}}/>;
  });
  return <div className="page-stars" aria-hidden="true">{stars}</div>;
}

type Milestone = { date: string; title: string; description: string; action?: boolean };
function PyramidGeometry({ compact = false }: { compact?: boolean }) {
  const marker = compact ? 'pyramid-arrow-compact' : 'pyramid-arrow-desktop';
  return <svg className={compact ? 'pyramid-compact' : 'pyramid-wireframe'} viewBox={compact ? '0 160 1200 430' : '0 0 1200 740'} preserveAspectRatio={compact ? 'xMidYMid meet' : 'none'} fill="none" aria-hidden="true">
    <defs><marker id={marker} markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0 6 3 0 6"/></marker></defs>
    <path className="pyramid-face" d="M120 460 600 200 1080 460 600 550Z"/>
    <path className="pyramid-depth" d="M120 460H1080M600 200V550M120 460 600 550 1080 460"/>
    <path className="pyramid-route" pathLength="1" d="M120 460 360 330 600 200 840 330 1080 460" markerMid={`url(#${marker})`}/>
    {compact && <g className="pyramid-compact-nodes"><circle cx="120" cy="460" r="16"/><circle cx="600" cy="200" r="16"/><circle cx="1080" cy="460" r="16"/></g>}
  </svg>;
}
export function PyramidRoadmap({ milestones }: { milestones: Milestone[] }) {
  return <div className="pyramid-roadmap reveal">
    <PyramidGeometry/><PyramidGeometry compact/>
    <ol className="pyramid-stages">{milestones.map((milestone, index)=><li className={`pyramid-stage stage-${index+1}`} key={milestone.title}>
      <span className="pyramid-number">0{index+1}</span>
      <div className="pyramid-stage-copy"><span className="milestone-date">{milestone.date}</span><h3>{milestone.title}</h3><p>{milestone.description}</p>
        {milestone.action && <a className="button button-primary pyramid-register" href={event.preRegistration} target="_blank" rel="noopener noreferrer">Pre-register <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>}
      </div>
    </li>)}</ol>
  </div>;
}
