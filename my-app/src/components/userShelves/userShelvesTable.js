import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

export default class UserTable extends Component {
    state = {
        tableRows: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/book/5ecec50e9df0ef3c8f6e1524/all').then(res => {
            console.log(res);
            this.setState({
                tableRows: res.data
            })
        })
    }
    render() {
        const { tableRows } = this.state
        const rowsList = tableRows.map(row => {
            return (
                <tr key={row._id}>
                    <td><img src={row.image}></img></td>
                    <td>{row.name}</td>
                    <td>{row.avgRating}</td>
                    <td>{row.totalRatings}</td>
                    <td>{row.userShelvesandReveiews.map(item =>{
                        if(item.userId === "5ecec50e9df0ef3c8f6e1524"){
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