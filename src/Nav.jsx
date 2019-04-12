import React from 'react';

function Nav({ peopleOnline }) {
    return (
        < nav className="navbar" >
            <a href="/" className="navbar-brand">
                Sewer Spewer
            </a>
            <img src='../build/rat.png' className='logo' />
            <h4>The Best App for Trash Talk!</h4>
            <h6>{peopleOnline} user(s) online</h6>
        </nav >
    );
}

export default Nav;