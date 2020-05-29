import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import '../../AdminBoard/Styless.css';

export default class CreateCategory extends Component {

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
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            categoryName: this.state.categoryName,

        };

        axios.post('http://localhost:8000/category/', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ categoryName: '' })
    }

    toggle() { this.setState({ modal: !this.state.modal }); }
    render() {
        return (

            <div className="wrapper">
                <div className="row">
                    <button className="btn" onClick={this.toggle}><FontAwesomeIcon icon={faPlusCircle} /></button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader id="title" toggle={this.toggle} className=" text-center">Add Category </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Add Category</label>
                                <input type="text" value={this.state.categoryName} required onChange={this.onChangeCategoryName} className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Add Category " required className="btn btn-primary btn-center-block" />
                            </div>
                        </form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}