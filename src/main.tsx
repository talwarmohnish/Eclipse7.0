import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { event, faqs } from './content';
import './styles.css';

type Theme = 'dark' | 'light';
function Arrow({ diagonal = false, down = false }: { diagonal?: boolean; down?: boolean }) {
  return <svg className={`arrow ${down ? 'arrow-down' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function Label({ children, number }: { children: React.ReactNode; number?: string }) {
  return <div className="eyebrow">{number ? <span className="section-number">{number}</span> : <span className="tiny-square"/>}{children}</div>;
}
function DateRange({ large = false }: { large?: boolean }) {
  return <time className={`date-block ${large ? 'date-large' : ''}`} dateTime="2027-04-03" aria-label={event.shortDate}><span className="date-numerals" aria-hidden="true"><span>{event.startNumber}</span><span className="date-separator">—</span><span>{event.endNumber}</span></span><span className="date-month" aria-hidden="true">{event.monthYear}</span></time>;
}
function Alignment() {
  return <figure className="alignment reveal"><svg viewBox="0 0 600 430" role="img" aria-labelledby="alignment-title alignment-desc"><title id="alignment-title">The ECLIPSE alignment</title><desc id="alignment-desc">People, Ideas and Code converge at ECLIPSE. Each perspective contributes to a shared project.</desc><circle className="diagram-orbit" cx="300" cy="211" r="144"/><ellipse className="diagram-orbit" cx="300" cy="211" rx="235" ry="76" transform="rotate(-25 300 211)"/><g className="alignment-routes"><path pathLength="1" d="M112 104 Q275 63 300 211"/><path pathLength="1" d="M495 134 Q445 280 300 211"/><path pathLength="1" d="M231 366 Q175 245 300 211"/></g><g className="diagram-core"><circle cx="300" cy="211" r="65"/><circle className="core-rim" cx="300" cy="211" r="65"/><text x="300" y="207" textAnchor="middle">ECLIPSE</text><text className="core-edition" x="300" y="233" textAnchor="middle">7.0</text></g><g className="alignment-node"><circle cx="112" cy="104" r="9"/><text x="78" y="76">PEOPLE</text><circle cx="495" cy="134" r="9"/><text x="458" y="108">IDEAS</text><circle cx="231" cy="366" r="9"/><text x="201" y="402">CODE</text></g><path className="diagram-cross" d="M465 333h16m-8-8v16M80 270h12m-6-6v12"/></svg><figcaption>Different perspectives. One shared build.</figcaption></figure>;
}
function Radar() {
  return <div className="radar" aria-hidden="true"><div className="radar-grid"/><div className="radar-sweep"/><div className="radar-ring ring-one"/><div className="radar-ring ring-two"/><div className="radar-ring ring-three"/><span className="radar-center">✦</span><span className="radar-point"/><span className="radar-axis">N</span></div>;
}
const links = [['About', 'about'], ['Tracks', 'tracks'], ['Roadmap', 'timeline'], ['Partners', 'sponsors'], ['FAQs', 'faqs']];
const milestones = [
  { date: 'INTEREST FORM AVAILABLE', title: 'Pre-register', description: 'Start with your interest. Assemble a team of 2–5 and visit the official pre-registration form.', action: true },
  { date: event.startDay, title: 'The hackathon', description: 'Join us in person at TIET, Patiala for the 24-hour hackathon. Build a project with your team.' },
  { date: event.endDay, title: 'Results & closing', description: 'The official event timeline marks 4 April for results and the closing of ECLIPSE 7.0.' },
];
function App() {
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#080e19' : '#f6f2e9');
    try { localStorage.setItem('eclipse-theme', next); } catch { /* Theme still works when storage is unavailable. */ }
    setTheme(next);
  }
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    const reveal = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); reveal.unobserve(entry.target); } }); }, { threshold: .18 });
    document.querySelectorAll('.reveal').forEach(section => reveal.observe(section));
    return () => { observer.disconnect(); reveal.disconnect(); };
  }, []);
  const preregister = <a className="button button-primary" href={event.preRegistration} target="_blank" rel="noopener noreferrer">Pre-register <Arrow diagonal/></a>;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="nav-shell">
      <a className="brand" href="#home" aria-label="ACM Thapar — back to top"><img src="./assets/acm-logo.png" alt="ACM Thapar" width="224" height="72"/></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
      <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} aria-pressed={theme === 'light'}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">{theme === 'dark' ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></> : <path d="M20.5 13.1A8.5 8.5 0 0 1 10.9 3.5a8.5 8.5 0 1 0 9.6 9.6Z"/>}</svg><span>{theme === 'dark' ? 'Light' : 'Dark'}</span></button>
      <a className="nav-register" href={event.preRegistration} target="_blank" rel="noopener noreferrer">Pre-register <Arrow diagonal/></a>
      <button ref={menuButton} className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
    </div><nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>{links.map(([label, id], i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{label}<Arrow/></a>)}<a href={event.preRegistration} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Pre-register<Arrow diagonal/></a></nav></header>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="star-field" aria-hidden="true"/><div className="hero-orbit" aria-hidden="true"/>
        <div className="hero-topline"><Label>ACM THAPAR PRESENTS</Label><span className="observation-label">THE SEVENTH ALIGNMENT / 2027</span></div>
        <figure className="moon-scene"><img className="moon" src="./assets/moon.svg" alt="A textured eclipse moon, partly in shadow with a copper-red illuminated rim" width="640" height="640" fetchPriority="high"/><figcaption><span className="tiny-cross">+</span> OBSERVATION 07 / THE ECLIPSE</figcaption></figure>
        <div className="hero-copy"><h1 id="hero-title">{event.name}<span className="sr-only"> {event.edition}</span></h1><div className="edition-line" aria-hidden="true"><span className="edition">7.0</span><span className="edition-line-rule"/><span>24-HOUR HACKATHON</span></div><p className="hero-lead">Build together.<br/>Make it real.</p><p className="hero-description">ACM Thapar’s flagship hackathon brings student developers, designers, and innovators together — in person, for 24 hours.</p><div className="hero-actions">{preregister}<a className="button button-text" href="#about">Explore the event <Arrow down/></a></div></div>
        <div className="hero-info"><DateRange/><div className="hero-place"><span className="field-label">EVENT VENUE</span><strong>{event.venue}</strong><span>In person</span></div><a className="scroll-cue" href="#about">Discover ECLIPSE <Arrow down/></a></div>
      </section>
      <section className="about section-shell" id="about" aria-labelledby="about-title"><div className="about-layout"><div className="about-copy reveal"><Label number="01">THE ALIGNMENT</Label><h2 id="about-title">People.<br/>Ideas. Code.</h2><p className="section-lead">The best projects start when different perspectives meet.</p><p>ECLIPSE 7.0 is ACM Thapar Student Chapter’s 24-hour hackathon. Bring your skills and curiosity to a team of 2–5, collaborate in person, and turn an idea into a working project.</p><a className="inline-link" href="#faqs">Who can participate? <Arrow/></a></div><Alignment/></div><div className="facts-strip"><div><strong>24<span>H</span></strong><p>To build together</p></div><div><strong>2–5</strong><p>People per team</p></div><div><strong>In person</strong><p>TIET, Patiala</p></div></div></section>
      <section className="tracks section-shell" id="tracks" aria-labelledby="tracks-title"><div className="section-heading reveal"><div><Label number="02">FIND YOUR DIRECTION</Label><h2 id="tracks-title">A signal on the horizon.</h2></div><p>Bring an open mind.<br/>Your challenge will follow.</p></div>{event.tracks ? <div className="published-tracks">{event.tracks.map(track=><article key={track.title}><h3>{track.title}</h3><p>{track.description}</p></article>)}</div> : <div className="tracks-signal reveal"><div className="signal-art"><Radar/><span className="signal-coordinate" aria-hidden="true">SIGNAL / 07.0</span></div><div className="signal-copy"><span className="field-label signal-status"><span className="status-dot"/> AWAITING TRANSMISSION</span><h3>Tracks announced soon</h3><p>Official tracks and problem statements are still to be revealed. Follow ACM Thapar for announcements from the organizers.</p><a className="inline-link" href={event.instagram} target="_blank" rel="noopener noreferrer">Follow the announcements <Arrow diagonal/></a></div></div>}</section>
      <section className="timeline section-shell" id="timeline" aria-labelledby="timeline-title"><div className="roadmap-heading reveal"><div><Label number="03">YOUR EVENT ROADMAP</Label><h2 id="timeline-title">Three points.<br/>One shared journey.</h2><p>From registering your interest to the final day.<br/>Full schedule announced soon.</p></div><div className="roadmap-date"><span className="field-label">THE MAIN EVENT</span><DateRange large/></div></div><div className="journey reveal"><svg className="journey-route" viewBox="0 0 1200 300" fill="none" aria-hidden="true"><path className="journey-orbit" d="M90 235 Q600 -145 1110 235"/><path className="journey-path" pathLength="1" d="M190 220 C340 220 365 80 600 80 S860 220 1010 220"/><g className="journey-dot"><circle cx="190" cy="220" r="9"/><circle cx="600" cy="80" r="9"/><circle cx="1010" cy="220" r="9"/></g><path className="journey-cross" d="M590 215h20m-10-10v20"/></svg><ol className="journey-list">{milestones.map((milestone,i)=><li key={milestone.title}><span className="journey-number">0{i+1}</span><span className="milestone-date">{milestone.date}</span><h3>{milestone.title}</h3><p>{milestone.description}</p>{milestone.action&&<a className="inline-link" href={event.preRegistration} target="_blank" rel="noopener noreferrer">Visit the interest form <Arrow diagonal/></a>}</li>)}</ol><p className="journey-caption">An illustrated event journey. Dates and milestones are from the official event website.</p></div></section>
      <section className="sponsors section-shell" id="sponsors" aria-labelledby="sponsors-title"><Label number="04">OUR PLATFORM PARTNER</Label><div className="sponsor-layout"><div className="reveal"><h2 id="sponsors-title">Supporting<br/>student builders.</h2><p>Devfolio is listed as the platform partner<br/>on the official ECLIPSE 7.0 website.</p></div><a className="partner-logo" href="https://devfolio.co" target="_blank" rel="noopener noreferrer" aria-label="Visit Devfolio"><img src="./assets/devfolio.svg" alt="Devfolio" width="230" height="54"/><Arrow diagonal/></a></div><div className="partner-invite"><div><h3>Help students build what’s next.</h3><p>Talk to ACM Thapar about partnering with ECLIPSE 7.0.</p></div><a className="button button-outline" href={`mailto:${event.partnership}?subject=ECLIPSE%207.0%20Partnership`}>Become a partner <Arrow diagonal/></a></div></section>
      <section className="faq section-shell" id="faqs" aria-labelledby="faq-title"><div className="faq-intro reveal"><Label number="05">GOOD TO KNOW</Label><h2 id="faq-title">Before<br/>you arrive.</h2><p>Eligibility, teams, and the practical details.</p><a className="inline-link" href={`mailto:${event.contact}`}>Ask the organizers <Arrow diagonal/></a></div><div className="faq-list">{faqs.map((faq,i)=><details key={faq.question}><summary><span className="faq-number">0{i+1}</span>{faq.question}<span className="faq-icon" aria-hidden="true"/></summary><div className="faq-answer"><p>{faq.answer}</p></div></details>)}</div></section>
      <section className="closing section-shell" id="contact" aria-labelledby="closing-title"><div className="closing-orbit" aria-hidden="true"/><Label number="06">JOIN THE SEVENTH ALIGNMENT</Label><h2 id="closing-title">Your next build<br/>starts with a team.</h2><p>{event.shortDate} <span className="closing-divider" aria-hidden="true">/</span> {event.venue}</p><div className="closing-actions">{preregister}<a className="button button-text" href={`mailto:${event.contact}`}>Get in touch <Arrow diagonal/></a></div><p className="registration-notice">Registration details coming soon.<br/>Pre-registration records your interest.</p></section>
    </main>
    <footer className="footer section-shell"><div className="footer-top"><a className="brand" href="#home" aria-label="ACM Thapar — back to top"><img src="./assets/acm-logo.png" alt="ACM Thapar" width="224" height="72"/></a><p>ACM Thapar Student Chapter<br/>A community for people who build.</p><div className="social-links"><a href={event.instagram} target="_blank" rel="noopener noreferrer">Instagram <Arrow diagonal/></a><a href={event.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal/></a><a href={`mailto:${event.contact}`}>Email <Arrow diagonal/></a></div></div><div className="footer-bottom"><span>ECLIPSE 7.0 · ACM THAPAR</span><a href={event.source} target="_blank" rel="noopener noreferrer">Official event website <Arrow diagonal/></a><a href="#home">Back to top ↑</a></div></footer>
  </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

