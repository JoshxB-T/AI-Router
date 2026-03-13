import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";

export default function PlatformList({ platforms }) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Top Platforms</Text>

            {platforms.map((p, index) => (
                <Card key={index}>
                    <Text>{p.Platform}</Text>
                    <Text>{p.Games} games</Text>
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
