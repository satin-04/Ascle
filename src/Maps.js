import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;
// const LocationPin = ({ text }) => (
//   <div className="pin">
//     <Icon icon={locationIcon} className="pin-icon" />
//     <p className="pin-text">{text}</p>
//   </div>
// )


class Maps extends Component {
  static defaultProps = {
    center: {
      lat:  39.167322 ,
      lng: -86.521414
    },
    zoom: 17
  };
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAo6tjgdoJWCtB97g-J8hoSxrSQBDks2x4" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={39.167322}
            lng={-86.521414}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Maps;