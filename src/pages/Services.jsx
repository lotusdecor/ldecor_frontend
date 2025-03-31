import '../styles/Services.css';
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
    title: 'Reception Decor',
    description: 'Stylish and elegant arrangements for a grand post-wedding celebration.',
    image: img4,
    category: 'Reception',
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
      <div className="services-header" data-aos="fade-up">
        <h2>Crafted Services</h2>
        <div className="services-divider" />
        <p>
          Each offering is designed with elegance and intention — curated to make every space unforgettable.
        </p>
      </div>

      <div className="services-gallery">
        {services.map((service, i) => (
          <div
            className="service-card"
            key={i}
            style={{ backgroundImage: `url(${service.image})` }}
            data-aos="zoom-in-up"
            data-aos-delay={i * 100}
          >
            <span className="category-tag">{service.category}</span>
            <div className="card-overlay" />
            <div className="card-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="/contact" className="glass-btn">Book Now</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
