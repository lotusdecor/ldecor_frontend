import '../styles/Contact.css';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp, FaSearchLocation } from 'react-icons/fa';

function Contact() {
  return (
    <div className="contact-page">
      <h2 className="contact-title">Get in Touch</h2>
      <div className="contact-container">
        {/* Left: Contact Details & Map */}
        <div className="contact-left">
          <div className="contact-details">
            <h3>Contact Details</h3>
            <p><FaPhoneAlt className="icon" /> +91 98765 43210</p>
            <p><FaEnvelope className="icon" /> lotusdecors@gmail.com</p>
            <p><FaSearchLocation className='icon'/>135 N Bond Ave, Dallas, TX 75211, USA</p>

            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="https://www.instagram.com/thoranamdecors/"><FaInstagram /></a>
              <a href="#"><FaWhatsapp /></a>
            </div>
          </div>

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.14307974429!2d-96.9092137353262!3d32.74672250166916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9ada14f4222b%3A0x873f2bfda6e65267!2s135%20N%20Bond%20Ave%2C%20Dallas%2C%20TX%2075211%2C%20USA!5e0!3m2!1sen!2sin!4v1743419106453!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lotus Decor Map"
            ></iframe>
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form-box">
          <h3>Let's Talk</h3>
          <form className="contact-form">
            <label>Name</label>
            <input type="text" placeholder="Your Name" required />

            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />

            <label>Message</label>
            <textarea rows="5" placeholder="Tell us more..." required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
