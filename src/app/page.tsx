'use client';

import "./css/main.page.css";
import "./css/map.css";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorldMap from '@/components/WorldMap';
import Map from '@/components/Map';
import Incident from '@/components/Incident'

import incidentList from "@/data/incidents.json"
import Script from "next/script";

export default function Home() {
  return (
    <main>
      <Header />
      
      <Map height_offset={121} color_outline='#870202' color_fill='white'></Map>

      <WorldMap height_offset={121} color_outline='#870202' color_fill='white'></WorldMap>

      <ul id="incidentList">
        {
        //Create a list of incident elements by looping through
        //the data.
        incidentList.incidents.map((incident, i) => {
          return (<Incident
            key={i}
            title={incident.title}
            date={incident.date}
            category={incident.category}
            description={incident.description}
            loc={incident.loc}
            media={incident.media}
          />);
          })}
      </ul>

      <Footer />
    </main>
  )
}
