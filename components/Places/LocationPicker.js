import { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, Image, Alert } from 'react-native';
import OutlinedButton from '../ui/OutlinedButton';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';


export default function LocationPicker() {
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()


    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused])
    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Permission Denied', 'You need to grand location permission')
            return false;
        }
        return true;
    }
    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        console.log({ lat: location.coords.latitude, lng: location.coords.longitude });
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }
    function pickOnMapHandler() {
        navigation.navigate('Map')
    }
    let locationPreview = <Text style={{ color: 'white' }}>No location picked yet</Text>
    if (pickedLocation) {
        const markerRegion = {
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
        };
        locationPreview = <MapView
            style={{ width: '100%', height: 200 }}
            initialRegion={{
                latitude: pickedLocation.lat,
                longitude: pickedLocation.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker title="picked Location" coordinate={markerRegion} />
        </MapView>

    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton onPress={getLocationHandler} icon='location'>Locate user</OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon='map'>Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actions: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    text: { color: 'white' }
})