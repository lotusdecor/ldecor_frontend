import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/Halloween.css';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import {
  FaCalendarAlt,
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
  GiBat,
  GiSpiderWeb,
  GiSpiderAlt,
  GiGhost,
  GiWitchFlight,
  GiTombstone,
  GiCandleFlame,
} from 'react-icons/gi';
import poster from '../assets/events/halloween-poster.jpg';
import logo from '../assets/logo_final.png';

// Paste the Stripe Payment Link here (Stripe Dashboard → Payment Links → Create).
// In the link's "After payment" settings, choose "Don't show confirmation page" and
// redirect to https://lotusdecorandevents.com/halloween?ticket=success
const TICKET_URL = '';
const TICKET_PRICE = 30;

const EVENT = {
  name: 'Belly, Beats & Boo!',
  subtitle: 'An Adults-Only Halloween Affair',
  date: '2026-10-30',
  // Used by the countdown. Update to the real start time (Dallas is UTC-05:00 in October).
  startsAt: '2026-10-30T19:00:00-05:00',
  displayDate: 'October 30',
  city: 'Dallas, TX',
  contactName: 'Priyanka',
  contactPhone: '+1 (945) 338-9171',
  contactTel: '+19453389171',
  instagram: 'lotusdecorandevents',
};

const FEATURES = [
  { icon: <GiHeadphones />, title: 'Live DJ', text: 'Dance all night to high-energy beats and Halloween vibes.', color: 'cyan' },
  { icon: <GiFlowerTwirl />, title: 'Belly Dancers', text: 'Experience an exciting live performance that brings the party to life.', color: 'pink' },
  { icon: <GiMicrophone />, title: 'Entertainment by MC', text: 'Our MC keeps the energy going and brings the crowd together throughout the evening.', color: 'orange' },
  { icon: <GiCardRandom />, title: 'Tarot Readings Included', text: 'Discover what the cards have in store for you with a complimentary tarot reading included with your event experience.', color: 'purple' },
  { icon: <GiIceCreamCone />, title: 'Tipsy Scoop', text: 'Indulge in liquor-infused ice cream creations from Tipsy Scoop.', color: 'cyan' },
  { icon: <GiPumpkinLantern />, title: 'Halloween Costume Show & Contest', text: 'Come dressed to impress and show off your Halloween look for a chance to be part of the fun.', color: 'pink' },
  { icon: <GiCrown />, title: 'Influencer Meet & Greet', text: 'Get up close and personal with a featured influencer during the event.', color: 'cyan' },
  { icon: <GiMartini />, title: 'Food & Drinks', text: 'Food and drinks will be available for purchase throughout the evening.', color: 'orange' },
];

// Rising embers — generated once so positions stay stable across re-renders.
const EMBER_COLORS = ['#ff3fbf', '#b44cff', '#ffa630', '#39d5ff'];
const EMBERS = Array.from({ length: 34 }, (_, i) => ({
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
  startDate: EVENT.date,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Dallas, TX',
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
    url: 'https://lotusdecorandevents.com/halloween',
  },
  organizer: { '@type': 'Organization', name: 'Lotus Decor and Events', url: 'https://lotusdecorandevents.com' },
};

function TicketButton({ label, large = false }) {
  const className = `hw-ticket-btn ${large ? 'large' : ''}`;
  if (!TICKET_URL) {
    return (
      <span className={`${className} disabled`} aria-disabled="true">
        <FaTicketAlt className="hw-ticket-icon" />
        <span className="hw-ticket-label">Tickets Opening Soon</span>
      </span>
    );
  }
  return (
    <a href={TICKET_URL} className={className} target="_blank" rel="noopener noreferrer">
      <FaTicketAlt className="hw-ticket-icon" />
      <span className="hw-ticket-label">{label}</span>
      <span className="hw-ticket-price">${TICKET_PRICE}</span>
    </a>
  );
}

function Countdown() {
  const target = new Date(EVENT.startsAt).getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  if (diff === 0) {
    return <p className="hw-countdown-live">The party is ON — see you on the dance floor! 🎃</p>;
  }

  const units = [
    ['Days', Math.floor(diff / 86400000)],
    ['Hours', Math.floor(diff / 3600000) % 24],
    ['Mins', Math.floor(diff / 60000) % 60],
    ['Secs', Math.floor(diff / 1000) % 60],
  ];

  return (
    <div className="hw-countdown" aria-label="Time until the party">
      {units.map(([label, value]) => (
        <div className="hw-count-box" key={label}>
          <span className="hw-count-num">{String(value).padStart(2, '0')}</span>
          <span className="hw-count-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function Halloween() {
  const [searchParams] = useSearchParams();
  const paid = searchParams.get('ticket') === 'success';
  const pageRef = useRef(null);

  // Switch the shared Navbar/Footer to the dark neon theme while this page is open.
  useEffect(() => {
    document.body.classList.add('hw-theme');
    return () => document.body.classList.remove('hw-theme');
  }, []);

  // "Flashlight" glow that follows the cursor (mouse/trackpad only).
  useEffect(() => {
    const page = pageRef.current;
    if (!page || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = page.getBoundingClientRect();
        page.style.setProperty('--hw-mx', `${e.clientX - rect.left}px`);
        page.style.setProperty('--hw-my', `${e.clientY - rect.top}px`);
      });
    };
    page.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(frame);
      page.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <SEO
        title="Belly, Beats & Boo! – Adults-Only Halloween Party in Dallas"
        description="Join Lotus Decor and Events on October 30 in Dallas for an 18+ Halloween party with a live DJ, belly dancers, tarot readings, Tipsy Scoop and a costume contest. Tickets $30."
        keywords="halloween party dallas, adults only halloween, halloween event dallas tx, belly dance party, costume contest dallas, halloween tickets"
        image={`https://lotusdecorandevents.com${poster}`}
        url="https://lotusdecorandevents.com/halloween"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
      </Helmet>

      <div className="hw-page" ref={pageRef}>
        {/* ---------- Ambient effects (decorative) ---------- */}
        <div className="hw-fx" aria-hidden="true">
          <div className="hw-lightning" />
          <div className="hw-cursor-glow" />
          <div className="hw-bg-moon" />

          <GiBat className="hw-flybat fb-1" />
          <GiBat className="hw-flybat fb-2" />
          <GiBat className="hw-flybat fb-3" />
          <GiBat className="hw-flybat fb-4" />
          <GiBat className="hw-flybat fb-5" />
          <GiWitchFlight className="hw-witch" />

          <GiGhost className="hw-ghost gh-1" />
          <GiGhost className="hw-ghost gh-2" />
          <GiGhost className="hw-ghost gh-3" />

          <div className="hw-spider sp-1"><span className="hw-thread" /><GiSpiderAlt /></div>
          <div className="hw-spider sp-2"><span className="hw-thread" /><GiSpiderAlt /></div>

          <GiSpiderWeb className="hw-web web-tl" />
          <GiSpiderWeb className="hw-web web-tr" />
          <GiSpiderWeb className="hw-web web-left" />
          <GiSpiderWeb className="hw-web web-right" />

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

        {paid && (
          <div className="hw-success" role="status">
            <h2>You're in! 🎃</h2>
            <p>
              Thanks for getting your ticket. Your receipt has been emailed to you, so please bring it
              (on your phone is fine) to the door. See you on {EVENT.displayDate}!
            </p>
          </div>
        )}

        {/* Hero */}
        <section className="hw-hero">
          <h1 className="hw-title" data-aos="zoom-in">
            <span className="hw-title-line purple">Belly, Beats</span>
            <span className="hw-title-line pink">
              &amp; B<GiPumpkinLantern className="hw-title-pumpkin" aria-label="o" />o!
            </span>
          </h1>
          <p className="hw-subtitle" data-aos="fade-up">{EVENT.subtitle}</p>
          <p className="hw-script" data-aos="fade-up">Shake. Sip. Dance. Repeat.</p>

          <div className="hw-info-bar" data-aos="fade-up">
            <div className="hw-info-row">
              <span><FaCalendarAlt /> {EVENT.displayDate}</span>
              <span className="hw-sep" />
              <span><FaMapMarkerAlt /> {EVENT.city}</span>
              <span className="hw-sep" />
              <span className="hw-age">18+</span>
            </div>
            <p className="hw-info-note">— Costumes Encouraged —</p>
          </div>

          <div data-aos="fade-up">
            <p className="hw-countdown-title">The haunting begins in</p>
            <Countdown />
          </div>

          <div className="hw-ticket-box" id="tickets" data-aos="zoom-in">
            <TicketButton label="Get Your Tickets" large />
            <p className="hw-ticket-note">Includes a complimentary welcome drink/beverage</p>
            {TICKET_URL && (
              <p className="hw-secure"><FaLock /> Secure checkout powered by Stripe</p>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="hw-features">
          <h2 className="hw-section-title" data-aos="fade-up">What's Waiting For You?</h2>
          <div className="hw-grid">
            {FEATURES.map((f, i) => (
              <div className={`hw-card ${f.color}`} key={f.title} data-aos="fade-up" data-aos-delay={(i % 4) * 100}>
                <div className="hw-card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Night Awaits */}
        <section className="hw-awaits" data-aos="fade-up">
          <h2 className="hw-script large">The Night Awaits...</h2>
          <p className="hw-awaits-lead">
            One night. One spooky dance floor.<br />Endless Halloween energy.
          </p>
          <p className="hw-awaits-sub">Dress up. Bring your friends. Grab a drink. Hit the dance floor.</p>
          <TicketButton label="Secure Your Spot" />

          <div className="hw-graveyard" aria-hidden="true">
            <GiTombstone className="hw-grave g-1" />
            <GiPumpkinLantern className="hw-pumpkin p-1" />
            <GiCandleFlame className="hw-candle c-1" />
            <GiTombstone className="hw-grave g-2" />
            <GiPumpkinLantern className="hw-pumpkin p-2" />
            <GiCandleFlame className="hw-candle c-2" />
            <GiTombstone className="hw-grave g-3" />
            <GiPumpkinLantern className="hw-pumpkin p-3" />
          </div>
        </section>

        {/* Contact */}
        <section className="hw-contact">
          <div className="hw-contact-col">
            <h3 className="hw-script">Follow the Vibe</h3>
            <p>Follow us for event updates, performer announcements, costume inspiration, giveaways &amp; surprises.</p>
            <a
              href={`https://www.instagram.com/${EVENT.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="hw-outline-btn"
            >
              <FaInstagram /> @{EVENT.instagram}
            </a>
          </div>

          <div className="hw-contact-logo">
            <img src={logo} alt="Lotus Decor and Events" />
            <p className="hw-partner">Media Partner: <strong>SparkShoot</strong></p>
          </div>

          <div className="hw-contact-col">
            <h3 className="hw-script">Questions?</h3>
            <a href={`tel:${EVENT.contactTel}`} className="hw-phone">
              <FaPhoneAlt /> {EVENT.contactName} | {EVENT.contactPhone}
            </a>
            <div className="hw-socials">
              <a href="https://wa.me/19453389171" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="https://www.facebook.com/ThoranamDecors/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Halloween;
