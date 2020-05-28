import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
export default class ReadingTable extends Component {
    state = {
        readingTableRow: [],
        currentUser: AuthService.getCurrentUser()
    }

    componentDidMount() {
       const currentUser= AuthService.getCurrentUser()
         
        const currentUserID=currentUser.id
        axios.get(`http://localhost:8000/book/${currentUserID}/Reading`).then(res => {
            console.log(res);
            this.setState({
                readingTableRow: res.data
            })
        })
    }
    render() {
        const {id}=this.state.currentUser
        const { readingTableRow } = this.state
        const rowsList = readingTableRow.map(row => {
            return (
                <tr key={row._id}>
                    <td><img src={row.image}></img></td>
                    <td>{row.name}</td>
                    <td>{row.avgRating}</td>
                    <td>{row.totalRatings}</td>
                    <td>{row.userShelvesandReveiews.map(item =>{
                        if(item.userId === id){
                            console.log(item.shelve);
                            return item.shelve;
                        }
                    })}</td>
                </tr>
            )
        })
        return (
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Cover</th>
                        <th scope="col">Name</th>
                        <th scope="col">AVG Rate</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Shelves</th>
                    </tr>
                </thead>
                <tbody>
                    {rowsList}
                </tbody>
            </table>
        )
    }
}