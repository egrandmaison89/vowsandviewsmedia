const fs = require('fs');
const path = require('path');

// Parse frontmatter from markdown files
function parseFrontmatter(content) {
  // Match frontmatter with optional content after
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*(?:\n([\s\S]*))?$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return null;
  }
  
  const frontmatterText = match[1];
  const data = {};
  
  // Parse YAML-like frontmatter (simple key-value pairs)
  const lines = frontmatterText.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmedLine.substring(0, colonIndex).trim();
      let value = trimmedLine.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Parse boolean values
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      
      data[key] = value;
    }
  }
  
  return data;
}

// Load a data file (supports both JSON and Markdown with frontmatter)
function loadDataFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (filePath.endsWith('.json')) {
      return JSON.parse(content);
    } else if (filePath.endsWith('.md')) {
      const data = parseFrontmatter(content);
      if (!data) {
        console.warn(`Could not parse frontmatter from ${filePath}`);
        return null;
      }
      return data;
    }
    
    return null;
  } catch (e) {
    console.warn(`Error loading file ${filePath}:`, e.message);
    return null;
  }
}

module.exports = function() {
  const filmsDir = path.join(__dirname, 'films');
  const testimonialsDir = path.join(__dirname, 'testimonials');
  
  let films = [];
  let testimonials = [];
  
  // Load films
  try {
    if (fs.existsSync(filmsDir)) {
      const filmFiles = fs.readdirSync(filmsDir).filter(file => 
        file.endsWith('.json') || file.endsWith('.md')
      );
      films = filmFiles.map(file => {
        const filePath = path.join(filmsDir, file);
        return loadDataFile(filePath);
      }).filter(film => film !== null);
    }
  } catch (e) {
    console.warn('Error loading films directory:', e.message);
  }
  
  // Load testimonials
  try {
    if (fs.existsSync(testimonialsDir)) {
      const testimonialFiles = fs.readdirSync(testimonialsDir).filter(file => 
        file.endsWith('.json') || file.endsWith('.md')
      );
      testimonials = testimonialFiles.map(file => {
        const filePath = path.join(testimonialsDir, file);
        return loadDataFile(filePath);
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

