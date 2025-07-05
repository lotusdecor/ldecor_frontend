import '../styles/Services.css';
import { Link } from 'react-router-dom';
import img1 from '../assets/services/decor.jpeg';
import img2 from '../assets/services/planning.jpeg';
import img3 from '../assets/services/organizing.jpeg';
import SEO from '../components/SEO';

const services = [
  {
    title: 'DESIGN AND DECOR',
    description: 'At Lotus Decor and Events, our Design and Decor services are where your vision meets our artistry. From elegant mandaps and bespoke backdrops to intricate tablescapes, every detail is thoughtfully curated to reflect your story, your style, and the essence of your celebration. Our approach to wedding events, party & weddings, and other special event design is grounded in creativity, culture, and care.',
    image: img1,
  },
  {
    title: 'EVENT PLANNERS',
    description: 'As event planners, we are dedicated to bringing your dream event to life with precision and care. From the initial concept to flawless execution, we manage every detail, ensuring your event runs smoothly and exceeds expectations. Beginning with personalized consultations, we handle every aspect, allowing you to relax and enjoy while we ensure your guests leave with unforgettable memories. We bring expertise in event planning and execution that stands out in the event planning industry.',
    image: img2,
  },
  {
    title: 'EVENT ORGANIZERS',
    description: 'We are the organizers, the hosts, the designers, the creative masterminds, the coordinators, and the workers. Come, simply enjoy the event as a sponsor or an audience. Our events are uniquely designed with fresh concepts and styles, ensuring every experience is unforgettable.Step into an event meticulously crafted to surpass all expectations, supported by our strength in event organisation and management and guided by the essential things you need for a wedding.',
    image: img3,
  },
];

function Services() {
  return (
    <>
      <SEO
        title="About Us | Trusted Wedding & Event Planners with Years of Experience"
        description="Learn about our journey as one of India's leading wedding and event management companies, known for creative and culturally-rich celebrations."
        keywords="about us, wedding planners, event management, India, creative events, cultural celebrations"
        url="https://lotusdecorandevents.com/services"
      />
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
    </>
  );
}

export default Services;
