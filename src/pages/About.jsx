
import '../styles/About.css';
import founderImg from '../assets/founders/founder.jpg';
import cofounderImg from '../assets/founders/Shwetha.jpeg';
import about from '../assets/hero.jpg';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section" style={{ backgroundImage: `url(${about})` }}>
        <div className="about-hero-overlay">
          <h1 data-aos="zoom-in">About Lotus Decors</h1>
         {/*}
         <p data-aos="fade-up">
          Divine aesthetics and timeless elegance — curated in every style. <br />
          
          By women, for women, and of women — crafting elite celebrations, flawlessly styled to perfection.
          </p>
  */}
        </div>
      </section>

      {/* Description */}
      <section className="about-description" data-aos="fade-up">
        <p data-aos="fade-down" style={{ fontSize: '20px' }}>
        Divine aesthetics and timeless elegance — curated in every style.
        </p>
        <p data-aos="fade-right" style={{ fontSize: '20px' }}>
        By women, for women, and of women — crafting elite celebrations, flawlessly styled to perfection.
        </p>
        <p data-aos="fade-up" style={{ fontSize: '20px' }}>Your special moments deserve nothing less than perfection. 
        Let’s craft memories that shine forever.</p>
      </section>

      {/* Founders */}
      <section className="founders-section">
        <div className="founder-card">
          <div className="founder-image framed" data-aos="zoom-in">
            <img src={founderImg} alt="Founder" />
          </div>
          <div className="founder-text" data-aos="fade-left">
            <h2>Sneha Gorijala</h2>
            <p class="tagline" style={{ fontSize: '25px' }}>Founder and Creative Head</p>
            <p>"Design is the silent ambassador of elegance."</p>
          </div>
        </div>

        <div className="founder-card">
          <div className="founder-text" data-aos="fade-right">
            <h2>Swetha Kongara</h2>
            <p class="tagline" style={{ fontSize: '25px' }}>Co-Founder, Director of Finance, Sales & Business Relations</p>
            <p>Balancing motherhood while navigating different jobs has always kept me on my toes, but it’s also what fuels my passion and keeps me grounded. 
              In the midst of life’s everyday hustle, I discovered a creative spark that turned into something much bigger — a deep love for designing events and crafting meaningful, beautiful spaces. What began as a simple outlet soon became my true calling. 
              And when your heart is in it, even the long hours and endless tasks feel like part of the joy.</p>
            <p> I take pride in listening to each client’s story, understanding their vision, and working within their budget without compromising on quality — something I hold very close to my heart. 
              As someone who deeply values quality over quantity, it’s a challenge I embrace with care and dedication.</p>
            <p> What makes this journey with Lotus Decor & Events so rewarding is the opportunity to be part of life’s most cherished moments. 
              It’s truly a blessing in disguise to help celebrate these milestones and create memories that will be treasured forever.</p>
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
