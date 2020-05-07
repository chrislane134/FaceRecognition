import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css'

const Logo = () => {
    return (
        <div className = 'ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 65 }} style={{ height: 180, width: 250 }} >
 <div className="Tilt-inner pa3"> <img style={{paddingTop: '25px'}} alt='logo' src={brain}/></div>
</Tilt>

        </div>
    );

    }

export default Logo;