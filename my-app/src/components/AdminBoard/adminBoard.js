import React, { Component } from "react";
import UserService from "../../services/user.service";
import NavAdmin from './NavBarAdmin/NavbarAdmin'
import Authors from './AuthorsAdmin/Authors'
import Categories from './CategoriesAdmin/Categories'
import Books from './BooksAdmin/Books'


export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div >
        {/* <header className="jumbotron"> */}
          {/* <h3>{this.state.content}</h3> */}
         {/* < NavAdmin/> */}

        
           
        {/* </header> */}
      </div>
    );
  }
}