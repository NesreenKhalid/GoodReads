import React from 'react';
import { NavLink  } from 'react-router-dom'

const BookDetails =()=> {

        return (
            <div>
                <h2>title:</h2>
                <NavLink exact to="/bookdetails/author">Author name </NavLink>
                <p>this is about the book you need!</p>
            </div>
        )
    
    
}

export default BookDetails