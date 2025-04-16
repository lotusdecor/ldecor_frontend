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
            Blending the vibrant beauty of Indian traditions with the clean elegance of modern design felt natural, and that passion is what inspired the creation of Lotus Events & Decor.
            </p>
            <p>
            With two daughters and a busy life, I’ve worn many hats—mother, entrepreneur, and creative thinker and a problem solver. But at my core, I love creating joy for others. 
            For me, event design is more than just making things look beautiful; it’s about sharing stories, honoring culture, and making people feel special.
            </p>
            <p>
            What started as a dream has grown into a business built on heart, honesty, and care. I bring that same passion to every event, making each one special—no matter the size or budget.
            Lotus is more than just a business to me—it reflects my love for family, culture, beauty, and connection. 
            Bringing people together through meaningful experiences is a blessing I’m grateful for every day.
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
