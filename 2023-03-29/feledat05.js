const szovegInput = document.querySelector("#szoveg");
const submitButton = document.querySelector("#submit");
const valaszbekezdes = document.querySelector("#vissza");

submitButton.addEventListener("click", kiir);

function kiir() {
    let szoveg = szovegInput.value;
    let vissza = [];
    for (let index = szoveg.length - 1; index >= 0; index--) {
        const element = szoveg[index];
        vissza.push(element);
    };
    valaszbekezdes.innerHTML = szoveg + " visszafelé írva: " + vissza.join("");
}