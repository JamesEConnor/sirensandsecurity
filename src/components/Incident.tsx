import React, { Component } from 'react';
import Image from "next/image"

import categories from "@/data/categories.json"

//The different incident categories.
export const IncidentCategory = {
    Other: "Other/Unassigned",
    DoS: "DoS",
    DoS911: "DoS (911/PSAP)",
    TDoS: "TDoS",
    TDoS911: "TDoS (911/PSAP)",
    Malware: "Malware (excluding ransomware)",
    Ransomware: "Ransomware",
    Swatting: "Swatting",
    ActiveHack: "Active Hacking",
    CyberKinetic: "Cyber-kinetic Attack"
}

//The properties to be fed to an incident.
interface IncidentProps {
    title: string,
    date: number,
    category: number,
    description: string,
    loc: {name: string, coords: string},
    media: Array<{ name: string, url: string }>
}

export default function Incident(props: IncidentProps) {
    return (
        <li className="incident">
            <IncidentIcon
                src={ categories.list[props.category].icon }
                alt={categories.list[props.category].alt}
                catName={ categories.list[props.category].name }
                location={ props.loc.name }
            />
            <div className="incidentContent">
                <h1>{ props.title }</h1>

                <p>{ props.description }</p>

                <h2>Media/Reports</h2>
                <span>
                    {props.media.map(entry => {
                        return (
                            <a key={entry.name} target="_blank" href={ entry.url }>
                                <p>{ entry.name }</p>
                            </a>
                        );
                    })}
                </span>
            </div>
        </li>
    );
}

function IncidentIcon(props: {src: string, alt: string, catName: string, location: string}) {
    return (
        <div className="incidentImg">
            <Image
                src={ props.src }
                alt={ props.alt }
                width="80"
                height="80"
            />

            <p className="category">{ props.catName }</p>

            <p style={{textDecoration: "underline"}}>Location(s)</p>
            <p>{ props.location }</p>
        </div>
    );
}