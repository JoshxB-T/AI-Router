import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TagButton({ label, active, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.tag, active && styles.activeTag]}
            onPress={onPress}
        >
            <Text style={[styles.text, active && styles.activeText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tag: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 8
    },

    activeTag: {
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6"
    },

    text: {
        fontSize: 14,
        color: "#333"
    },

    activeText: {
        color: "white"
    }
});
