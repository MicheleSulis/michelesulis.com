
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
    setInterval(rotateText, 2000);
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
    const icon = document.getElementById("moon-icon");

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

function checkThemePreference() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}

window.onload = initRotateText;

var oldOnLoad = window.onload;
window.onload = function() {
    if (oldOnLoad) oldOnLoad();
    checkThemePreference();
};