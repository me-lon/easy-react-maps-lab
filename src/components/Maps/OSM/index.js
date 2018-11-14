import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { MapsConfig } from '../../../../config';
// eslint-disable-next-line import/first
import 'leaflet/dist/leaflet.css';

// const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet

class OSMApiWrapper extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: MapsConfig.DefaultLocation[0],
            lng: MapsConfig.DefaultLocation[1],
            zoom: MapsConfig.DefaultZoom,
        };
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom} style={{ height: '100vh' }}>
                <TileLayer
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <span>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </span>
                    </Popup>
                </Marker>
            </Map>
        );
    }
}

export default OSMApiWrapper;
