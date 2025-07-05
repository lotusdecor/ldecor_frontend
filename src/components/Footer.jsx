import '../styles/Footer.css';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-socials">
          <a href="https://www.instagram.com/thoranamdecors/" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://wa.me/14843029331" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="https://www.facebook.com/ThoranamDecors/" aria-label="Facebook"><FaFacebookF /></a>
        </div>
      </div>

      <div className="footer-divider" />
      <p className="footer-copy">© 2025 Lotus Decors. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
