import React, { Component } from 'react';

import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

interface MapProps {
    color_outline: string,
    color_fill: string,
    //color_hover: string,
    height_offset: number
}

//white
//'#870202'

function Bounds(props: {bounds:Array<Array<number>>}) {
    const map = useMap();
    map.setMaxBounds(props.bounds);
    return null;
}

export default function WorldMap(props:MapProps) {
    var startBounds = [
        [-45, -20],
        [45, 20]
    ]

    var maxBounds = [
        [-90, -180],
        [90, 180]
    ]
    
    return (
        <div id="map" style={{ height: `calc(100vh - ${ props.height_offset }px)` }}>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
            <MapContainer
                bounds={startBounds}
                scrollWheelZoom={false}
                zoom={16}
            >
                <Bounds bounds={ maxBounds } />
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                    noWrap="false"
                    bounds={maxBounds}
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

//<object data="/world.svg"> </object>