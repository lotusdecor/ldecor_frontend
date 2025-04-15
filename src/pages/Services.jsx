import '../styles/Services.css';
import { Link } from 'react-router-dom';
import img1 from '../assets/services/img1.jpeg';
import img2 from '../assets/services/img2.jpeg';
import img3 from '../assets/services/img3.jpeg';
import img4 from '../assets/services/img4.jpeg';
import img5 from '../assets/services/img5.jpeg';
import img6 from '../assets/services/img6.jpeg';

const services = [
  {
    title: 'Wedding Decor',
    description: 'Elegant and breathtaking wedding setups to make your special day truly unforgettable.',
    image: img1,
    category: 'Wedding',
  },
  {
    title: 'Pre-Wedding Ceremonies',
    description: 'Beautifully curated decor for Sangeeth, Haldi, Mehendi, and other pre-wedding celebrations.',
    image: img2,
    category: 'Pre-Wedding',
  },
  {
    title: 'Half-Saree & Dothi Ceremony',
    description: 'Traditional and festive decor to celebrate this cultural milestone in style.',
    image: img3,
    category: 'Half-Saree/Dothi Ceremony',
  },
  {
    title: 'Cocktail Events',
    description: 'Vibrant setups to elevate your evening with style, sparkle, and celebration.',
    image: img4,
    category: 'Cocktail Events',
  },
  {
    title: 'Milestone Birthday Celebrations',
    description: 'Unique and customized decor to make every milestone birthday extra special.',
    image: img5,
    category: 'Milestone Birthdays',
  },
  {
    title: 'Graduation Party',
    description: 'Celebrate academic achievements with sophisticated and lively decorations.',
    image: img6,
    category: 'Graduations',
  }
];

function Services() {
  return (
    <div className="services-page">
      <section className="services-description" data-aos="fade-up">
        <h2>Crafted Services</h2>
      </section>

      {/* Services List */}
      <section className="services-list">
        {services.map((service, index) => (
          <div className={`service-card ${index % 2 !== 0 ? 'reverse' : ''}`} key={index}>
            <div className="service-image framed" data-aos="zoom-in">
              <img src={service.image} alt={service.title} />
              <span className="category-tag">{service.category}</span>
            </div>
            <div className="service-text" data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <Link to = "/contact" className="service-btn"> Book Now </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Services;
