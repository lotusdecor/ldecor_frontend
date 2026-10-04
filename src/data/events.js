import halloweenPoster from '../assets/events/halloween-poster.jpg';

// Single source of truth for the "Events & Experiences" section. The navbar dropdown and the
// /events landing page are both built from this list.
//
// To add an event: add an entry here, create its page, and add a route in App.jsx at
// `/events/<slug>`. Leave `image` empty and set `status: 'coming-soon'` to tease an event
// before its page exists (it shows on /events but not in the navbar and is not clickable).
export const EVENTS = [
  {
    slug: 'halloween',
    navLabel: 'Halloween',
    name: 'Belly, Beats & Boo!',
    category: 'Halloween Party',
    summary: 'An adults-only Halloween night with a live DJ, belly dancers, tarot readings and a costume contest.',
    displayDate: 'October 30, 2026',
    city: 'Dallas, TX',
    image: halloweenPoster,
    status: 'live',
  },
  {
    slug: 'new-year',
    navLabel: 'New Year Party',
    name: "New Year's Eve Celebration",
    category: 'New Year Party',
    summary: 'Ring in the new year with an evening of music, decor and celebration. Details coming soon.',
    displayDate: 'December 31, 2026',
    city: 'Dallas, TX',
    image: '',
    status: 'coming-soon',
  },
];

export const eventPath = (event) => `/events/${event.slug}`;

export const LIVE_EVENTS = EVENTS.filter((event) => event.status === 'live');
