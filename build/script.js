document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('night-mode-toggle');
  const body = document.body;

  // Check localStorage for mode
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggleBtn.textContent = '🌙';
  } else {
    body.classList.remove('light-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', function() {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
      toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });

  // Mobile toggle functionality
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav a');

  // Debug: Log if elements are found
  console.log('Mobile toggle found:', !!mobileToggle);
  console.log('Nav menu found:', !!navMenu);

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      console.log('Mobile toggle clicked');
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('mobile-open');
      
      // Update aria-expanded attribute
      const isExpanded = navMenu.classList.contains('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      
      console.log('Menu is expanded:', isExpanded);
      console.log('Nav menu classes:', navMenu.className);
      
      // Prevent body scroll when menu is open
      if (isExpanded) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!mobileToggle.contains(event.target) && !navMenu.contains(event.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Close mobile menu on window resize (if screen becomes larger)
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  // Modal logic for all images
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const captionText = document.getElementById('caption');
  const closeBtn = document.querySelector('.modal .close');

  if (modal && modalImg && captionText && closeBtn) {
    // Get all images that should be clickable
    const clickableImages = document.querySelectorAll('.certificate-img, .project-img, .profile-img');
    
    // Add click event listeners to all clickable images
    clickableImages.forEach(function(img) {
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        
        // Get caption text from different sources
        let caption = '';
        if (this.classList.contains('certificate-img')) {
          const label = this.parentElement.querySelector('.certificate-label');
          caption = label ? label.innerText : this.alt;
        } else if (this.classList.contains('project-img')) {
          const label = this.parentElement.querySelector('.project-label');
          caption = label ? label.innerText : this.alt;
        } else if (this.classList.contains('profile-img')) {
          caption = 'Omar Rady - Profile Photo';
        } else {
          caption = this.alt;
        }
        
        captionText.innerText = caption;
      });
    });

    // Close modal functionality
    closeBtn.onclick = function() {
      modal.style.display = "none";
    };

    // Close modal when clicking outside the image
    modal.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = "none";
      }
    });
  }

  // Contact form functionality
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Create mailto link
      const mailtoLink = `mailto:eng.omar.rady@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      alert('Thank you for your message! Your email client should open with the message ready to send.');
      
      // Reset form
      contactForm.reset();
    });
  }
});
