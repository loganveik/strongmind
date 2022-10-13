import './Navbar.css';
import React from 'react';

const Navbar = ({ Link }) => {
    return (
        <nav>
            <p className="nav-logo">pizza.</p>
            <ul className="nav-links">
                <Link className="nav-link" to="/">
                    <li>OWNER</li>
                </Link>
                <Link className="nav-link" to="/chef">
                    <li>CHEF</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar;
