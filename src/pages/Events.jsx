import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiMapPin } from 'react-icons/fi';
import '../styles/Events.css';
import SEO from '../components/SEO';
import logo from '../assets/logo_final.png';
import { EVENTS, eventPath } from '../data/events';

function EventCardBody({ event }) {
  const isLive = event.status === 'live';
  return (
    <>
      <div className="event-card-media">
        {event.image ? (
          <img src={event.image} alt={`${event.name} poster`} loading="lazy" />
        ) : (
          <div className="event-card-placeholder">
            <img src={logo} alt="" aria-hidden="true" />
          </div>
        )}
        {!isLive && <span className="event-card-badge">Coming soon</span>}
      </div>
      <div className="event-card-text">
        <span className="event-card-category">{event.category}</span>
        <h2>{event.name}</h2>
        <p className="event-card-meta">
          <span><FiCalendar aria-hidden="true" /> {event.displayDate}</span>
          <span><FiMapPin aria-hidden="true" /> {event.city}</span>
        </p>
        <p className="event-card-summary">{event.summary}</p>
        {isLive && (
          <span className="event-card-cta">
            View event <FiArrowRight aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );
}

function Events() {
  return (
    <>
      <SEO
        title="Events & Experiences | Lotus Decor and Events"
        description="Discover unforgettable celebrations, beautifully curated experiences, and moments worth remembering with Lotus Decor and Events in Dallas."
        keywords="events dallas, party events dallas, halloween party dallas, new year party dallas, curated experiences, lotus decor events"
        url="https://lotusdecorandevents.com/events"
      />
      <div className="events-page">
        <section className="events-hero" data-aos="fade-up">
          <h1>Events &amp; Experiences</h1>
          <div className="events-divider" />
          <p>
            Discover unforgettable celebrations, beautifully curated experiences, and moments worth
            remembering.
          </p>
        </section>

        <section className="events-grid">
          {EVENTS.map((event, i) =>
            event.status === 'live' ? (
              <Link
                to={eventPath(event)}
                className="event-card"
                key={event.slug}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <EventCardBody event={event} />
              </Link>
            ) : (
              <article
                className="event-card is-upcoming"
                key={event.slug}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <EventCardBody event={event} />
              </article>
            )
          )}
        </section>

        <section className="events-cta" data-aos="fade-up">
          <h2>Planning a celebration of your own?</h2>
          <p>We design and host events of every size, from intimate gatherings to full-scale parties.</p>
          <Link to="/contact" className="events-cta-btn">Get in touch</Link>
        </section>
      </div>
    </>
  );
}

export default Events;
