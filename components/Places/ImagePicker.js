import { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, Alert } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import OutlinedButton from '../ui/OutlinedButton';

export default function ImagePicker() {
    const [savedImage, setSavedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Permission Denied', 'Give access to open camera')
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        })
        console.log(image);
        setSavedImage(image.uri)
    }
    let imagePreview = <Text style={{ color: 'white' }}>No Images yet</Text>
    if (savedImage) {
        imagePreview = <Image source={{ uri: savedImage }} style={{ width: '100%', height: 200 }} />
    }
    function removeImageHandler() {
        setSavedImage(null)
    }
    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton onPress={takeImageHandler} icon='camera' >Take Image</OutlinedButton>
            <OutlinedButton onPress={removeImageHandler} >remove image</OutlinedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    }
})