import React, { Component } from "react";
import { Link } from "react-router-dom";
import Author from "../author/Auther";
import Catigories from "../catigories/catigoris";
import Book from "../book/Book";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class Home extends Component {

    render() {
        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h1 className="my-4">GoodReads</h1>
                        <div className="list-group">
                            <Link to="/books" className="list-group-item">Books</Link>
                            <Link to="/authors" className="list-group-item">Authors</Link>
                            <Link to="/catigories" className="list-group-item">Categories</Link>

                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="container">
                            <div className="row">
                                <header className="jumbotron">
                                    <div>
                                        <Book />

                                    </div>
                                </header>
                                <header className="jumbotron">
                                    <div>
                                        <Author />
                                    </div>
                                </header>
                                <header className="jumbotron">
                                    <div>

                                        <Catigories />
                                    </div>
                                </header>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        );
    }
}