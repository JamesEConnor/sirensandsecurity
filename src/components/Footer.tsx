import React, { Component } from 'react';
import Logo from '@components/Logo';
import Image from 'next/image';

export default class Footer extends Component {

    render() {
        return (
            <footer className="flex justify-center items-center flex-col w-full mt-10 pt-16 pb-24">
                <Logo size={ 100 } text="Sirens & Security" dark={ true } />

                <p className="">
                    Sirens & Security is a series of projects dedicated towards tracking cyber incidents involving the
                    emergency services. Currently it&apos;s focused on collecting information about these incidents, but there are
                    future plans to expand into additional tracking and partnerships.
                </p><p>
                    This project is run by <a href="https://github.com/JamesEConnor" target="_blank">James Connor</a>.
                    <br />Interested in learning more about this project? Check out 
                    the <a href="https://github.com/JamesEConnor/sirensandsecurity" target="_blank">Github</a> page!
                </p><p>
                    Special acknowledgement to <a href="https://openmoji.org/" target="_blank">OpenMoji</a> for the emoji
                    designs, because I&apos;m bad at art.<br />All emojis are licensed
                    under <a href="https://creativecommons.org/licenses/by-sa/4.0/#" target="_blank">CC BY-SA 4.0</a>.
                </p>

                <div id="socialBar" className="flex justify-center items-center space-x-2 mt-8">
                    <a href="https://github.com/JamesEConnor/sirensandsecurity" target="_blank">
                        <Image
                            src="icons/social_github.png"
                            alt=""
                            width={30}
                            height={30}
                        />
                    </a>
                </div>
            </footer>
        );
    }
}