//import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Remove existing cards
    const booksContainer = document.getElementById("books");
    while (booksContainer.firstChild) {
      booksContainer.removeChild(booksContainer.lastChild);
    }

    fetch("http://localhost:3000/api/books")
      .then((response) => response.json())
      .then((data) => {
        // Add new cards
        data.forEach((book) => {
          const card = document.createElement("div");
          card.className = "card m-1";
          card.style.maxWidth = "18rem";

          const img = document.createElement("img");
          img.src = `szerzok/${book.author}.jpg`;
          img.alt = book.author;
          img.className = "card-img-top w-100";
          card.appendChild(img);

          const cardBody = document.createElement("div");
          cardBody.className = "card-body";

          const title = document.createElement("h5");
          title.className = "card-title";
          title.textContent = book.id + ". " + book.title;
          cardBody.appendChild(title);

          const author = document.createElement("p");
          author.className = "card-text";
          author.textContent = `Szerző: ${book.author}`;
          author.className = "card-text";
          cardBody.appendChild(author);

          const publishYear = document.createElement("p");
          publishYear.className = "card-text";
          publishYear.textContent = `Kiadási év: ${book.publishYear}`;
          cardBody.appendChild(publishYear);

          const pageCount = document.createElement("p");
          pageCount.className = "card-text";
          pageCount.textContent = `Hossz: ${book.page_count} oldal`;
          cardBody.appendChild(pageCount);

          card.appendChild(cardBody);
          booksContainer.appendChild(card);
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1><img src="logo.svg" height="1em"/> Beregszászi Könyvtár</h1>
      <div className="container row" id="books">
        {books.map((book) => (
          <div className="card m-1" key={book.id} style={{ maxWidth: "18rem" }}>
            <img
              src={`szerzok/${book.author}.jpg`}
              alt={book.author}
              className="card-img-top w-100"
            />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">Szerző: {book.author}</p>
              <p className="card-text">Kiadási év: {book.publish_year}</p>
              <p className="card-text">Hossz: {book.page_count} oldal</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
