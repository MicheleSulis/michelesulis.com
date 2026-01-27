
var rotatingTextElement;
var rotatingText = new Array();
var ctr = 0;

function initRotateText() {
    rotatingTextElement = document.getElementById("greeting");
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

function fixStickyHover() {
    const socialLinks = document.querySelectorAll('.social-icons a, #theme-toggle');

    socialLinks.forEach(link => {
        link.addEventListener('click', function () {
            this.blur();
        });
    });
}

window.onload = initRotateText;

var oldOnLoad = window.onload;
window.onload = function () {
    if (oldOnLoad) oldOnLoad();
    checkThemePreference();
    updateAge();
};