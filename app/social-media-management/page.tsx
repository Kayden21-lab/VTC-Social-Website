const clients = [
  { name: "Yuna Pie XO", handle: "@yunapiexo", platform: "Instagram", href: "https://www.instagram.com/yunapiexo/", image: "/media/yuna-photoshoot-1.png", alt: "Yuna Pie XO photographed at night in the city" },
  { name: "Hananorii", handle: "@hananorii.real", platform: "Instagram", href: "https://www.instagram.com/hananorii.real/", image: "/media/hananorii-coffee.png", alt: "Hananorii holding an iced coffee" },
  { name: "Altivon SG", handle: "@altivonsg", platform: "Instagram", href: "https://www.instagram.com/altivonsg?utm_source=qr", image: "/media/altivon-profile.jpeg", alt: "Altivon brand profile artwork" },
  { name: "NexaraFX", handle: "@nexarafx", platform: "TikTok", href: "https://www.tiktok.com/@nexarafx?lang=en", image: "/media/nexarafx-profile.jpg", alt: "NexaraFX brand profile artwork" },
  { name: "Craftypantry", handle: "Shopee shop", platform: "Shopee", href: "https://shopee.sg/craftypantry?categoryId=100636&entryPoint=ShopByPDP&itemId=10112137316" },
];

const whatsApp = "https://wa.me/6589950821";
const instagram = "https://www.instagram.com/k4.yden/";

export default function SocialMediaManagementPage() {
  return (
    <main className="social-page">
      <header className="subpage-header">
        <nav className="subpage-nav" aria-label="Social media management navigation">
          <a className="wordmark" href="../" aria-label="Back to VTCSocial home">VTC<span>®</span></a>
          <a className="back-link" href="../">Back home</a>
          <a className="nav-contact" href={whatsApp} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className="social-hero">
        <p className="section-label">Social Media Management</p>
        <h1>Content that keeps<br />brands <em>present.</em></h1>
        <p>Strategy, creative direction and publishing for consistent social channels.</p>
      </section>

      <section className="client-section" aria-labelledby="clients-title">
        <div className="client-heading">
          <h2 id="clients-title">Managed accounts.</h2>
        </div>
        <div className="client-grid">
          {clients.map((client, index) => (
            <a href={client.href} target="_blank" rel="noreferrer" className={`client-card client-${index + 1}`} key={client.handle}>
              {client.image ? (
                // Native images keep the supplied originals untouched and avoid remote optimisation.
                // eslint-disable-next-line @next/next/no-img-element
                <img className="client-photo" src={client.image} alt={client.alt} loading="lazy" />
              ) : <div className="client-mark" aria-hidden="true">{client.name.charAt(0)}</div>}
              <div><h3>{client.name}</h3><p>{client.handle}</p></div>
              <span>Open {client.platform} ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="social-contact">
        <p>Need support for your brand?</p>
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
