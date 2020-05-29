import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBook from './EditBook'
import axios from 'axios';
import '../../AdminBoard/Styless.css'; 

class DataTable extends Component {
    constructor(props) {
        super(props)

    
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            image: '',
            authId: '',
            catId: '',
            productionDate:''
            , modal: false
        }

    }
    onSubmit(e) {
        e.preventDefault();

            axios.delete(`http://localhost:8000/book/${this.props.obj._id}`)
                .then(res => console.log(res.data));
        
    }
        render() {
            return (
                <tr>
                    <td>
                        {this.props.obj._id}
                    </td>
                    <td>
                        {this.props.obj.name}
                    </td>
                    <td>
                        {this.props.obj.image}
                    </td>
                    <td>
                        {this.props.obj.authId}
                    </td>
                    <td>
                        {this.props.obj.catId}
                    </td>
                    <td>
                        {this.props.obj.productionDate}
                    </td>
                    <td className="rowBtn">
                        <EditBook obj={this.props.obj} catagories={this.props.catagories} authors={this.props.authors}/>
                        <button className="btn delete" onClick={this.onSubmit}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>

                </tr>
            );
        }
    }

    export default DataTable;