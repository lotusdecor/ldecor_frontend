import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Events from './pages/Events';
import Halloween from './pages/Halloween';
import { useEffect } from 'react';

// Old /halloween links (poster QR codes, shared links, Stripe redirect) keep working.
// Keeps the query string so ?ticket=success still reaches the page.
function HalloweenRedirect() {
  const { search } = useLocation();
  return <Navigate to={`/events/halloween${search}`} replace />;
}


function App() {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/halloween" element={<Halloween />} />
            <Route path="/halloween" element={<HalloweenRedirect />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
