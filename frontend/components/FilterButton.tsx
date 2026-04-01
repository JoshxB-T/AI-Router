import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FilterButton(props) {
    return (
        <TouchableOpacity
            style={styles.tag}
        >
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
        card: {
        borderRadius: 10,
        elevation: 4,
        backgroundColor: '#fff',
        marginHorizontal: 4,
        marginVertical: 6,
        boxShadow: '0px 3px 6px rgba(0,0,0,0.25)'
    },

    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
    },

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
        color: "black"
    },

    activeText: {
        color: "#000000"
    }
});
