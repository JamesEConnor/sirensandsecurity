'use client';

import "@css/main.page.css";
import "@css/incidents.css";
import "@css/map.css";

import Header from '@components/Header';
import Footer from '@components/Footer';
import SASMap from '@components/SASMap';

import incidentsData from "@data/incidents"
import IncidentTable from "@components/IncidentTable";
import { Component, useRef, useState } from "react";

import { incidentType, incidentsResultType, isSSR } from "@/types/customtypes";
import { LatLngExpression } from "leaflet";
import { loadIncidents } from "@/scripts/dataloader";

export default class PageSecurityIncidents extends Component {
  state = {
    incidents: [],
    incidents_query: "",
    incidents_error: false,
    incidents_are_loading: true,
    search: {
      id: '',
      keyphrase: '',
      category: '',
      startDate: '',
      endDate: ''
    },
    sort: '',
    searchTimeout: 0
  }

  constructor(props:any) {
    super(props);

    //Bind for use by the search bar child component.
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  //Allows updating each individual search term, while maintaining the others.
  updateSearchTerm(id?:string, keyphrase?:string, category?:string, startDate?:string, endDate?:string) {

    //Immediately update the state.
    this.setState({
      search: {
        id: (id != undefined) ? id : this.state.search.id,
        keyphrase: (keyphrase != undefined) ? keyphrase : this.state.search.keyphrase,
        category: (category != undefined) ? category : this.state.search.category,
        startDate: (startDate != undefined) ? startDate : this.state.search.startDate,
        endDate: (endDate != undefined) ? endDate : this.state.search.endDate
      }
    });

    //Optimization that automatically changes if the incident is present in the current
    //subset. This allows for instantly showing more details (rather than delaying) when
    //an ID is selected.
    //Still has to do a proper refresh if the ID is being cleared.
    if (id != undefined && id != "") {

      //Loop through and search by ID.
      var found = null;
      this.state.incidents.forEach((incident) => {
        if (incident[0] == id) {
          found = incident;
          return;
        }
      });

      //Find based on ID.
      if (found != null) {
        this.setState({
          incidents_query: "IDSEARCH-" + id,
          incidents: [found]
        });

        //Stop early so web request isn't made.
        return;
      }
    } 


    //Delay the loading for a moment
    //to allow for continuous typing.
    if (this.state.searchTimeout != undefined) {
      clearTimeout(this.state.searchTimeout)
    }

    this.setState({
      searchTimeout: setTimeout(() => {

        this.startLoad();
      }, 1500),
      incidents_are_loading: true
    });
  }

  startLoad() {
    this.setState({
      incidents_error: false,
      incidents_are_loading: true
    })

    loadIncidents({
      id: this.state.search.id,
      keyphrase: this.state.search.keyphrase,
      category: this.state.search.category,
      startDate: this.state.search.startDate == '' ? undefined : new Date(this.state.search.startDate),
      endDate: this.state.search.endDate == '' ? undefined : new Date(this.state.search.startDate),
      sort: "",
      debug: false
    }, this.handleLoad, this.handleError)
  }

  handleLoad(query_str:string, results:incidentsResultType) {
    this.setState({
      incidents_query: query_str,
      incidents_error: false,
      incidents_are_loading: false,
      incidents: results
    });
  }

  handleError() {
    this.setState({
      incidents_error: true,
      incidents_are_loading: false
    })
  }



  //Performs the initial incident load.
  componentDidMount() {
    this.startLoad();
  }

  render() {
      return (
        <main>
          <Header />
          
          {!isSSR && <SASMap
            height_offset={121}
            markers={this.state.incidents.map((entry) => {
              var details = entry[1] as incidentType;

              return {
                id: entry[0],
                coords: details.loc.coords as LatLngExpression,
                popup: details.title }
              })
            }
            marker_color="#d10000"
            query_string={ this.state.incidents_query }
            ></SASMap>
          }

          <IncidentTable
            incidents={this.state.incidents}
            updateSearch={ this.updateSearchTerm }
            isLoading={ this.state.incidents_are_loading }
            error={ this.state.incidents_error }
          />

          <Footer />
        </main>
      )
  }
}