import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";

export default function GenreList({ genres }) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Top {genres.length} Genres</Text>

            {genres.map((g, index) => (
                <Card key={index}>
                    <Text style={styles.name}>{g.Genre}</Text>
                    <Text style={styles.number}>{g.Games} games</Text>
                </Card>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 10
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
