import '../styles/Contact.css';
import { motion } from 'framer-motion';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaSearchLocation 
} from 'react-icons/fa';

// Animation constants to avoid recreation on re-render
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },
  item: {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  },
  floating: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const SOCIAL_LINKS = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/thoranamdecors/" },
  { icon: <FaWhatsapp />, href: "#" }
];

const CONTACT_INFO = [
  { icon: <FaPhoneAlt className="icon" />, text: "+91 98765 43210" },
  { icon: <FaEnvelope className="icon" />, text: "lotusdecors@gmail.com" },
  { icon: <FaSearchLocation className="icon" />, text: "135 N Bond Ave, Dallas, TX" }
];

function Contact() {
  return (
    <motion.div 
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <motion.h2 
        className="contact-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          delay: 0.2,
          type: "spring",
          stiffness: 100
        }}
      >
        Get in Touch
        <motion.span 
          className="title-underline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.h2>

      {/* Main Container */}
      <motion.div 
        className="contact-container"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column */}
        <div className="contact-left-column">
          {/* Contact Details Card */}
          <motion.div 
            className="contact-card"
            variants={ANIMATION_VARIANTS.item}
            whileHover={{ 
              y: -5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Contact Details
              <motion.span 
                className="card-underline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.h3>
            
            <div className="contact-info">
              {CONTACT_INFO.map((info, index) => (
                <motion.p 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  {info.icon} {info.text}
                </motion.p>
              ))}
            </div>
            
            <motion.div 
              className="social-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {SOCIAL_LINKS.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.2,
                    color: "#d4af37",
                    y: -3 
                  }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Map Card */}
          <motion.div 
            className="map-card"
            variants={ANIMATION_VARIANTS.item}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.14307974429!2d-96.9092137353262!3d32.74672250166916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9ada14f4222b%3A0x873f2bfda6e65267!2s135%20N%20Bond%20Ave%2C%20Dallas%2C%20TX%2075211%2C%20USA!5e0!3m2!1sen!2sin!4v1743419106453!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              title="Lotus Decor Map"
            />
          </motion.div>
        </div>

        {/* Right Column - Form */}
        <motion.div 
          className="form-card"
          variants={ANIMATION_VARIANTS.item}
          animate={ANIMATION_VARIANTS.floating}
          whileHover={{
            y: -5,
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
          }}
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Let's Talk
            <motion.span 
              className="card-underline"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.h3>
          
          <form className="contact-form">
            {['Name', 'Email', 'Message'].map((field, index) => (
              <motion.div 
                key={field}
                className="form-group"
                whileHover={{ x: 5 }}
              >
                <label>{field}</label>
                {field === 'Message' ? (
                  <textarea 
                    rows="5" 
                    placeholder="Tell us more..." 
                    required 
                  />
                ) : (
                  <input 
                    type={field === 'Email' ? 'email' : 'text'} 
                    placeholder={field === 'Email' ? 'you@example.com' : 'Your Name'} 
                    required 
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="shine-btn"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 20px rgba(212, 175, 55, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
              <span className="shine"></span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Contact;