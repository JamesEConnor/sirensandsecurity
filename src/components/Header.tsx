import React, { Component, MutableRefObject, PropsWithRef } from 'react';
import Logo from '@/components/Logo';

import { Share_Tech, Share_Tech_Mono } from 'next/font/google';
const sharetech = Share_Tech({
    weight: "400",
    subsets: ["latin"],
    style: "normal"
});

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="flex items-center justify-center">
                    <Logo size={100} />
                    <h1 id="header-title" className={`inline-block ${sharetech.className}`}>Sirens and Security</h1>
                </div>

                <span className="horiline"></span>
            </header>
        );
    }
}