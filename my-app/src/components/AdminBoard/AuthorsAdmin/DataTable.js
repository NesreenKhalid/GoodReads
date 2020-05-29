import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditAuthor from './EditAuthor'
import axios from 'axios';
import '../../AdminBoard/Styless.css'; 

class DataTable extends Component {
    constructor(props) {
        super(props)

    
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName:'',
            authorImage:'',
            dateOfBirth:''
            , modal: false
        }

    }
    onSubmit(e) {
        e.preventDefault();

            axios.delete(`http://localhost:8000/authors/${this.props.obj._id}`)
                .then(res => console.log(res.data));
        
    }
        render() {
            return (
                <tr>
                    <td>
                        {this.props.obj._id}
                    </td>
                    <td>
                        {this.props.obj.firstName}
                    </td>
                    <td>
                        {this.props.obj.lastName}
                    </td>
                    <td>
                        {this.props.obj.authorImage}
                    </td>
                    <td>
                        {this.props.obj.dateOfBirth}
                    </td>
                    <td className="rowBtn">
                        <EditAuthor obj={this.props.obj} />
                        <button className="btn delete" onClick={this.onSubmit}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>

                </tr>
            );
        }
    }

    export default DataTable;