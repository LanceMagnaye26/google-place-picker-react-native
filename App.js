import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewComponent from './components/MapViewComponent';
import MapView, { Circle, Marker } from 'react-native-maps';
import Permissions from 'react-native-permissions';

const apiKey = 'AIzaSyCdkuIQGc6zBWg22z3i7EalpRQL_79RLjU';

export default class App extends Component {

  _onPress = (data, details) => {
    console.log(details.geometry.location.lat);
    let coordinates = details.geometry.location.lat + ', ' + details.geometry.location.lng;
    this.setState({
      position: coordinates,
      region: {
        latitude: details.geometry.location.lat,
        latitudeDelta: 0.1,
        longitude: details.geometry.location.lng,
        longitudeDelta: 0.1,
      },
    })
  }

  constructor() {
    super();
    this.state = {
      region: {
        latitude: 0,
        latitudeDelta: 0,
        longitude: 0,
        longitudeDelta: 0
      },
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      locationPermission: 'unknown',
      position: 'unknown',
      set: true,
    };
  }

  _requestPermission() {
    Permissions.request('location')
      .then(response => {
        this.setState({
          locationPermission: response
        })
        console.log("Response: " + response);
      });
  }

  setMarkandCircle(lat, lng) {
    if (this.state.set == true) {
      this.setState({
        coordinate: {
          latitude: lat,
          longitude: lng
        },
        set: false,
      })
    }

  }

  componentDidMount() {
    console.log('start');
    this._requestPermission();
    console.log('Check position');
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords)
      console.log('my position' + position.coords.latitude + ', ' + position.coords.longitude);
      let coordinates = position.coords.latitude + ', ' + position.coords.longitude;
      this.setState({
        position: coordinates,
        region: {
          latitude: position.coords.latitude,
          latitudeDelta: 0.1,
          longitude: position.coords.longitude,
          longitudeDelta: 0.1,
        },
      })
      this.setMarkandCircle(position.coords.latitude, position.coords.longitude)
    },
      (error) => alert(JSON.stringify(error)));
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.map}>
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            style={styles.map}
          >
            <Marker
              coordinate={this.state.coordinate}

            />

          </MapView>
        </View>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={0} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed={true}    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onChangeText={console.log('changing')}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            this._onPress(data, details)
          }}

          getDefaultValue={() => ''}

          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: apiKey,
            language: 'en', // language of the results
            // default: 'geocode'
          }}

          styles={{
            container: {
              zIndex: 5,
            },
            textInputContainer: {
              width: '100%',
              zIndex: 5,
            },
            description: {
              fontWeight: 'bold',
              zIndex: 5,

            },
            predefinedPlacesDescription: {
              color: '#1faadb',
              zIndex: 5,
            },

            listView: {
              zIndex: 5,
              opacity: 1,
            },

            textInput: {

            },

            loader: {

            },

            powered: {
              opacity: 0
            },

            poweredContainer: {
              opacity: 0,
            },

            separator: {

            },

            row: {
              backgroundColor: 'white',

            }



          }}

          // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          // currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
          }}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    flexDirection: 'column',
  },

  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'dodgerblue',
    zIndex: -1,
  },

  map: {
    zIndex: -5,
    position: 'absolute',
    width: "100%",
    height: "100%",
    flexDirection: 'column',
  },
})