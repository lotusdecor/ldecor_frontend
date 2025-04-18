import '../styles/Services.css';
import { Link } from 'react-router-dom';
import img1 from '../assets/services/wedding.jpeg';
import img2 from '../assets/services/img2.jpeg';
import img3 from '../assets/services/img3.jpeg';

const services = [
  {
    title: 'DECOR',
    description: 'We specialize in creating stunning visual experiences that reflect your unique style. From floral arrangements and custom backdrops to themed installations and table settings, our décor transforms ordinary spaces into unforgettable settings that leave a lasting impression.',
    image: img1,
  },
  {
    title: 'EVENT PLANNERS',
    description: 'From the first idea to the final toast, we plan every detail with care and precision. Whether it is a wedding, corporate gathering, or milestone celebration, we take your vision and turn it into a seamless experience — managing budgets, timelines, vendors, and more so you can enjoy the journey stress-free.',
    image: img2,
  },
  {
    title: 'EVENT ORGANIZERS',
    description: 'We bring your event to life with flawless execution on the day of. Our expert team handles logistics, coordinates with vendors, and ensures everything runs smoothly behind the scenes. With us by your side, you can be fully present in every moment, knowing every detail is taken care of.',
    image: img3,
  },
];

function Services() {
  return (
    <div className="services-page">
      <section className="services-description" data-aos="fade-up">
      </section>

      {/* Services List */}
      <section className="services-list">
        {services.map((service, index) => (
          <div className={`service-card ${index % 2 !== 0 ? 'reverse' : ''}`} key={index}>
            <div className="service-image framed" data-aos="zoom-in">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-text" data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Services;
