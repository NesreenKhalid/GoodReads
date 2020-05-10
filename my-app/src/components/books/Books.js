import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cat1 from '../../assets/cat1.jpg'

const Books = () => {

    const [title] = useState("clean code");
    const [author] = useState("john");

    return (
        <div className="container">
            <div className="row ">
                <div className="card" >
                    <img className="cat1 card-img-top" src={cat1} alt="econimics" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <div className="card-body">
                        <Link to="/bookDetails" className="card-link">{title}</Link>
                        <Link to="/authorDetails" className="card-link">{author}</Link>
                    </div>

                </div>
            </div>

        </div>
    )

}
export default Books