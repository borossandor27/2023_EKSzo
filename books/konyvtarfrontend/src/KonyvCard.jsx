import React {Component} from "react";
class KonyvCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Könyv címe</h5>
        </div>
        <div className="card-body">
          <p className="card-text">Könyv szerzője</p>
          <p className="card-text">Könyv kiadója</p>
          <p className="card-text">Könyv ára</p>
          <p className="card-text">Könyv műfaja</p>
          <p className="card-text">Könyv ISBN száma</p>
          <p className="card-text">Könyv kiadásának éve</p>
        </div>
      </div>
    );
  }
}