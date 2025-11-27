document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Load Animation
    const pageLoadOverlay = document.getElementById('page-load-overlay');
    setTimeout(() => {
        if (pageLoadOverlay) {
            pageLoadOverlay.classList.add('loaded');
        }
    }, 100); // Small delay to ensure CSS is applied before transition

    // 2. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle hamburger icon between bars and times
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close menu when a link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 3. Sticky Header Animation
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            // Change color of mobile icon on scroll for visibility
            if (hamburger) hamburger.style.color = 'var(--text-dark)';
        } else {
            header.classList.remove('scrolled');
            if (hamburger) hamburger.style.color = 'var(--bg-white)';
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Call on load in case of refresh lower down

    // 4. Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 5. Scroll Animations (AOS style - simple implementation)
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-animation]');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const delay = element.getAttribute('data-delay') || 0;

            if (elementTop < windowHeight - 100) {
                // If element is in view, apply animation
                setTimeout(() => {
                    element.classList.add('animate');
                }, parseInt(delay));
            } else {
                // Optional: Remove 'animate' when out of view (for repeated animation)
                // element.classList.remove('animate'); 
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on load for elements already in view

    // 6. Contact Form Validation (Simple JS)
    const form = document.getElementById('quote-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.validation-message').forEach(span => span.textContent = '');

            // Validation logic
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const successMessage = document.getElementById('form-success-message');

            if (name.value.trim().length < 2) {
                document.getElementById('name-error').textContent = 'Please enter your full name.';
                isValid = false;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (message.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'Please provide details about the service required (min 10 characters).';
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission success
                form.reset();
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Hide success message after a few seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    form.style.display = 'block';
                }, 5000); 

                // NOTE: In a real application, you would send the data to a server here.
                console.log('Form Submitted Successfully (Simulation)');
            }
        });
    }
});



