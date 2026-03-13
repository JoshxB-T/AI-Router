import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";

export default function GenreList({ genres }) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Top Genres</Text>

            {genres.map((g, index) => (
                <Card key={index}>
                    <Text>{g.Genre}</Text>
                    <Text>{g.Games} games</Text>
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
    }
});
