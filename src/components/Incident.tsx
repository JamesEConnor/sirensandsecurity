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
    duration: number,
    durationUnit: string,
    perpetrator: string,
    media: object
}

export default function Incident(props: IncidentProps) {
    return (
        <div className="incident">
            <Image
                src={ categories.list[props.category].icon }
                alt={categories.list[props.category].alt}
            />

            <h1>{props.title}</h1>
        </div>
    );
}