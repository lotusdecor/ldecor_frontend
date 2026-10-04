import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/Halloween.css';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaPhoneAlt,
  FaLock,
} from 'react-icons/fa';
import {
  GiHeadphones,
  GiFlowerTwirl,
  GiMicrophone,
  GiCardRandom,
  GiIceCreamCone,
  GiPumpkinLantern,
  GiCrown,
  GiMartini,
  GiTombstone,
  GiCandleFlame,
} from 'react-icons/gi';
import poster from '../assets/events/halloween-poster.jpg';
import logo from '../assets/logo_final.png';
import { Bat, BatBurst, Cobweb, Crowd, Pumpkin, Spider } from '../components/HalloweenScene';
import moonImg from '../assets/events/moon.webp';
import sparkshootLogo from '../assets/events/sparkshoot-logo.webp';

// Paste the Stripe Payment Link here (Stripe Dashboard → Payment Links → Create).
// In the link's "After payment" settings, choose "Don't show confirmation page" and
// redirect to https://lotusdecorandevents.com/events/halloween?ticket=success
const TICKET_URL = '';
const TICKET_PRICE = 30;
const CTA_LABEL = `Get tickets for $${TICKET_PRICE}`;

const EVENT = {
  name: 'Belly, Beats & Boo!',
  subtitle: 'An Adults-Only Halloween Affair',
  date: '2026-10-30',
  displayDate: 'October 30',
  // Fill these in when confirmed. Until then the page shows "Venue announced soon"
  // and a days-only countdown instead of a guessed start time.
  displayTime: '', // e.g. '8 PM – 1 AM'
  startsAt: '', // e.g. '2026-10-30T20:00:00-05:00' (Dallas is UTC-05:00 in October)
  venue: '', // e.g. 'The Venue Name, 123 Main St'
  city: 'Dallas, TX',
  contactName: 'Priyanka',
  contactPhone: '+1 (945) 338-9171',
  contactTel: '+19453389171',
  instagram: 'lotusdecorandevents',
};

// "Included" cards are what the ticket price covers; "extras" are also at the party.
const INCLUDED = [
  { icon: <GiHeadphones />, title: 'Live DJ', text: 'Dance all night to high-energy beats and Halloween vibes.' },
  { icon: <GiFlowerTwirl />, title: 'Belly dancers', text: 'A live belly dance performance that brings the party to life.' },
  { icon: <GiCardRandom />, title: 'Tarot reading', text: 'A complimentary tarot reading to see what the cards have in store for you.' },
  { icon: <GiPumpkinLantern />, title: 'Costume show & contest', text: 'Come dressed to impress and show off your Halloween look on stage.' },
  { icon: <GiMicrophone />, title: 'Entertainment by MC', text: 'Our MC keeps the energy up and the crowd together all evening.' },
  { icon: <GiCrown />, title: 'Influencer meet & greet', text: 'Get up close and personal with a featured influencer.' },
];
const EXTRAS = [
  { icon: <GiIceCreamCone />, title: 'Tipsy Scoop', text: 'Liquor-infused ice cream creations from Tipsy Scoop.' },
  { icon: <GiMartini />, title: 'Food & drinks', text: 'Food and drinks available to buy throughout the evening.' },
];

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Browser storage can be blocked (private mode, site-data settings); never let that break the page.
function readStore(storage, key) {
  try { return window[storage].getItem(key); } catch { return null; }
}
function writeStore(storage, key, value) {
  try { window[storage].setItem(key, value); } catch { /* ignore */ }
}

// Rising embers — generated once so positions stay stable across re-renders.
const EMBER_COLORS = ['#ff3fbf', '#b44cff', '#ffa630', '#39d5ff'];
const EMBERS = Array.from({ length: 22 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  size: `${3 + Math.random() * 5}px`,
  duration: `${9 + Math.random() * 12}s`,
  delay: `${-Math.random() * 20}s`,
  drift: `${-40 + Math.random() * 80}px`,
  color: EMBER_COLORS[i % EMBER_COLORS.length],
}));

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${EVENT.name} ${EVENT.subtitle}`,
  startDate: EVENT.startsAt || EVENT.date,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: EVENT.venue || EVENT.city,
    address: { '@type': 'PostalAddress', addressLocality: 'Dallas', addressRegion: 'TX', addressCountry: 'US' },
  },
  image: [`https://lotusdecorandevents.com${poster}`],
  description: 'An adults-only (18+) Halloween party in Dallas with a live DJ, belly dancers, tarot readings, Tipsy Scoop, a costume contest and more.',
  typicalAgeRange: '18-',
  offers: {
    '@type': 'Offer',
    price: TICKET_PRICE,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://lotusdecorandevents.com/events/halloween',
  },
  organizer: { '@type': 'Organization', name: 'Lotus Decor and Events', url: 'https://lotusdecorandevents.com' },
};

let burstSeq = 0;
function makeBurst() {
  return Array.from({ length: 9 }, (_, i) => {
    const angle = (-165 + (150 / 8) * i + (Math.random() * 14 - 7)) * (Math.PI / 180);
    const dist = 130 + Math.random() * 110;
    return {
      id: `${burstSeq}-${i}`,
      dx: Math.round(Math.cos(angle) * dist),
      dy: Math.round(Math.sin(angle) * dist),
      rot: Math.round(Math.random() * 50 - 25),
      scale: (0.6 + Math.random() * 0.6).toFixed(2),
      delay: (Math.random() * 0.12).toFixed(2),
    };
  });
}

function TicketButton({ large = false, describedBy }) {
  const [bats, setBats] = useState([]);
  const lastBurst = useRef(0);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Hover releases bats at most every 1.5s; a click always does.
  const burst = (force) => {
    const now = Date.now();
    if (reducedMotion() || (!force && now - lastBurst.current < 1500)) return;
    lastBurst.current = now;
    burstSeq += 1;
    setBats(makeBurst());
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setBats([]), 1400);
  };

  const className = `hw-ticket-btn ${large ? 'large' : ''}`;
  const handlers = { onPointerEnter: () => burst(false), onClick: () => burst(true) };
  return (
    <span className="hw-ticket-wrap">
      {TICKET_URL ? (
        <a href={TICKET_URL} className={className} target="_blank" rel="noopener noreferrer" {...handlers}>
          <FaTicketAlt className="hw-ticket-icon" aria-hidden="true" />
          {CTA_LABEL}
        </a>
      ) : (
        <span className={`${className} disabled`} role="link" aria-disabled="true" aria-describedby={describedBy} {...handlers}>
          <FaTicketAlt className="hw-ticket-icon" aria-hidden="true" />
          Tickets on sale soon
        </span>
      )}
      {bats.length > 0 && <BatBurst bats={bats} />}
    </span>
  );
}

function TicketNote({ id }) {
  return (
    <p className="hw-ticket-note" id={id}>
      ${TICKET_PRICE} per person, welcome drink included.
      {!TICKET_URL && (
        <> Follow <a href={`https://www.instagram.com/${EVENT.instagram}/`} target="_blank" rel="noopener noreferrer">@{EVENT.instagram}</a> to hear the moment sales open.</>
      )}
    </p>
  );
}

function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Without a confirmed start time, count whole days to the date rather than a guessed hour.
  if (!EVENT.startsAt) {
    const days = Math.ceil((new Date(`${EVENT.date}T00:00:00-05:00`).getTime() - now) / 86400000);
    if (days <= 0) return <p className="hw-countdown-live">It's party night. See you on the dance floor!</p>;
    return <p className="hw-countdown-days">{days === 1 ? 'Tomorrow night!' : `${days} days to go`}</p>;
  }

  const diff = Math.max(0, new Date(EVENT.startsAt).getTime() - now);
  if (diff === 0) return <p className="hw-countdown-live">The party is on. See you on the dance floor!</p>;

  const units = [
    ['days', Math.floor(diff / 86400000)],
    ['hrs', Math.floor(diff / 3600000) % 24],
    ['min', Math.floor(diff / 60000) % 60],
    ['sec', Math.floor(diff / 1000) % 60],
  ];
  return (
    <div className="hw-countdown" role="timer" aria-label="Time until the party starts">
      {units.map(([label, value]) => (
        <div className="hw-count-box" key={label}>
          <span className="hw-count-num">{String(value).padStart(2, '0')}</span>
          <span className="hw-count-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function useIsMobile(query = '(max-width: 600px)') {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatch(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return match;
}

// On phones the description folds away behind a tap so the grid stays compact.
function FeatureCard({ item, tone, isMobile, open, onToggle, children }) {
  const head = (
    <>
      <span className="hw-card-icon" aria-hidden="true">{item.icon}</span>
      <h4>{item.title}</h4>
    </>
  );
  return (
    <div className={`hw-card ${tone} ${open ? 'open' : ''}`}>
      {children}
      {isMobile ? (
        <button type="button" className="hw-card-head" aria-expanded={open} onClick={onToggle}>
          {head}
        </button>
      ) : (
        <div className="hw-card-head">{head}</div>
      )}
      <p>{item.text}</p>
    </div>
  );
}

function Halloween() {
  const [searchParams] = useSearchParams();
  const paid = searchParams.get('ticket') === 'success';
  const heroTicketRef = useRef(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [openCard, setOpenCard] = useState(null);
  const isMobile = useIsMobile();
  const pageRef = useRef(null);
  // Lights-out intro plays once per browser session.
  const [intro, setIntro] = useState(() => !reducedMotion() && readStore('sessionStorage', 'hw-intro') !== 'seen');

  // Switch the shared Navbar/Footer to the dark neon theme while this page is open.
  useEffect(() => {
    document.body.classList.add('hw-theme');
    return () => document.body.classList.remove('hw-theme');
  }, []);

  // Mobile ticket bar appears once the hero ticket button has scrolled out of view.
  useEffect(() => {
    const el = heroTicketRef.current;
    if (!el || !TICKET_URL) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowStickyCta(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!intro) return;
    writeStore('sessionStorage', 'hw-intro', 'seen');
    const id = setTimeout(() => setIntro(false), 2600);
    return () => clearTimeout(id);
  }, [intro]);

  // Scroll parallax. Each layer's `translate` is written directly so a scroll frame only
  // touches these few elements (a page-wide CSS variable would restyle the whole page).
  useEffect(() => {
    const page = pageRef.current;
    if (!page || reducedMotion()) return;
    const smoke = page.querySelector('.hw-smoke');
    const risers = page.querySelectorAll('.hw-crowd-svg');
    let frame = 0;
    let lastY = -1;
    const apply = () => {
      const y = Math.min(window.scrollY, 1600);
      if (y === lastY) return;
      lastY = y;
      if (smoke) smoke.style.translate = `0 ${y * 0.18}px`;
      const rise = `0 ${Math.max(0, 40 - y * 0.12)}px`;
      risers.forEach((el) => { el.style.translate = rise; });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Pause effects that are scrolled out of view: the smoke video and the hero/crowd animations.
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const video = page.querySelector('.hw-smoke');
    const zones = [
      [page.querySelector('.hw-hero'), 'hero-off'],
      [page.querySelector('.hw-crowd'), 'crowd-off'],
    ];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const zone = zones.find(([el]) => el === entry.target);
        if (!zone) return;
        page.classList.toggle(zone[1], !entry.isIntersecting);
        if (zone[1] === 'hero-off' && video) {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      });
    }, { rootMargin: '150px 0px' });
    zones.forEach(([el]) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggle = (key) => setOpenCard((cur) => (cur === key ? null : key));

  return (
    <>
      <SEO
        title="Belly, Beats & Boo! – Adults-Only Halloween Party in Dallas"
        description="Join Lotus Decor and Events on October 30 in Dallas for an 18+ Halloween party with a live DJ, belly dancers, tarot readings, Tipsy Scoop and a costume contest. Tickets $30."
        keywords="halloween party dallas, adults only halloween, halloween event dallas tx, belly dance party, costume contest dallas, halloween tickets"
        image={`https://lotusdecorandevents.com${poster}`}
        url="https://lotusdecorandevents.com/events/halloween"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
      </Helmet>

      <div className={`hw-page ${intro ? 'intro' : ''}`} ref={pageRef}>
        {intro && <div className="hw-intro" aria-hidden="true" />}
        {/* ---------- Ambient effects (decorative) ---------- */}
        <div className="hw-fx" aria-hidden="true">
          <video className="hw-smoke" autoPlay muted loop playsInline preload="auto">
            <source src="/events/hw-smoke.webm" type="video/webm" />
            <source src="/events/hw-smoke.mp4" type="video/mp4" />
          </video>
          <div className="hw-lightning" />

          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div className={`hw-flybat fb-${n}`} key={n}><Bat /></div>
          ))}

          <div className="hw-spider sp-1"><div className="hw-spider-drop"><span className="hw-thread" /><Spider /></div></div>
          <div className="hw-spider sp-2"><div className="hw-spider-drop"><span className="hw-thread" /><Spider /></div></div>

          <Cobweb className="web-tr" />
          <Cobweb className="web-bl" />
          <Cobweb className="web-br" />

          <div className="hw-embers">
            {EMBERS.map((e, i) => (
              <span
                key={i}
                style={{
                  left: e.left,
                  width: e.size,
                  height: e.size,
                  background: e.color,
                  boxShadow: `0 0 8px ${e.color}`,
                  animationDuration: e.duration,
                  animationDelay: e.delay,
                  '--drift': e.drift,
                }}
              />
            ))}
          </div>

          <div className="hw-fog fog-1" />
          <div className="hw-fog fog-2" />
        </div>

        {/* Moon with moonlit clouds drifting past */}
        <div className="hw-moon" aria-hidden="true">
          <span className="hw-moonlight" />
          <div className="hw-moon-disc">
            <img src={moonImg} alt="" />
          </div>
          <span className="hw-moon-cloud mc-1" />
          <span className="hw-moon-cloud mc-2" />
          <span className="hw-moon-cloud mc-3" />
        </div>

        {paid && (
          <div className="hw-success" role="status">
            <h2>You're in! 🎃</h2>
            <p>
              Thanks for getting your ticket. Your receipt has been emailed to you, so please bring it
              (on your phone is fine) to the door. See you on {EVENT.displayDate}!
            </p>
          </div>
        )}

        {/* Hero: name, what it is, the facts, then straight to tickets */}
        <section className="hw-hero">
          <h1 className="hw-title">
            <span className="hw-title-line purple">Belly, Beats</span>
            <span className="hw-title-line pink">
              &amp; B<GiPumpkinLantern className="hw-title-pumpkin" aria-label="o" />o!
            </span>
          </h1>
          <p className="hw-subtitle">{EVENT.subtitle}</p>
          <p className="hw-script">Shake. Sip. Dance. Repeat.</p>

          <div className="hw-info-bar">
            <ul className="hw-info-row">
              <li><FaCalendarAlt aria-hidden="true" /> {EVENT.displayDate}</li>
              {EVENT.displayTime && <li><FaClock aria-hidden="true" /> {EVENT.displayTime}</li>}
              <li><FaMapMarkerAlt aria-hidden="true" /> {EVENT.venue ? `${EVENT.venue}, Dallas` : EVENT.city}</li>
              <li className="hw-age">18+</li>
            </ul>
            <p className="hw-info-note">
              Costumes encouraged{!EVENT.venue && <>. Venue announced soon</>}
            </p>
          </div>

          <div className="hw-ticket-box" id="tickets" ref={heroTicketRef}>
            <TicketButton large describedBy="hw-ticket-help" />
            <TicketNote id="hw-ticket-help" />
            {TICKET_URL && (
              <p className="hw-secure"><FaLock aria-hidden="true" /> Secure checkout by Stripe</p>
            )}
            <div className="hw-countdown-wrap">
              {EVENT.startsAt && <p className="hw-countdown-title">Party starts in</p>}
              <Countdown />
            </div>
          </div>
        </section>

        {/* Party crowd under club lights */}
        <div className="hw-crowd" aria-hidden="true">
          <span className="hw-beam b-1" />
          <span className="hw-beam b-2" />
          <span className="hw-beam b-3" />
          <span className="hw-beam b-4" />
          <Crowd />
          <Pumpkin face="monster" className="hw-pk-crowd left" />
          <Pumpkin face="evil" className="hw-pk-crowd right" />
        </div>

        {/* Features, grouped by what the ticket covers */}
        <section className="hw-features">
          <h2 className="hw-section-title">What's waiting for you?</h2>

          <h3 className="hw-group-title">Included with your ticket</h3>
          <div className="hw-grid included">
            {INCLUDED.map((item, i) => (
              <FeatureCard
                key={item.title}
                item={item}
                tone="included"
                isMobile={isMobile}
                open={openCard === item.title}
                onToggle={() => toggle(item.title)}
              >
                {i === 0 && <Cobweb className="hw-card-web tl" />}
              </FeatureCard>
            ))}
          </div>

          <h3 className="hw-group-title extra">Also at the party</h3>
          <div className="hw-grid extras">
            {EXTRAS.map((item, i) => (
              <FeatureCard
                key={item.title}
                item={item}
                tone="extra"
                isMobile={isMobile}
                open={openCard === item.title}
                onToggle={() => toggle(item.title)}
              >
                {i === EXTRAS.length - 1 && <Cobweb className="hw-card-web br" />}
              </FeatureCard>
            ))}
          </div>
        </section>

        {/* The Night Awaits */}
        <section className="hw-awaits">
          <h2 className="hw-script large">The Night Awaits...</h2>
          <p className="hw-awaits-lead">
            One night. One spooky dance floor.<br />Endless Halloween energy.
          </p>
          <p className="hw-awaits-sub">Dress up, bring your friends, grab a drink and hit the dance floor.</p>
          <TicketButton describedBy="hw-ticket-help-2" />
          <TicketNote id="hw-ticket-help-2" />

          <div className="hw-graveyard" aria-hidden="true">
            <GiTombstone className="hw-grave g-1" />
            <Pumpkin face="evil" className="hw-pk-grave" />
            <GiCandleFlame className="hw-candle c-1" />
            <GiTombstone className="hw-grave g-2" />
            <Pumpkin face="monster" className="hw-pk-grave big" />
            <GiCandleFlame className="hw-candle c-2" />
            <GiTombstone className="hw-grave g-3" />
            <Pumpkin face="classic" className="hw-pk-grave" />
          </div>
        </section>

        {/* Contact */}
        <section className="hw-contact">
          <div className="hw-contact-col">
            <h3 className="hw-contact-title">Follow the vibe</h3>
            <p>Event updates, performer announcements, costume inspiration, giveaways and surprises.</p>
            <a
              href={`https://www.instagram.com/${EVENT.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="hw-outline-btn"
            >
              <FaInstagram aria-hidden="true" /> @{EVENT.instagram}
            </a>
          </div>

          <div className="hw-contact-logo">
            <img src={logo} alt="Lotus Decor and Events" />
            <p className="hw-partner">Media partner</p>
            <img src={sparkshootLogo} alt="SparkShoot" className="hw-partner-logo" />
          </div>

          <div className="hw-contact-col">
            <h3 className="hw-contact-title">Questions?</h3>
            <a href={`tel:${EVENT.contactTel}`} className="hw-phone">
              <FaPhoneAlt aria-hidden="true" /> {EVENT.contactName}, {EVENT.contactPhone}
            </a>
            <div className="hw-socials">
              <a href="https://wa.me/19453389171" target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp"><FaWhatsapp /></a>
              <a href="https://www.facebook.com/ThoranamDecors/" target="_blank" rel="noopener noreferrer" aria-label="Lotus Decor on Facebook"><FaFacebookF /></a>
            </div>
          </div>
        </section>

        {/* Mobile-only ticket bar, shown after the hero button scrolls away */}
        {TICKET_URL && (
          <div className={`hw-sticky-cta ${showStickyCta ? 'show' : ''}`} aria-hidden={!showStickyCta}>
            <span className="hw-sticky-info">{EVENT.displayDate}, {EVENT.city}</span>
            <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" tabIndex={showStickyCta ? 0 : -1}>
              {CTA_LABEL}
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default Halloween;
