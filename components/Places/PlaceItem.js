import { StyleSheet, View, Text, Pressable } from "react-native"
import PlaceLists from "./PlaceLists"
export default function PlaceItem({ place, onSelect }) {
    return (
        <Pressable onPress={onSelect}>
            <Image source={{ uri: place.imageUri }} />
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({})