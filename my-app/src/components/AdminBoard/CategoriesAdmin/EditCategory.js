import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import '../../AdminBoard/Styless.css'; 

export default class EditCategory extends Component {

    constructor(props) {
        super(props)

        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categoryName: ''
            , modal: false
        }

    }

    onChangeCategoryName(e) {
        this.setState({ categoryName: e.target.value })
        console.log(e.target.value)
    }

    onSubmit(e) {
        e.preventDefault()

        const categoryObject = {
            categoryName: this.state.categoryName,

        };

        axios.patch(`http://localhost:8000/category/${this.props.obj._id}`, categoryObject)
            .then((res) => {
                console.log(res.data)
                alert("Category Updated Successfuly");
                 this.setState({ modal:false})
                
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ categoryName:''})
        // this.toggle()
    }

    toggle() { this.setState({ modal: !this.state.modal }); }
    render() {
        return (

            <div className="wrapper">
                <button className="btn edit" onClick={this.toggle}><FontAwesomeIcon icon={faPencilAlt} /></button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle} className=" text-center">Add Category </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label>Category Id</label>
                                <input
                                    type="text"
                                    name="Id"
                                    required
                                    defaultValue={this.props.obj._id}
                                    placeholder="_id"
                                    className="form-control" />
                            </div>

                            <div className="form-group">
                                <label> Category Name</label>
                                <input
                                    type="text"
                                    name="categoryName"
                                    required
                                    defaultValue={this.props.obj.categoryName}
                                    className="form-control" onChange={this.onChangeCategoryName}
                                    placeholder="categoryName"
                                />
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Edit Category " required className="btn btn-primary btn-center-block" />
                            </div>
                        </form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

