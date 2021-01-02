import React from 'react';

const footer = () => {
    return (
        <div style = {{width: '100%', backgroundColor : "#2b2b2b", color: 'grey', padding: '10px', marginTop: '10px', textAlign:'center'}}>
            <p>This is the companion web app for the smart trash can.</p>
            <p>Made by Jason Wang:</p>
            <p>visit <a href='https://chungchun.wang' style = {{textDecoration: 'none'}}>chungchun.wang</a> for my other projects</p>
        </div>
    );
};

export default footer;