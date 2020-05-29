import React, { Component } from "react";
import { Link } from "react-router-dom";
// import UserService from "../../services/user.service";
import axios from 'axios';


export default class Catigories extends Component {

    state = {
        catigories: []
    }
    componentDidMount() {
        axios.get('http://localhost:8000/category')
            .then(res => {
                console.log(res.data);
                this.setState({
                    catigories: res.data
                })
            })
    }
    render() {
        const { catigories } = this.state
        const catigoryList = catigories.map(catigory => {
            return (
                <div key={catigory._id}>
                        <div className="cat">
                        <Link to={`/catigories/${catigory._id}`} className="list-group-item"><h5 className="card-title">{catigory.categoryName}</h5></Link>   
                        </div>
                </div>
            )
        })

        return (
            <div className="container">
                    <div className="catigories">
                    {catigoryList}
                    </div>
            </div>
        );
    }
}