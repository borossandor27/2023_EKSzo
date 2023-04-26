const submitButton = document.querySelector("#submit");
const nameInput = document.querySelector("#name");
const passwordInput = document.querySelector("#password")

submitButton.addEventListener("click", belepes);

function belepes() {
    let adatok = `{"név": "${nameInput.value}", "jelszo": ${passwordInput.value}}`;

    console.log(JSON.parse(adatok));
}