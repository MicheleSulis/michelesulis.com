
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
    setInterval(rotateText, 350);
}

function rotateText() {
    ctr++;
    if (ctr >= rotatingText.length) {
        ctr = 0;
    }
    rotatingTextElement.innerHTML = rotatingText[ctr];
}

window.onload = initRotateText;
