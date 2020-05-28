import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import Rating from 'material-ui-rating'
import AuthService from '../../services/auth.service'



export default class UserTable extends Component {
    state = {
        book: {},
        reviews: [],
        totaluserShelvesandReviews: {},
        userRating: 0,
        userShelve: '',
        userReview: '',
        submitted: false
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params);
        axios.get(`http://localhost:8000/book/${params.id}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    book: response.data,
                    reviews: response.data.userShelvesandReveiews
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidUpdate() {
    }

    getBook(item) {
        this.setState({ UserShelvesandReviews: item });
    }
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
            .then((success) => {
                console.log(success);
            })
            .catch((failure) => {
                console.log(failure);
            })
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

                        <div>
                            <Rating value={this.state.userRating} max={5} 
                            //onChange={(value) => this.setUserRating(value)} 

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
            </div>
        )
    }

}