import './Navbar.css';
import React from 'react';

const Navbar = ({ Link }) => {
    return (
        <nav>
            <p className="nav-logo" data-testid="navLogo">pizza.</p>
            <ul className="nav-links">
                <Link className="nav-link" to="/owner">
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