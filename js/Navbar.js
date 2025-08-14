// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const Navbar = () => {
    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4" style={{ marginLeft: '-50px' }}>
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
                <img src="img/murdas_logo.png" className="fs-4" alt="Logo" />
            </Link>
            <ul className="nav nav-pills">
                <li className="nav-item"><Link to="/about_us" className="nav-link" style={{ color: 'white' }}>About us</Link></li>
                <li className="nav-item"><Link to="/documents" className="nav-link" style={{ color: 'white' }}>Documents</Link></li>
                <li className="nav-item"><Link to="/gallery" className="nav-link" style={{ color: 'white' }}>Photo</Link></li>
                <li className="nav-item">
                    <Link to="/order" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button type="button" className="btn btn-outline-danger" style={{ color: 'white' }}>
                            Order
                        </button>
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Navbar;
