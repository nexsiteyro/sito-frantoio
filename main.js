/* =========================================================
   FRANTOIO OLEARIO COCCHIARALE - MAIN.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* --- 1. RIMOZIONE SICURA PRELOADER --- */
    const hidePreloader = () => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.classList.add("hide");
        }
    };

    // Nasconde il preloader quando la pagina carica o dopo massimo 1.5 secondi
    window.addEventListener("load", hidePreloader);
    setTimeout(hidePreloader, 1500);

    /* --- 2. NAVBAR SCROLL EFFECT --- */
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    /* --- 3. MENU MOBILE TOGGLE --- */
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");
            const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
            menuToggle.setAttribute("aria-expanded", !expanded);
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* --- 4. PLAYER VIDEO MANUALE STORIA --- */
    const videoContainer = document.getElementById("videoContainer");
    const video = document.getElementById("vecchioVideo");
    const playBtn = document.getElementById("playBtn");

    if (videoContainer && video && playBtn) {
        const toggleVideo = () => {
            if (video.paused) {
                video.play();
                videoContainer.classList.add("playing");
                video.controls = true;
            } else {
                video.pause();
                videoContainer.classList.remove("playing");
            }
        };

        playBtn.addEventListener("click", toggleVideo);
        video.addEventListener("click", toggleVideo);

        video.addEventListener("ended", () => {
            videoContainer.classList.remove("playing");
            video.controls = false;
            video.load();
        });
    }

    /* --- 5. ACCORDION FAQ --- */
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(button => {
        button.addEventListener("click", () => {
            const faqItem = button.parentElement;

            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove("active");
                }
            });

            faqItem.classList.toggle("active");
        });
    });

    /* --- 6. ANIMAZIONI DI SCORRIMENTO (REVEAL) --- */
    const reveals = document.querySelectorAll(".reveal");
    const checkReveals = () => {
        const triggerBottom = window.innerHeight * 0.85;
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", checkReveals);
    checkReveals(); // Controllo iniziale al caricamento
});
