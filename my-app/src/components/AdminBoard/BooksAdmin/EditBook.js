import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import '../../AdminBoard/Styless.css'; 

export default class EditAuthor extends Component {

    constructor(props) {
        super(props)

        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeAuthorId = this.onChangeAuthorId.bind(this);
        this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
        this.onChangeproductionDate = this.onChangeproductionDate.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: this.props.obj.name,
            image: this.props.obj.image,
            authId: this.props.obj.authId,
            catId: this.props.obj.catId,
            productionDate: this.props.obj.productionDate,
            modal: false
        }


    }

    onChangeBookName(e) {
        this.setState({ name: e.target.value })
    }
    onChangeAuthorId(e) {
        this.setState({ authId: e.target.value })
    }
    onChangeCategoryId(e) {
        this.setState({ catId: e.target.value })
    }
    onChangeImage(e) {
        this.setState({ image: e.target.files[0] })
    }
    onChangeproductionDate(e) {
        this.setState({ productionDate: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault()

        // const bookObject = {
        //     name: this.state.name,
        //     image: this.state.image,
        //     authId: this.state.authId,
        //     catId: this.state.catId,
        //     productionDate: this.state.productionDate
        // };

        // console.log(bookObject)
        // axios.patch(`http://localhost:8000/book/${this.props.obj._id}`, bookObject)
        // .then((res) => {
        //     console.log(res.data)
        //     alert("Book Updated Successfuly");
        //     this.setState({ modal: false })
        // }).catch((error) => {
        //     console.log(error)
        // });
        console.log(this.state.authorImage);
        const formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('image', this.state.image)
        formData.append('authId', this.state.authId)
        formData.append('catId', this.state.catId)
        formData.append('productionDate', this.state.productionDate)
        axios.patch(`http://localhost:8000/book/${this.props.obj._id}`, formData, {
        })
         .then((res) => {
            console.log(res.data)
            alert("Book Updated Successfuly");
            this.setState({ modal: false })
        }).catch((error) => {
            console.log(error)
        });

       
        this.setState({ name: '' })
        this.setState({ image: '' })
        this.setState({ authId: '' })
        this.setState({ catId: '' })
        this.setState({ productionDate: '' })
        this.setState({ modal: false })
    }

    toggle() { this.setState({ modal: !this.state.modal }); }
    render() {
           console.log(this.props)
        return (

            <div className="wrapper">
                <button className="btn edit" onClick={this.toggle}><FontAwesomeIcon icon={faPencilAlt} /></button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle} className=" text-center">Edit Author </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label>Book Id</label>
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
                                <label>  Book Name</label>
                                <input
                                    type="text"
                                    name="BookName"
                                    id="BookName"
                                    required
                                    defaultValue={this.props.obj.name}
                                    className="form-control" onChange={this.onChangeBookName}
                                    placeholder="BookName"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category Id</label>

                                <select id="editlang" className="form-control" onChange={this.onChangeCategoryId} value={this.props.obj.catId}>
                                 {this.props.catagories.map((category) => <option key={category._id} value={category._id}>{category.categoryName}</option>)}

                                </select>
                            </div>


                            <div className="form-group">
                                <label>Author Id</label>
                                
                                <select id="editlang2" className="form-control" onChange={this.onChangeAuthorId} value={this.props.obj.authId}>
                                {this.props.authors.map((author) => <option key={author._id} value={author._id}>{author.firstName}</option>)}
                                </select>
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
                                    name="BookImage"
                                    // required
                                    id="BookImage"
                                    // defaultValue={this.props.obj.authorImage}
                                    className="form-control" onChange={this.onChangeImage}
                                    placeholder="BookImage"
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


