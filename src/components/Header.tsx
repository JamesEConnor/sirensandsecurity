import React, { Component, MutableRefObject, PropsWithRef } from 'react';
import Logo from '@components/Logo';

export default class Header extends Component {
    render() {
        return (
            <header className="flex flex-col items-center justify-center w-full">
                <Logo size={100} text="Sirens & Security" dark={ true } />

                <span className="horiline"></span>
            </header>
        );
    }
}