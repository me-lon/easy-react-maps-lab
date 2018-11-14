import { Card } from 'antd';
import React from 'react';
import GoogleApiWrapper from './GoogleMaps';
import OSMApiWrapper from './OSM';

const MapOptionsList = [
    {
        key: 'googlemaps',
        tab: 'GoogleMaps',
    },
    {
        key: 'osm',
        tab: 'OpenStreetMap',
    },
];

const MapOptionsContentList = {
    googlemaps: <GoogleApiWrapper />,
    osm: <OSMApiWrapper />,
};

class MapTabs extends React.Component {
    state = {
        key: 'googlemaps',
    };

    onTabChange = (key, type) => {
        // eslint-disable-next-line no-console
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        return (
            <Card
                style={{ width: '100%' }}
                tabList={MapOptionsList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {MapOptionsContentList[this.state.key]}
            </Card>
        );
    }
}

export default MapTabs;
