import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import cat1 from '../../assets/cat1.jpg'
import Rating from 'material-ui-rating'


class Author extends Component {
    state = {
        name: "john",
        email: "john46@yahoo.com",
        blog: "john.com",
        phone: "12364856646"
    }
    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="bookcard" >
                        <div><img className="cat1 card-img-top" src={cat1} alt="econimics" /></div>

                    </div>
                    <div className="bookinfo">
                        <h2>Book title</h2>
                        <h3>Author name</h3>
                        <h3>Catigory</h3>
                        <div>
                            <Rating value={3} max={5} readOnly="true" />
                        </div>
                    </div>
                </div>
                <div className="book-reviews">
                    <div className="cardreview">
                        <div className="card-header">
                            Author's Books
                    </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="bookcard" >
                                    <div><img className="book card-img-top" src={cat1} alt="econimics" /></div>
                                </div>
                                <div className="bookinfo col">
                                    <h2>Book title</h2>
                                    <h3>Author name</h3>
                                    <h3>Catigory</h3>
                                    <div>
                                        <Rating value={3} max={5} readOnly="true" />
                                    </div>
                                </div>
                                <div className="drop-rate" >
                                    <div className="dropdown">
                                        <DropdownButton id="dropdown-item-button" title="Choose your status">
                                            <Dropdown.Item as="button">Want to read</Dropdown.Item>
                                            <Dropdown.Item as="button">Reading</Dropdown.Item>
                                            <Dropdown.Item as="button">read</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                    <div>
                                        <Rating value={3} max={5} onChange={(value) => console.log(`Rated with value ${value}`)} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Author