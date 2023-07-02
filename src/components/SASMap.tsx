import React, { Component, RefObject, createRef, forwardRef, useImperativeHandle, useRef } from 'react';

import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    Popup
} from 'react-leaflet';
import * as L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import ReactDOM from 'react-dom';

interface MapProps {
    height_offset:number,
    markers: Array<{id:string, coords:Array<number>, popup:string}>,
    marker_color: string
}

export default class SASMap extends Component<MapProps> {
    //The starting view. Tuned to be just the right amount of zoom.
    startBounds = [
        [-45, -20],
        [45, 20]
    ]

    //Used to constrain the map's panning to the actual map.
    maxBounds = [
        [-90, -180],
        [90, 180]
    ]


    render() {

        //Create a child component that can go inside the MapContainer
        //and handle all of the setup.
        const MapSetup = () => {
            const mapRef = useMap();
            mapRef.setMaxBounds(this.maxBounds);
            mapRef.preferCanvas = false;
            
            return null;
        };
        MapSetup.displayName = "MapSetup";


        //Function to create a marker and popup.
        //Fine for now. If rendering speed becomes an issue,
        //refer here: https://stackoverflow.com/questions/67045268/react-leaflet-canvas
        const DrawnMarker = (props:{marker:{id:string,coords:Array<number>,popup:string}}) => {
            const mapRef = useMap();

            L.circleMarker(props.marker.coords, {
                color: this.props.marker_color
            })
            .bindPopup(props.marker.id + ": " + props.marker.popup)
            .addTo(mapRef)
            .on('click', () => { console.log("ID: " + props.marker.id) });

            return null;
        }


        return (
            <div id="map" style={{ height: `calc(100vh - ${ this.props.height_offset }px)` }}>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
                <MapContainer
                    bounds={this.startBounds}
                    preferCanvas={true}
                    scrollWheelZoom={false}
                >
                    <MapSetup />
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                        noWrap
                        bounds={this.maxBounds}
                    />

                    {
                        this.props.markers.map((marker, i) => {
                            return (
                                <DrawnMarker key={i} marker={marker} />
                            );
                        })
                    }

                </MapContainer>
            </div>
        );
    }
}