import React, { useState ,Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class CategoryBooks extends Component{
    state = {
        books: []
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get(`http://localhost:8000/category/${params.id}`)
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
                            <h5 className="card-title">{book.name}</h5>
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
