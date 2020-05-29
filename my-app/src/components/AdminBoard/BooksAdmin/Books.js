import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import CreateBook from './CreateBook'
import '../../AdminBoard/Styless.css';

export default class Books extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BooksCollection: [],
            AuthorsCollection: [],
            CatagoriesCollection: [],
        };
        this.refreshList = this.refreshList.bind(this);
        this.authorsList = this.authorsList.bind(this);
        this.categoryList = this.categoryList.bind(this);
        this.dataTable = this.dataTable.bind(this);


    }
    refreshList() {
        axios.get('http://localhost:8000/book')
            .then(res => {
                this.setState({ BooksCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    authorsList() {
        axios.get('http://localhost:8000/authors')
            .then(res => {
                this.setState({ AuthorsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    categoryList() {
        axios.get('http://localhost:8000/category')
            .then(res => {
                this.setState({ CatagoriesCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    componentDidMount() {
        this.refreshList();
        this.categoryList();
        this.authorsList();
    }

    componentDidUpdate() {

        this.refreshList();

    }
    dataTable() {
        return this.state.BooksCollection.map((data, i) => {
            return <DataTable obj={data} authors={this.state.AuthorsCollection} catagories={this.state.CatagoriesCollection} key={i} />;
        });
    }


    render() {
        return (
            <div className="wrapper-users">
                <div className="row">

                    <CreateBook authors={this.state.AuthorsCollection} catagories={this.state.CatagoriesCollection} />
                </div>
                <div className="container">
                    <table id='data' className="table table-striped mt-1 table-responsive">
                        <thead className="thead-light">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>author Id</th>
                                <th>category Id</th>
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