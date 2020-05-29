import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import Rating from 'material-ui-rating'
import AuthService from '../../services/auth.service'



const BookDetails = (props) => {
    const { match: { params } } = props
    const bookId = params.id;
    const [book, setbook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [totaluserShelvesandReviews, setUserShelvesandReviews] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [userShelve, setUserShelve] = useState('');
    const [userReview, setUserReview] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [fuserId, setUserId] = useState("");
    const [authorFirstName, setAuthorFirstName] = useState("");
    const [authorSecondName, setAuthorSecondName] = useState("");
    const [catName, setCatName] = useState("");

    function getBook() {
        //setUserId(AuthService.getCurrentUser().id);
        const userId = AuthService.getCurrentUser().id;
        setUserId(userId)
        axios.get(`http://localhost:8000/book/${bookId}`)
            .then((response) => {
                console.log(response.data);
                setbook(response.data);
                setReviews(response.data.userShelvesandReveiews);
                console.log(response.data.userShelvesandReveiews)
                const userItem = response.data.userShelvesandReveiews.filter((item) => {
                    if (item.userId === userId) { return true }
                    else { return false }
                })
                setUserShelvesandReviews(userItem[0]);
                setUserRating(userItem[0].rating)
                setUserReview(userItem[0].review)
                setUserShelve(userItem[0].shelve)
                setAuthorFirstName(response.data.authId.firstName)
                setAuthorSecondName(response.data.authId.secondName)
                setCatName(response.data.catId.categoryName)
            })
            .catch((err) => {
                console.log(err);
            });

    }
    useEffect(() => {
        getBook();
    }, []);

    useEffect(() => {
        console.log(userRating);
        axios.patch(`http://localhost:8000/book/userShelvesandReviews/${bookId}/${fuserId}`,
            { "review": userReview, "rating": userRating, "shelve": userShelve })
            .then((success) => {
                getBook()
            })
            .catch((failure) => {
                console.log(failure);
            })
    }, [userRating, userShelve, submitted])

    useEffect(() => {
        console.log(totaluserShelvesandReviews)
    }, [totaluserShelvesandReviews])

    const totalReviews = reviews.map((item) => {
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
                        <DropdownButton id="dropdown-item-button" title={totaluserShelvesandReviews ? totaluserShelvesandReviews.shelve : ""}>
                            <Dropdown.Item as="button" onClick={(event) => setUserShelve('Wants to read')}>Want to read</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={(event) => setUserShelve('Reading')}>Reading</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={(event) => setUserShelve('Read')}>Read</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div>
                        <Rating value={userRating} max={5} onChange={(value) => setUserRating(value)} />
                    </div>
                </div>
                <div className="bookinfo">
                    <h2>{book.name}</h2>
                    <h3>{authorFirstName}</h3><h3>{authorSecondName}</h3>
                    <h3>{catName}</h3>
                    <div>
                        <Rating value={book.avgRating} max={5} readOnly={true} />
                        <h6>{book.totalRatings}</h6>
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
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(!submitted) }} >
                    <input type="text" onChange={(e) => { setUserReview(e.target.value); console.log(userReview) }}></input>
                    <input type="submit" value="Add Comment"></input>
                </form>
            </div>
        </div>
    )


}

export default BookDetails