import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { event, faqs } from './content';
import './styles.css';

function Arrow({ diagonal = false, down = false }: { diagonal?: boolean; down?: boolean }) {
  return <svg className={`arrow ${down ? 'arrow-down' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function Cross({ className = '' }: { className?: string }) { return <span className={`cross ${className}`} aria-hidden="true">+</span>; }
function Label({ children, number }: { children: React.ReactNode; number?: string }) { return <div className="eyebrow">{number ? <span className="section-number">{number}</span> : <span className="tiny-square"/>}{children}</div>; }
const links = [['About', 'about'], ['Tracks', 'tracks'], ['Timeline', 'timeline'], ['Sponsors', 'sponsors'], ['FAQs', 'faqs']];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const preregister = <a className="button button-primary" href={event.preRegistration} target="_blank" rel="noopener noreferrer">Pre-register <Arrow diagonal/></a>;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#home" aria-label="ACM Thapar — back to top"><img src="./assets/acm-logo.png" alt="ACM Thapar" width="224" height="72"/></a>
        <span className="nav-divider"/><span className="chapter-label">STUDENT CHAPTER</span>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
        <a className="nav-register" href={event.preRegistration} target="_blank" rel="noopener noreferrer">Pre-register <Arrow diagonal/></a>
        <button ref={menuButton} className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>{links.map(([label, id], i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{label}<Arrow/></a>)}<a href={event.preRegistration} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Pre-register<Arrow diagonal/></a></nav>
    </header>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="star-field" aria-hidden="true"/>
        <div className="hero-orbits" aria-hidden="true"><div/><div/></div>
        <div className="moon-scene" aria-hidden="true"><div className="moon-halo"/><img className="moon" src="./assets/moon.svg" alt="" width="640" height="640"/><span className="moon-coordinate">OBS. 07 / LUNAR ALIGNMENT</span><span className="moon-marker">+</span></div>
        <div className="hero-topline"><Label>ACM THAPAR PRESENTS</Label><span className="observation-label"><span className="status-dot"/> THE SEVENTH ALIGNMENT</span></div>
        <h1 id="hero-title">{event.name}<span className="edition">{event.edition}<span className="edition-rule"/></span></h1>
        <div className="hero-bottom">
          <div className="hero-copy"><p className="hero-tagline">Extraordinary things happen<br/>when worlds align.</p><p className="hero-description">A 24-hour collision of ideas, code, and possibility.<br className="desktop-break"/> ACM Thapar’s flagship hackathon is back.</p><div className="hero-actions">{preregister}<a className="button button-text" href="#about">Explore the event <Arrow down/></a></div></div>
          <div className="hero-event"><span className="mono subtle">YOUR NEXT BIG IDEA STARTS HERE</span><div className="event-date">{event.dayRange} <span>{event.monthYear}</span></div><div className="event-location"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/></svg><span className="venue-name">{event.venue}</span><span className="location-dot"/><span className="event-format">IN PERSON</span></div></div>
        </div>
        <div className="hero-baseline"><a href="#about"><span className="scroll-line"/>SCROLL TO DISCOVER</a><span>IDEAS WITHOUT LIMITS. CODE BEYOND THE ORDINARY.</span><span>01 / 07 <Cross/></span></div>
      </section>
      <section className="about section-shell" id="about" aria-labelledby="about-title"><Label number="01">THE PHENOMENON</Label><div className="about-layout"><h2 id="about-title">A moment of alignment.<br/><span>A world of possibility.</span></h2><div className="about-copy"><p>An eclipse changes the way we see the familiar. At ECLIPSE 7.0, that shift begins with an idea — and the people who dare to build it.</p><p>Join ACM Thapar’s community of developers, designers, and curious minds for 24 hours of collaboration. Find your people. Challenge your thinking. Turn a spark into something real.</p><a className="inline-link" href="#tracks">Find your direction <Arrow/></a></div></div><div className="facts-strip"><div><strong>24<span>H</span></strong><p>ONE CONTINUOUS BUILD</p></div><div><strong>2–5</strong><p>MINDS PER TEAM</p></div><div><strong>07</strong><p>THE NEXT CHAPTER</p></div><div className="fact-message"><Cross/><p>Bring your curiosity.<br/>Build what comes next.</p></div></div></section>
      <section className="tracks section-shell" id="tracks" aria-labelledby="tracks-title"><div className="section-heading"><div><Label number="02">CHOOSE YOUR TRAJECTORY</Label><h2 id="tracks-title">Different perspectives.<br/><span>Shared possibilities.</span></h2></div><p>Every great build starts with a question.<br/>Your next challenge is on the horizon.</p></div>{event.tracks ? <div className="published-tracks">{event.tracks.map(track => <article key={track.title}><h3>{track.title}</h3><p>{track.description}</p></article>)}</div> : <div className="tracks-signal"><div className="signal-visual" aria-hidden="true"><div className="signal-ring ring-one"/><div className="signal-ring ring-two"/><div className="signal-ring ring-three"/><div className="signal-axis"/><span className="signal-center">✦</span><span className="signal-point"/></div><div className="signal-copy"><div className="micro-label"><span className="status-dot"/> AWAITING TRANSMISSION</div><h3>The next frontier<br/>is taking shape.</h3><p>Official tracks and problem statements will be revealed soon. Keep your mind open — and your team ready.</p><a className="inline-link" href={event.instagram} target="_blank" rel="noopener noreferrer">Follow the announcements <Arrow diagonal/></a><span className="editable-note">EDITABLE PLACEHOLDER · TRACKS TO BE ANNOUNCED</span></div><span className="signal-id mono" aria-hidden="true">SIGNAL / 07.0</span></div>}</section>
      <section className="timeline section-shell" id="timeline" aria-labelledby="timeline-title"><div className="section-heading"><div><Label number="03">THE FLIGHT PLAN</Label><h2 id="timeline-title">From first spark<br/><span>to final reveal.</span></h2></div><p>Mark the alignment.<br/>Make the hours count.</p></div><div className="timeline-layout"><div className="timeline-date"><span className="mono">THE MAIN EVENT</span><strong>{event.compactDayRange}</strong><span className="month">{event.monthYear}</span><span className="timeline-duration"><span className="status-dot"/> 24 HOURS OF POSSIBILITY</span></div><ol className="schedule"><li><span className="schedule-node"/><div className="schedule-meta"><span>BEFORE THE ECLIPSE</span><span className="schedule-status">INTEREST FORM AVAILABLE</span></div><h3>Assemble your crew.</h3><p>Find your team of 2–5 and pre-register on the official event website.</p><a className="inline-link" href={event.preRegistration} target="_blank" rel="noopener noreferrer">Pre-register <Arrow diagonal/></a></li><li><span className="schedule-node"/><div className="schedule-meta"><span>{event.startDay}</span><span>HACKATHON BEGINS</span></div><h3>The build takes over.</h3><p>Meet in person at TIET, Patiala. Bring your ideas into the light.</p></li><li><span className="schedule-node"/><div className="schedule-meta"><span>{event.endDay}</span><span>RESULTS & CLOSING</span></div><h3>Make your work seen.</h3><p>The official timeline marks the final day for results and closing.</p></li></ol></div><div className="schedule-note"><Cross/><p>Detailed session times and submission milestones are awaiting confirmation.<span className="editable-note">EDITABLE PLACEHOLDER · FULL SCHEDULE COMING SOON</span></p></div></section>
      <section className="sponsors section-shell" id="sponsors" aria-labelledby="sponsors-title"><Label number="04">IN GOOD COMPANY</Label><div className="sponsor-layout"><div><h2 id="sponsors-title">Great ideas need<br/><span>a shared orbit.</span></h2><p>The platforms and people helping<br/>student innovation go further.</p></div><div className="official-partner"><span className="mono subtle">OFFICIAL PLATFORM PARTNER</span><a href="https://devfolio.co" target="_blank" rel="noopener noreferrer" aria-label="Visit Devfolio"><img src="./assets/devfolio.svg" alt="Devfolio" width="230" height="54"/><Arrow diagonal/></a><p>Listed on the official ECLIPSE 7.0 website.</p></div></div><div className="partner-invite"><div><h3>Help the next generation build.</h3><p>Start a conversation about partnering with ECLIPSE 7.0.</p></div><a className="button button-outline" href={`mailto:${event.partnership}?subject=ECLIPSE%207.0%20Partnership`}>Become a partner <Arrow diagonal/></a></div><p className="editable-note sponsor-placeholder">EDITABLE PLACEHOLDER · ADDITIONAL 7.0 SPONSORS AWAITING CONFIRMATION</p></section>
      <section className="faq section-shell" id="faqs" aria-labelledby="faq-title"><div className="faq-intro"><Label number="05">A LITTLE CLARITY</Label><h2 id="faq-title">Before you<br/><span>take the leap.</span></h2><p>Questions are where<br/>good things begin.</p><a className="inline-link" href={`mailto:${event.contact}`}>Ask us anything <Arrow diagonal/></a></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span className="faq-number">0{index + 1}</span>{faq.question}<span className="faq-icon" aria-hidden="true"/></summary><div className="faq-answer"><p>{faq.answer}</p></div></details>)}</div></section>
      <section className="closing section-shell" id="contact" aria-labelledby="closing-title"><div className="closing-orbit" aria-hidden="true"/><Label number="06">SEE YOU ON THE OTHER SIDE</Label><h2 id="closing-title">Some moments pass.<br/><span>This one, you build.</span></h2><p>{event.shortDate} <span> / </span> {event.venue}</p><div className="closing-actions">{preregister}<a className="button button-text" href={`mailto:${event.contact}`}>Get in touch <Arrow diagonal/></a></div><p className="registration-notice">Registration details coming soon. Pre-registration records your interest.</p></section>
    </main>
    <footer className="footer section-shell"><div className="footer-top"><a className="brand" href="#home" aria-label="ACM Thapar — back to top"><img src="./assets/acm-logo.png" alt="ACM Thapar" width="224" height="72"/></a><p>Built around ideas.<br/>Brought together by ACM Thapar.</p><div className="social-links"><a href={event.instagram} target="_blank" rel="noopener noreferrer">Instagram <Arrow diagonal/></a><a href={event.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal/></a><a href={`mailto:${event.contact}`}>Email <Arrow diagonal/></a></div></div><div className="footer-bottom"><span>ECLIPSE 7.0 · ACM THAPAR</span><a href={event.source} target="_blank" rel="noopener noreferrer">Official event website <Arrow diagonal/></a><a href="#home">BACK TO TOP ↑</a></div></footer>
  </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);



