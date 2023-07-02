'use client';

import "./css/main.page.css";
import "./css/map.css";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SASMap from '@/components/SASMap';
import Incident from '@/components/Incident'
import SearchBar from '@/components/SearchBar'

import incidentsData from "@/data/incidents.json"

export default function Home() {
  console.log();

  return (
    <main>
      <Header />
      
      <SASMap
        height_offset={121}
        markers={Object.keys(incidentsData.incidents).map((id, i) => {
          var idC = id as keyof typeof incidentsData.incidents;
          return {
            id:id,
            coords:incidentsData.incidents[idC].loc.coords,
            popup:incidentsData.incidents[idC].title }
          })
        }
        marker_color="#d10000"
        ></SASMap>

      <div id="incidents" className="flex justify-around px-4 py-8">
        <SearchBar />

        <table id="incidentTable" className="w-8/12" style={{backgroundColor: "rgb(var(--light-background-rgb))"}}>
          <thead className="text-black text-left" style={{backgroundColor: "rgba(var(--emphasis-rgb), 0.45)"}}>
            <tr>
              <th className="p-3 w-1/5">ID</th>
              <th className="p-3 w-1/5">Category</th>
              <th className="p-3 w-1/5">Title</th>
              <th className="p-3 w-1/5">Date</th>
              <th className="p-3 w-1/5">Location</th>
            </tr>
          </thead>
          <tbody>
            {
            //Create a list of incident elements by looping through
            //the data.
            Object.keys(incidentsData.incidents).map((id, i) => {
              var idC = id as keyof typeof incidentsData.incidents;
              return (<Incident
                key={i}
                rowIdx={i}
                id={id}
                title={incidentsData.incidents[idC].title}
                date={incidentsData.incidents[idC].date}
                category={incidentsData.incidents[idC].category}
                description={incidentsData.incidents[idC].description}
                loc={incidentsData.incidents[idC].loc}
                media={incidentsData.incidents[idC].media}
              />);
              })}
            </tbody>
        </table>
      </div>

      <Footer />
    </main>
  )
}
