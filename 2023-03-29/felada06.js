//-- deklarációk ------------------------------
const szovegInput = document.querySelector("#szoveg");
const submitButton = document.querySelector("#submit");
const szoInput = document.querySelector("#szo");

//-- 
submitButton.addEventListener("click", kiir);

function kiir() {
    let szo = szoInput.value;
    let szoveg = szovegInput.value;
    if (szoveg.includes(szo)) {
        alert("Szerepel az adott szó a keresett szövegben!");
    }
}