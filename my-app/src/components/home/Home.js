import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            //   <div className="container">
            //     <header className="jumbotron">
            //       <h3>{this.state.content}</h3>
            //     </header>
            //   </div>

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
                    </div>
                </div>
            </div>


        );
    }
}