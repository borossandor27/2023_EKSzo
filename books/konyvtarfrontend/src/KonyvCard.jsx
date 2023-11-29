import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
class KonyvCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }
    componentDidMount() {
        this.listBooks();
    }
    listBooks() {
        fetch("http://localhost:7500/api/books")
            .then(async response => {
                if (response.statusCode === 200) {
                    const data = await response.json();
                    this.setState({
                        books: data.data
                    });
                }
            });
    }

    render() {
        console.log(this.state);
        return (
            <div className="card col-sm-12 col-md-6 col-lg-4" >
                <div className="card-body">
                </div>
            </div>
        );
    }
}