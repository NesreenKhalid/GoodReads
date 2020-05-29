import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import AddAuthor from './AddAuthor';
import '../../AdminBoard/Styless.css';

export default class Authors extends Component {

    constructor(props) {
        super(props);
        this.state = { authorsCollection: [] };
    }
    refreshList() {
        axios.get('http://localhost:8000/authors')
            .then(res => {
                this.setState({ authorsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.authorsCollection.length !== prevState.authorsCollection)

            this.refreshList();

    }
    dataTable() {
        return this.state.authorsCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }


    render() {
        return (
            <div className="wrapper-users">
                <div className="row">

                    <AddAuthor />
                </div>
                <div className="container">
                    <table id='data' className="table table-striped mt-1 table-responsive">
                        <thead >
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Author Image</th>
                                <th>Date Of Birth</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}