import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import MapView from 'react-native-maps';
import { Navigation, } from 'react-native-navigation';
export default class mapView extends React.Component {
  componentDidMount() {
    this.navigationEventListener =   Navigation.events().bindComponent(this);
    // this.getReport();
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === 'btntop') {
      this.props.setLocation();
      this.props.navigator._pop();
    }
  }
  render() {
    const {
      location,
    } = this.props;	
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1, }}
          initialRegion={{
            latitude: location.latitude + 0.000266,
            longitude: location.longitude + 0.000218,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
            }}
          >
            <Icons name="pin" color="#e74c3c" size={25} />
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

});
