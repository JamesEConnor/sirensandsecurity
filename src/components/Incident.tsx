import React, { Component } from 'react';

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
    rowIdx: number,
    id: string,
    title: string,
    date: number,
    category: string,
    description: string,
    loc: {name: string, coords: Array<number>},
    media: Array<{ name: string, url: string }>
}

export default function Incident(props: IncidentProps) {
    var catC = props.category as keyof typeof categories;
    var bgColor = (props.rowIdx % 2 == 0) ? "white" : "transparent";

    return (
        <tr className="text-black text-sm" style={{backgroundColor: bgColor}}>
            <td className="p-3">{props.id}</td>
            <td className="p-3">{categories[catC].name}</td>
            <td className="p-3">{props.title}</td>
            <td className="p-3">{(new Date(props.date)).toLocaleDateString()}</td>
            <td className="p-3">{props.loc.name}</td>
        </tr>
    );
}