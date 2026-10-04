import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo_final.png'; // Adjust the path if needed
import { LIVE_EVENTS, eventPath } from '../data/events';

const NAV_ITEMS = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  {
    label: 'Events & Experiences',
    path: '/events',
    children: LIVE_EVENTS.map((event) => ({ label: event.navLabel, path: eventPath(event) })),
  },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Drop focus after a click so the :focus-within dropdown closes once we navigate.
  const blurActive = () => document.activeElement?.blur();

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>

        <ul className="navbar-links desktop">
          {NAV_ITEMS.map((item) => (
            <li key={item.path} className={item.children ? 'has-dropdown' : undefined}>
              <Link to={item.path} onClick={blurActive}>
                {item.label}
                {item.children && <FiChevronDown className="dropdown-caret" aria-hidden="true" />}
              </Link>
              {item.children && (
                <ul className="navbar-dropdown">
                  <li>
                    <Link to={item.path} onClick={blurActive}>All Events</Link>
                  </li>
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <Link to={child.path} onClick={blurActive}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={toggleMenu}>{item.label}</Link>
              {item.children && (
                <ul className="mobile-submenu">
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <Link to={child.path} onClick={toggleMenu}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Back to Top Button */}
      {scrolled && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑
        </button>
      )}
    </>
  );
}

export default Navbar;
