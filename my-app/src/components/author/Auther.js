import React, { Component } from 'react'


class Author extends Component {
    state = {
        name: "john",
        email: "john46@yahoo.com",
        blog: "john.com",
        phone: "12364856646"
    }
    render() {
        return (

            <div>
                <p>Author name:{this.state.name}</p>
                <p>Email:{this.state.email}</p>
                <p>Blog:{this.state.blog}</p>
                <p>Phone number:{this.state.phone}</p>
            </div>

        )
    }
}

export default Author