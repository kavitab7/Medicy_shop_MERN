import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="footer">
            <div className="up-footer">
                <p className="text-center mt-3 footer1">
                    <h5>Support</h5>
                    <Link className="footer-link" to="/contact">Contact</Link><Link className="footer-link" to="/faq">FAQ</Link>
                    <Link className="footer-link" to="/policy">Privacy Policy</Link>
                </p>
                <p className="text-center mt-3 footer1">
                    <h5>Account</h5>
                    <Link className="footer-link" to="/login">Login</Link><Link className="footer-link" to="/register">Register</Link>
                    <Link className="footer-link" to="/cart">Cart</Link>
                </p>
                <p className="text-center mt-3 footer1">
                    <h5>Company</h5>
                    <Link className="footer-link" to="/about">About</Link><Link className="footer-link" to="/team">Our Team</Link>
                    <Link className="footer-link" to="/help">Help</Link>
                </p>
            </div>
            <div className="down-footer">
                <h6 className="text-center">All Right Reserved &copy; Kavita Bhosale</h6>

            </div>
        </div>
    );
};

export default Footer;