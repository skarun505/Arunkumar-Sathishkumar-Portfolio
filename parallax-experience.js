/**
 * Parallax Scrolling Experience Section
 * Creates an interactive, one-at-a-time scroll experience with auto pop-up tooltips
 */

class ParallaxExperienceController {
    constructor() {
        this.cards = [];
        this.currentActiveIndex = -1;
        this.scrollProgress = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.cards = Array.from(document.querySelectorAll('.parallax-exp-card'));

        if (this.cards.length === 0) {
            console.log('No parallax experience cards found');
            return;
        }

        // Create scroll progress indicator
        this.createScrollProgress();

        // Setup scroll listener with throttling
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Setup toggle buttons
        this.setupToggleButtons();

        // Initial check
        this.handleScroll();
    }

    createScrollProgress() {
        this.scrollProgress = document.createElement('div');
        this.scrollProgress.className = 'scroll-progress';
        document.body.appendChild(this.scrollProgress);
    }

    handleScroll() {
        const viewportCenter = window.innerHeight / 2;
        const scrollY = window.scrollY;

        // Update scroll progress
        this.updateScrollProgress();

        // Check each card's position
        this.cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(cardCenter - viewportCenter);

            // Calculate if card should be active (within viewport center region)
            const activationThreshold = window.innerHeight * 0.3;

            if (distanceFromCenter < activationThreshold) {
                // Card is in the active zone
                this.setActiveCard(index);
            } else if (rect.bottom < viewportCenter) {
                // Card is exiting (scrolled past)
                card.classList.remove('active', 'entering');
                card.classList.add('exiting');
            } else if (rect.top > viewportCenter) {
                // Card is entering (coming up)
                card.classList.remove('active', 'exiting');
                card.classList.add('entering');
            }

            // Apply parallax effect based on scroll position
            this.applyParallaxEffect(card, rect);
        });
    }

    setActiveCard(index) {
        if (this.currentActiveIndex === index) return;

        // Remove active state from all cards
        this.cards.forEach(card => {
            card.classList.remove('active', 'entering', 'exiting');
        });

        // Set new active card
        const card = this.cards[index];
        card.classList.add('active');
        this.currentActiveIndex = index;

        // Auto-show tooltip after a short delay
        setTimeout(() => {
            if (card.classList.contains('active') && !card.classList.contains('content-expanded')) {
                // Tooltip is shown via CSS ::after pseudo-element
                this.pulseToggleButton(card);
            }
        }, 500);
    }

    pulseToggleButton(card) {
        const toggleBtn = card.querySelector('.parallax-exp-toggle');
        if (toggleBtn && !toggleBtn.classList.contains('active')) {
            // Add a temporary pulse animation class
            toggleBtn.style.animation = 'pulseButton 1s ease-in-out 3';
        }
    }

    applyParallaxEffect(card, rect) {
        // Calculate parallax offset based on scroll position
        const viewportMiddle = window.innerHeight / 2;
        const cardMiddle = rect.top + rect.height / 2;
        const offset = (cardMiddle - viewportMiddle) / 20;

        // Apply subtle transform for depth effect
        if (!card.classList.contains('active')) {
            const scale = Math.max(0.85, 1 - Math.abs(offset) / 500);
            card.style.transform = `translateY(${offset}px) scale(${scale})`;
        }
    }

    setupToggleButtons() {
        this.cards.forEach(card => {
            const toggleBtn = card.querySelector('.parallax-exp-toggle');
            const content = card.querySelector('.parallax-exp-content');

            if (toggleBtn && content) {
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleContent(card, toggleBtn, content);
                });
            }
        });
    }

    toggleContent(card, button, content) {
        const isActive = content.classList.contains('active');

        if (!isActive) {
            // Expand content
            content.classList.add('active');
            button.classList.add('active');
            card.classList.add('content-expanded');

            // Smooth scroll to ensure card is visible
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            // Collapse content
            content.classList.remove('active');
            button.classList.remove('active');
            card.classList.remove('content-expanded');
        }
    }

    updateScrollProgress() {
        const experienceSection = document.querySelector('.parallax-experience-section');
        if (!experienceSection) return;

        const sectionTop = experienceSection.offsetTop;
        const sectionHeight = experienceSection.offsetHeight;
        const scrolled = window.scrollY - sectionTop;
        const progress = Math.max(0, Math.min(100, (scrolled / sectionHeight) * 100));

        if (this.scrollProgress) {
            this.scrollProgress.style.width = `${progress}%`;
        }
    }
}

// Add pulse animation for toggle button
const style = document.createElement('style');
style.textContent = `
    @keyframes pulseButton {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(style);

// Initialize the controller
const parallaxController = new ParallaxExperienceController();

// Export for external use if needed
window.ParallaxExperienceController = ParallaxExperienceController;
