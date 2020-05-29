import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import '../../AdminBoard/Styless.css'; 

export default class EditAuthor extends Component {

    constructor(props) {
        super(props)

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAuthorImage = this.onChangeAuthorImage.bind(this);
        this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: this.props.obj.firstName,
            lastName: this.props.obj.lastName,
            authorImage: this.props.obj.authorImage,
            dateOfBirth: this.props.obj.dateOfBirth
            , modal: false
        }
        console.log(this.props.obj.dateOfBirth)


    }

    onChangeFirstName(e) {
        this.setState({ firstName: e.target.value })
    }
    onChangeLastName(e) {
        this.setState({ lastName: e.target.value })
    }
    onChangeAuthorImage(e) {
        this.setState({ authorImage: e.target.files[0] })
    }
    onChangeDateOfBirth(e) {
        this.setState({ dateOfBirth: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        console.log(this.state.authorImage);
        const formData = new FormData()
        formData.append('firstName', this.state.firstName)
        formData.append('lastName', this.state.lastName)
        formData.append('authorImage', this.state.authorImage)
        formData.append('dateOfBirth', this.state.dateOfBirth)
        axios.patch(`http://localhost:8000/authors/${this.props.obj._id}`, formData, {})
            .then((res) => {
                console.log(res.data)
                alert("Author Updated Successfuly");
                this.setState({ modal: false })
            }).catch((error) => {
                console.log(error)
            });


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
                <button className="btn edit" onClick={this.toggle}><FontAwesomeIcon icon={faPencilAlt} /></button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle} className=" text-center">Edit Author </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label>Author Id</label>
                                <input
                                    type="text"
                                    name="Id"
                                    required
                                    disabled
                                    defaultValue={this.props.obj._id}
                                    placeholder="_id"
                                    className="form-control" />
                            </div>

                            <div className="form-group">
                                <label> First Name</label>
                                <input
                                    type="text"
                                    name="FirstName"
                                    id="FirstName"
                                    required
                                    defaultValue={this.props.obj.firstName}
                                    className="form-control" onChange={this.onChangeFirstName}
                                    placeholder="FirstName"
                                />
                            </div>
                            <div className="form-group">
                                <label> Last Name</label>
                                <input
                                    type="text"
                                    name="LastName"
                                    required
                                    // value={this.props.obj.lastName}
                                    defaultValue={this.props.obj.lastName}
                                    className="form-control" onChange={this.onChangeLastName}
                                    placeholder="LastName"
                                />
                            </div>
                            <div className="form-group">
                                <label> Date Of Birth </label>
                                <input
                                    type="date"
                                    name="DateOfBirth"
                                    // required
                                    defaultValue={this.props.obj.dateOfBirth}
                                    // value="2020-01-01"
                                    className="form-control" onChange={this.onChangeDateOfBirth}
                                    placeholder="DateOfBirth"
                                />
                            </div>

                            <div className="form-group">
                                <label> Author Image </label>
                                <input
                                    type="file"
                                    name="AuthorImage"
                                    // required
                                    id="authorImage"
                                    // defaultValue={this.props.obj.authorImage}
                                    className="form-control" onChange={this.onChangeAuthorImage}
                                    placeholder="AuthorImage"
                                />
                            </div>


                            <div className="form-group">
                                <input type="submit" value="Edit Author " className="btn btn-primary btn-center-block" />
                            </div>
                        </form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}


