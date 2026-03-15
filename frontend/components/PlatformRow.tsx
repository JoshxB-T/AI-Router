import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Card from "./Card";

export default function PlatformList({ platforms }) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Top {platforms.length} Platforms</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {platforms.map((p, index) => (
                    <Card key={index}>
                        <Text style={styles.name}>{p.platform}</Text>
                        <Text style={styles.number}>{p.games} games</Text>
                    </Card>
                ))}
            </ScrollView>
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

    card: {
        width: 150,
        marginRight: 8
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
