const flipCard = document.querySelector('.flip-card');
const frontText = document.getElementById('text1');
const backText = document.getElementById('text2');
const texts = [{ front: "Welke kleur is insectenbloed?", back: "Lichtgeel." },{ front: "Hoe is het bloed van insecten lichtgeel?", back: "Er zit geen hemoglobine in." },{ front: "Hoe lang zijn de darmen van een potvis?" , back: "600M." },{ front: "Waarom heeft de hengelvis een lamp?", back: "Om prooien te lokken." },{ front: 'Welke tanden ontbreken bij een planteneter?', back: 'Hoektanden en snijtanden.' },{ front: 'Wat doet de kat met haar hoektanden?', back: 'De prooi doden en verschuren.' },{ front: 'Waardoor is een kat slanker dan een koe?', back: 'Doordat een kat een korter verteringstelsel heeft dan een koe.' },{ front: 'Welke 4 voedingstoffen maakt een plant van glucose?', back: 'Zetmeel, eiwitten, vetten en vitaminen.' },{ front: 'Is een koe een planteneter, diereneter of alleseter?', back: 'Planteneter.' },{ front: 'Waar zitten de ademhalisngsorganen van een wesp?', back: 'In zijn hele lichaam.' },{ front: 'Wanneer is je lichaamstemperatuur het hoogst?', back: 'In de middag.' },{ front: 'Wanneer is je lichaamstemperatuur het laagst?', back: 'In de nacht.' }];

let currentIndex = -1;
let orientation = "front";

press()

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function button4() {
    window.location.href = "index.html";
}

function button5() {
    window.location.href = "quiz.html";
}

function press() {
    currentIndex = (currentIndex + 1) % texts.length;
    currentIndex = clamp(currentIndex, 0, texts.length);
    if (orientation == "front") {
        frontText.textContent = texts[currentIndex].front;
        backText.textContent = texts[currentIndex].back;
    } else {
        frontText.textContent = texts[currentIndex].back;
        backText.textContent = texts[currentIndex].front;
    }
}
function terug() {
    currentIndex = (currentIndex - 1) % texts.length;
    currentIndex = clamp(currentIndex, 0, texts.length);
    if (orientation == "front") {
        frontText.textContent = texts[currentIndex].front;
        backText.textContent = texts[currentIndex].back;
    } else {
        frontText.textContent = texts[currentIndex].back;
        backText.textContent = texts[currentIndex].front;
    }
}

function button1() {
    window.location.href = "flashcards.html";
}

flipCard.addEventListener('click', function() {
    this.classList.toggle('clicked');
    if (orientation == "front") {
        orientation = "back";
    } else {
        orientation = "front";
    }
});
