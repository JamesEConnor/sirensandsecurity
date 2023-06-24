import React, { Component } from 'react';
import Logo from './Logo';

export default class Footer extends Component {

    render() {
        return (
            <footer className="flex justify-center items-center flex-col w-full mt-10 pt-16 pb-24">
                <Logo size={ 100 } text="Sirens & Security" dark={ false } />

                <p className="">
                    Sirens & Security is a series of projects dedicated towards tracking cyber incidents involving the
                    emergency services. Currently it's focused on collecting information about these incidents, but there are
                    future plans to expand into additional tracking and partnerships.
                </p><p>
                    This project is run by <a href="https://github.com/JamesEConnor" target="_blank">James Connor</a>.
                    <br />Interested in learning more about this project? Check out 
                    the <a href="https://github.com/JamesEConnor/sirensandsecurity" target="_blank">Github</a> page!
                </p><p>
                    Special acknowledgement to <a href="https://openmoji.org/" target="_blank">OpenMoji</a> for the emoji
                    designs, because I'm bad at art.<br />All emojis are licensed
                    under <a href="https://creativecommons.org/licenses/by-sa/4.0/#" target="_blank">CC BY-SA 4.0</a>.
                </p>

                <div id="socialBar" className="flex justify-center items-center space-x-2 mt-8">
                    <a href="https://github.com/JamesEConnor/sirensandsecurity" target="_blank">
                        <img width={30} height={30} src="/icons/social_github.png"></img>
                    </a>
                </div>
            </footer>
        );
    }
}