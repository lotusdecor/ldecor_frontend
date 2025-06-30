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
      name: "Mounika & Naga",
      quote: [ "Sneha at Thoranam Decors made the stressful process of figuring out the decor and florals for the wedding much easier! She was so easy to work with and flexible to our needs! She was also very thorough in remembering what we discussed after every phone call and email. She definitely brought our vision to life with such ease and catered to our needs the whole time. She was also so generous to meet with us whenever we had to go through some urgent matters and help answer any questions! If we had to be more specific about the work she did, we were having weather challenges, she was extremely helpful, cooperative and flexible even if we had to move the venue in the last minute. Both, my husband and I loved our decoration and were very happy to see it all come together after months of planning!", 
      " My dream theme wouldn't have come to life without her help. We also received many many compliments. We highly recommend Sneha at Thoranam Decors for any floral/decor needs, she is the best!"],
      img: client1,
    },
    {
      name: "Swapna & Sashidhar",
      quote: "Sneha was a pleasure to work with. She listens and provides suggestions without being pushy. Thoranam decors have done a fabulous job decorating for the 3 events: Decor for each event was different and she made improvisations that made it more special. For one of the events we had a weather situation, she was flexible and accommodated the needed changes. I will not think twice about hiring her again.",
      img: client2,
    },
    {
      name: "Sahithi & Teja",
      quote: "Your team is easy to work with and gives perfect output. Awesome detailing and use of fresh flowers. Thank you for making our baby shower so special and memorable.",
      img: client3,
    },
    {
      name: "Braden & Parimala",
      quote: "The decor was absolutely stunning and made the evening of my engagement ceremony even more beautiful.Sneha was delighted to work with, she made sure to confirm even the smallest details with me and my mother to make sure the vision I had was brought to life. She was very cooperative and took care of the entire evening from set up to take down. The decor received so many compliments from our guests as gorgeous. We will definitely work with Sneha again.",
      img: client4,
    },
    {
      name: "Swetha & Raja",
      quote: "Sneha did a fabulous job at decorating the stage for our little princess saree event. This event was taken to the next level with her decorations. We received many compliments from the guests. She has spent so much time for us and has been very patient and innovative throughout the process. Her energy levels stayed the same from the start to the finish. She completely understands the clients needs and challenges her work every time. She did three different decorations for our three different events back to back without compromising on the quality even with time constraints. I very much look forward to working with her again for all my future events. Thank you Sneha.",
      img: client5,
    },
    {
      name: "Radhika Komma",
      quote: "We were absolutely thrilled with the stunning decorations you provided for our housewarming party! Your team's attention to detail and expertise in Indian decor truly transformed our space into a vibrant and festive atmosphere. Your decorations perfectly captured the essence of Indian culture and added a warm, welcoming touch to our new home. Our guests were amazed by the beautiful settings, and we received countless compliments. Thank you for your exceptional service, creativity, and professionalism. You exceeded our expectations! Thank you for your outstanding work! ",
      img: client6,
    },
    {
      name: "Suchi & Saikrishna",
      quote: "Thank you Thoranam Decors for the amazing decor for all our events! 🙌 to your patience and commitment.",
      img: client7,
    },
    {
      name: "Abhigna",
      quote: "Thank you so much for the incredible work you put into the decor for my son’s cradle ceremony. I received countless compliments on how beautiful everything looked ❤︎. Kudos to the team.",
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
          <span className="lotus-title-desktop">Lotus Decor and Events</span>
          <span className="lotus-title-mobile" >Lotus<br /> <span className="line-gap">Decor and Events</span></span>
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
        From grand <i>traditional gatherings</i> to chic modern affairs, we offer bespoke décor for all occasions.
        </p>
        <p data-aos="fade-right">
        What truly sets us apart? We are proud to be the only décor company in <span style={{ fontSize: '22px', fontWeight: 'bold' }}>Dallas</span> to blend the timeless beauty of <span style={{ fontSize: '22px', fontWeight: 'bold' }}>sola wood flowers with fresh florals</span> — 
        creating elegant, sustainable designs that are as unique as your celebration.
        </p>
        <p data-aos="fade-up">
        As <span style={{ fontSize: '22px', fontWeight: 'bold' }}>event managers, wedding planners and coordinators</span>, we’re with you from start to finish — guiding you through each step, handling the details, and ensuring everything runs smoothly. 
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
            /* —— NEW swipe layout —— */
            <div className="testimonial-swipe-track">
              {testimonialsData.map((item, idx) => (
                <div className="testimonial-card" key={idx}>
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
