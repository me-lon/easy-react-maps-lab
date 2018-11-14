import React, { Component } from 'react';
import { connect } from 'dva';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { MapsConfig } from '../../../../config';

@connect(({ stopslist, loading }) => ({
    stopslist,
    loading: loading.models.stopslist,
}))
export class MapContainer extends Component {
    constructor() {
        super();
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'stopslist/fetch',
            payload: {},
        });
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props,
        });
    };

    onInfoWindowClose = () => {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
        });
    };

    onMapClicked = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    };

    render() {
        const { stopslist: { stopslist } } = this.props;

        const DefaultLocation =
            stopslist.length >= 1
                ? {
                      lat: parseFloat(stopslist[Object.keys(stopslist)[0]].stop_lat),
                      lng: parseFloat(stopslist[Object.keys(stopslist)[1]].stop_lon),
                  }
                : {
                      lat: MapsConfig.DefaultLocation[0],
                      lng: MapsConfig.DefaultLocation[1],
                  };

        const points = stopslist.map(stop => {
            return { lat: parseFloat(stop.stop_lat), lng: parseFloat(stop.stop_lon) };
        });

        const bounds = new this.props.google.maps.LatLngBounds();
        for (let i = 0; i < points.length; i += 1) {
            bounds.extend(points[i]);
        }

        return (
            <Map
                google={this.props.google}
                containerStyle={{
                    position: 'relative',
                }}
                style={{
                    position: 'relative',
                    height: '100vh',
                    weight: '100%',
                }}
                initialCenter={DefaultLocation}
                zoom={MapsConfig.DefaultZoom}
                gestureHandling="greedy"
                mapTypeId="roadmap"
                onClick={this.onMapClicked}
                bounds={bounds}
            >
                {stopslist.map(stop => {
                    return (
                        <Marker
                            key={stop.stop_id}
                            onClick={this.onMarkerClick}
                            name={stop.stop_name}
                            position={{ lat: stop.stop_lat, lng: stop.stop_lon }}
                        />
                    );
                })}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: MapsConfig.GoogleMapsapiKey,
    language: MapsConfig.Language,
})(MapContainer);
