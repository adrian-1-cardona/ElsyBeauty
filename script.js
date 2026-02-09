/* ========================================
   Elsy Beauty - JavaScript
   Smooth Animations & Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSmoothScrolling();
    initImageLoading();
});

/* ========================================
   Scroll-Based Fade Animations
   ======================================== */

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
    
    if (!animatedElements.length) return;

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.05
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(element) {
            observer.observe(element);
        });

        // Trigger animations for elements already in view on load
        setTimeout(function() {
            animatedElements.forEach(function(element) {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight + 100 && rect.bottom > 0) {
                    element.classList.add('visible');
                }
            });
        }, 150);
    } else {
        // Fallback: show all elements immediately if IntersectionObserver not supported
        animatedElements.forEach(function(element) {
            element.classList.add('visible');
        });
    }
}

/* ========================================
   Smooth Scrolling for Anchor Links
   ======================================== */

function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Image Loading with Fade Effect
   ======================================== */

function initImageLoading() {
    const images = document.querySelectorAll('img:not(.fade-in-scale)');
    
    images.forEach(function(img) {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', function() {
                img.style.opacity = '1';
            });
        }
    });
}

/* ========================================
   Parallax Effect for Hero Section
   ======================================== */

let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            handleParallax();
            handleScrollAnimations();
            ticking = false;
        });
        ticking = true;
    }
});

function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in:not(.visible), .fade-in-left:not(.visible), .fade-in-right:not(.visible), .fade-in-scale:not(.visible)');
    
    animatedElements.forEach(function(element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
            element.classList.add('visible');
        }
    });
}

function handleParallax() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = 'translateY(' + (scrolled * 0.15) + 'px) scale(1.02)';
    }
}

/* ========================================
   Button Ripple Effect
   ======================================== */

document.querySelectorAll('.btn').forEach(function(button) {
    button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = 
            'position: absolute;' +
            'background: rgba(255,255,255,0.3);' +
            'border-radius: 50%;' +
            'transform: scale(0);' +
            'animation: ripple 0.6s linear;' +
            'pointer-events: none;' +
            'left: ' + x + 'px;' +
            'top: ' + y + 'px;' +
            'width: 100px;' +
            'height: 100px;' +
            'margin-left: -50px;' +
            'margin-top: -50px;';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = '@keyframes ripple { to { transform: scale(4); opacity: 0; } }';
document.head.appendChild(style);

/* ========================================
   Calendly Integration Handler
   ======================================== */

function openCalendly() {
    // Replace with your actual Calendly URL
    window.open('https://calendly.com/elsybeauty', '_blank');
}
