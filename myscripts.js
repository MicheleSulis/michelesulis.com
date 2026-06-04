var rotatingTextElement;
var rotatingText = new Array();
var ctr = 0;

function initRotateText() {
    rotatingTextElement = document.getElementById("greeting");
    if (!rotatingTextElement) return; // Prevent errors on pages without this element
    
    rotatingText[0] = "Michele.";
    rotatingText[1] = "an electronic engineer.";
    rotatingText[2] = "a calisthenic athlete.";
    rotatingText[3] = "in love with science.";
    rotatingText[4] = "a runner.";
    rotatingText[5] = "curious.";
    rotatingText[6] = "reliable.";
    rotatingText[7] = "a pizza chef.";
    rotatingText[8] = "listening hip hop.";
    rotatingText[9] = "traveling.";
    rotatingText[10] = "for DIY.";
    setInterval(rotateText, 1500);
}

function rotateText() {
    ctr++;
    if (ctr >= rotatingText.length) {
        ctr = 0;
    }
    rotatingTextElement.innerHTML = rotatingText[ctr];
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}

function checkThemePreference() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }
}

function updateAge() {
    const birthDate = new Date("2000-01-14");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const ageElement = document.getElementById("age");
    if (ageElement) {
        ageElement.textContent = age;
    }
}

function loadAsciiArt() {
    const container = document.getElementById("ascii-art-container");
    if (!container) return;

    if (typeof asciiArtContent !== 'undefined') {
        container.innerHTML = asciiArtContent;
        
        // Centra l'ASCII art su mobile se va in overflow
        setTimeout(() => {
            if (container.scrollWidth > container.clientWidth) {
                container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
            }
        }, 100);
    } else {
        console.error("asciiArtContent is not defined. Make sure ascii_art.js is loaded.");
    }
}

var oldOnLoad = window.onload;
window.onload = function () {
    if (oldOnLoad) oldOnLoad();
    initRotateText();
    checkThemePreference();
    updateAge();
    loadAsciiArt();
};

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-container ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });

        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    const aboutSection = document.getElementById('about');

    if (aboutSection) {
        const homeLink = document.querySelector('.nav-container ul li a[href="#"]');
        const aboutLink = document.querySelector('.nav-container ul li a[href="#about"]');

        const observerOptions = {
            threshold: 0.4
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (homeLink) homeLink.classList.remove('active');
                if (aboutLink) aboutLink.classList.add('active');
            } else {
                if (aboutLink) aboutLink.classList.remove('active');
                if (homeLink) homeLink.classList.add('active');
            }
        }, observerOptions);

        observer.observe(aboutSection);
    }

    const accordionBtns = document.querySelectorAll('.year-toggle-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const section = this.parentElement;
            const icon = this.querySelector('.toggle-icon');

            section.classList.toggle('active');

            if (section.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });

    //Then remove it
    const downloadLinks = document.querySelectorAll('.download-link');

    if (downloadLinks.length > 0) {
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-text">Not available yet, coming soon!</span>
            </div>
        `;
        document.body.appendChild(toast);

        downloadLinks.forEach(link => {
            if (link.getAttribute('href') === '#') {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000);
                });
            }
        });
    }

    // Fix for "Sticky hover" on SVG links after returning focus
    window.addEventListener('blur', () => {
        document.body.classList.add('no-hover');
    });
    window.addEventListener('focus', () => {
        setTimeout(() => {
            window.addEventListener('mousemove', () => {
                document.body.classList.remove('no-hover');
            }, { once: true });
        }, 100); // ~100ms è sufficiente
    });

    // Effetto tap ASCII art su mobile
    const asciiContent = document.querySelector('.ascii-art-content');
    if (asciiContent) {
        let touchTimeout;
        asciiContent.addEventListener('touchstart', () => {
            clearTimeout(touchTimeout);
            asciiContent.classList.add('tapped');
        }, { passive: true });

        const handleTouchEnd = () => {
            clearTimeout(touchTimeout);
            touchTimeout = setTimeout(() => {
                asciiContent.classList.remove('tapped');
            }, 1200); // rimane illuminata per 1.2s dopo il rilascio
        };

        asciiContent.addEventListener('touchend', handleTouchEnd, { passive: true });
        asciiContent.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }
});