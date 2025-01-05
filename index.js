let letters = {};
let words = [];
const outputElement = document.getElementById("output");

const wordcountInput = document.getElementById("wordcount-input")

fetch("words.json")
    .then(response => response.json())
    .then(data => {
        words = data;
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
    });

function updateCookie() {
    document.cookie = `letters=${JSON.stringify(letters)}; path=/; max-age=${60 * 60 * 24 * 7}; Samesite=Lax`;
}

if (document.cookie) {
    letters = JSON.parse(document.cookie.split('=')[1]);
} else {
    for (let ch = 'A'.charCodeAt(0); ch <= 'Z'.charCodeAt(0); ch++) {
        letters[String.fromCharCode(ch)] = false;
    }

    updateCookie();
}

const chips = document.getElementById("chips");
for (letter in letters) {
    const chipInput = document.createElement("input")
    chipInput.className = "chip-input";
    chipInput.id = `chip-${letter}`;
    chipInput.setAttribute("type", "checkbox");

    const chip = document.createElement("label");
    chip.className = "chip";
    chip.setAttribute("for", `chip-${letter}`);
    chip.innerText = letter;

    if (letters[letter]) {
        chipInput.checked = true
    }

    chipInput.addEventListener("change", () => chipClick(chip.innerText, chipInput.checked))
    chips.appendChild(chipInput);
    chips.appendChild(chip);
}

window.addEventListener("beforeunload", updateCookie)
window.addEventListener("keyup", e => {
    document.getElementById(`chip-${e.key}`).click();
})

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) { 
    
        // Generate random index 
        const j = Math.floor(Math.random() * (i + 1));
                      
        // Swap elements at indices i and j
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

function chipClick(letter, state) {
    letters[letter] = state;
}

function generate(isFiveLetter) {
    let filteredWords = words.filter(word => (isFiveLetter == (word.length == 5)) && [...word].every(char => letters[char]));
    shuffle(filteredWords);
    outputElement.innerText = filteredWords.slice(0, parseInt(wordcountInput.value, 10)).join(" ");
}