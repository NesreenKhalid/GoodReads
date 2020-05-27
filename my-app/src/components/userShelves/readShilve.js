import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

export default class ReadTable extends Component {
    state = {
        readTableRows: []
    }

    componentDidMount() {
        axios.get('Localhost:8000/book/').then(res => {
            this.setState({
                readTableRows: res.data
            })
        })
    }
    render() {
        const { readTableRows } = this.state
        const rowsList = readTableRows.map(row => {
            return (
                <tr key={row_id}>
                    <td><img src={row.image}></img></td>
                    <td>{row.name}</td>
                    <td>{row.avgRating}</td>
                    <td>{row.totalRatings}</td>
                    <td>{row.userShelvesandReveiews.shelve}</td>

                </tr>
            )
        })
        return (
            <table class="table table-striped table-dark">
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