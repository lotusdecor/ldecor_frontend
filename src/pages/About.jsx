
import '../styles/About.css';
import founderImg from '../assets/founders/sneha.jpeg';
import cofounderImg from '../assets/founders/Shwetha.jpeg';
import about from '../assets/lotus_about7.jpeg';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section" style={{ backgroundImage: `url(${about})` }}>
        <div className="about-hero-overlay">
        <h1 data-aos="zoom-in">About Us</h1>
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
        <p data-aos="fade-down" style={{ fontSize: '22px' }}>
        Divine aesthetics and timeless elegance — curated in every style.
        </p>
        <p data-aos="fade-right" style={{ fontSize: '22px' }}>
        By women, for women, and of women — crafting elite celebrations, flawlessly styled to perfection.
        </p>
        <p data-aos="fade-up" style={{ fontSize: '22px' }}>Your special moments deserve nothing less than perfection. 
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
            <p class="tagline" style={{ fontSize: '22px' }}>Founder, CEO and Creative Head</p>
            <p>As someone born and raised in India, tradition has always been at the heart of who I am. When I moved to the U.S., I brought that passion with me—not just in memories, but in spirit,
 and celebration. Blending the richness of Indian culture with the elegance of modern design felt natural, 
 and it’s what led us to create Lotus Events & Decor.</p>
            <p> With two daughters and a full life, I’ve worn many hats over the years—mother, entrepreneur, creative director, and problem-solver. But above all, I’m someone who finds purpose in creating joy for others. 
              Designing events isn’t just about aesthetics for me—it’s about telling stories, honoring culture, and making people feel truly seen and celebrated.</p>
            <p> What began as a dream has grown into something much more: a business rooted in heart, authenticity, and care. 
              I pour that same energy into every celebration we take on, ensuring that no matter the budget or size, the result is unforgettable.</p>
              <p> For me, Lotus isn’t just a business—it’s a reflection of everything I love: family, culture, beauty, and connection. 
                Being able to bring people together through meaningful, memorable experiences is more than a job—it’s a blessing I’m grateful for every day.</p>
          </div>
        </div>

        <div className="founder-card">
          <div className="founder-text" data-aos="fade-right">
            <h2>Swetha Kongara</h2>
            <p class="tagline" style={{ fontSize: '22 px' }}>Co-Founder, Director of Finance, Sales & Business Relations</p>
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
