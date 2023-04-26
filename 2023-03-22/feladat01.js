const szoveg = document.querySelector("#szoveg");
const eredmeny = document.querySelector("#hossz");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", kiir);

function kiir() {
    eredmeny.innerHTML = szoveg.value.length;
}