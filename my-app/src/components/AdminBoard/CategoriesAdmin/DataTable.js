import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditCategoy from './EditCategory'
import axios from 'axios';
import '../../AdminBoard/Styless.css'; 

class DataTable extends Component {
    constructor(props) {
        super(props)

    
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categoryName: ''
            , modal: false
        }

    }
    onSubmit(e) {
        e.preventDefault();

            axios.delete(`http://localhost:8000/category/${this.props.obj._id}`)
                .then(res => console.log(res.data));
        
    }
        render() {
            return (
                <tr>
                    <td>
                        {this.props.obj._id}
                    </td>
                    <td>
                        {this.props.obj.categoryName}
                    </td>
                    <td className="rowBtn">
                        <EditCategoy obj={this.props.obj} />
                        <button className="btn delete" onClick={this.onSubmit}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>

                </tr>
            );
        }
    }

    export default DataTable;