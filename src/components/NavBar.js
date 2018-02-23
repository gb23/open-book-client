import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navContainer"  >
            <NavLink
                style={{ marginLeft: '15px', marginTop: '5px' }}
                to="/compositions"
            >
                <i className="mt1 fa fa-pencil-square blue" title="Compositions"></i>
            </NavLink>
            <NavLink
                style={{ marginRight: '15px', marginTop: '5px'  }}
                to="/about"
            >
                <i className="mt1 fa fa-question-circle blue" title="About"></i>
            </NavLink>
            
        </div>
    );
}

export default NavBar;