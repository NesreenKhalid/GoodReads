import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import cat1 from '../../assets/cat1.jpg'
import Rating from 'material-ui-rating'

const BookDetails = () => {

    return (

        <div className="container">
            <div className="row">
                <div className="bookcard" >
                    <div><img className="cat1 card-img-top" src={cat1} alt="econimics" /></div>
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
                        Reviews
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default BookDetails