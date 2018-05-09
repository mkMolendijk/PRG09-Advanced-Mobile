import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Header, Body, Title, Button, Text} from 'native-base';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

export default class Map extends Component {
    state = {
        mapRegion: null,
        lastLat: null,
        lastLong: null,
    };

    componentDidMount() {
        this.watchID = navigator.geolocation.getCurrentPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            };
            this.onRegionChange(region, region.latitude, region.longitude);
        });
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            // If there are no new values set use the the current ones
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    // Action when pressed on 'Here am I' button
    onBtnPress(e) {
        let params = {
            key: '<key here>',
            latlng: `${this.state.lastLat},${this.state.lastLong}`,
        };

        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${params.latlng}&key=${params.key}`)
            .then((res) => res.json())
            .then((json) => {
                if (json.status !== 'OK') {
                    throw new Error(`Geocode error: ${json.status}`);
                } else {
                    for (let i = 0; i < json.results.length; i++) {
                        location = json.results[0].formatted_address;
                    }
                    firebase.database().ref('locations').push({
                        location: location,
                    });
                    window.alert(location);
                }
            });
    }

    // Map view
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Where Am I?</Title>
                    </Body>
                </Header>
                <View style={{flex: 1}}>
                    <MapView
                        style={styles.map}
                        region={this.state.mapRegion}
                        showsUserLocation={true}
                        followUserLocation={false}
                        onRegionChange={this.onRegionChange.bind(this)}>
                    </MapView>
                    <Button
                        style={styles.btn}
                        rounded
                        onPress={this.onBtnPress.bind(this)}>
                        <Text>Here I Am!</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },

    btn: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    }
});

