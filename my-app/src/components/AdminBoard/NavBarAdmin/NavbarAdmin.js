import { NavLink } from 'react-router-dom'
import Authors from '../AuthorsAdmin/Authors'
import Categories from '../CategoriesAdmin/Categories'
import Books from '../BooksAdmin/Books'
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';

const NavbarAdmin = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
       <nav className="navbar navbar-expand navbar-dark bg-dark">
            
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
              <NavLink to={"/admin/categories"}  className="nav-link"> Categories</NavLink>
              </li>

              <li className="nav-item">
              <NavLink to={"/admin/authors" }  className="nav-link">Authors</NavLink>
              </li>

              <li className="nav-item">
              <NavLink to={"/admin/books"}   className="nav-link">Books</NavLink>
              </li>
              </div>
              </nav>

{/* <Navbar color="light" light expand="md"> */}
        {/* <NavbarBrand href="/">Admin Panel</NavbarBrand> */}
        {/* <NavbarToggler onClick={toggle} /> */}
        {/* <Collapse isOpen={isOpen} navbar> */}
          {/* <Nav  navbar>
            <NavItem className="mr-10">
              <NavLink to="/admin/authors">Authors</NavLink>
            </NavItem>

            <NavItem className="mr-10">
              <NavLink to="/admin/categories"> Categories</NavLink>
            </NavItem>

            <NavItem className="mr-10">
              <NavLink to="/admin/books">Books</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        {/* </Collapse> */}
      {/* </Navbar>  */}
      {/* <Authors/>
      <Categories/>
      <Books></Books> */}
    
    
      {/* <Navbar color="light" light expand="md">
        <NavbarBrand >Admin Panel</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/admin/categories"  activeStyle={{ fontWeight: "bold",color: "red"}}>Categories</NavLink>
            </NavItem>

            <NavItem>
              <NavLink >Books</NavLink>
              <NavLink to="/admin/books"  activeStyle={{fontWeight: "bold",color: "red"}}>Books</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/admin/authors"  activeStyle={{fontWeight: "bold",color: "red"}} >Authors</NavLink>
            </NavItem>
        
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar> */}
  
    
     </div>

  );

}

export default NavbarAdmin;

