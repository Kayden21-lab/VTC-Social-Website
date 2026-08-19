const whatsApp = "https://wa.me/6589950821?text=Hi%2C%20I%20would%20like%20to%20discuss%20an%20advertising%20project.";
const instagram = "https://www.instagram.com/k4.yden/";

const ugcVideos = [
  { title: "UGC Video", src: "/media/ugc-video-raw.mp4" },
  { title: "Miso Baking Tray", src: "/media/miso-baking-tray.mp4" },
  { title: "Product UGC", src: "/media/img-7966.mp4" },
];

export default function AdvertisementsPage() {
  return (
    <main className="advertising-page">
      <header className="subpage-header">
        <nav className="subpage-nav" aria-label="Advertisements navigation">
          <a className="wordmark" href="../" aria-label="Back to VTCSocial home">VTC<span>®</span></a>
          <a className="back-link" href="../">Back home</a>
          <a className="nav-contact" href={whatsApp} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className="advertising-hero">
        <p className="section-label">Advertisements</p>
        <h1>Made to stop<br />the <em>scroll.</em></h1>
        <p>UGC and photography shaped for campaigns, launches and social feeds.</p>
        <nav aria-label="Advertisement categories">
          <a href="#ugc">UGC ads</a>
          <a href="#modeling">Modeling photography</a>
        </nav>
      </section>

      <section className="ugc-section" id="ugc" aria-labelledby="ugc-title">
        <div className="media-heading">
          <h2 id="ugc-title">UGC ads.</h2>
          <p>Real product stories, ready to watch.</p>
        </div>
        <div className="ugc-grid">
          {ugcVideos.map((video, index) => (
            <figure className={`ugc-item ugc-item-${index + 1}`} key={video.src}>
              {/* The supplied raw creatives do not include verified caption transcripts. */}
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video controls playsInline preload="metadata" aria-label={`${video.title} advertisement video`}>
                <source src={video.src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              <figcaption>{video.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="modeling-section" id="modeling" aria-labelledby="modeling-title">
        <div>
          <h2 id="modeling-title">Modeling<br />photography.</h2>
          <p>Concept-led images for products, people and social campaigns.</p>
        </div>
        <a href="../modeling-photography">View photography ↗</a>
      </section>

      <footer className="subpage-footer">
        <a className="wordmark" href="../">VTC<span>®</span></a>
        <div><a href={whatsApp} target="_blank" rel="noreferrer">WhatsApp</a><a href={instagram} target="_blank" rel="noreferrer">Instagram</a></div>
        <span>© 2026 VTCSocial</span>
      </footer>
    </main>
  );
}
