import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import Rating from 'material-ui-rating'
import AuthService from '../../services/auth.service'



const BookDetails = (params) => {
    const bookId = params.location.pathname.split('/')[2];
    const userId = AuthService.getCurrentUser();
    const finalUserId = userId.id;
    const [book, setbook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [totaluserShelvesandReviews, setUserShelvesandReviews] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [userShelve, setUserShelve] = useState('');
    const [userReview, setUserReview] = useState('');
    const [submitted, setSubmitted] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:8000/book/${bookId}`)
            .then((response) => {
                setbook(response.data);
                setReviews(response.data.userShelvesandReveiews);
            })
            .catch((err) => {
                console.log(err);
            });
    },[]);

    function sendRelevantData() {
        if (userReview === '') { setUserReview(totaluserShelvesandReviews.review) };
        if (userRating === 0) { setUserRating(totaluserShelvesandReviews.rating) };
        if (userShelve === '') { setUserShelve(totaluserShelvesandReviews.shelve) }
    }
    useEffect(() => {
        sendRelevantData();
        axios.patch(`http://localhost:8000/book/userShelvesandReviews/${bookId}/${userId.id}`,
            { "review": userReview, "rating": userRating, "shelve": userShelve })
            .then((success) => {
                console.log(success);
            })
            .catch((failure) => {
                console.log(failure);
            })
    }, [userRating, userShelve, submitted])



    const totalReviews = reviews.map((item) => {
        if (item.userId == finalUserId) { setUserShelvesandReviews(item) }
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
                    {totalReviews}
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