import '../styles/About.css';
import founderImg from '../assets/founders/sneha.jpeg';
import cofounderImg from '../assets/founders/Shwetha.jpeg';
import about from '../assets/lotus_about8.png';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section" style={{ backgroundImage: `url(${about})` }}>
        <div className="about-hero-overlay">
          <div className="about-heading-wrapper" data-aos="zoom-in">
            <h1 className="about-heading">About Us</h1>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="about-description" data-aos="fade-up">
        <p data-aos="fade-down" style={{ fontSize: '22px', fontStyle: 'italic' }}>
          Divine aesthetics and timeless elegance — curated in every style.
        </p>
        <p data-aos="fade-up" style={{ fontSize: '22px', fontStyle: 'italic'  }}>
          By women, for women, and of women — crafting elite celebrations, flawlessly styled to perfection.
        </p>
      </section>

      {/* Founders */}
      <section className="founders-section">
        <div className="founder-card">
          <div className="founder-image framed" data-aos="zoom-in">
            <img src={founderImg} alt="Founder" />
          </div>
          <div className="founder-text" data-aos="fade-left">
            <h2>Sneha Gorijala</h2>
            <p className="tagline" style={{ fontSize: '22px', fontWeight: 'bold' }}>Founder and Creative Head</p>
            <p>
            Born and raised in India, tradition has always been at the core of who I am. When I moved to the U.S., I brought that love for culture with me—carrying it not just in memories, but in the way I celebrate life’s special moments. 
            Blending the vibrant beauty of Indian traditions with the clean elegance of modern design felt natural, and that passion is what inspired the creation of Lotus Decor and Events.
            </p>
            <p>
            As a mother of two and a woman who wears many hats—entrepreneur, creative thinker, and problem solver—I've found my true passion in bringing joy to others. 
            For me, event design goes beyond aesthetics; it's about telling stories, honoring traditions, and creating meaningful moments that make people feel truly special.
            </p>
            <p>
            What began as a dream has blossomed into a business rooted in heart, honesty, and genuine care. I bring that same passion to every event—no matter the size or budget—ensuring each one feels truly special. 
            Lotus is more than just a business; it's a reflection of my love for family, culture, beauty, and meaningful connection. Creating spaces that bring people together is a gift I cherish every single day.
            </p>
          </div>
        </div>

        <div className="founder-card">
          <div className="founder-text" data-aos="fade-right">
            <h2>Swetha Kongara</h2>
            <p className="tagline" style={{ fontSize: '22px', fontWeight: 'bold' }}>Founder and Director of Operations</p>
            <p>
              Balancing motherhood while navigating different jobs has always kept me on my toes, but it’s
              also what fuels my passion and keeps me grounded. In the midst of life’s everyday hustle,
              I discovered a creative spark that turned into something much bigger — a deep love for
              designing events and crafting meaningful, beautiful spaces. What began as a simple outlet
              soon became my true calling. And when your heart is in it, even the long hours and endless
              tasks feel like part of the joy.
            </p>
            <p>
              I take pride in listening to each client’s story, understanding their vision, and working
              within their budget without compromising on quality — something I hold very close to my heart.
              As someone who deeply values quality over quantity, it’s a challenge I embrace with care and
              dedication.
            </p>
            <p>
              What makes this journey with Lotus Decor & Events so rewarding is the opportunity to be part
              of life’s most cherished moments. It’s truly a blessing in disguise to help celebrate these
              milestones and create memories that will be treasured forever.
            </p>
          </div>
          <div className="founder-image framed" data-aos="zoom-in">
            <img src={cofounderImg} alt="Co-founder" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
