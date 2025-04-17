import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import heroImg from "../assets/home_bg_hd.png";
import client1 from "../assets/testimonials/client1.jpeg";
import client2 from "../assets/testimonials/client2.jpeg";
import client3 from "../assets/testimonials/client3.jpeg";
import client4 from "../assets/testimonials/client4.jpeg";
import client5 from "../assets/testimonials/client5.jpeg";
import client6 from "../assets/testimonials/client6.jpeg";
import client7 from "../assets/testimonials/client7.jpeg";
import client8 from "../assets/testimonials/client8.jpeg";
import client9 from "../assets/testimonials/client9.jpeg";

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
      name: "Anjali Mehra",
      quote: "Lotus Decors made our wedding magical. The team was detail-oriented, warm, and incredibly creative!",
      img: client2,
    },
    {
      name: "Ravi Patel",
      quote: "From the flowers to the lighting, everything was breathtaking. Our guests still talk about it!",
      img: client3,
    },
    {
      name: "Priya Sharma",
      quote: "They captured our style perfectly and brought elegance to every inch of our event.",
      img: client4,
    },
    {
      name: "Priya Sharma",
      quote: "They captured our style perfectly and brought elegance to every inch of our event.",
      img: client5,
    },
    {
      name: "Priya Sharma",
      quote: "They captured our style perfectly and brought elegance to every inch of our event.",
      img: client6,
    },
    {
      name: "Priya Sharma",
      quote: "They captured our style perfectly and brought elegance to every inch of our event.",
      img: client7,
    },
    {
      name: "Priya Sharma",
      quote: "They captured our style perfectly and brought elegance to every inch of our event.",
      img: client8,
    },
    {
      name: "Rebecca & Sandeep",
      quote: "It was a wonderful wedding journey with Thoranam Decors. Hiring this team was absolutely one of the best decisions I made when we are planning wedding. Thank you so much Sneha for giving us memories for a lifetime! I would highly recommend you and the team Thoranam Decors for any occasion. 👏🏻👌🏻👍🏻 Thank you Sneha😊😊",
      img: client9,
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
        Unlike one-size-fits-all décor services, we specialize in fully <span style={{ fontSize: '22px', fontWeight: 'bold' }}>customized </span>setups tailored to your <span style={{ fontSize: '22px', fontWeight: 'bold' }}>style, budget, and dreams</span>. 
        From grand traditional gatherings to chic modern affairs, we offer bespoke décor for all occasions.
        </p>
        <p data-aos="fade-right">
        What truly sets us apart? We are proud to be the only décor company in <span style={{ fontSize: '22px', fontWeight: 'bold' }}>Dallas</span> to blend the timeless beauty of <span style={{ fontSize: '22px', fontWeight: 'bold' }}>sola wood flowers with fresh florals</span> — 
        creating elegant, sustainable designs that are as unique as your celebration.
        </p>
        <p data-aos="fade-up">
        As <span style={{ fontSize: '22px', fontWeight: 'bold' }}>full-time event planners</span>, we’re with you from start to finish — guiding you through each step, handling the details, and ensuring everything runs smoothly. 
        Our goal is to bring your vision to life while making the planning process easy and stress-free.
        </p>
        <p data-aos="zoom-in" style={{ fontSize: '20px'}}>
        We value your feedback and see it as an opportunity to grow. Every idea, suggestion, and compliment helps us improve and deliver even better experiences. 
        With a <span style={{ fontSize: '22px', fontWeight: 'bold' }}>personalized touch and strong attention to detail</span>, we create meaningful celebrations that leave a lasting impression.
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
