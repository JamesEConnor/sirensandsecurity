import React, { Component } from 'react';

import categories from "@data/categories"

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
    media: Array<{ name: string, url: string }>,
    updateSearch:(id?:string, key?:string, cat?:string, startDate?:string, endDate?:string)=>{}
}

export default function IncidentTableRow(props: IncidentProps) {
    var catC = props.category as keyof typeof categories;
    var bgColor = (props.rowIdx % 2 == 0) ? "white" : "transparent";

    return (
        <tr key={"row-" + props.id} className="text-black text-sm block" style={{backgroundColor: bgColor}}>
            <td className="inline-block w-1/5 p-3">
                <i
                    className="inline-block border-dashed border-black border-b cursor-pointer"
                    onClick={() => props.updateSearch(props.id, undefined, undefined, undefined, undefined)}
                >
                    {props.id}
                </i>
            </td>
            <td className="inline-block w-1/5 p-3">{categories[catC].name}</td>
            <td className="inline-block w-1/5 p-3">{props.title}</td>
            <td className="inline-block w-1/5 p-3">{(new Date(props.date)).toLocaleDateString()}</td>
            <td className="inline-block w-1/5 p-3">{props.loc.name}</td>
        </tr>
    );
}

export function IncidentDetails(props: IncidentProps) {
    return (
        <tr key={"details-" + props.id} className="bg-neutral-200 rounded-md">
            <td className="w-full relative p-5">
                <h1 className="custom-underline text-black text-xl font-bold">{props.title}</h1>
                <p className="text-black text-md my-5">{props.description}</p>

                <h3 className="inline-block custom-underline text-black text-lg mb-3">Sources</h3>
                <ul className="list-disc pl-5 text-black">
                    {
                        props.media.map((mediaEntry, i) => {
                            return (
                                <li key={"sources-" + props.id + "-" + i}>
                                    <a
                                        href={mediaEntry.url}
                                        target="_blank"
                                        className="underline text-blue-600"
                                    >
                                    {mediaEntry.url}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>

                <span
                    className="absolute top-3 right-5 inline-block cursor-pointer hover:scale-125"
                    onClick={ () => props.updateSearch("", undefined, undefined, undefined, undefined) }
                >
                    <img src="/icons/close.png" width={35} height={35} />
                </span>
            </td>
        </tr>
    )
}