import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import IconButton from './IconButton';
export default function OutlinedButton({ icon, onPress, children = 'button' }) {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            {icon && <IconButton style={styles.icon} icon={icon} />}
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: { flex: 1, margin: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.primary500, paddingHorizontal: 12, paddingVertical: 5 },
    pressed: { opacity: 0.7 },
    icon: { marginRight: 6 },
    text: { color: Colors.primary500 }
})