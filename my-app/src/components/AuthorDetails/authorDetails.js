import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import Rating from 'material-ui-rating'
import AuthService from '../../services/auth.service'
import { common } from '@material-ui/core/colors';



const AuthorDetails = (props) => {
    const { match: { params } } = props
    console.log(params.id)
    const authorId = params.id;
    const [author, setAuthor] = useState({});
    const [books, setBooks] = useState([]);
    const [userShelve, setUserShelve] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [bookId, setBookId] = useState("")
    const [fuserId, setUserId] = useState("");

    useEffect(() => {
        const userId = AuthService.getCurrentUser().id;
        setUserId(userId)
        axios.get(`http://localhost:8000/authors/${authorId}`)
            .then((response) => {
                console.log(response.data.dateOfBirth)
                setAuthor(response.data)
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/authors/books/${authorId}`)
            .then((response) => {
                setBooks(response.data)
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.patch(`http://localhost:8000/book/userShelvesandReviews/${bookId}/${fuserId}`,
            { "rating": userRating, "shelve": userShelve })
            .then((success) => {
                axios.get(`http://localhost:8000/authors/books/${authorId}`)
                    .then((response) => {
                        setBooks(response.data)
                    }).catch((err) => {
                        console.log(err);
                    })
            })
    }, [userRating, userShelve])


    const totalBooks = books.map((item) => {
        return (
            <div className="container">
                <div className="row">
                    <div className="bookcard" >
                        <div><img className="cat1 card-img-top" src={`http://localhost:8000/${item.image}`} alt="econimics" /></div>
                        <div className="dropdown">
                            <DropdownButton id="dropdown-item-button" title={userShelve}>
                                <Dropdown.Item as="button" onClick={(event) => { setBookId(item._id); setUserShelve('Wants to read') }}>Want to read</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={(event) => { setBookId(item._id); setUserShelve('Reading') }}>Reading</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={(event) => { setBookId(item._id); setUserShelve('Read') }}>Read</Dropdown.Item>
                            </DropdownButton>
                        </div>

                        <div>
                            <Rating value={userRating} max={5} onChange={(value) => { setBookId(item._id); setUserRating(value) }} />
                        </div>
                    </div>
                    <div className="bookinfo">
                        <h2>{item.name}</h2>
                        <div>
                            <Rating value={item.avgRating} max={5} readOnly={true} />
                            <h6>{item.totalRatings}</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    })



    return (
        <div className="container">
            <div className="row">
                <div className="bookcard" >
                    <div><img className="cat1 card-img-top" src={`http://localhost:8000/${author.authorImage}`} alt="econimics" /></div>
                </div>
                <div className="bookinfo">
                    <h2>{author.firstName}{author.lastName}</h2>
                    <h3>{author.dateOfBirth}</h3>
                </div>
            </div>
            <div className="book-reviews">
                <div className="cardreview">
                    <div className="card-header">
                        Author's  Boooks
                    </div>
                    {totalBooks}
                </div>
            </div>
        </div>
    )


}

export default AuthorDetails