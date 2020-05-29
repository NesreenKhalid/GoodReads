import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import '../../AdminBoard/Styless.css';

export default class AddAuthor extends Component {

    constructor(props) {
        super(props)

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAuthorImage = this.onChangeAuthorImage.bind(this);
        this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            authorImage: '',
            firstName: '',
            lastName: '',
            dateOfBirth: ''
            , modal: false
        }

    }
    onChangeFirstName(e) {
        this.setState({ firstName: e.target.value })
    }
    onChangeLastName(e) {
        this.setState({ lastName: e.target.value })
    }
    onChangeAuthorImage(e) {
        this.setState({ authorImage: e.target.files[0] })
        console.log(e.target.files[0])
    }
    onChangeDateOfBirth(e) {
        this.setState({ dateOfBirth: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault()

        // const authorObject = {
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     authorImage: this.state.authorImage,
        //     dateOfBirth: this.state.dateOfBirth

        // };

        // axios.post('http://localhost:8000/authors/', authorObject)
        //     .then((res) => {
        //         console.log(res.data)
        //     }).catch((error) => {
        //         console.log(error)
        //         console.log(authorObject)
        //     });
        //     e.preventDefault()
        console.log(this.state.authorImage);
        const formData = new FormData()
        formData.append('firstName', this.state.firstName)
        formData.append('lastName', this.state.lastName)
        formData.append('authorImage', this.state.authorImage)
        formData.append('dateOfBirth', this.state.dateOfBirth)
        axios.post("http://localhost:8000/authors/", formData, {
        }).then(res => {
            console.log(res)
        })
        this.setState({ authorImage: '' })
        this.setState({ firstName: '' })
        this.setState({ lastName: '' })
        this.setState({ dateOfBirth: '' })
        this.setState({ modal: false })

    }

    toggle() { this.setState({ modal: !this.state.modal }); }
    render() {
        return (

            <div className="wrapper">
                <div className="row">
                    <button className="btn " onClick={this.toggle}><FontAwesomeIcon icon={faPlusCircle} /></button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader id="title" toggle={this.toggle} className=" justify-content-center">Add Author </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" value={this.state.firstName} required onChange={this.onChangeFirstName} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" value={this.state.lastName} required onChange={this.onChangeLastName} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Date Of Birth</label>
                                <input type="date" value={this.state.dateOfBirth} required onChange={this.onChangeDateOfBirth} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Author Image</label>
                                <input type="file"
                                    onChange={this.onChangeAuthorImage}
                                    className="form-control" />
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Add Author" className="btn btn-primary btn-center-block" />
                            </div>
                        </form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}