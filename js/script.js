document.addEventListener('DOMContentLoaded', () => {
    
    // --- Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => console.log('ServiceWorker registered with scope:', registration.scope))
            .catch(error => console.log('ServiceWorker registration failed:', error));
    }

    // --- Runtime SEO URL Sync ---
    // Keeps the deployed host, preview host, and social metadata aligned.
    const origin = window.location.origin;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');

    if (canonicalLink) canonicalLink.setAttribute('href', `${origin}/`);
    if (ogUrl) ogUrl.setAttribute('content', `${origin}/`);
    if (ogImage) ogImage.setAttribute('content', `${origin}/assets/logo.png`);
    if (twitterImage) twitterImage.setAttribute('content', `${origin}/assets/logo.png`);

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileBtn && nav) {
        const toggleMenu = () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
            if (!isExpanded) {
                // Lock bg scroll when menu open on mobile
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        mobileBtn.addEventListener('click', toggleMenu);

        // Accessibility for mobile menu
        mobileBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Close mobile menu when a nav link is clicked
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (nav) nav.classList.remove('active'); // close menu on click

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- FAQ Accordion Logic ---
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Close other open accordions
            accordions.forEach(otherAcc => {
                if (otherAcc !== this) {
                    otherAcc.parentElement.classList.remove('active');
                    otherAcc.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current
            const parent = this.parentElement;
            const content = this.nextElementSibling;
            
            parent.classList.toggle('active');
            
            if (parent.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // --- Simple Language Switcher Data ---
    // Note: Since this is a static site without a backend, 
    // we use a simple dictionary to swap text dynamically. (Now sourced from translations.js)

    // --- Custom Language Switcher Logic ---
    const langDropdown = document.getElementById('langDropdown');
    const langToggle = document.getElementById('langToggle');
    const langMenu = document.getElementById('langMenu');
    const currentLangText = document.getElementById('currentLangText');
    const currentLangCode = langToggle ? langToggle.querySelector('.lang-code') : null;

    if (langDropdown && langToggle && langMenu) {
        langMenu.hidden = true;

        const setDropdownOpen = (open) => {
            langDropdown.classList.toggle('open', open);
            langMenu.hidden = !open;
            langToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        };

        // Toggle dropdown open/close
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            setDropdownOpen(!langDropdown.classList.contains('open'));
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                setDropdownOpen(false);
            }
        });

        // Handle language selection
        const langOptions = langMenu.querySelectorAll('li');
        langOptions.forEach(option => {
            const selectOption = () => {
                const lang = option.getAttribute('data-value');
                updateLanguageUI(lang, option);
                setDropdownOpen(false);
                changeLanguage(lang);
                localStorage.setItem('preferredLanguage', lang);
                langToggle.focus();
            };

            option.addEventListener('click', selectOption);
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectOption();
                } else if (e.key === 'Escape') {
                    setDropdownOpen(false);
                    langToggle.focus();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = option.nextElementSibling;
                    if (next) next.focus();
                    else langOptions[0].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = option.previousElementSibling;
                    if (prev) prev.focus();
                    else langOptions[langOptions.length - 1].focus();
                }
            });
        });

        function updateLanguageUI(lang, optionElement) {
            langOptions.forEach(opt => opt.classList.remove('active'));
            const option = optionElement || Array.from(langOptions).find(opt => opt.getAttribute('data-value') === lang);
            if (option) {
                option.classList.add('active');
                currentLangText.textContent = option.querySelector('.lang-name').textContent;
                currentLangCode.textContent = option.querySelector('.lang-code').textContent;
            }
        }

        // Keyboard navigation for dropdown toggle
        langToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setDropdownOpen(false);
            } else if ((e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') && !langDropdown.classList.contains('open')) {
                e.preventDefault();
                setDropdownOpen(true);
                setTimeout(() => {
                    if (langOptions.length > 0) langOptions[0].focus();
                }, 50);
            } else if (e.key === 'ArrowDown' && langDropdown.classList.contains('open')) {
                e.preventDefault();
                if (langOptions.length > 0) langOptions[0].focus();
            }
        });

        // Initialize from localStorage or browser language
        const savedLang = localStorage.getItem('preferredLanguage');
        const browserLang = navigator.language.split('-')[0];
        const initialLang = savedLang || (translations[browserLang] ? browserLang : 'en');
        
        if (initialLang !== 'en') {
            updateLanguageUI(initialLang);
            changeLanguage(initialLang);
        }
    }

    function changeLanguage(lang) {
        document.documentElement.lang = lang; 
        const activeTranslations = {
            ...(translations.en || {}),
            ...(translations[lang] || {})
        };
        
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (activeTranslations[key] !== undefined) {
                if (el.tagName === 'TITLE') {
                    document.title = activeTranslations[key];
                } else if (el.tagName === 'META') {
                    el.setAttribute('content', activeTranslations[key]);
                } else if (el.hasAttribute('alt')) {
                    el.setAttribute('alt', activeTranslations[key]);
                } else if (el.hasAttribute('aria-label')) {
                    el.setAttribute('aria-label', activeTranslations[key]);
                } else {
                    // Immediate change for elements that might be read soon (like modal source)
                    el.innerHTML = activeTranslations[key];
                }
            }
        });

        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (activeTranslations[key] !== undefined) {
                el.setAttribute('placeholder', activeTranslations[key]);
            }
        });

        // If modal is open, update its content
        const modal = document.getElementById('reviewModal');
        if (modal && modal.classList.contains('active')) {
            // We need to know which review card was used. 
            // We can re-trigger openReviewModal if we store the button reference.
            if (window.currentReviewBtn) {
                openReviewModal(window.currentReviewBtn);
            }
        }

        computeAverageRating();
    }

    // Calculate average rating from review cards and update the summary display
    function computeAverageRating() {
        const starEls = document.querySelectorAll('.reviews-carousel .review-card .stars');
        let total = 0;
        let count = 0;

        starEls.forEach(el => {
            const text = (el.textContent || el.innerText || '').trim();
            const filled = (text.match(/★/g) || []).length;
            if (filled > 0) {
                total += filled;
                count += 1;
            }
        });

        if (count === 0) return;

        const avg = Math.round((total / count) * 10) / 10; // one decimal

        // Update numeric rating (strong inside .summary-rating)
        const ratingStrong = document.querySelector('.summary-rating strong') || document.querySelector('[data-i18n="rev_summary_rating"]');
        if (ratingStrong) ratingStrong.textContent = avg.toFixed(1).replace(/\.0$/, '.0');

        // Update stars display with SVGs supporting half-stars
        renderSummaryStars(avg);
    }

    function renderSummaryStars(avg) {
        const container = document.querySelector('.summary-stars');
        if (!container) return;
        const clamped = Math.max(0, Math.min(5, avg));
        let html = '';
        const path = 'M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896 4.664 23.165l1.402-8.168L0.132 9.21l8.2-1.192z';
        for (let i = 1; i <= 5; i++) {
            const fill = Math.max(0, Math.min(100, Math.round((clamped - (i - 1)) * 100)));
            const gid = 'revStarGrad' + Date.now() + '_' + i;
            html += `
                <svg class="summary-star" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                        <linearGradient id="${gid}" x1="0%" x2="100%" y1="0%" y2="0%">
                            <stop offset="${fill}%" stop-color="#F59E0B"></stop>
                            <stop offset="${fill}%" stop-color="#E5E7EB"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#${gid})" d="${path}" />
                </svg>`;
        }
        container.innerHTML = html;
    }

    // Slideshow Logic
    const slideContainer = document.querySelector('.hero-slideshow');
    let slides = Array.from(document.querySelectorAll('.slide'));

    if (slideContainer && slides.length > 0) {
        // Keep the slideshow visible even if one or more images fail to preload.
        // The section now falls back to the first slide instead of disappearing.
        slides = slides.filter(slide => slide.parentElement === slideContainer);

        if (slides.length > 0) {
            const overlay = slideContainer.querySelector('.hero-overlay');

            // Move the overlay to the end so it stays above the slides.
            if (overlay) slideContainer.appendChild(overlay);

            // Give the first slide an immediate visible state.
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === 0);
            });

            let currentSlide = 0;
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 3800);
        }
    }


    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.textContent = 'Sending...';
        });
    }

    // --- Review Form Submission ---
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            const btn = reviewForm.querySelector('button[type="submit"]');
            btn.textContent = 'Submitting...';
        });
    }

    // --- Dynamic Footer Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Reviews Carousel ---
    const reviewsSection = document.getElementById('reviews');
    const reviewsCarousel = document.getElementById('reviewsCarousel');
    const revPrevBtn = document.getElementById('revPrevBtn');
    const revNextBtn = document.getElementById('revNextBtn');

    if (reviewsCarousel && revPrevBtn && revNextBtn && reviewsSection) {
        const reviewCards = Array.from(reviewsCarousel.querySelectorAll('.review-card'));

        const getScrollAmount = () => {
            const firstCard = reviewsCarousel.querySelector('.review-card');
            return firstCard ? firstCard.offsetWidth + 20 : 380; // card width + 20px gap
        };

        const goToNextReview = () => {
            if (Math.ceil(reviewsCarousel.scrollLeft + reviewsCarousel.clientWidth) >= reviewsCarousel.scrollWidth - 10) {
                reviewsCarousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                reviewsCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        };

        const goToPreviousReview = () => {
            if (reviewsCarousel.scrollLeft <= 10) {
                reviewsCarousel.scrollTo({ left: reviewsCarousel.scrollWidth, behavior: 'smooth' });
            } else {
                reviewsCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            }
        };

        revPrevBtn.addEventListener('click', () => {
            goToPreviousReview();
            stopAutoReviewRotation();
            startAutoReviewRotation();
        });

        revNextBtn.addEventListener('click', () => {
            goToNextReview();
            stopAutoReviewRotation();
            startAutoReviewRotation();
        });

        let autoReviewTimer = null;

        const startAutoReviewRotation = () => {
            if (autoReviewTimer || reviewCards.length <= 1) return;
            autoReviewTimer = window.setInterval(goToNextReview, 4500);
        };

        const stopAutoReviewRotation = () => {
            if (!autoReviewTimer) return;
            window.clearInterval(autoReviewTimer);
            autoReviewTimer = null;
        };

        reviewsCarousel.addEventListener('mouseenter', stopAutoReviewRotation);
        reviewsCarousel.addEventListener('mouseleave', startAutoReviewRotation);
        reviewsCarousel.addEventListener('focusin', stopAutoReviewRotation);
        reviewsCarousel.addEventListener('focusout', startAutoReviewRotation);

        startAutoReviewRotation();
    }

    // Initial compute of average rating on load
    computeAverageRating();

});

// --- Review Modal Logic ---
function openReviewModal(btn) {
    window.currentReviewBtn = btn; // Store reference for language changes
    const card = btn.closest('.review-card');
    const name = card.querySelector('.reviewer').textContent;
    const stars = card.querySelector('.stars').innerHTML;
    const course = card.querySelector('.review-course').textContent;
    const text = card.querySelector('.review-text').innerHTML;
    
    document.getElementById('modalReviewerName').textContent = name;
    document.getElementById('modalReviewerStars').innerHTML = stars;
    document.getElementById('modalReviewCourse').textContent = course;
    document.getElementById('modalReviewText').innerHTML = text;
    
    document.getElementById('reviewModal').classList.add('active');
}

function closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('reviewModal');
    if (modal && modal.classList.contains('active') && event.target === modal) {
        closeReviewModal();
    }
});
