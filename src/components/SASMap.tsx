import React, { Component } from 'react';

import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { LatLngBoundsLiteral, LatLngExpression, LayerGroup } from 'leaflet';

interface MapProps {
    height_offset:number,
    markers: Array<{id:string, coords:LatLngExpression, popup:string}>,
    marker_color: string,
    query_string: string
}

export default class SASMap extends Component<MapProps, {query_string:string}> {
    //The starting view. Tuned to be just the right amount of zoom.
    startBounds:LatLngBoundsLiteral = [
        [-45, -20],
        [45, 20]
    ]

    //Used to constrain the map's panning to the actual map.
    maxBounds:LatLngBoundsLiteral = [
        [-90, -180],
        [90, 180]
    ]

    shouldComponentUpdate(nextProps: Readonly<MapProps>, nextState: Readonly<{ markers: Array<{
        id: string;
        coords: Array<number>;
        popup: string;
    }>,
    query_string:string; }>, nextContext: any): boolean {

        return (this.props.query_string != nextProps.query_string || this.props.query_string == "|||");
    }

    render() {
        return (
            <div id="map" style={{ height: `calc(100vh - ${ this.props.height_offset }px)` }}>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
                <MapContainer
                    bounds={this.startBounds}
                    maxBounds={this.maxBounds}
                    preferCanvas={true}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                        noWrap
                        bounds={this.maxBounds}
                    />

                    {
                        this.props.markers.map((marker, i) => {
                            return (
                                <CircleMarker
                                    key={"marker-" + i}
                                    center={marker.coords}
                                    radius={10}
                                    color={this.props.marker_color}
                                >
                                    <Popup>
                                        {marker.popup}
                                    </Popup>
                                </CircleMarker>
                            );
                        })
                    }

                </MapContainer>
            </div>
        );
    }
}