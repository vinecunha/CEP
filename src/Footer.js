import React, { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div className="position-relative bottom-0 mt-3 container-sm rounded text-white">            
            <p className='text-center m-0'>Developed by @vinecunha with PrimeReact and Bootstrap</p>
            <div className="d-flex flex-row justify-content-center align-items-center mb-1">
                <a href='https://vinecunha.github.io' className='mx-1 text-white' style={{textDecoration: "none"}} target='blank'>vinecunha.github.io</a> |
                <a href="https://linkedin.com/in/vcmartins" className=" mx-1 link-info" target="blank">Linkedin</a> |
                <a href="https://github.com/vinecunha" className=" mx-1 link-info" target="blank">GitHub</a> |
                <a href="mailto:vcunha@id.uff.br" className=" mx-1 link-info">E-mail</a> |
                <a href="../gdpr.html" className=" mx-1 link-info">Privacy Policy</a>
            </div>
        </div>
    );
}
