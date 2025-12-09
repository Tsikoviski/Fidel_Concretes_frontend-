// Hero background image slideshow with crossfade
const heroImages = [
    'images/concrete-slabs.jpg',
    'images/block-wall.jpg',
    'images/landscaping.jpg',
    'images/wall-panel.jpg',
    'images/countertop.jpg',
    'images/decorative.jpg',
    'images/bench.jpg',
    'images/steps.jpg'
];

let currentImageIndex = 0;
let isFirstLayer = true;
const heroBg1 = document.querySelector('.hero-bg-1');
const heroBg2 = document.querySelector('.hero-bg-2');

function changeHeroBackground() {
    if (heroBg1 && heroBg2) {
        // Move to next image
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        
        if (isFirstLayer) {
            // Load next image in second layer
            heroBg2.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
            // Fade in second layer, fade out first layer
            heroBg2.style.opacity = '1';
            heroBg1.style.opacity = '0';
        } else {
            // Load next image in first layer
            heroBg1.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
            // Fade in first layer, fade out second layer
            heroBg1.style.opacity = '1';
            heroBg2.style.opacity = '0';
        }
        
        // Toggle which layer is active
        isFirstLayer = !isFirstLayer;
    }
}

// Set initial background
if (heroBg1) {
    heroBg1.style.backgroundImage = `url('${heroImages[0]}')`;
    heroBg1.style.opacity = '1';
    
    // Change background every 5 seconds
    setInterval(changeHeroBackground, 5000);
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .step, .quality-card, .trend-card, .advantage-card, .plan-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
