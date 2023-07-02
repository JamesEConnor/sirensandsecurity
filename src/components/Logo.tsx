import React, { Component } from 'react';

import { Share_Tech, Share_Tech_Mono } from 'next/font/google';
const sharetech = Share_Tech({
    weight: "400",
    subsets: ["latin"],
    style: "normal"
});

interface LogoProps {
    size: number,
    text: string,
    dark: boolean
}

export default function Logo(props : LogoProps) {

    /*var logoUrl = window.matchMedia("(prefers-color-scheme: dark)").matches ?
        "/assets/logo-dark.png" :
        "/assets/logo-light.png";*/
    var logoUrl = props.dark ? "/assets/logo-dark.png" : "/assets/logo-light.png";

    return (
        <div className="logo flex items-center justify-center">
            <img className="inline-block" src={ logoUrl } width={ props.size } height={ props.size }></img>
            <h1 className={`logo-text text-4xl inline-block ${sharetech.className} ${ props.dark ? "dark" : "light" }`}>
                {props.text}
            </h1>
        </div>
    );
}