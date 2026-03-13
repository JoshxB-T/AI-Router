import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
    return (
        <View style={[styles.card, props.style]}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 4,
        backgroundColor: '#fff',

        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.20,
        shadowRadius: 4,
        marginHorizontal: 4,
        marginVertical: 6
    },

    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
    }
});
