import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px'}} >
            <NavLink
                style={{ marginRight: '10px' }}
                to="/compositions"
            >
            View
            </NavLink>
            <NavLink
                style={{ marginRight: '10px' }}
                to="/about"
            >
            About
            </NavLink>
            
        </div>
    );
}

export default NavBar;