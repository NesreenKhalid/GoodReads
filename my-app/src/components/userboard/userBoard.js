import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";

export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (


            <div class="container">

                <div class="row">
                    <div class="col-lg-3">
                        <h1 class="my-4">GoodReads</h1>
                        <div class="list-group">
                            <Link to="#" class="list-group-item">All</Link>
                            <Link to="#" class="list-group-item">Read</Link>
                            <Link to="#" class="list-group-item">Currently Reading</Link>
                            <Link to="#" class="list-group-item">Want To Read</Link>
                        </div>
                    </div>

                    <div class="col-lg-9">
                        <header className="jumbotron">
                            <h3>{this.state.content}</h3>
                        </header>
                        <table class="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Cover</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">AVG Rate</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Shelves</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                     
                                    <td>Image</td>
                                    <td>Mark</td>
                                    <td>Oliver twist</td>
                                    <td>***</td>
                                    <td>****</td>
                                    <td>reading</td>
                                    
                                </tr>
                                <tr>
                                    
                                    <td>Image</td>
                                    <td>Mark</td>
                                    <td>Oliver twist</td>
                                    <td>***</td>
                                    <td>****</td>
                                    <td>reading</td>
                                </tr>
                                <tr>
                                     
                                    <td>Image</td>
                                    <td>Mark</td>
                                    <td>Oliver twist</td>
                                    <td>***</td>
                                    <td>****</td>
                                    <td>reading</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}