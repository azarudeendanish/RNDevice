import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

export default function PlaceLists({ places = '' }) {
    if (!places || places.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>No places added yet - start adding some!</Text>
            </View>
        )
    }
    return (
        <FlatList data={places} keyExtractor={(item) => item.id} renderItem={({ item }) => <PlaceItem place={item} />} />
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    Text: { fontSize: 16, color: Colors.primary100 }
})