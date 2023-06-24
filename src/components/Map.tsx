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
    markers: Array<Array<number>>,
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
            
            return null;
        };
        MapSetup.displayName = "MapSetup";


        //Function to create a marker.
        const DrawnMarker = (props:{coords:Array<number>}) => {
            const mapRef = useMap();

            L.circleMarker(props.coords, {
                color: this.props.marker_color
            }).addTo(mapRef);

            return null;
        }


        return (
            <div id="map" style={{ height: `calc(100vh - ${ this.props.height_offset }px)` }}>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
                <MapContainer
                    bounds={this.startBounds}
                    scrollWheelZoom={false}
                    preferCanvas={true}
                >
                    <MapSetup />
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                        noWrap="false"
                        bounds={this.maxBounds}
                    />

                    {
                        this.props.markers.map((coord, i) => {
                            return (
                                <DrawnMarker key={i} coords={coord} />
                            );
                        })
                    }

                </MapContainer>
            </div>
        );
    }
}