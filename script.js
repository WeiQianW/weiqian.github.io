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
const typedText = document.getElementById('typed-text');
const certificateModal = document.getElementById('certificate-modal');
const modalClose = certificateModal.querySelector('.modal-close');
const modalOverlay = certificateModal.querySelector('.modal-overlay');
const modalImage = document.getElementById('modal-image');
const modalPdf = document.getElementById('modal-pdf');

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
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        taglineIndex = (taglineIndex + 1) % taglines.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
    renderPortfolio();
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

    if (currentScrollY > lastScrollY && currentScrollY > 500) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleNavbarScroll);

// ============================================
// MOBILE NAVIGATION
// ============================================
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
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
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

function initScrollReveal() {
    document.querySelectorAll('.section-title, .about-content, .education-card, .experience-card, .skill-card, .project-card, .achievement-card, .contact-content').forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });
}

// ============================================
// ANIMATED GPA COUNTER
// ============================================
let gpaAnimated = false;

function animateGPA() {
    if (gpaAnimated) return;
    gpaAnimated = true;

    const gpaValue = document.querySelector('.gpa-value');
    if (!gpaValue) return;

    const target = parseFloat(gpaValue.textContent);
    if (isNaN(target)) return;

    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = (easeOut * target).toFixed(1);

        gpaValue.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            gpaValue.textContent = target.toFixed(1);
        }
    }

    requestAnimationFrame(updateCounter);
}

function initGPAObserver() {
    const educationSection = document.querySelector('.education');
    if (educationSection) {
        const gpaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateGPA();
                }
            });
        }, { threshold: 0.3 });
        gpaObserver.observe(educationSection);
    }
}

// ============================================
// DATA-DRIVEN RENDERING ENGINE
// ============================================
function renderPortfolio() {
    const data = portfolioData;

    renderEducation(data.education);
    renderExperience(data.workExperience);
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderCertificates(data.certificates);

    // Re-initialize interactive features after rendering
    initScrollReveal();
    initGPAObserver();
    initGPATabs();
    initCarousel();
    initCertificateModal();
}

// --- Education ---
function renderEducation(items) {
    const container = document.getElementById('education-grid');
    if (!container || !items) return;

    container.innerHTML = items.map(item => {
        const statusClass = item.status === 'current' ? 'current' : '';
        const statusLabel = item.status === 'current' ? 'Current' : 'Completed';
        const statusBadgeClass = item.status === 'current' ? 'current' : 'completed';

        let gpaHTML = '';
        if (item.gpa) {
            const semesterTabs = item.gpa.semesters
                .map(sem => `<button class="gpa-tab" data-gpa="${sem.value}">${sem.label}</button>`)
                .join('');

            gpaHTML = `
                <div class="gpa-section">
                    <div class="gpa-tabs">
                        <button class="gpa-tab active" data-gpa="${item.gpa.cumulative}">Cumulative</button>
                        ${semesterTabs}
                    </div>
                    <div class="gpa-display">
                        <span class="gpa-label">GPA</span>
                        <span class="gpa-value">${item.gpa.cumulative}</span>
                    </div>
                </div>`;
        }

        return `
            <div class="education-card ${statusClass}" data-aos="fade-up">
                <div class="education-status">
                    <span class="status-badge ${statusBadgeClass}">${statusLabel}</span>
                </div>
                <div class="education-icon">${item.icon}</div>
                <div class="education-content">
                    <h3 class="education-institution">${item.institution}</h3>
                    <p class="education-level">${item.level}</p>
                    <p class="education-course">${item.course}</p>
                    <div class="education-details">
                        <div class="detail-item">
                            <span class="detail-label">Duration</span>
                            <span class="detail-value">${item.duration}</span>
                        </div>
                    </div>
                    ${gpaHTML}
                </div>
            </div>`;
    }).join('');
}

// --- Work Experience ---
function renderExperience(items) {
    const container = document.getElementById('experience-timeline');
    const section = document.getElementById('experience');
    const navLink = document.querySelector('a[href="#experience"]');

    if (!container || !items || items.length === 0) {
        // Hide the entire section and nav link when no work experience
        if (section) section.style.display = 'none';
        if (navLink) navLink.parentElement.style.display = 'none';
        return;
    }

    container.innerHTML = items.map(item => {
        const statusClass = item.status === 'current' ? 'current' : '';
        const statusLabel = item.status === 'current' ? 'Current' : 'Completed';
        const statusBadgeClass = item.status === 'current' ? 'current' : 'completed';

        const highlightsHTML = item.highlights
            ? `<ul class="experience-highlights">
                ${item.highlights.map(h => `<li>${h}</li>`).join('')}
               </ul>`
            : '';

        return `
            <div class="experience-card ${statusClass}" data-aos="fade-up">
                <div class="experience-timeline-dot"></div>
                <div class="experience-status">
                    <span class="status-badge ${statusBadgeClass}">${statusLabel}</span>
                </div>
                <div class="experience-icon">${item.icon}</div>
                <div class="experience-content">
                    <h3 class="experience-company">${item.company}</h3>
                    <p class="experience-role">${item.role}</p>
                    <div class="experience-details">
                        <div class="detail-item">
                            <span class="detail-label">Duration</span>
                            <span class="detail-value">${item.duration}</span>
                        </div>
                    </div>
                    <p class="experience-description">${item.description}</p>
                    ${highlightsHTML}
                </div>
            </div>`;
    }).join('');
}

// --- Skills ---
function renderSkills(items) {
    const container = document.getElementById('skills-grid');
    if (!container || !items) return;

    container.innerHTML = items.map(item => `
        <div class="skill-card" data-aos="fade-up">
            <div class="skill-icon">${item.icon}</div>
            <h3 class="skill-name">${item.name}</h3>
            <p class="skill-description">${item.description}</p>
        </div>
    `).join('');
}

// --- Projects ---
function renderProjects(items) {
    const container = document.getElementById('projects-list');
    if (!container || !items) return;

    container.innerHTML = items.map(item => {
        const featuredClass = item.featured ? 'featured' : '';

        // Build images section
        let imagesHTML = '';
        if (item.images && item.images.length > 0) {
            if (item.images.length > 1) {
                const imgsHTML = item.images.map((img, i) =>
                    `<img src="${img.src}" alt="${img.alt}" class="project-img ${i === 0 ? 'active' : ''}">`
                ).join('');
                const dotsHTML = item.images.map((img, i) =>
                    `<button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="View image ${i + 1}"></button>`
                ).join('');
                imagesHTML = `
                    <div class="project-images">
                        <div class="image-carousel">${imgsHTML}</div>
                        <div class="carousel-dots">${dotsHTML}</div>
                    </div>`;
            } else {
                imagesHTML = `
                    <div class="project-images">
                        <img src="${item.images[0].src}" alt="${item.images[0].alt}" class="project-img active">
                    </div>`;
            }
        }

        // Build features list
        let featuresHTML = '';
        if (item.features && item.features.length > 0) {
            featuresHTML = `
                <ul class="project-features">
                    ${item.features.map(f => `<li><strong>${f.bold}</strong> ${f.text}</li>`).join('')}
                </ul>`;
        }

        // Build tech tags
        const techHTML = item.techTags ? `
            <div class="project-tech">
                ${item.techTags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>` : '';

        return `
            <article class="project-card ${featuredClass}" data-aos="fade-up">
                ${imagesHTML}
                <div class="project-content">
                    <div class="project-header">
                        ${item.label ? `<span class="project-label">${item.label}</span>` : ''}
                        <h3 class="project-title">${item.title}</h3>
                    </div>
                    <p class="project-description">${item.description}</p>
                    ${featuresHTML}
                    ${techHTML}
                </div>
            </article>`;
    }).join('');
}

// --- Certificates / Achievements ---
function renderCertificates(items) {
    const container = document.getElementById('achievements-grid');
    if (!container || !items) return;

    container.innerHTML = items.map(item => {
        if (item.fileType === 'multi-pdf' && item.files) {
            const tabsHTML = item.files.map((f, i) =>
                `<button class="semester-tab ${i === 0 ? 'active' : ''}" data-cert="${f.path}">${f.label}</button>`
            ).join('');

            return `
                <div class="achievement-card" data-aos="fade-up" data-type="multi-pdf">
                    <div class="achievement-icon">${item.icon}</div>
                    <h3 class="achievement-title">${item.title}</h3>
                    <p class="achievement-org">${item.organization}</p>
                    <p class="achievement-desc">${item.description}</p>
                    <div class="semester-tabs">${tabsHTML}</div>
                    <button class="view-cert-btn" data-certificate="${item.files[0].path}">View Certificate</button>
                </div>`;
        }

        return `
            <div class="achievement-card" data-aos="fade-up"
                data-certificate="${item.filePath}" data-type="${item.fileType}">
                <div class="achievement-icon">${item.icon}</div>
                <h3 class="achievement-title">${item.title}</h3>
                <p class="achievement-org">${item.organization}</p>
                <p class="achievement-desc">${item.description}</p>
                <button class="view-cert-btn">View Certificate</button>
            </div>`;
    }).join('');
}

// ============================================
// INTERACTIVE FEATURES (re-initialized after render)
// ============================================

function initGPATabs() {
    document.querySelectorAll('.gpa-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const gpaSection = tab.closest('.gpa-section');
            const allTabs = gpaSection.querySelectorAll('.gpa-tab');
            const gpaValue = gpaSection.querySelector('.gpa-value');

            allTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            gpaValue.textContent = tab.dataset.gpa;
        });
    });
}

function initCarousel() {
    const projectImages = document.querySelectorAll('.project-img');
    const projectDots = document.querySelectorAll('.carousel-dots .dot');
    let currentImageIndex = 0;

    function showProjectImage(index) {
        projectImages.forEach(img => img.classList.remove('active'));
        projectDots.forEach(dot => dot.classList.remove('active'));
        if (projectImages[index]) projectImages[index].classList.add('active');
        if (projectDots[index]) projectDots[index].classList.add('active');
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
}

function initCertificateModal() {
    // Semester tab switching
    document.querySelectorAll('.semester-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const card = tab.closest('.achievement-card');
            const allTabs = card.querySelectorAll('.semester-tab');
            const viewBtn = card.querySelector('.view-cert-btn');

            allTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            viewBtn.dataset.certificate = tab.dataset.cert;
        });
    });

    // View certificate button
    document.querySelectorAll('.view-cert-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.achievement-card');
            const certPath = btn.dataset.certificate || card.dataset.certificate;
            const certType = card.dataset.type;

            if (!certPath) return;

            if (certType === 'image') {
                modalImage.src = certPath;
                modalImage.style.display = 'block';
                modalPdf.style.display = 'none';
            } else {
                modalPdf.src = certPath;
                modalPdf.style.display = 'block';
                modalImage.style.display = 'none';
            }

            certificateModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

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
    const navHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// PARALLAX EFFECT FOR HERO ORBS
// ============================================
const orbs = document.querySelectorAll('.glow-orb');

function handleParallax(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
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
console.log('%c🔧 Portfolio Website', 'font-size: 20px; font-weight: bold; color: #6d28d9;');
console.log('%cThis portfolio belongs to Chook Wei Qian', 'font-size: 14px; color: #8b5cf6;');
console.log('%cInterested in collaborating? Reach out at weiqian150@gmail.com', 'font-size: 12px; color: #a0a0b0;');
