import React, { Component } from 'react';
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
<<<<<<< HEAD
    }, []);
=======
    }

    componentDidUpdate() {
    }
>>>>>>> 0cdd260c18012b3dc006682fb7707233222dd369

    getBook(item) {
        this.setState({ UserShelvesandReviews: item });
    }
<<<<<<< HEAD
    useEffect(() => {
        sendRelevantData();
        console.log("useEffect entered")
        axios.patch(`http://localhost:8000/book/userShelvesandReviews/${bookId}/${fuserId}`,
            { "review": userReview, "rating": userRating , "shelve": userShelve })
=======
   /* setUserShelves(shelve) {
        this.setState({ userShelve: shelve })
        const userId = AuthService.getCurrentUser();
        const { match: { params } } = this.props;
        console.log(userId.id,params.id);
        if (this.state.userReview === '') { this.setState({ userReview: this.state.totaluserShelvesandReviews.review }) };
        if (this.state.userRating === 0) { this.setState({ userRating: this.state.totaluserShelvesandReviews.rating }) };
        if (this.state.userShelve === '') { this.setState({ userShelve: this.state.totaluserShelvesandReviews.shelve }) };
        axios.patch(`http://localhost:8000/book/userShelvesandReviews/${params.id}/${userId.id}`,
            { "shelve": this.state.userShelve })
>>>>>>> 0cdd260c18012b3dc006682fb7707233222dd369
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
<<<<<<< HEAD
    }, [userRating, userShelve, submitted])

    useEffect(()=>{
        console.log(totaluserShelvesandReviews)
    },[totaluserShelvesandReviews])

    const totalReviews = reviews.map((item) => {
        //if (item.userId === fuserId) { setUserShelvesandReviews(item) }
=======
    }
    setUserRating(rate) {
        this.setState({ userRating: rate })
        const userId = AuthService.getCurrentUser();
        const { match: { params } } = this.props;
        if (this.state.userReview === '') { this.setState({ userReview: this.state.totaluserShelvesandReviews.review }) };
        if (this.state.userRating === 0) { this.setState({ userRating: this.state.totaluserShelvesandReviews.rating }) };
        if (this.state.userShelve === '') { this.setState({ userShelve: this.state.totaluserShelvesandReviews.shelve }) };
        axios.patch(`http://localhost:8000/book/userShelvesandReviews/${params.id}/${userId.id}`,
            { "rating": this.state.userRating })
            .then((success) => {
                console.log(success);
            })
            .catch((failure) => {
                console.log(failure);
            })
    }
    setUserReview(value) {
        this.setState({ userReview: value })
    }
    setFormSubmitted() {
        this.setState({ submitted: !this.state.submitted })
        const userId = AuthService.getCurrentUser();
        const { match: { params } } = this.props;
        if (this.state.userReview === '') { this.setState({ userReview: this.state.totaluserShelvesandReviews.review }) };
        if (this.state.userRating === 0) { this.setState({ userRating: this.state.totaluserShelvesandReviews.rating }) };
        if (this.state.userShelve === '') { this.setState({ userShelve: this.state.totaluserShelvesandReviews.shelve }) };
        axios.patch(`http://localhost:8000/book/userShelvesandReviews/${params.id}/${userId.id}`,
            { "review": this.state.userReview })
            .then((success) => {
                console.log(success);
            })
            .catch((failure) => {
                console.log(failure);
            })
    }*/


    render() {
        const totalReviews = this.state.reviews.map((item) => {
            const userId = AuthService.getCurrentUser();
            if (item.userId === userId.id) { this.getBook(item) }
            return (
                <div className="card-body" key={item._id}>
                    <h5 className="card-title">{item.userId}</h5>
                    <p className="card-text">{item.review}</p>
                </div>
            )
        })
>>>>>>> 0cdd260c18012b3dc006682fb7707233222dd369
        return (

            <div className="container">
                <div className="row">
                    <div className="bookcard" >
                        <div><img className="cat1 card-img-top" src={`http://localhost:8000/${this.state.book.image}`} alt="econimics" /></div>
                        <div className="dropdown">
                            <DropdownButton id="dropdown-item-button" title={this.state.totaluserShelvesandReviews.shelve}>
                                <Dropdown.Item as="button" 
                                //onClick={(event) => this.setUserShelves('Want to read')}
                                >Want to read</Dropdown.Item>
                                <Dropdown.Item as="button" 
                                //onClick={(event) => this.setUserShelves('Reading')}
                                >Reading</Dropdown.Item>
                                <Dropdown.Item as="button" 
                                //onClick={(event) => this.setUserShelves('Read')}
                                >read</Dropdown.Item>
                            </DropdownButton>
                        </div>

<<<<<<< HEAD

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
=======
                        <div>
                            <Rating value={this.state.userRating} max={5} 
                            //onChange={(value) => this.setUserRating(value)} 
>>>>>>> 0cdd260c18012b3dc006682fb7707233222dd369

                            />
                        </div>
                    </div>
                    <div className="bookinfo">
                        <h2>{this.state.book.name}</h2>
                        <h3>{this.state.bookauthId}</h3>
                        <h3>{this.state.book.catId}</h3>
                        <div>
                            <Rating value={this.state.book.avgRating} max={5} readOnly={true} />
                            <p>{this.state.book.totalRatings}</p>
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
                    <form 
                    //onSubmit={() => { this.setFormSubmitted() }}
                    >
                        <input type="text" 
                        //onChange={(value) => { this.setUserReview(value); console.log(this.state.userReview) }}

                        ></input>
                        <input type="submit" value="Add Comment"></input>
                    </form>
                </div>
<<<<<<< HEAD
                <form onSubmit={(e)=>{e.preventDefault(); setSubmitted(!submitted)}} >
                    <input type="text" onChange={(e) => { setUserReview(e.target.value); console.log(userReview) }}></input>
                    <input type="submit" value="Add Comment"></input>
                </form>
=======
>>>>>>> 0cdd260c18012b3dc006682fb7707233222dd369
            </div>
        )
    }

}