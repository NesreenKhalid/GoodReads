import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class Author extends Component {
    state = {
        authors: []
    }
    componentDidMount() {
        axios.get('http://localhost:8000/authors')
            .then(res => {
                console.log(res.data);
                this.setState({
                    authors: res.data
                })
            })
    }
    render() {
        const { authors } = this.state
        const authorsList = authors.map(author => {
            return (
                <div key={author._id}>
                    <div className="card">
                        <img className="cat1 card-img-top" src={author.authorImage} alt="econimics" />
                        {/*<h5 className="card-title">{book.name}</h5>*/}
                        <Link to={`/authorDetails/${author._id}`} className="card-link">{author.firstName} {author.lastName}</Link>
                        <p>{author.dateOfBirth}</p>
                    </div>
                </div>
            )
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="catigories">
                        {authorsList}
                    </div>
                </div>

            </div>
        );
    }
}

export default Author