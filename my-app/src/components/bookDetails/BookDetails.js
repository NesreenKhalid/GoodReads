import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import Rating from 'material-ui-rating'



const BookDetails = (params) => {
    console.log(params);
    const [book, setbook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [userShelvesandReviews , setUserShelvesandReviews] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [userShelve, setUserShelve] = useState('');
    const [userReview, setUserReview] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8000/book/5ecdd5c6a34dc4121d74dba1')
            .then((response) => {
                setbook(response.data);
                setReviews(response.data.userShelvesandReveiews);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const Reviews = reviews.map((item) => {
        if(item.userId === '5eb47f225c7f51c08325e425'){ setUserShelvesandReviews(item)}
        return (
            <div className="card-body" key={item._id}>
                <h5 className="card-title">{item.userId}</h5>
                <p className="card-text">{item.review}</p>
            </div>
        )
    })
    return (
        <div className="container">
            <div className="row">
                <div className="bookcard" >
                    <div><img className="cat1 card-img-top" src={`http://localhost:8000/${book.image}`} alt="econimics" /></div>
                    <div className="dropdown">
                        <DropdownButton id="dropdown-item-button" title={userShelve}>
                            <Dropdown.Item as="button" onClick={(event) => setUserShelve('Wants to read')}>Want to read</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={(event) => setUserShelve('Reading')}>Reading</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={(event) => setUserShelve('Read')}>read</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div>
                        <Rating value={userRating} max={5} onChange={(value) => setUserRating(value)} />
                    </div>
                </div>
                <div className="bookinfo">
                    <h2>{book.name}</h2>
                    <h3>{book.authId}</h3>
                    <h3>{book.catId}</h3>
                    <div>
                        <Rating value={book.avgRating} max={5} readOnly={true} />
                        <p>{book.totalRatings}</p>
                    </div>
                </div>
            </div>
            <div className="book-reviews">
                <div className="cardreview">
                    <div className="card-header">
                        Reviews
                    </div>
                    {Reviews}
                </div>
                <form>
                    <input type="text" onChange={(value) => { setUserReview(value); console.log(userReview) }}></input>
                    <input type="submit" value="Add Comment"></input>
                </form>
            </div>
        </div>
    )


}

export default BookDetails