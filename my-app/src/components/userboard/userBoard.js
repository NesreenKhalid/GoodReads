import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserTable from '../userShelves/userShelvesTable'
import ReadTable from '../userShelves/readShilve'
import ReadingTable from '../userShelves/readingShilve'
import wantTOReadTable from '../userShelves/wantToRead'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class BoardUser extends Component {

    render() {
        return (
            <Router>

                <div className="container">

                    <div className="row">
                        <div className="col-lg-3">
                            <h1 className="my-4">GoodReads</h1>
                            <div className="list-group">
                                <Link to="all" className="list-group-item">All</Link>
                                <Link to="#" className="list-group-item">Read</Link>
                                <Link to="#" className="list-group-item">Currently Reading</Link>
                                <Link to="#" className="list-group-item">Want To Read</Link>
                            </div>

                            <div class="col-lg-9">
                                <div className="container mt-3">
                                    <Switch>
                                        <Route path="/all" component={UserTable} />
                                        <Route path="/read" component={ReadTable} />
                                        <Route path="/reading" component={ReadingTable} />
                                        <Route path="/wantToRead" component={wantTOReadTable} />
                                    </Switch>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}