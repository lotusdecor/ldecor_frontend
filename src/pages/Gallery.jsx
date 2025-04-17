import { useState } from 'react';
import '../styles/Gallery.css';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

import img1 from '../assets/gallery/wedding1.jpg';
import img2 from '../assets/gallery/wedding2.jpg';
import img3 from '../assets/gallery/wedding3.jpg';
import img4 from '../assets/gallery/wedding4.jpg';
import img5 from '../assets/gallery/wedding5.jpg';
import img6 from '../assets/gallery/cocktail1.jpg';
import img7 from '../assets/gallery/cocktail2.jpg';
import img8 from '../assets/gallery/cocktail3.jpg';
import img9 from '../assets/gallery/cocktail4.jpg';
import img28 from '../assets/gallery/cocktail5.jpg';
import img10 from '../assets/gallery/puja1.jpg';
import img11 from '../assets/gallery/puja2.jpg';
import img12 from '../assets/gallery/puja3.jpg';
import img14 from '../assets/gallery/pellikoothuru1.jpg';
import img15 from '../assets/gallery/pellikoothuru2.jpg';
import img16 from '../assets/gallery/pellikoothuru3.jpg';
import img17 from '../assets/gallery/pellikoothuru4.jpg';
import img18 from '../assets/gallery/pellikoothuru5.jpg';
import img19 from '../assets/gallery/house1.jpg';
import img20 from '../assets/gallery/house2.jpg';
import img21 from '../assets/gallery/house3.jpg';
import img22 from '../assets/gallery/house4.jpg';
import img23 from '../assets/gallery/house5.jpg';
import img24 from '../assets/gallery/house6.jpg';
import img25 from '../assets/gallery/house7.jpg';
import img26 from '../assets/gallery/house8.jpg';
import img27 from '../assets/gallery/house9.jpg';
import img29 from '../assets/gallery/milestone1.jpg';
import img30 from '../assets/gallery/milestone2.jpeg';

const imageData = [
  { src: img1, category: 'Wedding' },
  { src: img2, category: 'Wedding' },
  { src: img3, category: 'Wedding' },
  { src: img4, category: 'Wedding' },
  { src: img5, category: 'Wedding' },
  { src: img6, category: 'Western' },
  { src: img7, category: 'Western' },
  { src: img8, category: 'Western' },
  { src: img9, category: 'Western' },
  { src: img28, category: 'Western' },
  { src: img10, category: 'Traditional' },
  { src: img11, category: 'Traditional' },
  { src: img12, category: 'Traditional' },
  { src: img14, category: 'Traditional' },
  { src: img15, category: 'Traditional' },
  { src: img16, category: 'Traditional' },
  { src: img17, category: 'Traditional' },
  { src: img18, category: 'Traditional' },
  { src: img19, category: 'Traditional' },
  { src: img20, category: 'Traditional' },
  { src: img21, category: 'Traditional' },
  { src: img22, category: 'Traditional' },
  { src: img23, category: 'Traditional' },
  { src: img24, category: 'Traditional' },
  { src: img25, category: 'Traditional' },
  { src: img26, category: 'Traditional' },
  { src: img27, category: 'Traditional' },
  { src: img29, category: 'Milestones' },
  { src: img30, category: 'Milestones' },
];

const categories = ['Wedding', 'Traditional', 'Western', 'Milestones'];

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Wedding');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredImages =
    selectedCategory === 'All'
      ? imageData
      : imageData.filter((img) => img.category === selectedCategory);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header" data-aos="fade-up">
        <h2>Our Signature Looks</h2>
        <p>Moments captured with timeless elegance and curated charm.</p>
      </div>

      <div className="gallery-categories" data-aos="fade-up">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedIndex(null);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="masonry-grid">
        {filteredImages.map((img, i) => (
          <div
            className="masonry-item"
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 50}
          >
            <img
              src={img.src}
              alt={`${img.category} ${i + 1}`}
              loading="lazy"
              onClick={() => setSelectedIndex(i)}
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="lightbox" onClick={() => setSelectedIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <FaTimes className="lightbox-close" onClick={() => setSelectedIndex(null)} />
            <FaChevronLeft className="lightbox-nav left" onClick={handlePrev} />
            <img
              src={filteredImages[selectedIndex].src}
              alt="Preview"
              className="lightbox-img"
            />
            <FaChevronRight className="lightbox-nav right" onClick={handleNext} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
