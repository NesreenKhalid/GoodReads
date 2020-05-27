import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserTable from '../userShelves/userShelvesTable'
import ReadTable from '../userShelves/readShilve'
import ReadingTable from '../userShelves/readingShilve'
import wantTOReadTable from '../userShelves/wantToRead'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class BoardUser extends Component {

    render() {
        return (
            <Router>
                <div class="container">

                    <div class="row">
                        <div class="col-lg-3">
                            <h1 class="my-4">GoodReads</h1>
                            <div class="list-group">
                                <Link to="/all" class="list-group-item">All</Link>
                                <Link to="/read" class="list-group-item">Read</Link>
                                <Link to="/reading" class="list-group-item">Currently Reading</Link>
                                <Link to="/wantToRead" class="list-group-item">Want To Read</Link>
                            </div>
                        </div>

                        <div class="col-lg-9">
                            <div className="container mt-3">
                                <Switch>
                                    <Route path="/all" component={UserTable} />
                                    <Route path="/read" component={ReadTable}/>
                                    <Route path="/reading" component={ReadingTable}/>
                                    <Route path="/wantToRead" component={wantTOReadTable}/>
                                </Switch>
                            </div>

                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}