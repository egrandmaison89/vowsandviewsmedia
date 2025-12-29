// Mobile Navigation Toggle
(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navMenu.getAttribute('aria-expanded') === 'true';
      navMenu.setAttribute('aria-expanded', !isExpanded);
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

// Smooth Scroll for Anchor Links
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// Video Play Button Handler
(function() {
  document.addEventListener('click', function(e) {
    const playButton = e.target.closest('.video-play-button');
    if (!playButton) return;
    
    const wrapper = playButton.closest('.video-embed-wrapper');
    if (!wrapper) return;
    
    const poster = wrapper.querySelector('.video-poster');
    const iframeContainer = wrapper.querySelector('.video-iframe-container');
    const iframe = iframeContainer?.querySelector('iframe');
    
    if (poster && iframeContainer && iframe) {
      let src = iframe.getAttribute('data-src');
      if (!src) {
        // Try to get from wrapper first, then from parent film item
        let vimeoId = wrapper.getAttribute('data-video-id');
        if (!vimeoId || vimeoId === 'film-vimeo-id') {
          const filmItem = wrapper.closest('.film-item');
          if (filmItem) {
            vimeoId = filmItem.getAttribute('data-film-vimeo-id');
          }
        }
        if (vimeoId && vimeoId !== 'film-vimeo-id') {
          src = `https://player.vimeo.com/video/${vimeoId}?playsinline=1&responsive=1&title=0&byline=0&portrait=0`;
        }
      }
      if (src) {
        iframe.setAttribute('src', src);
        iframe.removeAttribute('data-src');
      }
      
      poster.style.display = 'none';
      iframeContainer.style.display = 'block';
    }
  });
})();

// Form Handling
(function() {
  const form = document.querySelector('form[data-netlify="true"]');
  if (!form) return;
  
  const formSuccess = document.querySelector('.form-success');
  
  // Check if we're returning from a successful form submission
  // Netlify redirects back to the same page after processing
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('success') || urlParams.has('submitted')) {
    if (formSuccess) {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  // Handle form submission with AJAX to avoid redirect issues
  form.addEventListener('submit', function(e) {
    // Basic client-side validation
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.setAttribute('aria-invalid', 'true');
        field.style.borderColor = 'var(--color-accent)';
      } else {
        field.removeAttribute('aria-invalid');
        field.style.borderColor = '';
      }
    });
    
    if (!isValid) {
      e.preventDefault();
      return false;
    }
    
    // Use AJAX submission to avoid redirect issues
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    fetch(form.action || '/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      // Show success message
      form.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Reset form
      form.reset();
    })
    .catch((error) => {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again.');
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    });
  });
  
  // Clear validation on input
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', function() {
      this.removeAttribute('aria-invalid');
      this.style.borderColor = '';
    });
  });
})();

// Lazy Load Videos - Get video ID from film data attribute
(function() {
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const wrapper = entry.target;
          const iframeContainer = wrapper.querySelector('.video-iframe-container');
          const iframe = iframeContainer?.querySelector('iframe');
          const filmItem = wrapper.closest('.film-item');
          
          if (iframe && filmItem) {
            // For now, videos will need to be configured manually or via CMS
            // The vimeo ID can be added as a data attribute when films are added
            console.log('Video lazy load: film item found, but vimeo ID needs to be set via data attribute');
          }
          
          observer.unobserve(wrapper);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    document.querySelectorAll('.video-embed-wrapper[data-lazy="true"]').forEach(wrapper => {
      videoObserver.observe(wrapper);
    });
  }
})();

// Hero Video Autoplay
(function() {
  const heroWrapper = document.querySelector('.hero-video-wrapper .video-embed-wrapper');
  if (heroWrapper) {
    const vimeoId = heroWrapper.getAttribute('data-video-id');
    const autoplay = heroWrapper.getAttribute('data-autoplay') === 'true';
    const loop = heroWrapper.getAttribute('data-loop') === 'true';
    const muted = heroWrapper.getAttribute('data-muted') === 'true';
    const iframeContainer = heroWrapper.querySelector('.video-iframe-container');
    const iframe = iframeContainer?.querySelector('iframe');
    
    if (iframe && vimeoId) {
      let params = 'playsinline=1&responsive=1&title=0&byline=0&portrait=0';
      if (autoplay) params += '&autoplay=1';
      if (loop) params += '&loop=1';
      if (muted) params += '&muted=1';
      
      const src = `https://player.vimeo.com/video/${vimeoId}?${params}`;
      iframe.setAttribute('src', src);
    }
  }
})();

