import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Card from "./Card";

export default function TopGamesRow({ games }) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>Top Games</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {games.map((game, index) => (
                    <Card key={index} style={styles.card}>
                        <Text style={styles.name}>{game.Name}</Text>
                        <Text style={styles.number}>{game.Global_Sales}M</Text>
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
        fontSize: 22,
        fontWeight: "bold"
    }
});
