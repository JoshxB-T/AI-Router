import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";

export default function StatsGrid({ stats }) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Summary</Text>

            <View style={styles.grid}>
                <Card style={styles.card}>
                    <Text style={styles.number}>{stats.total_games}</Text>
                    <Text style={styles.label}>Total Games</Text>
                </Card>

                <Card style={styles.card}>
                    <Text style={styles.number}>{stats.platforms}</Text>
                    <Text style={styles.label}>Platforms</Text>
                </Card>

                <Card style={styles.card}>
                    <Text style={styles.number}>{stats.publishers}</Text>
                    <Text style={styles.label}>Publishers</Text>
                </Card>

                <Card style={styles.card}>
                    <Text style={styles.number}>{stats.genres}</Text>
                    <Text style={styles.label}>Genres</Text>
                </Card>
            </View>
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
    
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    
    card: {
        width: "48%",
        alignItems: "center"
    },
    
    number: {
        fontSize: 22,
        fontWeight: "bold"
    },

    label: {
        fontSize: 14,
        color: "#666"
    }
});
