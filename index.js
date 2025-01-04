let letters = {};

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


function chipClick(letter, state) {
    letters[letter] = state;
}