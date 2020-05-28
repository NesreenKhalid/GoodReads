import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import './footer.css'
export default class Footer extends Component {
    render() {
        return (

            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p className="text-justify">IOT.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. IOT focuses on providing the most efficient code to be simple. We will help companies build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript,SQL and Algorithm.</p>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Categories</h6>
                            <ul className="footer-links">
                                <li><Link to="#">C</Link></li>
                                <li><Link to="#">catgories</Link></li>
                                <li><Link to="#">Books</Link></li>
                                <li><Link to="#">user</Link></li>
                                <li><Link to="#">Authors</Link></li>
                                <li><Link to="#">IOT</Link></li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">Contact Us</Link></li>
                                <li><Link to="#">Contribute</Link></li>
                                <li><Link to="#">Privacy Policy</Link></li>
                                <li><Link to="#">Sitemap</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by<Link to="#">Open source IOT track</Link>.</p>
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
                                <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </footer>

        )
    }
}