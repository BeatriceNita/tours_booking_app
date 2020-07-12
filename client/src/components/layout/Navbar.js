import React, { Component } from "react";
import { Link } from "react-router-dom";

import './Navbar.css';

class Navbar extends Component {
    render() {
        return (<header className="toolbar">
            <nav className="my_navbar">
                <Link to="/" className="navbar_logo">Trip Buddy</Link>
                <div className="spacer" />
                <div className="navbar_items">
                    <ul>
                        <li>
                            <Link to="/register" className="navbar_link">Register</Link>
                        </li>
                        <li>
                            <Link to="/login" className="navbar_link">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        );
    }
}

export default Navbar;
