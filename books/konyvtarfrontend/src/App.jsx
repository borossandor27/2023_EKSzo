import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <nav className="navbar navbar-expand">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#konyvform">Új könyv</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.dszcberegszaszi.hu/">Debreceni SZC Beregszászi Pál Technikum és Kollégium</a>
              </li>
            </ul>
          </nav>
          <h1>Könyvtár</h1>
        </header>
        <main>
          <section className="row"></section>
          <section id='konyvform'></section>
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;