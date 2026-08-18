"use client";

import { FormEvent, PointerEvent as ReactPointerEvent, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const whatsAppNumber = "6589950821";
const whatsApp = (message: string) => `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
const instagramPortfolio = "https://www.instagram.com/altivonsg?utm_source=qr";
const personalInstagram = "https://www.instagram.com/k4.yden/";

const capabilities = [
  ["01", "Digital experiences", "Websites and interfaces shaped around positioning, usability and a clear path to conversation.", "Strategy · UX direction · Responsive development"],
  ["02", "AI creative direction", "Human-led visual concepts and content workflows accelerated by practical AI tools.", "Concept systems · Campaign assets · Creative production"],
  ["03", "Brand systems", "A coherent digital identity built to stay recognisable across web, social and campaigns.", "Positioning · Visual language · Digital guidelines"],
  ["04", "Growth architecture", "Connected content, YouTube and marketing systems designed to support consistent progress.", "Content strategy · Channel packaging · Optimisation"],
  ["05", "Social media management", "Structured social media planning, creative production and publishing support for brands that need a more consistent presence.", "Content planning · Creative direction · Publishing", instagramPortfolio],
];

const projects = [
  { number: "A—01", category: "Website systems", title: "A sharper digital first impression.", description: "A focused web direction for service businesses that need clarity, credibility and an easier way for prospects to start a conversation.", tags: ["Positioning", "Interface design", "Development"], visual: "interface", externalUrl: undefined, externalLabel: undefined, socialHandle: undefined },
  { number: "A—02", category: "AI creative", title: "One idea, built into a working visual language.", description: "Creative direction that turns AI-assisted exploration into consistent campaign assets rather than disconnected outputs.", tags: ["Art direction", "AI production", "Campaign systems"], visual: "signal", externalUrl: undefined, externalLabel: undefined, socialHandle: undefined },
  { number: "A—03", category: "Content growth", title: "A repeatable system for earning attention.", description: "Channel positioning, content packaging and publishing guidance designed to help brands build momentum over time.", tags: ["YouTube strategy", "Titles & thumbnails", "Review"], visual: "channel", externalUrl: undefined, externalLabel: undefined, socialHandle: undefined },
  { number: "A—04", category: "Social Media Management", title: "Altivon SG — a considered social presence.", description: "An active portfolio example showing social content presentation, brand consistency and ongoing channel management.", tags: ["Content planning", "Creative direction", "Publishing"], visual: "social", externalUrl: instagramPortfolio, externalLabel: "View Altivon SG on Instagram", socialHandle: "@altivonsg" },
  { number: "A—05", category: "Social Media Management", title: "Yuna Pie XO — social content with character.", description: "A client portfolio example presenting an active social feed, creative content direction and consistent channel management.", tags: ["Social content", "Creative direction", "Channel management"], visual: "social", externalUrl: "https://www.instagram.com/yunapiexo/", externalLabel: "View Yuna Pie XO on Instagram", socialHandle: "@yunapiexo" },
  { number: "A—06", category: "Social Media Management", title: "Hananorii — a cohesive social identity.", description: "A client portfolio example showing coordinated visual presentation and an ongoing approach to social media content.", tags: ["Visual consistency", "Content planning", "Publishing"], visual: "social", externalUrl: "https://www.instagram.com/hananorii.real/", externalLabel: "View Hananorii on Instagram", socialHandle: "@hananorii.real" },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    gsap.from(".hero-reveal", { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.09, ease: "power4.out" });
    gsap.from(".hero-shell", { opacity: 0, duration: 1.7, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
      gsap.from(section, { y: 70, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 84%" } });
    });
    gsap.utils.toArray<HTMLElement>(".project-visual").forEach((visual) => {
      gsap.fromTo(visual, { scale: 0.92 }, { scale: 1, ease: "none", scrollTrigger: { trigger: visual, start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, { scope: root });

  const submitBrief = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  const trackPointer = (event: ReactPointerEvent<HTMLElement>) => {
    root.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
    root.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
  };

  const moveHero = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--light-x", `${x}%`);
    event.currentTarget.style.setProperty("--light-y", `${y}%`);
    event.currentTarget.style.setProperty("--reveal-x", `${x}%`);
    event.currentTarget.style.setProperty("--reveal-y", `${y}%`);
    event.currentTarget.style.setProperty("--reveal-opacity", "1");
    event.currentTarget.style.setProperty("--field-opacity", "1");
  };

  return (
    <main ref={root} className="site-main" id="top" onPointerMove={trackPointer}>
      <div className="cursor-aura" aria-hidden="true" />
      <a className="skip-link" href="#profile">Skip to content</a>
      <header className="topbar">
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="VTCSocial home">VTC<span>®</span></a>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#profile" onClick={() => setMenuOpen(false)}>Profile</a>
            <a href="#capabilities" onClick={() => setMenuOpen(false)}>Expertise</a>
            <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
          <a className="nav-contact" href={whatsApp("Hi, I found your portfolio and would like to discuss a creative technology project.")} target="_blank" rel="noreferrer">Available for projects <i /></a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title" onPointerMove={moveHero} onPointerEnter={moveHero}>
        <div className="hero-shell" role="img" aria-label="Cybernetic obsidian portrait of the VTCSocial creative technologist" />
        <div className="hero-face-reveal" aria-hidden="true" />
        <div className="hero-pointer-field" aria-hidden="true" />
        <div className="hero-aperture-frame" aria-hidden="true"><i /><i /><b /></div>
        <div className="hero-vignette" /><div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-reveal">AI creative technologist · Digital strategist</p>
          <div className="hero-title-mask"><h1 id="hero-title" className="hero-reveal">Ideas built<br />for the <em>future.</em></h1></div>
          <p className="hero-intro hero-reveal">I design intelligent websites, brand systems and content engines for businesses ready to build a more distinct digital presence.</p>
          <div className="hero-actions hero-reveal">
            <a className="primary-button" href={whatsApp("Hi, I would like to discuss a website, brand or AI creative project with VTCSocial.")} target="_blank" rel="noreferrer">Start a conversation <span>↗</span></a>
            <a className="text-link" href="#work">View selected work <span>↓</span></a>
          </div>
        </div>
        <div className="hero-meta hero-reveal"><span>Portfolio / 2026</span><span>Strategy · Design · AI</span></div>
        <p className="reveal-hint"><i /> Trace the shell to reveal the human layer</p>
        <div className="scroll-cue"><span>Scroll to explore</span><i /></div>
      </section>

      <div className="signal-strip" aria-label="Core disciplines"><div>{["CREATIVE TECHNOLOGY", "DIGITAL EXPERIENCES", "AI SYSTEMS", "BRAND DIRECTION", "CONTENT GROWTH", "CREATIVE TECHNOLOGY", "DIGITAL EXPERIENCES"].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div></div>

      <section className="profile section-shell reveal-section" id="profile">
        <div className="section-index"><span>01</span><p>Profile</p></div>
        <div className="profile-copy">
          <p className="profile-lead">Creative technology that turns attention into <em>opportunity.</em></p>
          <div className="profile-columns"><p>I work at the intersection of strategy, design and AI—building digital experiences that look considered, communicate clearly and support real business goals.</p><p>Every engagement begins with context. I study the audience, the offer and the existing digital landscape before recommending the right website, content or growth system.</p></div>
        </div>
        <aside className="profile-dossier"><span>Current focus</span><dl>
          <div><dt>Discipline</dt><dd>Creative technology</dd></div><div><dt>Specialism</dt><dd>Web + AI systems</dd></div><div><dt>Working with</dt><dd>Brands · founders · teams</dd></div><div><dt>Availability</dt><dd className="available">Selected projects</dd></div>
        </dl></aside>
      </section>

      <section className="capabilities section-shell" id="capabilities">
        <div className="section-heading reveal-section"><div className="section-index"><span>02</span><p>Expertise</p></div><h2>A multidisciplinary practice for a changing digital world.</h2></div>
        <div className="capability-list">{capabilities.map((item) => <article key={item[0]} className="capability-row reveal-section"><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><small>{item[3]}{item[4] && <a href={item[4]} target="_blank" rel="noreferrer">View Instagram portfolio ↗</a>}</small><a href={whatsApp(`Hi, I’m interested in your ${item[1].toLowerCase()} work and would like to discuss a project.`)} target="_blank" rel="noreferrer" aria-label={`Discuss ${item[1]}`}>↗</a></article>)}</div>
      </section>

      <section className="work" id="work">
        <div className="section-shell work-heading reveal-section"><div className="section-index"><span>03</span><p>Selected work</p></div><div><h2>Systems, not surface decoration.</h2><p>These scope studies show the kind of thinking and execution available. Client work and performance data are published only with permission.</p></div></div>
        <div className="project-list section-shell">{projects.map((project) => <article className="project reveal-section" key={project.number}>
          <div className={`project-visual ${project.visual}`}><span className="visual-code">{project.number}</span>
            {project.visual === "interface" && <div className="interface-window"><div className="window-bar"><i/><i/><i/></div><p>Digital presence<br/><em>with purpose.</em></p><span>Strategy / Experience / Build</span></div>}
            {project.visual === "signal" && <div className="signal-core"><i/><i/><i/><b>VTC</b></div>}
            {project.visual === "channel" && <div className="channel-grid"><i/><i/><i/><i/><b>Content<br/>system</b></div>}
            {project.visual === "social" && <div className="social-window"><span>{project.socialHandle}</span><b>Social media<br/><em>with intent.</em></b><small>Content · Direction · Management</small></div>}
          </div>
          <div className="project-copy"><div><span>{project.number}</span><small>{project.category}</small></div><h3>{project.title}</h3><p>{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="project-links">{project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noreferrer">{project.externalLabel} <span>↗</span></a>}<a href={whatsApp(`Hi, I would like to discuss a project similar to your ${project.category.toLowerCase()} work.`)} target="_blank" rel="noreferrer">Discuss a similar project <span>↗</span></a></div></div>
        </article>)}</div>
      </section>

      <section className="principles section-shell reveal-section">
        <div className="section-index"><span>04</span><p>Approach</p></div>
        <div className="principle-statement"><p>AI should expand the creative process—<em>not replace judgement.</em></p><span>I use technology to explore faster, test more directions and build stronger systems. The final decisions remain grounded in audience, context and craft.</span></div>
        <ol><li><span>01</span><b>Discover</b><p>Clarify the goal, audience and current position.</p></li><li><span>02</span><b>Define</b><p>Shape the scope, direction and practical priorities.</p></li><li><span>03</span><b>Create</b><p>Design, build and refine the agreed system.</p></li><li><span>04</span><b>Deploy</b><p>Launch with a clear path for iteration and growth.</p></li></ol>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <div className="contact-copy reveal-section"><p className="eyebrow">Have a project in mind?</p><h2>Let’s build what<br />comes <em>next.</em></h2><p>Tell me what you are trying to build, improve or grow. I’ll review the context and recommend a practical starting point.</p><a className="primary-button light" href={whatsApp("Hi, I found your website and would like to discuss an AI-powered digital marketing or creative technology project. My business is: [Business name]. My project goals are: [Brief description].")} target="_blank" rel="noreferrer">Message on WhatsApp <span>↗</span></a><div className="direct-contact-links"><a href="mailto:vtcsmm@gmail.com">vtcsmm@gmail.com</a><a href={`https://wa.me/${whatsAppNumber}`} target="_blank" rel="noreferrer">+65 8995 0821</a><a href={personalInstagram} target="_blank" rel="noreferrer">Instagram · @k4.yden</a></div></div>
        <div className="brief-panel reveal-section">{submitted ? <div className="success-state"><span>Brief received</span><h3>Thank you.</h3><p>For the fastest response, continue directly on WhatsApp.</p><a href={whatsApp("Hi, I just submitted my project brief and would like to continue the conversation.")} target="_blank" rel="noreferrer">Continue on WhatsApp ↗</a></div> : <form onSubmit={submitBrief}>
          <div><label htmlFor="name">Name</label><input id="name" name="name" required /></div><div><label htmlFor="business">Business</label><input id="business" name="business" /></div>
          <div className="wide"><label htmlFor="interest">Area of interest</label><select id="interest" name="interest" defaultValue=""><option value="" disabled>Select one</option><option>Website or redesign</option><option>AI creative direction</option><option>Brand system</option><option>Content or YouTube growth</option><option>Custom project</option></select></div>
          <div className="wide"><label htmlFor="brief">What are you trying to build?</label><textarea id="brief" name="brief" required /></div><button type="submit">Send project details <span>↗</span></button><small>No online payment. Scope and quotation are discussed directly.</small>
        </form>}</div>
      </section>

      <footer><a className="wordmark" href="#top">VTC<span>®</span></a><p>Creative technology for modern businesses.</p><div><a href="mailto:vtcsmm@gmail.com">Email</a><a href={`https://wa.me/${whatsAppNumber}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={personalInstagram} target="_blank" rel="noreferrer">Instagram</a><a href="#work">Work</a></div><span>© 2026 VTCSocial · All rights reserved</span></footer>
    </main>
  );
}
