import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import Card from '../../components/Card';
import { getAnalyticsDashboard } from '../../api/userService';

export default function Index() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getAnalyticsDashboard();
                setDashboard(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadDashboard();
    }, []);

    if (!dashboard) {
        return <Text style={styles.text}>Loading...</Text>;
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <Card>
                <Text>Total Games: {dashboard.Stats.Total_Games}</Text>
                <Text>Platforms: {dashboard.Stats.Platforms}</Text>
                <Text>Publishers: {dashboard.Stats.Publishers}</Text>
                <Text>Genres: {dashboard.Stats.Genres}</Text>
            </Card>

            <Card>
                <Text style={styles.title}>Top Games</Text>
                {dashboard.Top_Games.map((game, index) => (
                    <Text key={index}>
                        {game.Name} - {game.Global_Sales}M
                    </Text>
                ))}
            </Card>

            <Card>
                <Text style={styles.title}>Top Platforms</Text>
                {dashboard.Top_Platforms.map((p, index) => (
                    <Text key={index}>
                        {p.Platform} — {p.Games} games
                    </Text>
                ))}
            </Card>

            <Card>
                <Text style={styles.title}>Top Genres</Text>
                {dashboard.Top_Genres.map((g, index) => (
                    <Text key={index}>
                        {g.Genre} — {g.Games}
                    </Text>
                ))}
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },

    text: {
        color: '#fff',
    },

    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});
