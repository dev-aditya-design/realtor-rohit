import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  business,
  budgets,
  categories,
  disclaimer,
  filterProperties,
  locations,
  properties,
  propertyEnquiry,
  propertyTypes,
  purposes,
  whatsapp,
} from "./data";
import "./styles.css";

const nav = [
  ["/", "Home"],
  ["/properties", "Properties"],
  ["/residential", "Residential"],
  ["/commercial", "Commercial"],
  ["/plots-land", "Plots & Land"],
  ["/about", "About Rohit"],
  ["/contact", "Contact"],
];
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const property = properties.find((p) => pathname === `/properties/${p.id}`);
    const label =
      nav.find(([url]) => url === pathname)?.[1] ||
      property?.name ||
      "Page not found";
    document.title = `${label} | ${business.name} · Concept Demo`;
  }, [pathname]);
  return null;
}
function Button({ to, children, light = false, outline = false, ...props }) {
  return (
    <Link
      className={`button ${light ? "button-light" : ""} ${outline ? "button-outline" : ""}`}
      to={to}
      {...props}
    >
      {children}
      <ArrowUpRight size={16} />
    </Link>
  );
}
function WhatsAppLink({
  property,
  children = "Chat on WhatsApp",
  className = "button button-light",
}) {
  return (
    <a
      className={className}
      href={property ? propertyEnquiry(property) : whatsapp()}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}
function Brand() {
  return (
    <Link className="brand" to="/" aria-label={`${business.name} home`}>
      <span className="brand-mark">
        R<span>.</span>
      </span>
      <span className="brand-name">
        <strong>ROHIT</strong> REAL ESTATE<small>REWARI · HARYANA</small>
      </span>
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  return (
    <>
      <div className="demo-banner">
        Personalized concept demo{" "}
        <span>· Sample listings, not live inventory</span>
      </div>
      <header className="header">
        <div className="header-inner container">
          <Brand />
          <nav
            id="primary-navigation"
            className={`nav ${open ? "is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {nav.map(([url, label]) => (
              <NavLink
                key={url}
                end={url === "/"}
                to={url}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            ))}
            <Link className="mobile-book" to="/contact">
              Make an enquiry <ArrowUpRight size={16} />
            </Link>
          </nav>
          <a
            className="header-cta"
            href={whatsapp()}
            target="_blank"
            rel="noreferrer"
          >
            Let's talk <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>Your next property decision begins with a conversation.</p>
            <span className="footer-place">
              <MapPin size={16} />
              {business.location} · provisional
            </span>
          </div>
          <div>
            <span className="footer-heading">EXPLORE</span>
            {nav.map(([url, label]) => (
              <Link key={url} to={url}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <span className="footer-heading">TALK TO ROHIT</span>
            <a href={business.callUrl}>{business.phone}</a>
            <WhatsAppLink className="text-link" />
            <Button to="/contact" light>
              Share your requirements
            </Button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{disclaimer}</p>
          <span>
            © {new Date().getFullYear()} {business.name} · Concept demo
          </span>
        </div>
      </div>
    </footer>
  );
}
function FloatingWhatsApp() {
  return (
    <a
      className="floating-wa"
      href={whatsapp()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Enquire with ${business.agent} on WhatsApp`}
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 .8A15.1 15.1 0 0 0 3.1 23.7L.9 31l7.5-2A15.2 15.2 0 1 0 16 .8zm0 27.5a12.4 12.4 0 0 1-6.3-1.7l-.5-.3-4.4 1.2 1.2-4.3-.3-.5a12.5 12.5 0 1 1 10.3 5.6zm6.8-9.3c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.3-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.2.1-.5 0-.7-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.2s1.3 3.7 1.5 4c.2.3 2.6 4 6.2 5.5.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z" />
      </svg>
    </a>
  );
}
function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </div>
  );
}
function SectionHead({
  eyebrow,
  title,
  copy,
  link,
  linkText = "Explore more",
}) {
  return (
    <div className="section-head">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {link && (
        <Link className="text-link" to={link}>
          {linkText}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
function ConceptTag() {
  return <span className="concept-tag">Concept / Sample Listing</span>;
}
function ListingNotice() {
  return (
    <div className="notice">
      <ShieldCheck size={20} />
      <span>
        <strong>Concept / Sample Listings.</strong> Images, locations and budget
        bands are illustrative. These are not verified properties, prices,
        approvals or availability.
      </span>
    </div>
  );
}
function PropertyCard({ property: p }) {
  return (
    <article className="property-card">
      <Link to={`/properties/${p.id}`} className="property-image">
        <img src={p.image} loading="lazy" alt={p.imageNote} />
        <ConceptTag />
      </Link>
      <div className="property-body">
        <div className="property-location">
          <MapPin size={14} />
          {p.location}, Haryana · example
        </div>
        <h3>
          <Link to={`/properties/${p.id}`}>{p.name}</Link>
        </h3>
        <p>{p.summary}</p>
        <div className="property-meta">
          <span>{p.type}</span>
          <span>{p.purpose}</span>
          <span>Sample budget: {p.budget}</span>
        </div>
        <div className="property-actions">
          <Link to={`/properties/${p.id}`}>
            View details <ArrowRight size={16} />
          </Link>
          <WhatsAppLink property={p} className="property-enquiry">
            Enquire
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
function Hero() {
  return (
    <section className="hero">
      <div
        className="hero-photo"
        role="img"
        aria-label="Illustrative contemporary home, not a local property listing"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <Eyebrow>REWARI & NEARBY HARYANA · PROVISIONAL</Eyebrow>
        <h1>
          A place for your plans.
          <br />
          <em>Space for what's next.</em>
        </h1>
        <p>
          Homes, business spaces and land. Explore a fresh approach to your next
          property conversation with Rohit Jaat.
        </p>
        <div className="hero-actions">
          <WhatsAppLink>Discuss your requirements</WhatsAppLink>
          <Button to="/properties" outline>
            Explore sample properties
          </Button>
        </div>
        <div className="hero-bottom">
          <span>HOMES / BUSINESS / LAND</span>
          <span>PERSONAL CONCEPT DEMO · ILLUSTRATIVE IMAGERY</span>
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
}
function CategoryTile({ category: c, index }) {
  return (
    <Link
      className={`special-tile ${index === 0 ? "special-wide" : ""}`}
      to={`/${c.slug}`}
    >
      <img
        src={c.image}
        alt={`Illustrative ${c.short.toLowerCase()} concept`}
        loading="lazy"
      />
      <div className="special-shade" />
      <span className="special-number">0{index + 1} / PROPERTY FOCUS</span>
      <div>
        <h3>{c.name}</h3>
        <p>{c.description}</p>
        <span className="circle-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
    </Link>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <div className="intro-strip">
        <div className="container intro-strip-inner">
          <span>YOUR REQUIREMENTS COME FIRST</span>
          <p>A home to live in. A space to work. A plan to build on.</p>
          <ArrowUpRight size={24} />
        </div>
      </div>
      <section className="section philosophy">
        <div className="container philosophy-grid">
          <div className="philosophy-image">
            <img
              src="/images/interior.jpg"
              alt="Illustrative residential interior, not verified inventory"
              loading="lazy"
            />
            <span className="image-index">A THOUGHTFUL START / 01</span>
          </div>
          <div className="philosophy-copy">
            <Eyebrow>MAKE ROOM FOR THE RIGHT QUESTIONS</Eyebrow>
            <h2>
              Your priorities.
              <br />
              <em>Your next move.</em>
            </h2>
            <p>
              What does the right property need to do for you? Begin with your
              location, budget and purpose, then consider the details that
              matter in everyday life.
            </p>
            <p>
              This concept introduces Rohit Jaat and a possible direction for
              Rohit Real Estate, with Rewari and nearby Haryana locations as
              provisional examples.
            </p>
            <Link className="text-link" to="/about">
              Meet Rohit <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section specializations">
        <div className="container">
          <SectionHead
            eyebrow="THREE WAYS TO EXPLORE"
            title={
              <>
                Find the space for <em>your ambition.</em>
              </>
            }
            copy="Explore residential, commercial and land concepts. Every example is a starting point for a conversation."
          />
          <div className="special-grid">
            {categories.map((c, index) => (
              <CategoryTile key={c.slug} category={c} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container">
          <SectionHead
            eyebrow="THE CONCEPT COLLECTION"
            title={
              <>
                Picture the possibilities.
                <br />
                <em>Then ask the details.</em>
              </>
            }
            copy="Six sample profiles across Rewari, Dharuhera and Bawal. No live inventory or property representation is claimed."
            link="/properties"
            linkText="Explore all six samples"
          />
          <div className="property-grid">
            {[properties[0], properties[3], properties[2]].map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>
      <Advisor />
      <section className="section reasons">
        <div className="container">
          <SectionHead
            eyebrow="A BETTER STARTING POINT"
            title={
              <>
                Clear questions. <em>Considered decisions.</em>
              </>
            }
            copy="A useful checklist for your property conversation, rather than promises about unverified properties."
          />
          <div className="reason-grid">
            {[
              [
                "01",
                "Your location",
                "Compare daily access and the surroundings that matter to you.",
              ],
              [
                "02",
                "Your budget",
                "Think about the total cost, beyond an asking price.",
              ],
              [
                "03",
                "Your purpose",
                "A family home and a business space call for different questions.",
              ],
              [
                "04",
                "The documentation",
                "Verify title, approvals and permitted use independently.",
              ],
              [
                "05",
                "Your next step",
                "Share your requirements directly with Rohit on WhatsApp.",
              ],
            ].map(([n, t, d]) => (
              <div className="reason" key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
function Advisor() {
  return (
    <section className="section advisor">
      <div className="container advisor-grid">
        <div className="advisor-portrait">
          <div className="profile-monogram">
            <span className="monogram-label">A PERSONAL INTRODUCTION</span>
            <span className="monogram-initials" aria-hidden="true">
              {business.initials}
              <i>.</i>
            </span>
            <span className="monogram-location">REWARI · HARYANA</span>
          </div>
          <div className="portrait-caption">
            {business.agent}
            <span>REAL ESTATE AGENT · CONCEPT DEMO</span>
          </div>
        </div>
        <div className="advisor-copy">
          <Eyebrow>MEET ROHIT JAAT</Eyebrow>
          <h2>
            Let's talk property.
            <br />
            <em>And your possibilities.</em>
          </h2>
          <p>
            Meet Rohit Jaat, a real estate agent with Rewari, Haryana as the
            provisional base for this introduction.
          </p>
          <p>
            Looking for a home, a commercial space or land? Share what matters
            to you and start a direct conversation. Explore the sample profiles
            to clarify your preferences, then share your requirements directly
            with Rohit on WhatsApp.
          </p>
          <Button to="/contact">Start a conversation</Button>
        </div>
      </div>
    </section>
  );
}
function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <Eyebrow>YOUR NEXT MOVE STARTS HERE</Eyebrow>
          <h2>
            Tell Rohit what you need.
            <br />
            <em>Take the conversation forward.</em>
          </h2>
        </div>
        <WhatsAppLink>Talk on WhatsApp</WhatsAppLink>
      </div>
    </section>
  );
}
function PageHero({ eyebrow, title, copy, imageUrl }) {
  return (
    <section
      className={`page-hero ${imageUrl ? "page-hero-image" : ""}`}
      style={
        imageUrl
          ? {
              backgroundImage: `linear-gradient(90deg,rgba(16,30,38,.94),rgba(16,30,38,.45)),url(${imageUrl})`,
            }
          : undefined
      }
    >
      <div className="container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}
const filterKeys = ["location", "type", "purpose", "budget"];
function Properties({ category }) {
  const [params, setParams] = useSearchParams();
  const filters = Object.fromEntries(
    filterKeys.map((key) => [key, params.get(key) || ""]),
  );
  const filtered = filterProperties(filters, category?.slug);
  const types = category
    ? properties.filter((p) => p.category === category.slug).map((p) => p.type)
    : propertyTypes;
  function update(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }
  return (
    <>
      <PageHero
        eyebrow={
          category ? "EXPLORE / " + category.short : "THE CONCEPT COLLECTION"
        }
        title={
          category ? (
            <>
              {category.name}.<br />
              <em>Your plans, in focus.</em>
            </>
          ) : (
            <>
              A space for every plan.
              <br />
              <em>Explore the possibilities.</em>
            </>
          )
        }
        copy={
          category?.description ||
          "Explore six illustrative property profiles. Use the filters to find the samples most relevant to your requirements."
        }
        imageUrl={category?.image || "/images/hero.jpg"}
      />
      <section className="section listings">
        <div className="container">
          <ListingNotice />
          {category && (
            <div className="category-checklist">
              <h2>Before you shortlist</h2>
              <ul className="check-list">
                {category.considerations.map((item) => (
                  <li key={item}>
                    <Check size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="filters">
            <div className="filter-title">
              <Search size={20} /> Find your focus
            </div>
            {[
              ["location", "Location", locations, "All locations"],
              ["type", "Property type", types, "All types"],
              ["purpose", "Purpose", purposes, "All purposes"],
              ["budget", "Sample budget", budgets, "All budgets"],
            ].map(([key, label, options, all]) => (
              <label key={key}>
                {label}
                <span className="select-wrap">
                  <select
                    aria-label={label}
                    value={filters[key]}
                    onChange={(e) => update(key, e.target.value)}
                  >
                    <option value="">{all}</option>
                    {options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </span>
              </label>
            ))}
          </div>
          <div className="list-results" aria-live="polite">
            <span>
              {filtered.length} sample{" "}
              {filtered.length === 1 ? "listing" : "listings"}
            </span>
            <button type="button" onClick={() => setParams({})}>
              Clear filters
            </button>
          </div>
          {filtered.length ? (
            <div className="property-grid light-grid">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No sample listings match these filters.</h3>
              <p>
                Clear the filters or share your requirements directly with
                Rohit.
              </p>
              <Button to="/contact">Discuss your requirements</Button>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
function PropertyDetail() {
  const { id } = useParams();
  const p = properties.find((x) => x.id === id);
  if (!p) return <NotFound />;
  return (
    <>
      <section className="detail-hero">
        <img src={p.image} alt={p.imageNote} />
        <div className="detail-overlay" />
        <div className="container">
          <Link to="/properties" className="back-link">
            <ChevronLeft size={17} /> All sample properties
          </Link>
          <ConceptTag />
          <div className="property-location">
            <MapPin size={16} />
            {p.area}
          </div>
          <h1>{p.name}</h1>
          <p>{p.summary}</p>
        </div>
      </section>
      <section className="section detail-content">
        <div className="container detail-grid">
          <div>
            <Eyebrow>AN ILLUSTRATIVE PROPERTY PROFILE</Eyebrow>
            <h2>
              A closer look at <em>the possibilities.</em>
            </h2>
            <p>{p.story}</p>
            <p className="image-disclosure">{p.imageNote}</p>
            <h3>Questions worth asking</h3>
            <ul className="check-list">
              {p.highlights.map((h) => (
                <li key={h}>
                  <Check size={18} />
                  {h}
                </li>
              ))}
            </ul>
            <ListingNotice />
          </div>
          <aside className="detail-aside">
            <span>SAMPLE PROFILE / NOT VERIFIED</span>
            {[
              ["EXAMPLE LOCATION", `${p.location}, Haryana`],
              ["PROPERTY TYPE", p.type],
              ["PURPOSE", p.purpose],
              ["EXAMPLE BUDGET", p.budget],
              ["PRICE / AVAILABILITY", "Not verified"],
            ].map(([label, value]) => (
              <div key={label}>
                <small>{label}</small>
                <strong>{value}</strong>
              </div>
            ))}
            <WhatsAppLink property={p} className="button">
              Enquire about this concept
            </WhatsAppLink>
            <Link className="text-link" to={`/contact?property=${p.id}`}>
              Share my requirements <ArrowUpRight size={16} />
            </Link>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
function About() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT ROHIT JAAT"
        title={
          <>
            Property starts with people.
            <br />
            <em>Meet Rohit.</em>
          </>
        }
        copy="A personal introduction to Rohit Jaat and a concept for Rohit Real Estate in Rewari, Haryana."
      />
      <Advisor />
      <section className="section about-approach">
        <div className="container split-copy">
          <div>
            <Eyebrow>YOUR REQUIREMENTS, FIRST</Eyebrow>
            <h2>
              Start with clarity.
              <br />
              <em>Explore with care.</em>
            </h2>
          </div>
          <div>
            <p>
              A property conversation can begin simply: where do you want to be,
              what is your budget, and how will you use the space? Talk to Rohit
              about residential, commercial, plot or land requirements.
            </p>
            <p>
              This is a personalized concept demo for a potential client, not a
              confirmed business launch. The business name and service area are
              provisional. No experience, credentials, testimonials or business
              history are claimed.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
const initial = {
  name: "",
  phone: "",
  location: "",
  budget: "",
  purpose: "",
  message: "",
};
function InquiryForm({ property }) {
  const [values, setValues] = useState({
    ...initial,
    message: property
      ? `I would like to discuss the Concept / Sample Listing "${property.name}" and similar requirements.`
      : "",
  });
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);
  const set = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
    setReady(false);
  };
  function submit(e) {
    e.preventDefault();
    const err = {};
    if (values.name.trim().length < 2)
      err.name = "Enter your name (at least 2 characters).";
    if (
      !/^(?:\+91[\s-]?|91[\s-]?)?[6-9]\d{9}$/.test(
        values.phone.trim().replace(/[\s()-]/g, ""),
      )
    )
      err.phone =
        "Enter a valid 10-digit Indian mobile number, optionally with +91.";
    if (!locations.includes(values.location))
      err.location = "Choose your preferred location.";
    if (!budgets.includes(values.budget)) err.budget = "Choose a budget range.";
    if (!purposes.includes(values.purpose)) err.purpose = "Choose a purpose.";
    if (values.message.trim().length < 10)
      err.message = "Tell us a little more (at least 10 characters).";
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`field-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setReady(true);
  }
  const message = `Hello ${business.agent}, I would like to make a property enquiry.\n${property ? `Concept / Sample Listing: ${property.name} (${property.id})\n` : ""}Name: ${values.name.trim()}\nPhone: ${values.phone.trim()}\nPreferred location: ${values.location}\nBudget preference: ${values.budget}\nPurpose: ${values.purpose}\nMessage: ${values.message.trim()}\nI understand this website contains illustrative samples, not verified inventory.`;
  return (
    <div className="form-card">
      <div className="form-heading">
        <span>YOUR PROPERTY ENQUIRY</span>
        <h2>What do you have in mind?</h2>
        <p>
          Review your details, then choose to send them on WhatsApp. This demo
          does not save enquiries or send emails.
        </p>
        {property && (
          <p className="enquiry-context">
            Concept / Sample Listing: <strong>{property.name}</strong>
          </p>
        )}
      </div>
      <form onSubmit={submit} noValidate>
        <div className="form-row">
          <Field
            name="name"
            label="Your name"
            value={values.name}
            error={errors.name}
            onChange={set}
            placeholder="Full name"
          />
          <Field
            name="phone"
            label="Mobile number"
            value={values.phone}
            error={errors.phone}
            onChange={set}
            placeholder="Your 10-digit mobile number"
            type="tel"
          />
        </div>
        <div className="form-row">
          <SelectField
            name="location"
            label="Preferred location"
            options={locations}
            value={values.location}
            error={errors.location}
            onChange={set}
          />
          <SelectField
            name="budget"
            label="Budget preference"
            options={budgets}
            value={values.budget}
            error={errors.budget}
            onChange={set}
          />
        </div>
        <SelectField
          name="purpose"
          label="Purpose"
          options={purposes}
          value={values.purpose}
          error={errors.purpose}
          onChange={set}
        />
        <div className="field">
          <label htmlFor="field-message">
            Your message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="field-message"
            rows="4"
            required
            maxLength={1500}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell Rohit what you are looking for."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "error-message" : undefined}
          />
          {errors.message && (
            <small id="error-message" className="field-error">
              {errors.message}
            </small>
          )}
        </div>
        <button className="button form-submit" type="submit">
          Review WhatsApp enquiry <ArrowUpRight size={16} />
        </button>
        {ready && (
          <div className="form-success" role="status">
            <Check size={19} />
            <div>
              <strong>Your enquiry is ready to send.</strong>
              <p>
                Open WhatsApp and send the message yourself. Nothing has been
                sent or saved by this demo.
              </p>
              <div className="send-options">
                <a href={whatsapp(message)} target="_blank" rel="noreferrer">
                  Open WhatsApp with enquiry <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
function Field({
  name,
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="field">
      <label htmlFor={`field-${name}`}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <input
        id={`field-${name}`}
        type={type}
        required
        maxLength={name === "name" ? 100 : 20}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        autoComplete={name === "name" ? "name" : "tel"}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${name}` : undefined}
      />
      {error && (
        <small id={`error-${name}`} className="field-error">
          {error}
        </small>
      )}
    </div>
  );
}
function SelectField({ name, label, value, error, onChange, options }) {
  return (
    <div className="field">
      <label htmlFor={`field-${name}`}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <span className="select-wrap">
        <select
          id={`field-${name}`}
          required
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${name}` : undefined}
        >
          <option value="">Select an option</option>
          {options.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <ChevronDown size={17} />
      </span>
      {error && (
        <small id={`error-${name}`} className="field-error">
          {error}
        </small>
      )}
    </div>
  );
}
function Contact() {
  const [params] = useSearchParams();
  const property = properties.find((p) => p.id === params.get("property"));
  return (
    <>
      <PageHero
        eyebrow="CONTACT / ENQUIRY"
        title={
          <>
            Every next move begins
            <br />
            with <em>a conversation.</em>
          </>
        }
        copy="Share your requirements with Rohit Jaat. Call directly or prepare a personal WhatsApp enquiry."
      />
      <section className="section form-section">
        <div className="container form-layout">
          <div className="form-side">
            <Eyebrow>TALK TO ROHIT</Eyebrow>
            <h2>
              Let's make room
              <br />
              for <em>your plans.</em>
            </h2>
            <div className="contact-list">
              <div>
                <span>CALL DIRECTLY</span>
                <a href={business.callUrl}>
                  <Phone size={18} />
                  {business.phone}
                </a>
              </div>
              <div>
                <span>WHATSAPP</span>
                <WhatsAppLink className="text-link" />
              </div>
              <div>
                <span>PROVISIONAL SERVICE AREA</span>
                <strong>{business.location}</strong>
                <p>
                  Nearby Haryana locations shown are illustrative examples,
                  subject to confirmation.
                </p>
              </div>
            </div>
            <div className="side-note">
              <span>A PERSONALIZED CONCEPT</span>
              <p>
                All property profiles here are illustrative samples. Share your
                requirements on WhatsApp; nothing is sent automatically.
              </p>
            </div>
          </div>
          <InquiryForm key={property?.id || "general"} property={property} />
        </div>
      </section>
    </>
  );
}
function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <Eyebrow>PAGE NOT FOUND</Eyebrow>
        <h1>Let's find your way back.</h1>
        <p>This page or sample property isn't here.</p>
        <Button to="/properties">Explore sample properties</Button>
      </div>
    </section>
  );
}
function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollReset />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          {categories.map((c) => (
            <Route
              key={c.slug}
              path={`/${c.slug}`}
              element={<Properties category={c} />}
            />
          ))}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </BrowserRouter>
  );
}
createRoot(document.getElementById("root")).render(<App />);
