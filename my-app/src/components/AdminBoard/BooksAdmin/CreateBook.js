import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import '../../AdminBoard/Styless.css';

export default class CreateBook extends Component {

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
            name: '',
            image: '',
            authId: '',
            catId: '',
            productionDate: '',
            modal: false
        }

    }

    onChangeBookName(e) {
        this.setState({ name: e.target.value })
        console.log(e.target.value)

    }
    onChangeAuthorId(e) {
        this.setState({ authId: e.target.value })
        console.log(e)

    }
    onChangeCategoryId(e) {
        this.setState({ catId: e.target.value })
        console.log(e)
    }
    onChangeImage(e) {
        this.setState({ image: e.target.files[0] })
        console.log(e.target.files[0])

    }
    onChangeproductionDate(e) {
        this.setState({ productionDate: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault()

        const bookObject = {
            name: this.state.name,
            image: this.state.image,
            authId: this.state.authId,
            catId: this.state.catId,
            productionDate: this.state.productionDate
        };

        // axios.post('http://localhost:8000/book/', bookObject)
        //     .then((res) => {
        //         console.log(res.data)
        //     }).catch((error) => {
        //         console.log(error)
        //     });

        console.log(this.state.authorImage);
        const formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('image', this.state.image)
        formData.append('authId', this.state.authId)
        formData.append('catId', this.state.catId)
        formData.append('productionDate', this.state.productionDate)
        axios.post("http://localhost:8000/book/", formData, {
        }).then(res => {
            console.log(res)
        })

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
                <div className="row">
                    <button className="btn" onClick={this.toggle}><FontAwesomeIcon icon={faPlusCircle} /></button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader id="title" toggle={this.toggle} className=" text-center">Add Book</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label>Book Name</label>
                                <input type="text" value={this.state.name} required onChange={this.onChangeBookName} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Book Image</label>
                                <input type="file" onChange={this.onChangeImage} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Category Id</label>
                                <select id="lang" className="form-control" onChange={this.onChangeCategoryId}>
                                    {this.props.catagories.map((category) => <option key={category._id} value={category._id}>{category.categoryName}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>production Date </label>
                                <input type="date" value={this.state.productionDate} onChange={this.onChangeproductionDate} className="form-control" />

                            </div>


                            <div className="form-group">
                                <label>Author Name </label>

                                <select id="lang2" className="form-control" onChange={this.onChangeAuthorId} >
                                    {this.props.authors.map((author) => <option key={author._id} value={author._id}>{author.firstName}</option>)}
                                </select>

                            </div>



                            <div className="form-group">
                                <input type="submit" value="Add Book " className="btn btn-primary btn-center-block" />
                            </div>
                        </form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}