import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import './nav.css'


class MyNav extends Component {

    render() {
        return (

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link class="navbar-brand" to="/">MyLibrary</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link class="nav-item nav-link " to="/dashboard">Dashboard </Link>
                        <Link class="nav-item nav-link" to="/about">About</Link>
                        <Link class="nav-item nav-link" to="/books">Store</Link>
                        <Link class="nav-item nav-link" to="/login">Login</Link>
                        <Link class="nav-item nav-link" to="/signup">Signup</Link>

                    </div>
                </div>
            </nav>
        );
    }
}

export default MyNav;