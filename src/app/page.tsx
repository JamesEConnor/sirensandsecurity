'use client';

import "./css/main.page.css";
import "./css/map.css";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SASMap from '@/components/Map';
import Incident from '@/components/Incident'

import incidentList from "@/data/incidents.json"

export default function Home() {
  console.log();

  return (
    <main>
      <Header />
      
      <SASMap
        height_offset={121}
        markers={ incidentList.incidents.map(({ loc }) => loc.coords) }
        marker_color="#d10000"
        ></SASMap>

      {/* <WorldMap height_offset={121} color_outline='#870202' color_fill='white'></WorldMap> */}

      <ul id="incidentList" className="w-full grid grid-flow-row">
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
