// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile nav when clicking a link
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
}

// Scroll-triggered fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to element groups (reset delay per group)
const groups = [
    '.about-content',
    '.timeline-item',
    '.skill-category',
    '.education-card',
    '.blog-card',
    '.contact-card'
];

groups.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
    });
});

// Fallback: ensure all fade-in elements become visible after 1.5s
// Prevents elements from staying invisible if observer doesn't trigger
setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
    });
}, 1500);

// Page-based active link highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkHref = link.getAttribute('href');
    const linkPage = linkHref.replace('../', '').split('#')[0];
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// For blog post pages, highlight the Blog nav link
if (window.location.pathname.includes('/blog/')) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('blog.html')) {
            link.classList.add('active');
        }
    });
}
