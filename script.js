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
    '.contact-card',
    '.service-card',
    '.roi-stat',
    '.services-cta'
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

// ===== Share Button GA4 Event Tracking =====
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        let platform = 'unknown';
        if (this.classList.contains('share-facebook')) platform = 'facebook';
        else if (this.classList.contains('share-twitter')) platform = 'x_twitter';
        else if (this.classList.contains('share-linkedin')) platform = 'linkedin';
        else if (this.classList.contains('share-copy')) platform = 'copy_link';

        const postTitle = document.querySelector('.blog-post-title')?.textContent || document.title;

        if (typeof gtag === 'function') {
            gtag('event', 'share_click', {
                event_category: 'Social Share',
                event_label: postTitle,
                share_platform: platform,
                page_path: window.location.pathname
            });
        }
    });
});

// ===== EmailJS Share Notification =====
(function () {
    if (typeof emailjs === 'undefined') return;

    emailjs.init('VeLrd7KzKHeHH-WUa');

    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            let platform = 'Unknown';
            if (this.classList.contains('share-facebook')) platform = 'Facebook';
            else if (this.classList.contains('share-twitter')) platform = 'X (Twitter)';
            else if (this.classList.contains('share-linkedin')) platform = 'LinkedIn';
            else if (this.classList.contains('share-copy')) platform = 'Copy Link';

            const postTitle = document.querySelector('.blog-post-title')?.textContent || 'Unknown Post';

            emailjs.send('service_pcbhiwq', 'template_lpuhrif', {
                blog_post: postTitle,
                share_platform: platform,
                timestamp: new Date().toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    dateStyle: 'medium',
                    timeStyle: 'short'
                }),
                page_url: window.location.href
            }).catch(function (err) {
                console.warn('EmailJS notification failed:', err);
            });
        });
    });
})();
