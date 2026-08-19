const whatsApp = "https://wa.me/6589950821?text=Hi%2C%20I%20would%20like%20to%20discuss%20website%20management.";
const instagram = "https://www.instagram.com/k4.yden/";

export default function WebsiteManagementPage() {
  return (
    <main className="website-page">
      <header className="subpage-header">
        <nav className="subpage-nav" aria-label="Website management navigation">
          <a className="wordmark" href="../" aria-label="Back to VTCSocial home">VTC<span>®</span></a>
          <a className="back-link" href="../">Back home</a>
          <a className="nav-contact" href={whatsApp} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className="website-hero">
        <p className="section-label">Website Management</p>
        <h1>Websites kept<br /><em>ready.</em></h1>
        <p>Focused support for a clear, dependable digital presence.</p>
      </section>

      <section className="website-client-section" aria-labelledby="website-clients-title">
        <h2 id="website-clients-title">Website clients.</h2>
        <a className="website-client" href="https://jwbadminton.sg/" target="_blank" rel="noreferrer">
          <span className="website-client-mark" aria-hidden="true">JW</span>
          <div>
            <h3>JW Badminton</h3>
            <p>jwbadminton.sg</p>
          </div>
          <b>Visit website ↗</b>
        </a>
      </section>

      <section className="social-contact">
        <p>Need support for your website?</p>
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
