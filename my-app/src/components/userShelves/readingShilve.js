import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

export default class ReadingTable extends Component {
    state = {
        readingTableRow: []
    }

    componentDidMount() {
        axios.get('Localhost:8000/book/').then(res => {
            this.setState({
                readingTableRow: res.data
            })
        })
    }
    render() {
        const { readingTableRow } = this.state
        const rowsList = readingTableRow.map(row => {
            return (
                <tr key={row._id}>
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