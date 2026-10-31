import { useEffect, useRef, useState } from 'react';
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
    <g className="pyramid-highlights"><path className="segment-1" d="M120 460 600 200"/><path className="segment-2" d="M120 460 600 200 1080 460"/><path className="segment-3" d="M600 200 1080 460"/></g>
    {compact && <g className="pyramid-compact-nodes"><circle cx="120" cy="460" r="16"/><circle cx="600" cy="200" r="16"/><circle cx="1080" cy="460" r="16"/></g>}
  </svg>;
}
export function PyramidRoadmap({ milestones }: { milestones: Milestone[] }) {
  const roadmap = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  useEffect(() => {
    const element = roadmap.current;
    if (!element) return;
    const pointer = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let point: { x: number; y: number } | null = null;
    const neutral = () => {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
    };
    const paint = () => {
      frame = 0;
      if (!point || !pointer.matches) return;
      const rect = element.getBoundingClientRect();
      const x = (point.x - rect.left) / rect.width;
      const y = (point.y - rect.top) / rect.height;
      // Only the open illustration responds. Copy, controls and layout never move.
      if (!reduced.matches && x > .05 && x < .95 && y > .17 && y < .65) {
        element.style.setProperty('--tilt-x', String(Math.max(-4, Math.min(4, (.41 - y) / .24 * 4))) + 'deg');
        element.style.setProperty('--tilt-y', String(Math.max(-4, Math.min(4, (x - .5) / .45 * 4))) + 'deg');
      } else neutral();
      let nearest: number | null = null;
      let distance = 145;
      element.querySelectorAll<HTMLElement>('.pyramid-stage').forEach((stage, index) => {
        const node = stage.querySelector('.pyramid-number')!.getBoundingClientRect();
        const copy = stage.querySelector('.pyramid-stage-copy')!.getBoundingClientRect();
        const inCopy = point!.x >= copy.left && point!.x <= copy.right && point!.y >= copy.top && point!.y <= copy.bottom;
        const proximity = inCopy ? 0 : Math.hypot(point!.x - (node.left + node.width / 2), point!.y - (node.top + node.height / 2));
        if (proximity < distance) { distance = proximity; nearest = index + 1; }
      });
      setHovered(previous => previous === nearest ? previous : nearest);
    };
    const move = (e: PointerEvent) => {
      if (!pointer.matches || e.pointerType !== 'mouse') return;
      point = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      point = null;
      neutral();
      setHovered(null);
    };
    element.addEventListener('pointermove', move, { passive: true });
    element.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', leave, { passive: true });
    pointer.addEventListener('change', leave);
    reduced.addEventListener('change', leave);
    return () => {
      leave();
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', leave);
      pointer.removeEventListener('change', leave);
      reduced.removeEventListener('change', leave);
    };
  }, []);
  return <div ref={roadmap} className="pyramid-roadmap reveal" data-active={hovered ?? focused ?? undefined}>
    <div className="pyramid-illustration"><PyramidGeometry/></div><PyramidGeometry compact/>
    <ol className="pyramid-stages">{milestones.map((milestone, index)=><li className={'pyramid-stage stage-' + (index+1)} key={milestone.title}>
      <button className="pyramid-number" type="button" aria-label={'Highlight milestone ' + (index+1) + ': ' + milestone.title} aria-describedby={'milestone-' + (index+1) + '-description'} onFocus={() => setFocused(index + 1)} onBlur={() => setFocused(null)} onClick={() => setFocused(index + 1)}>0{index+1}</button>
      <div className="pyramid-stage-copy" onFocusCapture={() => setFocused(index + 1)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(null); }}><span className="milestone-date">{milestone.date}</span><h3>{milestone.title}</h3><p id={'milestone-' + (index+1) + '-description'}>{milestone.description}</p>
        {milestone.action && <a className="button button-primary pyramid-register" href={event.preRegistration} target="_blank" rel="noopener noreferrer">Pre-register <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>}
      </div>
    </li>)}</ol>
  </div>;
}
