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

            <div className="container">

                <div className="row">
                    <div className="col-lg-3">
                        <h1 className="my-4">GoodReads</h1>
                        <div className="list-group">
                            <Link to="#" className="list-group-item">All</Link>
                            <Link to="#" className="list-group-item">Read</Link>
                            <Link to="#" className="list-group-item">Currently Reading</Link>
                            <Link to="#" className="list-group-item">Want To Read</Link>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <header className="jumbotron">
                            <h3>{this.state.content}</h3>
                        </header>
                    </div>
                </div>
            </div>


        );
    }
}