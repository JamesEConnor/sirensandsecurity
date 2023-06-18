'use client';

import "./css/main.page.css";
import "./css/map.css";

import Image from 'next/image'

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorldMap from '@/components/WorldMap';
import Incident from '@/components/Incident'

import incidentList from "@/data/incidents.json"

export default function Home() {
  return (
    <main>
      <Header />
      
      <WorldMap height_offset={121} color_outline='#870202' color_fill='white'></WorldMap>

      <div id="incidentList">
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
            duration={incident.duration}
            durationUnit={incident.durationUnit}
            perpetrator={incident.perpetrator}
            media={incident.media}
          />);
          })}
      </div>

      <Footer />
    </main>
  )
}
