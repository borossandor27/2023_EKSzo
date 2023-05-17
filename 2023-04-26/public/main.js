const insertButton = document.getElementById('insert');
const updateButton = document.getElementById('update');
const readAllButton = document.getElementById('readall');
const deleteButton = document.getElementById('delete');
const allatokCards = document.getElementById('allatok');

const allatidInput = document.getElementById('allatid');
const nevInput = document.getElementById('nev');
const allatfajInput = document.getElementById('allatfaj');

function getAdatok() {
  const adatok = {
    allatid: allatidInput.value,
    nev: nevInput.value,
    allatfaj: allatfajInput.value
  };
  return adatok;
}

insertButton.addEventListener('click', () => {
  const adatok = getAdatok();
  fetch('/allatok/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(adatok)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

updateButton.addEventListener('click', () => {
  const adatok = getAdatok();
  fetch(`/allatok/${adatok.allatid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(adatok)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

readAllButton.addEventListener("click", async function () {

  const response = await fetch("http://localhost:3000/allatAll");
  const jsonData = await response.json();
  allatokCards.innerHTML = "";
  for (let index = 0; index < jsonData.length; index++) {
    const element = jsonData[index];
    const allatCard = document.createElement("div");
    allatCard.classList.add("card");
    allatCard.classList.add("m-2");
    allatCard.innerHTML = `
                            <p class="card-header">${element.nev}</p>
                            <p class="card-body">${element.allatfaj}</p>
                          `;
    allatokCards.appendChild(allatCard);
  }

});

deleteButton.addEventListener('click', () => {
  const adatok = getAdatok();
  fetch(`/allatok/${adatok.allatid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

