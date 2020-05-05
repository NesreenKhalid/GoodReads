import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Book =()=> {
      
    const [title]=useState("clean code");
    const [author]=useState("john");
    const [price]=useState(25);
    const [details]=useState("More");
        return (
            <div>
                <h2>book title :{title}</h2>
                <p>author name :{author}</p>
                <p>price: {price} $</p>
                <Link exact to="/bookdetails">{details}</Link>
            </div>
        )
    
}
export default Book