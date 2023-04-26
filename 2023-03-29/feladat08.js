const szovegInput = document.querySelector("#szoveg");
const submitButton = document.querySelector("#submit");
const titkosOutput = document.querySelector("#titkos");

submitButton.addEventListener("click", titkosit);

function titkosit() {
    let titkosSzoveg = "";
    let szoveg=szovegInput.value;
    for (let index = 0; index < szoveg.length; index++) {
        titkosSzoveg += szoveg[index].charCodeAt();
        
    }
    titkosOutput.innerHTML=titkosSzoveg;
}