import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">
                    Sewer Spewer
                </a>
                <img src='../build/rat.png' className='logo' />
            </nav>
        );
    }
}

export default Nav;