import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import heroImg from "../assets/home_bg_hd.png";
import client1 from "../assets/testimonials/client1.jpg";
import client2 from "../assets/testimonials/client2.jpg";
import client3 from "../assets/testimonials/client3.jpg";

function Home() {
  const texts = [
    "Where Elegance Meets Emotion..",
    "Where Luxury Meets Love..",
    "Where Your Dream Event Begins..",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialsData = [
    {
      name: "Anjali Mehra",
      quote: "Lotus Decors made our wedding magical. The team was detail-oriented, warm, and incredibly creative!",
      img: client1,
    },
    {
      name: "Ravi Patel",
      quote: "From the flowers to the lighting, everything was breathtaking. Our guests still talk about it!",
      img: client2,
    },
    {
      name: "Priya Sharma",
      quote: "They captured our style perfectly and brought elegance to every inch of our event.",
      img: client3,
    },
  ];

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, testimonialsData.length]);

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <img src={heroImg} alt="Luxury Wedding Decor" className="hero-img kenburns" />
        <div className="hero-content" data-aos="fade-up">
          <p className="luxury-tagline">
            Lotus Decor and Events
          </p>
          <h1 className={`fade-text ${fade ? "fade-in" : "fade-out"}`}>
            {texts[textIndex]}
          </h1>
          <Link to="/gallery" className="cta-btn shine"> Explore Our Creations </Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="our-promise" data-aos="fade-up">
        <h2 data-aos="zoom-in">Why Us?</h2>
        <p data-aos="fade-down">
          At <span style={{ fontSize: '22px', fontWeight: 'bold' }}>Lotus Décor & Events</span>, we believe every celebration is a reflection of your unique story — and we bring that vision to life with unmatched creativity, precision, and elegance.
          Unlike one-size-fits-all decor services, we specialize in fully customized setups tailored to your style, budget, and dreams. 
          From grand traditional gatherings to chic modern affairs, we offer bespoke decor for all occasions and all ages.
        </p>
        <p data-aos="fade-right">
          What truly sets us apart? We are proud to be the only décor company in Dallas to blend the timeless beauty of <span style={{ fontSize: '22px', fontWeight: 'bold' }}>sola wood</span> flowers with fresh florals — combining elegance with sustainability in every detail.
          As <span style={{ fontSize: '22px', fontWeight: 'bold' }}>full-time event planners</span>, we go beyond design—we walk with you through every stage of your event, offering hands-on guidance and unwavering support to ensure a seamless, stress-free experience. 
          Our role as organizers is to elevate your vision, infuse it with creativity, and execute every detail with elegance and precision.
        </p>
        <p data-aos="fade-up">
          We deeply value our clients’ voices and believe that <span style={{ fontSize: '22px', fontWeight: 'bold' }}>genuine feedback is the key to growth</span>. Every suggestion, compliment, and critique helps us refine our craft, elevate our services, and continue delivering unforgettable experiences.
          With a personalized approach and an eye for excellence, we meticulously craft every element to exceed expectations — leaving you and your guests with lasting memories and a celebration that speaks volumes.
        </p>
        <p data-aos="zoom-in" style={{ fontSize: '25px', fontWeight: 'bold' }}>
          Let us turn your vision into a celebration of elegance, beauty, and meaning.
        </p>
      </section>

      {/* Testimonials */}
      <section className="testimonials" data-aos="fade-up">
        <h2 data-aos="zoom-in">What Our Clients Say</h2>
        <div className="divider" />

        {isMobile ? (
          <div className="testimonial-mobile-container">
            <div className="testimonial-card">
              <div className="testimonial-img-container">
                <img
                  src={testimonialsData[activeTestimonial].img}
                  alt={testimonialsData[activeTestimonial].name}
                  className="testimonial-img"
                />
              </div>
              <div className="testimonial-overlay">
                <h3>{testimonialsData[activeTestimonial].name}</h3>
                <p>{testimonialsData[activeTestimonial].quote}</p>
              </div>
            </div>
            <div className="testimonial-nav">
              <button onClick={handlePrev}>&larr;</button>
              <button onClick={handleNext}>&rarr;</button>
            </div>
            <div className="testimonial-dots">
              {testimonialsData.map((_, idx) => (
                <div
                  key={idx}
                  className={`dot ${idx === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="testimonial-wrapper">
            <div className="testimonial-scroller">
              {[...testimonialsData, ...testimonialsData].map((item, index) => (
                <div className="testimonial-card" key={index}>
                  <div className="testimonial-img-container">
                    <img src={item.img} alt={item.name} className="testimonial-img" />
                  </div>
                  <div className="testimonial-overlay">
                    <h3>{item.name}</h3>
                    <p>{item.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-section" data-aos="zoom-in">
        <h2>Let’s Make Your Dream Event Come True</h2>
        <Link to="/contact" className="homeshine-btn"> Book a Consultation </Link>
      </section>
    </div>
  );
}

export default Home;
