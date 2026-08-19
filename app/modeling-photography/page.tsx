const whatsApp = "https://wa.me/6589950821?text=Hi%2C%20I%20would%20like%20to%20discuss%20a%20modeling%20photography%20project.";
const instagram = "https://www.instagram.com/k4.yden/";

const photographs = [
  { src: "/media/modeling-yuna-coffeeshop.png", alt: "Model seated at a late-night coffeeshop" },
  { src: "/media/modeling-miso-pose.png", alt: "Model posing for a mirror portrait in a bedroom" },
  { src: "/media/modeling-outdoor-rings.jpg", alt: "Outdoor portrait framed by colourful circular playground structures" },
  { src: "/media/modeling-cat-portrait.jpg", alt: "Portrait of a model holding a grey cat" },
];

export default function ModelingPhotographyPage() {
  return (
    <main className="modeling-page">
      <header className="subpage-header">
        <nav className="subpage-nav" aria-label="Modeling photography navigation">
          <a className="wordmark" href="../" aria-label="Back to VTCSocial home">VTC<span>®</span></a>
          <a className="back-link" href="../advertisements">Back to advertisements</a>
          <a className="nav-contact" href={whatsApp} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className="photography-hero">
        <p className="section-label">Modeling Photography</p>
        <h1>People in<br /><em>frame.</em></h1>
        <p>Portraits and campaign imagery shaped around mood, character and context.</p>
      </section>

      <section className="modeling-gallery" aria-label="Selected modeling photography">
        {photographs.map((photograph) => (
          <figure className="modeling-shot" key={photograph.src}>
            {/* Native images preserve the supplied files without remote processing. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photograph.src} alt={photograph.alt} loading="lazy" />
          </figure>
        ))}
      </section>

      <section className="social-contact">
        <p>Planning a shoot?</p>
        <a href={whatsApp} target="_blank" rel="noreferrer">Talk on WhatsApp ↗</a>
      </section>

      <footer className="subpage-footer">
        <a className="wordmark" href="../">VTC<span>®</span></a>
        <div><a href={whatsApp} target="_blank" rel="noreferrer">WhatsApp</a><a href={instagram} target="_blank" rel="noreferrer">Instagram</a></div>
        <span>© 2026 VTCSocial</span>
      </footer>
    </main>
  );
}
