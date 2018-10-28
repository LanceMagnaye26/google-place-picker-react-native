import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, StatusBar } from 'react-native';


export default class MapViewComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 50.60254331180157,
        latitudeDelta: 0.2729185641296684,
        longitude: 16.821875706824924,
        longitudeDelta: 0.26148553927673924,
      },
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      locationPermission: 'unknown',
      position: 'unknown',
      set: true,
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  

  onRegionChange(region) {
    // console.log(region);
    // this.setState({
    //   region
    // });
  }

  render() {
    return (
      <View style={styles.container}>
       
        

      </View>

    )
  }
}
const styles = StyleSheet.create({
  map: {
    zIndex: -5,
    position: 'absolute',
    width: "100%",
    height: "100%",
    flexDirection: 'column',
  },

  container: {
    flex: 1,
  }
})