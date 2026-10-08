import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/Halloween.css';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaInstagram,
  FaPhoneAlt,
  FaLock,
} from 'react-icons/fa';
import {
  GiHeadphones,
  GiFlowerTwirl,
  GiMicrophone,
  GiWrappedSweet,
  GiSpiderWeb,
  GiPumpkinLantern,
  GiCrown,
  GiMartini,
  GiTombstone,
  GiCandleFlame,
} from 'react-icons/gi';
import poster from '../assets/events/halloween-poster.jpg';
import logo from '../assets/logo_final.png';
import { Bat, BatBurst, Cobweb, Crowd, Ghost, Pumpkin, Spider } from '../components/HalloweenScene';
import moonImg from '../assets/events/moon.webp';
import sparkshootLogo from '../assets/events/sparkshoot-logo.webp';
import SoundToggle from '../components/SpookySound';

// Tickets are sold on Xpat, which emails buyers their tickets.
const TICKET_URL = 'https://xpat.events/events/belly-beats-boo-frisco-tx-2026';
const TICKET_PRICE = 30;
const CTA_LABEL = `Get tickets for $${TICKET_PRICE}`;

const EVENT = {
  name: 'Belly, Beats & Boo!',
  subtitle: 'The Ultimate Halloween Night in Dallas',
  date: '2026-10-31',
  displayDate: 'October 31',
  displayTime: 'Doors open 8 PM',
  startsAt: '2026-10-31T20:00:00-05:00', // Dallas is UTC-05:00 in October
  venue: 'Rotate Social',
  city: 'Dallas, TX',
  contactName: 'Priyanka',
  contactPhone: '+1 (945) 338-9171',
  contactTel: '+19453389171',
  instagram: 'lotusdecorandevents',
};

// "Included" cards are what the ticket price covers; "extras" are also at the party.
const INCLUDED = [
  { icon: <GiHeadphones />, title: 'Live DJ', text: 'Dance all night to high-energy beats and Halloween vibes.' },
  { icon: <GiFlowerTwirl />, title: 'Belly dancers', text: 'Mesmerizing live belly dance performances that bring the party to life.' },
  { icon: <GiMicrophone />, title: 'Live MC & entertainment', text: 'Our MC keeps the energy up and the crowd together all evening.' },
  { icon: <GiPumpkinLantern />, title: 'Costume show & contest', text: 'Kids and adults: come dressed to impress and show off your Halloween look on stage.' },
  { icon: <GiCrown />, title: 'Influencer meet & greet', text: 'Get up close and personal with a featured influencer.' },
  { icon: <GiWrappedSweet />, title: 'Goodie at entry', text: 'Every ticket includes a Halloween goodie when you walk in.' },
];
const EXTRAS = [
  { icon: <GiMartini />, title: 'Food & drinks', text: 'Food and drinks available all evening.' },
  { icon: <GiSpiderWeb />, title: 'Halloween surprises', text: 'Plenty of spooky surprises waiting throughout the night.' },
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
  description: 'The ultimate Halloween night in Dallas at Rotate Social with a live DJ, belly dancers, a live MC, a kids and adults costume contest, an influencer meet & greet and more.',
  offers: {
    '@type': 'Offer',
    price: TICKET_PRICE,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: TICKET_URL,
  },
  organizer: { '@type': 'Organization', name: 'Lotus Decor and Events', url: 'https://lotusdecorandevents.com' },
};

// Pairs of glowing eyes that open, blink and vanish in dark corners of the page.
const EYES = [
  { top: '330px', left: '3%', color: '#ffa630', duration: '11s', delay: '-2s' },
  { top: '640px', right: '4%', color: '#7dff6a', duration: '13s', delay: '-8s' },
  { top: '1150px', left: '2%', color: '#ff3b3b', duration: '12s', delay: '-5s' },
  { top: '1750px', right: '3%', color: '#ffa630', duration: '14s', delay: '-11s' },
  { top: '2550px', left: '5%', color: '#7dff6a', duration: '10s', delay: '-1s' },
  // size scales the pair: small ones read as far away, big ones as close
  { top: '170px', right: '12%', color: '#c77dff', duration: '15s', delay: '-6s', size: 0.75 },
  { top: '470px', left: '8%', color: '#ffa630', duration: '12s', delay: '-9s', size: 1.4 },
  { top: '900px', right: '2%', color: '#ff3b3b', duration: '11s', delay: '-4s' },
  { top: '1420px', right: '7%', color: '#7dff6a', duration: '16s', delay: '-12s', size: 0.7 },
  { top: '2000px', left: '3%', color: '#c77dff', duration: '13s', delay: '-3s', size: 1.3 },
  { top: '2320px', right: '5%', color: '#ffa630', duration: '12s', delay: '-7s' },
];

// Pumpkins and candy that rain down when the countdown reaches zero.
const CONFETTI_CHARS = ['🎃', '🍬', '🍭', '👻', '🦇', '🍫'];
function makeConfetti() {
  return Array.from({ length: 48 }, (_, i) => ({
    id: i,
    char: CONFETTI_CHARS[i % CONFETTI_CHARS.length],
    left: `${Math.random() * 100}%`,
    size: `${1.3 + Math.random() * 1.4}rem`,
    duration: `${3 + Math.random() * 2.5}s`,
    delay: `${Math.random() * 1.8}s`,
    spin: `${Math.round(Math.random() * 720 - 360)}deg`,
    drift: `${Math.round(Math.random() * 160 - 80)}px`,
  }));
}

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
      ghost: i % 3 === 1, // every third one is a ghost
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
      ${TICKET_PRICE} per person, includes a goodie at entry.
      {!TICKET_URL && (
        <> Follow <a href={`https://www.instagram.com/${EVENT.instagram}/`} target="_blank" rel="noopener noreferrer">@{EVENT.instagram}</a> to hear the moment sales open.</>
      )}
    </p>
  );
}

function Countdown({ onLive }) {
  const [now, setNow] = useState(() => Date.now());

  // onLive fires once, only if the page is open at the moment the countdown hits zero.
  useEffect(() => {
    const start = EVENT.startsAt ? new Date(EVENT.startsAt).getTime() : 0;
    let counting = Date.now() < start;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (counting && t >= start) {
        counting = false;
        onLive?.();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [onLive]);

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
      <span className="hw-card-ghost" aria-hidden="true"><Ghost /></span>
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

  const [confetti, setConfetti] = useState(null);
  const celebrate = useCallback(() => {
    if (!reducedMotion()) setConfetti(makeConfetti());
  }, []);
  useEffect(() => {
    if (!confetti) return;
    const id = setTimeout(() => setConfetti(null), 7000);
    return () => clearTimeout(id);
  }, [confetti]);

  return (
    <>
      <SEO
        title="Belly, Beats & Boo! – Halloween Party at Rotate Social, Dallas"
        description="Join Lotus Decor and Events on October 31 at Rotate Social in Dallas for a Halloween night with a live DJ, belly dancers, a live MC, a kids and adults costume contest and more. Doors open 8 PM. Tickets $30."
        keywords="halloween party dallas, rotate social halloween, halloween event dallas tx, belly dance party, costume contest dallas, halloween tickets"
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

          {[1, 2, 3, 4].map((n) => (
            <div className={`hw-flyghost gh-${n}`} key={n}><Ghost /></div>
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

          {EYES.map((e, i) => (
            <span
              key={i}
              className={`hw-eyes ey-${i + 1}`}
              style={{ top: e.top, left: e.left, right: e.right, '--c': e.color, '--z': e.size || 1, animationDuration: e.duration, animationDelay: e.delay }}
            >
              <i /><i />
            </span>
          ))}

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
            </ul>
            <p className="hw-info-note">
              Costumes encouraged{!EVENT.venue && <>. Venue announced soon</>}
            </p>
          </div>

          <div className="hw-ticket-box" id="tickets">
            <TicketButton large describedBy="hw-ticket-help" />
            <TicketNote id="hw-ticket-help" />
            {TICKET_URL && (
              <p className="hw-secure"><FaLock aria-hidden="true" /> Secure checkout by Xpat</p>
            )}
            <div className="hw-countdown-wrap">
              {EVENT.startsAt && <p className="hw-countdown-title">Doors open in</p>}
              <Countdown onLive={celebrate} />
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
          <p className="hw-awaits-sub">Grab your crew, dress to impress, and come make some unforgettable Halloween memories!</p>

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
          </div>
        </section>

        {confetti && (
          <div className="hw-confetti" aria-hidden="true">
            {confetti.map((c) => (
              <span
                key={c.id}
                style={{ left: c.left, fontSize: c.size, animationDuration: c.duration, animationDelay: c.delay, '--spin': c.spin, '--drift': c.drift }}
              >
                {c.char}
              </span>
            ))}
          </div>
        )}

        <SoundToggle />
      </div>
    </>
  );
}

export default Halloween;
