import React, { useState ,Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class Book extends Component{
    state = {
        books: []
    }
    componentDidMount() {
        axios.get('http://localhost:8000/book')
            .then(res => {
                console.log(res.data);
                this.setState({
                    books: res.data
                })
            })
    }
     
    render() {
        const { books } = this.state
        const booksList = books.map(book => {
            return (
                <div key={book._id}>
                        <div className="card">
                            <img className="cat1 card-img-top" src={book.image} alt="econimics"/>
                            {/*<h5 className="card-title">{book.name}</h5>*/}
                            <Link to="/bookDetails/:id" className="card-link">{book.name}</Link>
                        </div>
                </div>
            )
        })

        return (
            <div className="container">
                    <div className="catigories">
                    {booksList}
                    </div>
            </div>
        );
    }
    
}
