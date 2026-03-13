import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Card from "./Card";

export default function FeaturedBanner({ game }) {
    return (
        <View style={styles.section}>
            <Card style={styles.card}>
                <Text>Featured Game</Text>
                <Text style={styles.title}>{game.name}</Text>
                <Text style={styles.name}>{game.year_of_release}</Text>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 10
    },

    card: {
        alignItems: "center"
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8
    },

    name: {
        fontSize: 14,
        color: "#666",
        marginBottom: 6
    },

    number: {
        fontSize: 16,
        fontWeight: "bold"
    }
});
