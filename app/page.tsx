"use client";

import { FormEvent, useMemo, useState } from "react";

const WA = "https://wa.me/?text=";
const wa = (message: string) => WA + encodeURIComponent(message);

const services = [
  ["01", "AI-powered digital marketing", "Strategy, content systems and campaign workflows shaped by AI-assisted research and human judgement.", "Campaign planning · Content roadmap · Optimisation"],
  ["02", "Website design & development", "Modern, responsive websites built around positioning, user experience, credibility and clear conversion pathways.", "UX direction · Responsive build · Launch support"],
  ["03", "AI creative services", "Creative concepts, visual development, scripts and campaign assets produced through considered AI-assisted workflows.", "Concepting · Visual systems · Production support"],
  ["04", "Website redesign & optimisation", "A strategic overhaul for dated websites: clearer structure, stronger messaging, better mobile experiences and journeys.", "UX audit · Redesign · Conversion pathways"],
  ["05", "YouTube growth services", "Channel positioning, content strategy, titles, thumbnails, scripts and optimisation built to support steady audience development.", "Channel strategy · Packaging · Optimisation"],
  ["06", "Digital brand systems", "A connected identity across your website, social presence, campaign materials and ongoing content channels.", "Brand direction · Digital toolkit · Guidelines"],
];

const loras = [
  ["Launchpad Site", "Website design", "A focused, credible website for a new business or offer.", "New ventures", 1600, "4–6 weeks"],
  ["Conversion Landing Page", "Website design", "A singular campaign page with a clear conversion journey.", "Campaigns", 950, "2–3 weeks"],
  ["Experience Redesign", "Website design", "Reframe an existing site with sharper structure and direction.", "Established brands", 2200, "5–7 weeks"],
  ["Responsive Frontend", "Website development", "Production-ready responsive implementation from approved design.", "Design teams", 1800, "3–6 weeks"],
  ["CMS Foundation", "Website development", "An editable content structure for an evolving business website.", "Content-led brands", 1200, "2–4 weeks"],
  ["Commerce Experience", "E-commerce", "A considered store structure and shopping experience.", "Online retailers", 2800, "6–9 weeks"],
  ["Brand Signal", "Branding", "A compact visual direction for clear, consistent digital expression.", "New brands", 1200, "3–4 weeks"],
  ["Digital Brand Kit", "Branding", "Practical identity rules and assets for everyday digital use.", "Growing teams", 750, "2–3 weeks"],
  ["Content Engine", "AI content", "A repeatable, AI-assisted content planning and production workflow.", "Busy teams", 900, "2–3 weeks"],
  ["Campaign Concepts", "AI content", "Creative territories, messaging angles and campaign starters.", "Marketing teams", 650, "1–2 weeks"],
  ["Short-form Studio", "Video creative", "A repeatable direction for short-form video concepts and scripts.", "Creators & brands", 800, "2–3 weeks"],
  ["Social System", "Social media", "Content pillars, formats and publishing logic for consistency.", "Service brands", 750, "2–3 weeks"],
  ["Channel Blueprint", "YouTube", "Positioning, series architecture and a practical publishing roadmap.", "New channels", 850, "2–3 weeks"],
  ["Video Packaging", "YouTube", "Title and thumbnail direction designed to improve content clarity.", "Active channels", 450, "1–2 weeks"],
  ["Search Foundation", "SEO", "Technical and on-page essentials for a discoverable website.", "Business websites", 700, "2–3 weeks"],
  ["Lead Journey", "Lead generation", "A clear pathway from first visit to qualified conversation.", "Service businesses", 800, "2–3 weeks"],
  ["Conversion Review", "Conversion optimisation", "A focused review of friction, hierarchy and calls to action.", "Live websites", 500, "1–2 weeks"],
  ["Workflow Map", "Automation", "Plan high-value marketing and content workflow automations.", "Scaling teams", 950, "2–4 weeks"],
  ["Measurement Setup", "Analytics", "A practical measurement plan and core analytics configuration.", "Digital teams", 600, "1–2 weeks"],
  ["Creative Sprint", "Creative strategy", "A fast strategic sprint to clarify one important growth challenge.", "Decision-makers", 550, "1 week"],
] as const;

const tiers = [
  ["Foundation", "For a credible professional starting point", "From $1,600", ["Core website structure", "Essential pages", "Mobile-responsive design", "Basic conversion pathway"], "Complex integrations and ongoing campaigns"],
  ["Growth", "For stronger positioning and marketing capability", "From $3,800", ["Strategic site architecture", "Creative direction", "Conversion-focused messaging", "AI-assisted content support"], "Custom platforms and high-volume production"],
  ["Advanced", "For a connected digital growth system", "From $7,500", ["Advanced website experience", "Custom creative technology", "Content and campaign systems", "Workflow planning"], "Open-ended scope or dedicated embedded team"],
  ["Bespoke", "For complex or high-volume requirements", "Scoped to brief", ["Fully tailored scope", "Advanced development", "Multi-platform delivery", "Dedicated project planning"], "Defined after discovery"],
];

const faqs = [
  ["What are Loras?", "Loras are our selectable creative technology and AI service modules. Each module solves a focused need and can be combined with others into a practical project scope."],
  ["Can I select more than one Lora—or up to 50?", "Yes. You can combine as many relevant modules as you need, up to 50. The current catalogue is curated and will expand; your selection is a discussion starter, not an order."],
  ["Are the displayed prices final?", "No. Prices are indicative starting points. Final scope and quotation depend on your requirements, complexity, content, integrations, revisions and support needs."],
  ["Can I request a custom package?", "Absolutely. Share your goals, budget range and existing digital assets, and we will recommend a focused combination or a bespoke scope."],
  ["Do you provide website redesigns?", "Yes. We can review structure, visual direction, messaging, mobile usability and conversion pathways, then recommend the right level of redesign."],
  ["Do you work with businesses without a website?", "Yes. Foundation projects are specifically suited to new businesses, focused launches and teams building their first credible digital home."],
  ["Do you guarantee YouTube growth?", "No. Growth varies by niche, content quality, audience behaviour and publishing consistency. Our work is designed to support better positioning, packaging and execution."],
  ["How long does a typical project take?", "Focused modules may take one to three weeks. Websites commonly take four to nine weeks. More complex systems are planned after discovery."],
  ["Can you work with our existing brand?", "Yes. We can work within your existing guidelines, evolve your current direction or help establish a clearer digital brand system."],
  ["Do you provide ongoing support?", "Yes. Ongoing optimisation, content and creative support can be discussed once we understand the pace and capacity your business needs."],
  ["Do I need to pay online?", "No. We do not process payments through this website. We first clarify scope, deliverables, quotation, terms and next steps with you directly."],
  ["How do I start?", "Explore the services, select relevant Loras or choose a portfolio standard, then send us a WhatsApp message. We will help turn your idea into a practical scope."],
];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const categories = ["All", ...Array.from(new Set(loras.map((l) => l[1])))];
  const filtered = loras.filter((l) => (category === "All" || l[1] === category) && `${l[0]} ${l[1]} ${l[2]}`.toLowerCase().includes(query.toLowerCase()));
  const total = useMemo(() => loras.filter((l) => selected.includes(l[0])).reduce((sum, l) => sum + l[4], 0), [selected]);
  const toggle = (name: string) => setSelected((s) => s.includes(name) ? s.filter((x) => x !== name) : s.length < 50 ? [...s, name] : s);
  const selectionMessage = `Hi, I would like to discuss the following selected services:\n${selected.map((s) => `• ${s}`).join("\n")}\n\nMy business/project is:`;
  const formSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSubmitted(true); };

  return <main>
    <header className="navWrap">
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="VTCSocial home"><span className="brandMark">V</span> VTCSOCIAL</a>
        <div className={`navLinks ${menu ? "open" : ""}`}><a onClick={()=>setMenu(false)} href="#services">Services</a><a onClick={()=>setMenu(false)} href="#loras">Loras</a><a onClick={()=>setMenu(false)} href="#work">Portfolio</a><a onClick={()=>setMenu(false)} href="#youtube">YouTube</a><a onClick={()=>setMenu(false)} href="#process">Process</a><a onClick={()=>setMenu(false)} href="#faqs">FAQs</a></div>
        <a className="btn btnSmall navCta" href={wa("Hi, I found your website and would like to discuss an AI-powered digital marketing or creative technology project.")} target="_blank" rel="noreferrer">Chat on WhatsApp <span>↗</span></a>
        <button className="menuBtn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}><span/><span/></button>
      </nav>
    </header>

    <section id="top" className="hero shell">
      <div className="heroCopy">
        <div className="eyebrow"><i /> AI-powered creative technology partner</div>
        <h1>Build a digital presence that <em>moves business.</em></h1>
        <p>We combine sharp strategy, high-quality website development and AI-assisted creative systems to help modern businesses turn attention into opportunity.</p>
        <div className="heroActions"><a className="btn" href={wa("Hi, I’m interested in your AI-powered digital marketing and creative technology services. I would like to discuss my project.")} target="_blank" rel="noreferrer">Discuss your project <span>↗</span></a><a className="textLink" href="#work">View selected work <span>↓</span></a></div>
        <div className="heroNote"><span>01</span><p>From your first website to a complete digital growth system.</p></div>
      </div>
      <div className="heroVisual" aria-label="Creative technology project preview">
        <div className="orb orbOne"/><div className="orb orbTwo"/>
        <div className="studioCard"><div className="windowBar"><span/><span/><span/><b>VTCS / PROJECT_024</b></div><div className="screen"><div className="screenTag">LAUNCHING / DIGITAL EXPERIENCE</div><div className="screenTitle">Turn ideas<br/>into <i>impact.</i></div><div className="screenGrid"><span>STRATEGY</span><span>DESIGN</span><span>AI SYSTEMS</span></div></div></div>
        <div className="floatCard floatOne"><span>CONNECTED CAPABILITIES</span><strong>06</strong><i>Web · Content · Growth</i></div><div className="floatCard floatTwo"><span>CREATIVE SIGNAL</span><strong>HUMAN + AI</strong><i>Built with judgement</i></div>
      </div>
    </section>

    <section className="trustStrip"><div className="shell"><p>Built for businesses that care about</p><div><span>QUALITY</span><span>CLARITY</span><span>PROGRESS</span><span>PARTNERSHIP</span></div></div></section>

    <section className="light section" id="services"><div className="shell">
      <div className="sectionHead"><div><span className="sectionNo">02 / CAPABILITIES</span><h2>One partner.<br/><em>A connected digital system.</em></h2></div><p>Strategy, design, content and technology work better when they move in the same direction. Start focused, then build the system your next stage needs.</p></div>
      <div className="serviceGrid">{services.map((s)=><article className="serviceCard" key={s[0]}><span className="cardNo">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><div className="deliverable">{s[3]}</div><a href={wa(`Hi, I’m interested in your ${s[1].toLowerCase()} services. I would like to discuss my business and requirements.`)} target="_blank" rel="noreferrer">Discuss this service <b>↗</b></a></article>)}</div>
    </div></section>

    <section className="dark section" id="loras"><div className="shell">
      <div className="sectionHead inverse"><div><span className="sectionNo">03 / LORA CATALOGUE</span><h2>Build your own<br/><em>starting point.</em></h2></div><p>Loras are focused creative technology modules. Browse, compare and combine them into a project brief—then talk it through with us before making any decision.</p></div>
      <div className="catalogueToolbar"><label className="search"><span>⌕</span><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search the catalogue" aria-label="Search Loras"/></label><span className="resultCount">{filtered.length} MODULES</span></div>
      <div className="filters" aria-label="Filter by category">{categories.map((c)=><button key={c} onClick={()=>setCategory(c)} className={category===c?"active":""}>{c}</button>)}</div>
      <div className="loraLayout"><div className="loraGrid">{filtered.map((l)=><article className={`loraCard ${selected.includes(l[0])?"selected":""}`} key={l[0]}><div className="loraTop"><span>{l[1]}</span><button onClick={()=>toggle(l[0])} aria-label={`${selected.includes(l[0])?"Remove":"Select"} ${l[0]}`}>{selected.includes(l[0])?"✓":"+"}</button></div><h3>{l[0]}</h3><p>{l[2]}</p><dl><div><dt>IDEAL FOR</dt><dd>{l[3]}</dd></div><div><dt>FROM</dt><dd>${l[4].toLocaleString()}</dd></div><div><dt>EST. TIMELINE</dt><dd>{l[5]}</dd></div></dl><a href={wa(`Hi, I’m interested in the ${l[0]} Lora. I would like to discuss my requirements.`)} target="_blank" rel="noreferrer">Ask about this Lora ↗</a></article>)}</div>
      <aside className="selection"><div><span>YOUR SELECTION</span><strong>{String(selected.length).padStart(2,"0")}</strong></div>{selected.length? <ul>{selected.map(s=><li key={s}>{s}<button onClick={()=>toggle(s)} aria-label={`Remove ${s}`}>×</button></li>)}</ul>:<p>Select modules to build a consultation brief. You can choose up to 50.</p>}<div className="estimate"><span>INDICATIVE STARTING TOTAL</span><b>{total?`$${total.toLocaleString()}`:"—"}</b></div><a className={`btn ${!selected.length?"disabled":""}`} href={selected.length?wa(selectionMessage):undefined} target="_blank" rel="noreferrer">Send selection <span>↗</span></a><a className="recommend" href={wa("Hi, I would like a personalised recommendation for my business and project.")} target="_blank" rel="noreferrer">Request a recommendation</a></aside></div>
      <p className="disclaimer">Displayed prices are starting prices or indicative ranges. Final scope and quotation depend on your requirements. This selector is for discovery and consultation only—no payment is processed here.</p>
    </div></section>

    <section className="light section" id="pricing"><div className="shell">
      <div className="sectionHead"><div><span className="sectionNo">04 / LEVELS OF PARTNERSHIP</span><h2>Choose the depth,<br/><em>not just a package.</em></h2></div><p>Not every business needs the same level of strategy, design or technical complexity. These levels make the differences clearer before we tailor your scope.</p></div>
      <div className="tierGrid">{tiers.map((t,i)=><article className={`tierCard ${i===1?"featured":""}`} key={t[0]}>{i===1&&<span className="popular">MOST SELECTED</span>}<span className="tierNo">0{i+1}</span><h3>{t[0]}</h3><p className="tierFor">{t[1]}</p><strong>{t[2]}</strong><h4>INCLUDED</h4><ul>{t[3].map(x=><li key={x}>↗ {x}</li>)}</ul><h4>NOT INCLUDED</h4><p className="notIncluded">{t[4]}</p><a href={wa(`Hi, I’m interested in the ${t[0]} service level. I would like to discuss the right scope for my business.`)} target="_blank" rel="noreferrer">Explore {t[0]} <b>↗</b></a></article>)}</div>
      <p className="pricingNote">Pricing is indicative and may vary based on project complexity, number of pages, integrations, content requirements, revisions and ongoing support.</p>
    </div></section>

    <section className="work section" id="work"><div className="shell">
      <div className="sectionHead inverse"><div><span className="sectionNo">05 / WEBSITE PORTFOLIO</span><h2>See the standard<br/><em>you can expect.</em></h2></div><p>Portfolio work will only appear here when approved for publication. Until then, these transparent scope studies show how creative depth and technical execution change by service level.</p></div>
      <div className="workGrid">
        <article className="project projectA"><div className="projectVisual"><span>FOUNDATION / SCOPE STUDY</span><div className="mockBrowser"><i/><i/><i/><b>Focused clarity<br/>for a new launch.</b><small>STRATEGY · DESIGN · BUILD</small></div></div><div className="projectCopy"><span>NEW BUSINESS / FOCUSED LAUNCH</span><h3>Professional essentials, expressed with confidence.</h3><p>Lean information architecture, strong mobile experience and one clear conversation pathway.</p><a href={wa("Hi, I would like to discuss a website similar to your Foundation scope study.")} target="_blank" rel="noreferrer">Discuss a similar project ↗</a></div></article>
        <article className="project projectB"><div className="projectVisual"><span>ADVANCED / SCOPE STUDY</span><div className="dataArt"><b>CONNECTED<br/><em>GROWTH</em></b><i/><i/><i/></div></div><div className="projectCopy"><span>ESTABLISHED BRAND / CONNECTED SYSTEM</span><h3>Custom experience with integrated marketing thinking.</h3><p>Deeper content architecture, distinctive creative direction, custom interactions and connected campaign systems.</p><a href={wa("Hi, I would like to discuss a website similar to your Advanced scope study.")} target="_blank" rel="noreferrer">Discuss a similar project ↗</a></div></article>
      </div>
      <div className="qualityTable"><div><b>SERVICE LEVEL</b><b>BEST SUITED FOR</b><b>TYPICAL FOCUS</b></div>{tiers.map(t=><div key={t[0]}><strong>{t[0]}</strong><span>{t[1]}</span><span>{t[3].slice(0,2).join(" · ")}</span></div>)}</div>
    </div></section>

    <section className="youtube section" id="youtube"><div className="shell youtubeGrid">
      <div><span className="sectionNo">06 / YOUTUBE GROWTH</span><h2>Build momentum<br/><em>with intention.</em></h2><p>Channel strategy, packaging and optimisation designed to support a stronger, more consistent presence over time.</p><div className="ytChecks"><span>CHANNEL POSITIONING</span><span>CONTENT ARCHITECTURE</span><span>TITLES & THUMBNAILS</span><span>PERFORMANCE REVIEW</span></div><a className="btn" href={wa("Hi, I’m interested in your YouTube growth services. I would like to discuss my channel and goals.")} target="_blank" rel="noreferrer">Discuss your channel <span>↗</span></a></div>
      <div className="ytPanel"><div className="ytPanelHead"><span>SELECTED CHANNEL VIEW</span><i>VERIFIED DATA ONLY</i></div><div className="chart"><div className="chartEmpty"><b>YOUR CHANNEL</b><span>Growth case studies will appear here only with client approval and substantiated metrics.</span></div><i style={{height:"22%"}}/><i style={{height:"34%"}}/><i style={{height:"30%"}}/><i style={{height:"48%"}}/><i style={{height:"59%"}}/><i style={{height:"73%"}}/></div><div className="metricRow"><div><span>TIME PERIOD</span><b>Defined per case study</b></div><div><span>MEASUREMENT</span><b>Substantiated metrics</b></div></div><p>Growth varies by niche, content quality, audience behaviour and publishing consistency. Results are not guaranteed.</p></div>
    </div></section>

    <section className="light section process" id="process"><div className="shell"><div className="sectionHead"><div><span className="sectionNo">07 / THE PROCESS</span><h2>From idea to<br/><em>practical scope.</em></h2></div><p>Start with an idea, a service selection or a portfolio standard. We will help you turn it into a clear, realistic project plan.</p></div><div className="steps">{[["01","Explore","Browse services and scope studies."],["02","Select","Choose Loras or describe your project."],["03","Connect","Message us directly on WhatsApp."],["04","Shape","Receive a tailored recommendation."],["05","Begin","Approve the scope and get started."]].map(s=><article key={s[0]}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></article>)}</div></div></section>

    <section className="why section"><div className="shell whyGrid"><div><span className="sectionNo">08 / WHY VTCSOCIAL</span><h2>Technology,<br/><em>with judgement.</em></h2><p>AI improves our process—it does not replace strategic thinking, craft or a real understanding of your business.</p></div><div className="whyList">{["Modular services let you begin with a focused need.","Website and content work connect through one growth approach.","Portfolio standards make scope and quality easier to compare.","You speak directly with the team before committing.","Recommendations reflect your goals, audience, budget and assets.","Every system is designed to be practical, clear and scalable."].map((x,i)=><div key={x}><span>0{i+1}</span><p>{x}</p></div>)}</div></div></section>

    <section className="light section" id="faqs"><div className="shell faqGrid"><div><span className="sectionNo">09 / FAQ</span><h2>Good questions,<br/><em>clear answers.</em></h2><p>Still deciding where to begin? Send us a message and we will point you toward a practical starting point.</p><a className="inkLink" href={wa("Hi, I have a question about your services and would like some guidance.")} target="_blank" rel="noreferrer">Ask us on WhatsApp ↗</a></div><div className="faqList">{faqs.map((f,i)=><article key={f[0]} className={openFaq===i?"open":""}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i}><span>{f[0]}</span><b>{openFaq===i?"−":"+"}</b></button>{openFaq===i&&<p>{f[1]}</p>}</article>)}</div></div></section>

    <section className="brief section"><div className="shell briefGrid"><div><span className="sectionNo">10 / PROJECT BRIEF</span><h2>Prefer to send<br/><em>the details first?</em></h2><p>Share a concise brief. We will review it, then continue the conversation directly.</p></div>{submitted?<div className="success"><span>✓</span><h3>Thank you. We have received your project details.</h3><p>For the fastest response, message us directly on WhatsApp.</p><a className="btn" href={wa("Hi, I just submitted my project details on the VTCSocial website and would like to continue the conversation.")} target="_blank" rel="noreferrer">Continue on WhatsApp <span>↗</span></a></div>:<form onSubmit={formSubmit}><div className="fieldRow"><label>Name<input required name="name" placeholder="Your name"/></label><label>Business name<input name="business" placeholder="Business or brand"/></label></div><div className="fieldRow"><label>WhatsApp number<input required name="phone" placeholder="Country code + number"/></label><label>Business type<input name="type" placeholder="e.g. Consultancy"/></label></div><label>Services of interest<select name="service" defaultValue=""><option value="" disabled>Select a focus</option>{services.map(s=><option key={s[1]}>{s[1]}</option>)}</select></label><div className="fieldRow"><label>Website URL<input name="website" placeholder="Optional"/></label><label>YouTube URL<input name="youtube" placeholder="Optional"/></label></div><label>Project range<select name="range" defaultValue=""><option value="" disabled>Select a range</option><option>$1,500–$4,000</option><option>$4,000–$8,000</option><option>$8,000+</option><option>Not sure yet</option></select></label><label>Project description<textarea required name="description" placeholder="What are you trying to build, improve or grow?"/></label><button className="btn" type="submit">Send project brief <span>↗</span></button><small>No payment is processed. Your details are used only to discuss your project.</small></form>}</div></section>

    <section className="finalCta"><div className="shell"><span className="sectionNo">LET’S START A CONVERSATION</span><h2>Let’s build the right digital system for <em>your business.</em></h2><p>Tell us what you are trying to build, improve or grow. We will review your needs and recommend a practical starting point.</p><div><a className="btn" href={wa("Hi, I found your website and would like to discuss an AI-powered digital marketing or creative technology project.\n\nHere is what I am interested in:\nMy business is:\nMy project goals are:")} target="_blank" rel="noreferrer">Start a WhatsApp conversation <span>↗</span></a><a className="textLink" href="#work">Browse the portfolio again ↑</a></div></div></section>

    <footer><div className="shell"><div><a className="brand" href="#top"><span className="brandMark">V</span> VTCSOCIAL</a><p>AI-powered growth systems for modern businesses.</p></div><div><span>EXPLORE</span><a href="#services">Services</a><a href="#loras">Loras</a><a href="#work">Portfolio</a><a href="#faqs">FAQs</a></div><div><span>START HERE</span><a href={wa("Hi, I would like to discuss a project with VTCSocial.")} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="#brief">Project brief</a></div></div><div className="footerBottom shell"><span>© 2026 VTCSOCIAL</span><span>STRATEGY · DESIGN · AI · GROWTH</span></div></footer>
  </main>;
}
