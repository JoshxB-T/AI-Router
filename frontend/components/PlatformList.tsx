import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";

export default function PlatformList({ platforms }) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Top {platforms.length} Platforms</Text>

            {platforms.map((p, index) => (
                <Card key={index}>
                    <Text style={styles.name}>{p.Platform}</Text>
                    <Text style={styles.number}>{p.Games} games</Text>
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
