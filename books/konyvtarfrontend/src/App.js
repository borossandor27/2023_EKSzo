import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Könyvtár</h1>
      <div className="container">
        {books.map(book => (
          <div className="card" key={book.id}>
            <img src={`images/${book.author}.jpg`} alt={book.author} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">Szerző: {book.author}</p>
              <p className="card-text">Kiadási év: {book.releaseYear}</p>
              <p className="card-text">Hossz: {book.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
