import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const LocationButton = () => {

    const [lat, setLat] = useState('0');    // Latitude
    const [long, setLong] = useState('0');  // Longitude

    const findCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
               setLat(JSON.stringify(position.coords.latitude));
               setLong(JSON.stringify(position.coords.longitude));
            }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={findCurrentLocation()}>      
                <Text style={styles.text}> Where am I? </Text>
                <Text style={styles.text}> {lat} </Text>
                <Text style={styles.text}> {long} </Text>
            </TouchableOpacity>            
	    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ffcc33',
        fontSize: 24,
        fontWeight: '900'
    }
});

export default LocationButton;
