import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import Rating from 'material-ui-rating'
import AuthService from '../../services/auth.service'



const BookDetails = (props) => {
    const { match: { params } } = props
    //const bookId = params.location.pathname.split('/')[2];
    const bookId = params.id;
    const [book, setbook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [totaluserShelvesandReviews, setUserShelvesandReviews] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [userShelve, setUserShelve] = useState('');
    const [userReview, setUserReview] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [fuserId, setUserId] = useState("");
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        //setUserId(AuthService.getCurrentUser().id);
        const userId = AuthService.getCurrentUser().id;
        setUserId(userId)
        axios.get(`http://localhost:8000/book/${bookId}`)
            .then((response) => {
                console.log(response.data);
                setbook(response.data);
                setReviews(response.data.userShelvesandReveiews);
                const userItem = response.data.userShelvesandReveiews.filter((item) => {
                    if (item._id === userId) { return true }
                    else { return false }
                })
                setUserShelvesandReviews(userItem[0]);
                console.log(userItem[0])
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function sendRelevantData() {
        if (userReview === '') { setUserReview(totaluserShelvesandReviews.review) };
        if (userRating === 0) { setUserRating(totaluserShelvesandReviews.rating) };
        if (userShelve === '') { setUserShelve(totaluserShelvesandReviews.shelve) }
    }
    useEffect(() => {
        sendRelevantData();
        console.log("useEffect entered")
        axios.patch(`http://localhost:8000/book/userShelvesandReviews/${bookId}/${fuserId}`,
            { "review": userReview, "rating": userRating , "shelve": userShelve })
            .then((success) => {
                console.log(success);
                const userId = AuthService.getCurrentUser().id;
                setUserId(userId)
                axios.get(`http://localhost:8000/book/${bookId}`)
                    .then((response) => {
                        console.log(response.data);
                        //console.log(response.data.userShelvesandReveiews);
                        setbook(response.data);
                        setReviews(response.data.userShelvesandReveiews);
                        const userItem = response.data.userShelvesandReveiews.filter((item) => {
                            console.log(item.userId)
                            console.log("jdknkjndkjnk",userId)
                            if (item.userId === userId) { return true }
                            else { return false }
                        })
                        setUserShelvesandReviews(userItem[0]);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((failure) => {
                console.log(failure);
            })
    }, [userRating, userShelve, submitted])

    useEffect(()=>{
        console.log(totaluserShelvesandReviews)
    },[totaluserShelvesandReviews])

    const totalReviews = reviews.map((item) => {
        //if (item.userId === fuserId) { setUserShelvesandReviews(item) }
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
                        <p> current {totaluserShelvesandReviews ? totaluserShelvesandReviews.shelve : ""}</p>
                        <DropdownButton id="dropdown-item-button" title={totaluserShelvesandReviews? totaluserShelvesandReviews.shelve : ""}>
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
                <form onSubmit={(e)=>{e.preventDefault(); setSubmitted(!submitted)}} >
                    <input type="text" onChange={(e) => { setUserReview(e.target.value); console.log(userReview) }}></input>
                    <input type="submit" value="Add Comment"></input>
                </form>
            </div>
        </div>
    )


}

export default BookDetails