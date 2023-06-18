import React, { Component } from 'react';

interface LogoProps {
    size: number;
}

export default function Logo(props : LogoProps) {

    /*var logoUrl = window.matchMedia("(prefers-color-scheme: dark)").matches ?
        "/logo-dark.png" :
        "/logo-light.png";*/
    var logoUrl = "/logo-dark.png";

    return <img className="inline-block" src={ logoUrl } width={ props.size } height={ props.size }></img>
}