
// GSAP Animation System - Mobile Optimized
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Detect mobile device
    const isMobile = window.innerWidth <= 768;
    const animationSpeed = isMobile ? 0.5 : 1; // Faster on mobile

    // 1. Navbar Glass Effect
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        } else {
            header.style.boxShadow = "none";
        }
    });

    // 2. Count-Up Animation for Stats (Faster)
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach(stat => {
        let target = parseInt(stat.getAttribute("data-target"));
        let suffix = "";

        // Handle suffixes like '20000' -> '20k' or '%'
        if (target >= 1000) {
            target = target / 1000;
            suffix = "K+";
        } else if (stat.nextElementSibling.innerText.includes("%") || stat.nextElementSibling.innerText.includes("ROAS")) {
            suffix = "%";
        } else {
            suffix = "+";
        }

        ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerHTML: target,
                    duration: 1 * animationSpeed, // Reduced from 2s
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function () {
                        stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + suffix;
                    }
                });
            }
        });
    });

    // 3. Generic Reveal on Scroll (Faster Fade Up)
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach(el => {
        if (isMobile) {
            // On mobile, just show immediately without animation
            el.style.opacity = 1;
            el.style.transform = 'none';
        } else {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5 * animationSpeed, // Reduced from 0.8s
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
    });

    // 4. Staggered List Items (Faster)
    if (!isMobile) {
        gsap.from(".service-box", {
            y: 30, // Reduced from 40
            opacity: 0,
            duration: 0.4 * animationSpeed, // Reduced from 0.6s
            stagger: 0.08, // Reduced from 0.1s
            scrollTrigger: {
                trigger: ".services-overview-grid",
                start: "top 85%"
            }
        });

        gsap.from(".project-card", {
            y: 40, // Reduced from 60
            opacity: 0,
            duration: 0.5 * animationSpeed, // Reduced from 0.8s
            stagger: 0.12, // Reduced from 0.2s
            scrollTrigger: {
                trigger: ".projects-grid",
                start: "top 80%"
            }
        });
    } else {
        // On mobile, show cards immediately
        document.querySelectorAll(".service-box, .project-card").forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'none';
        });
    }

    // 5. Scroll Progress Bar
    window.onscroll = function () {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        let bar = document.getElementById("scrollProgress");
        if (bar) bar.style.width = scrolled + "%";
    };

    console.log(`✅ Animations initialized (${isMobile ? 'Mobile Mode - Reduced Animations' : 'Desktop Mode'})`);
});
