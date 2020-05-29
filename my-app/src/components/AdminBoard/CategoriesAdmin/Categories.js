import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import CreateCategory from './CreateCategory'
import '../../AdminBoard/Styless.css';

export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = { categoriesCollection: [] };
    }
    refreshList() {
        axios.get('http://localhost:8000/category')
            .then(res => {
                this.setState({ categoriesCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {

        this.refreshList();

    }
    dataTable() {
        return this.state.categoriesCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }


    render() {
        return (
            <div className="wrapper-users">
                <div className="row">
                    <CreateCategory />
                </div>
                <div className="container">
                    <table id='data' className="table table-striped mt-1 table-responsive">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
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