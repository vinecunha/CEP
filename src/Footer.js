import React, { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div className="position-relative bottom-0 container-fluid">            
            <p className='text-center m-0'>Developed by @vinecunha with React and Bootstrap</p>
            <div class="d-flex flex-row justify-content-center align-items-center mb-1">
                <a href="https://linkedin.com/in/vcmartins" class=" mx-1 link-warning" target="blank">Linkedin</a> |
                <a href="https://github.com/vinecunha" class=" mx-1 link-warning" target="blank">GitHub</a> |
                <a href="mailto:vcunha@id.uff.br" class=" mx-1 link-warning">E-mail</a>
            </div>
        </div>
    );
}
