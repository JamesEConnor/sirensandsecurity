import React, { Component } from 'react';
import Image from 'next/image';

import { Share_Tech, Share_Tech_Mono } from 'next/font/google';
import { PATH } from '@/types/envvars';
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
    var logoUrl = props.dark ? "/assets/logo-dark.png" : "/assets/logo-light.png";

    return (
        <div className="logo flex items-center justify-center">
            <Image
                className="inline-block"
                src={ PATH(logoUrl) }
                alt=""
                width={ props.size }
                height={ props.size }
            />
            <h1 className={`logo-text text-4xl inline-block ${sharetech.className} ${ props.dark ? "dark" : "light" }`}>
                {props.text}
            </h1>
        </div>
    );
}