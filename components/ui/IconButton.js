import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ icon = 'add', color = 'white', size = 24, onPress }) {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Ionicons name={icon} color={color} size={size} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: { padding: 8, justifyContent: 'center', alignItems: 'center' },
    pressed: { opacity: 0.5 }
})