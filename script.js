/* ============================================
   PORTFOLIO JAVASCRIPT - CHOOK WEI QIAN
   Interactive Features & Animations
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typedText = document.getElementById('typed-text');
const certificateModal = document.getElementById('certificate-modal');
const modalImage = document.getElementById('modal-image');
const modalPdf = document.getElementById('modal-pdf');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const viewCertBtns = document.querySelectorAll('.view-cert-btn');
const projectDots = document.querySelectorAll('.carousel-dots .dot');
const projectImages = document.querySelectorAll('.project-img');

// ============================================
// TYPING ANIMATION
// ============================================
const taglines = [
    'Aspiring Mechatronics & Robotics Engineer',
    'IoT Developer',
    'Problem Solver',
    'Innovation Enthusiast'
];

let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentTagline = taglines[taglineIndex];

    if (isDeleting) {
        typedText.textContent = currentTagline.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedText.textContent = currentTagline.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTagline.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        taglineIndex = (taglineIndex + 1) % taglines.length;
        typingSpeed = 500; // Pause before new word
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScrollY = window.scrollY;

function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleNavbarScroll);

// ============================================
// MOBILE NAVIGATION
// ============================================
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.skill-card, .project-card, .achievement-card, .about-content, .contact-content, .education-card').forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
});

// ============================================
// ANIMATED GPA COUNTER
// ============================================
let gpaAnimated = false;

function animateGPA() {
    if (gpaAnimated) return;
    const gpaValue = document.querySelector('.gpa-value');
    if (!gpaValue) return;

    const target = parseFloat(gpaValue.textContent) || 4.0;
    const duration = 1500;
    const startTime = performance.now();

    gpaAnimated = true;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = (eased * target).toFixed(1);
        gpaValue.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            gpaValue.textContent = target.toFixed(1);
        }
    }

    gpaValue.textContent = '0.0';
    requestAnimationFrame(updateCounter);
}

const gpaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateGPA();
        }
    });
}, { threshold: 0.3 });

const educationSection = document.querySelector('.education');
if (educationSection) {
    gpaObserver.observe(educationSection);
}

// ============================================
// PROJECT IMAGE CAROUSEL
// ============================================
let currentImageIndex = 0;

function showProjectImage(index) {
    projectImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    projectDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentImageIndex = index;
}

projectDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showProjectImage(index);
    });
});

// Auto-rotate carousel
setInterval(() => {
    if (projectImages.length > 1) {
        const nextIndex = (currentImageIndex + 1) % projectImages.length;
        showProjectImage(nextIndex);
    }
}, 5000);

// ============================================
// CERTIFICATE MODAL
// ============================================

// Handle semester tab switching
document.querySelectorAll('.semester-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const card = tab.closest('.achievement-card');
        const allTabs = card.querySelectorAll('.semester-tab');
        const viewBtn = card.querySelector('.view-cert-btn');

        // Update active tab
        allTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update the certificate path on the view button
        viewBtn.dataset.certificate = tab.dataset.cert;
    });
});

// Handle GPA tab switching in Education section
document.querySelectorAll('.gpa-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const gpaSection = tab.closest('.gpa-section');
        const allTabs = gpaSection.querySelectorAll('.gpa-tab');
        const gpaValue = gpaSection.querySelector('.gpa-value');

        // Update active tab
        allTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update the displayed GPA value
        gpaValue.textContent = tab.dataset.gpa;
    });
});

viewCertBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.achievement-card');
        const certType = card.dataset.type;

        // Get certificate path from button's data attribute (for multi-pdf) or card's data attribute
        const certPath = btn.dataset.certificate || card.dataset.certificate;

        if (certType === 'image') {
            modalImage.src = certPath;
            modalImage.style.display = 'block';
            modalPdf.style.display = 'none';
        } else if (certType === 'pdf' || certType === 'multi-pdf') {
            modalPdf.src = certPath;
            modalPdf.style.display = 'block';
            modalImage.style.display = 'none';
        }

        certificateModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    certificateModal.classList.remove('active');
    document.body.style.overflow = '';
    modalImage.src = '';
    modalPdf.src = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
        closeModal();
    }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// PARALLAX EFFECT FOR HERO ORBS
// ============================================
const orbs = document.querySelectorAll('.glow-orb');

function handleParallax(e) {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.02;
        const x = (clientX - centerX) * speed;
        const y = (clientY - centerY) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Only apply parallax on desktop
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', handleParallax);
}

// ============================================
// CONSOLE GREETING
// ============================================
console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%cThis portfolio belongs to Chook Wei Qian', 'font-size: 14px; color: #8b5cf6;');
console.log('%cInterested in collaborating? Reach out at weiqian150@gmail.com', 'font-size: 12px; color: #a0a0b0;');
