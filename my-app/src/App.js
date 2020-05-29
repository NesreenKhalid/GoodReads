import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/signin/signin";
import Register from "./components/registeration/registeration";
import Home from "./components/home/Home";
import Profile from "./components/profile/profile";
import BoardUser from "./components/userboard/userBoard";
import BoardAdmin from "./components/AdminBoard/adminBoard";
import About from './components/about/about'
import Catigories from './components/catigories/catigoris'
import Book from './components/book/Book'
import BookDetails from './components/bookDetails/BookDetails'
import CategoryBooks from './components/categoryBooks/categoryBooks'
import authorDetails from './components/AuthorDetails/authorDetails'
import Footer from './components/footer/footer'
import Author from './components/author/Auther'

import ReactSearchBox from 'react-search-box'
import { search } from './Utils/search'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {

      showAdminBoard: false,
      currentUser: undefined,
      books: null,
      loading: false,
      value: ''
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),

        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  search = async val => {
    this.setState({ loading: true });
    // const res = await axios(
    const res = await search(`http://localhost:8000/book?search=${val}`);
    const books = res;
    console.log(books);
    
    this.setState({ books, loading: false });
  };

  onChangeHandler = async value => {
    this.search(value);
    this.setState({ value });
    console.log(value);
    

  };
  routeChange=(target)=> {
    console.log(target);
    
    // let path = `/bookDetails/${target.id}`;
    // let history = useHistory();
    // history.push(path);
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              GoodReads
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/books"} className="nav-link">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/catigories"} className="nav-link">
                  Categories
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/authors"} className="nav-link">
                  Authors
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/about"} className="nav-link">
                  About
                </Link>
              </li>

              {/* {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )} */}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>


            {/* <ReactSearchBox
              placeholder="Search by Book Name"
              value={this.state.value}
              data={this.data?this.data:[{"result": "no books found"}]}
              // callback={record => console.log(record)}
              onChange={value => this.onChangeHandler(value)}
              onSelect={target=>{
                console.log(target);
                // this.routeChange(target)               
              }} 
            /> */}

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                  </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                  </Link>
                  </li>
                </div>
              )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/about" component={About} />
              <Route exact path="/catigories/:id" component={CategoryBooks} />
              <Route path="/catigories" component={Catigories} />
              <Route path="/books" component={Book} />
              <Route path="/authors" component={Author} />
              <Route path="/admin" component={BoardAdmin} />
              <Route exact path="/bookDetails/:id" component={BookDetails} />
              <Route exact path="/authorDetails/:id" component={authorDetails} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;