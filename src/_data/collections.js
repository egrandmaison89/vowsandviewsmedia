const fs = require('fs');
const path = require('path');

module.exports = function() {
  const filmsDir = path.join(__dirname, 'films');
  const testimonialsDir = path.join(__dirname, 'testimonials');
  
  let films = [];
  let testimonials = [];
  
  // Load films
  try {
    if (fs.existsSync(filmsDir)) {
      const filmFiles = fs.readdirSync(filmsDir).filter(file => file.endsWith('.json'));
      films = filmFiles.map(file => {
        try {
          const content = fs.readFileSync(path.join(filmsDir, file), 'utf8');
          return JSON.parse(content);
        } catch (e) {
          console.warn(`Error loading film file ${file}:`, e.message);
          return null;
        }
      }).filter(film => film !== null);
    }
  } catch (e) {
    console.warn('Error loading films directory:', e.message);
  }
  
  // Load testimonials
  try {
    if (fs.existsSync(testimonialsDir)) {
      const testimonialFiles = fs.readdirSync(testimonialsDir).filter(file => file.endsWith('.json'));
      testimonials = testimonialFiles.map(file => {
        try {
          const content = fs.readFileSync(path.join(testimonialsDir, file), 'utf8');
          return JSON.parse(content);
        } catch (e) {
          console.warn(`Error loading testimonial file ${file}:`, e.message);
          return null;
        }
      }).filter(testimonial => testimonial !== null);
    }
  } catch (e) {
    console.warn('Error loading testimonials directory:', e.message);
  }
  
  // Filter featured films
  const featuredFilms = films.filter(film => film.featured === true).slice(0, 6);
  
  return {
    films: films,
    featuredFilms: featuredFilms,
    testimonials: testimonials
  };
};

