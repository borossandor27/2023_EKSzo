const divCards = document.querySelector('#cards');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPublishYear = document.querySelector('#publish_year');
const inputPageCount = document.querySelector('#page_count');
const buttonAdd = document.querySelector('#addKonyv');
window.onload = (event) => {
    adatokBetoltese();
};

buttonAdd.addEventListener("click", ()=>  {
    let konyv = getKonyvAdat();
    console.log(konyv);
    let url = 'http://localhost:5000/api/books'; 
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(konyv)
    })
    .then(response => response.json())
    .then(data => {console.log(data)});
})


function adatokBetoltese() {
    var url = 'http://localhost:5000/api/books';
    fetch(url).then(response => response.json()).then(data => {
        console.log(data);
        data.forEach(element => {
            cards.innerHTML += `<div class="border border-secondary card col-lg-4 col-md-6 col-sm-12">
            <img src="szerzok\\${element.author}.jpg" class="card-img-top" alt="szerzo kepe">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5> 
                    <h6 class="card-subtitle mb-2 text-muted">${element.author}</h6>
                    <p class="card-text">${element.publish_year}</p>
                    <p class="card-text">${element.page_count}</p>
                </div>
                </div>`;
        });
    });
}
function getKonyvAdat() {
    const konyv = {
        title: inputTitle.value,
        author: inputAuthor.value,
        publish_year: inputPublishYear.value,
        page_count: inputPageCount.value
    };
    return konyv;
}