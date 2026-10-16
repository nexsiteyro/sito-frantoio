/* ==========================================================
   FRANTOIO COCCHIARALE - MAIN.JS (GSAP & SCROLLTRIGGER)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* --- 1. RIMOZIONE SICURA PRELOADER --- */
    const preloader = document.querySelector(".preloader");
    
    function rimuoviPreloader() {
        if (!preloader || preloader.classList.contains("hide")) return;
        
        if (typeof gsap !== "undefined") {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    preloader.classList.add("hide");
                    preloader.style.display = "none";
                }
            });
        } else {
            preloader.classList.add("hide");
            preloader.style.display = "none";
        }
    }

    window.addEventListener("load", rimuoviPreloader);
    // Timeout di sicurezza garantito
    setTimeout(rimuoviPreloader, 600);

    /* --- 2. ANIMAZIONI AVANZATE CON GSAP --- */
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // Timeline di benvenuto Hero
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTl.from(".hero-label", { y: -20, opacity: 0, duration: 0.8, delay: 0.2 })
              .from(".hero h1", { y: 30, opacity: 0, duration: 0.9 }, "-=0.5")
              .from(".hero p", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
              .from(".hero-buttons .btn", { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.5")
              .from(".hero-bottom", { opacity: 0, duration: 0.8 }, "-=0.4");

        // Effetto Parallasse sullo sfondo copertina
        gsap.to(".hero-background", {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Entrata graduale per gli elementi Reveal allo scroll
        const revealElements = document.querySelectorAll(".reveal");

        revealElements.forEach((el) => {
            gsap.fromTo(el, 
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Parallasse sulle immagini e sul video delle molazze
        const mediaElements = document.querySelectorAll(".story-image img, .pietre-image video, .machine-img-box img");

        mediaElements.forEach((media) => {
            gsap.to(media, {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                    trigger: media.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Contatori animati per le cifre (1985, 40+, ecc.)
        const stats = document.querySelectorAll(".stat .counter");

        stats.forEach((stat) => {
            const originalText = stat.innerText.trim();
            const numericValue = parseInt(originalText.replace(/\D/g, ''));

            if (!isNaN(numericValue) && numericValue > 0) {
                gsap.fromTo(stat, 
                    { innerText: 0 },
                    {
                        innerText: numericValue,
                        duration: 1.8,
                        ease: "power1.out",
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: stat,
                            start: "top 85%"
                        },
                        onUpdate: function () {
                            const currentVal = Math.ceil(this.targets()[0].innerText);
                            if (originalText.includes("+")) {
                                stat.innerText = currentVal + "+";
                            } else if (originalText.includes("<")) {
                                stat.innerText = "<" + currentVal + "°C";
                            } else {
                                stat.innerText = currentVal;
                            }
                        }
                    }
                );
            }
        });

    } else {
        // Fallback standard senza GSAP
        document.querySelectorAll(".reveal").forEach(el => el.classList.add("active"));
    }

    /* --- 3. MENU MOBILE --- */
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                document.body.classList.remove("menu-open");
            });
        });
    }

    /* --- 4. NAVBAR SCROLL --- */
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }, { passive: true });

    /* --- 5. SMOOTH SCROLL --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: "smooth"
                });
            }
        });
    });

});