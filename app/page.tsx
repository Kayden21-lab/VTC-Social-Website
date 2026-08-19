"use client";

import { PointerEvent as ReactPointerEvent, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const whatsAppNumber = "6589950821";
const whatsApp = (message: string) => `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
const personalInstagram = "https://www.instagram.com/k4.yden/";

const services = [
  {
    name: "Advertisements",
    description: "Campaign ideas and creative assets designed to earn attention.",
    action: "Discuss advertising",
    href: whatsApp("Hi, I am interested in advertisement creative and campaign support."),
    external: true,
    className: "advertising",
  },
  {
    name: "Social Media Management",
    description: "Strategy, content and publishing for a clear, consistent presence.",
    action: "Meet our clients",
    href: "social-media-management",
    external: false,
    className: "social-management",
  },
  {
    name: "Web & Creative Technology",
    description: "Websites, brand systems and AI-assisted creative production.",
    action: "Discuss a project",
    href: whatsApp("Hi, I am interested in web and creative technology services."),
    external: true,
    className: "creative-tech",
  },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from(".hero-reveal", { yPercent: 80, opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out" });
    gsap.from(".hero-shell", { opacity: 0, scale: 1.03, duration: 1.5, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
      gsap.from(section, {
        y: 48,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 86%" },
      });
    });
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, { scope: root });

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
    <main ref={root} className="site-main" id="top">
      <a className="skip-link" href="#services">Skip to services</a>

      <header className="topbar">
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="VTCSocial home">VTC<span>®</span></a>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="social-media-management" onClick={() => setMenuOpen(false)}>Clients</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
          <a className="nav-contact" href={whatsApp("Hi, I found VTCSocial and would like to discuss a project.")} target="_blank" rel="noreferrer">WhatsApp</a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title" onPointerMove={moveHero} onPointerEnter={moveHero}>
        <div className="hero-shell" role="img" aria-label="Cybernetic obsidian portrait of the VTCSocial creative technologist" />
        <div className="hero-face-reveal" aria-hidden="true" />
        <div className="hero-pointer-field" aria-hidden="true" />
        <div className="hero-aperture-frame" aria-hidden="true"><i /><i /><b /></div>
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-reveal">Creative technology for modern brands</p>
          <div className="hero-title-mask"><h1 id="hero-title" className="hero-reveal">Build sharper.<br /><em>Move smarter.</em></h1></div>
          <p className="hero-intro hero-reveal">Strategy, design and AI shaped into clear digital work.</p>
          <div className="hero-actions hero-reveal">
            <a className="primary-button" href={whatsApp("Hi, I would like to discuss a project with VTCSocial.")} target="_blank" rel="noreferrer">Start a conversation <span>↗</span></a>
            <a className="text-link" href="#services">Explore services <span>↓</span></a>
          </div>
        </div>
        <p className="reveal-hint">Move to reveal</p>
      </section>

      <section className="about section-shell reveal-section" id="about">
        <h2>Creative thinking.<br />Practical systems.</h2>
        <p>We combine strategy, design and AI to help brands show up with clarity.</p>
      </section>

      <section className="services section-shell" id="services">
        <div className="services-heading reveal-section">
          <p className="section-label">Services</p>
          <h2>Choose what you need.</h2>
        </div>
        <div className="service-index">
          {services.map((service) => (
            <a className={`service-tile ${service.className} reveal-section`} href={service.href} target={service.external ? "_blank" : undefined} rel={service.external ? "noreferrer" : undefined} key={service.name}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span>{service.action} ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="process section-shell reveal-section" aria-labelledby="process-title">
        <div>
          <h2 id="process-title">Simple from start to launch.</h2>
        </div>
        <ol>
          <li><b>Scope</b><span>Define the need.</span></li>
          <li><b>Create</b><span>Build the right system.</span></li>
          <li><b>Launch</b><span>Refine and release.</span></li>
        </ol>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner reveal-section">
          <h2>Let&apos;s talk.</h2>
          <div className="contact-options">
            <a href={`https://wa.me/${whatsAppNumber}`} target="_blank" rel="noreferrer"><span>WhatsApp</span><b>+65 8995 0821</b><i>↗</i></a>
            <a href={personalInstagram} target="_blank" rel="noreferrer"><span>Instagram</span><b>@k4.yden</b><i>↗</i></a>
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">VTC<span>®</span></a>
        <p>Creative technology for modern brands.</p>
        <div><a href={`https://wa.me/${whatsAppNumber}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={personalInstagram} target="_blank" rel="noreferrer">Instagram</a></div>
        <span>© 2026 VTCSocial</span>
      </footer>
    </main>
  );
}
