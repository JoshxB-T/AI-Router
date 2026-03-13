import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Card from "./Card";

export default function FeaturedBanner({ game }) {
    return (
        <View style={styles.section}>
            <Card style={styles.card}>
                <Text style={styles.title}>Featured Game</Text>
                <Text style={styles.name}>{game.name}</Text>
                <Text style={styles.number}>{game.year_of_release}</Text>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 10
    },

    card: {
        alignItems: 'center',
        marginBottom: 10
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center'
    },

    name: {
        fontSize: 22,
        color: '#000',
        marginBottom: 6,
        textAlign: 'center'
    },

    number: {
        fontSize: 22,
        color: '#666',
        textAlign: 'center'
    }
});
