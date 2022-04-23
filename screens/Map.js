import { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/ui/IconButton';

export default function Map({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude: 25.068,
        longitude: 55.145,
        latitudeDelta: 25.068,
        longitudeDelta: 55.145
    };
    const selectLocationHandler = (event) => {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat: lat, lng: lng });
    }
    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No location picked', 'you have to pick location by tapping')
            return;
        }
        navigation.navigate('AddPlace', { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng })
    }, [navigation, selectedLocation])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (<IconButton icon='save' size={24} color={tintColor} onPress={savePickedLocationHandler} />)
        })
    }, [navigation, savePickedLocationHandler])
    return (
        <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
            {selectedLocation && (
                <Marker coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />
            )}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: { flex: 1 }
})