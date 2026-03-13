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
        return <View style={styles.container}><Text style={styles.text}>Loading...</Text></View>;
    }

    return (
        <ScrollView style={{ padding: 5 }}>
            <View style={styles.statsGrid}>
                <Card style={styles.statCard}>
                    <Text style={styles.statNumber}>{dashboard.Stats.Total_Games}</Text>
                    <Text style={styles.statLabel}>Total Games</Text>
                </Card>
    
                <Card>
                    <Text style={styles.statNumber}>{dashboard.Stats.Platforms}</Text>
                    <Text style={styles.statLabel}>Platforms</Text>
                </Card>

                <Card>
                    <Text style={styles.statNumber}>{dashboard.Stats.Publishers}</Text>
                    <Text style={styles.statLabel}>Publishers</Text>
                </Card>

                <Card>
                    <Text style={styles.statNumber}>{dashboard.Stats.Genres}</Text>
                    <Text style={styles.statLabel}>Genres</Text>
                </Card>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Top Games</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {dashboard.Top_Games.map((game, index) => (
                        <Card key={index} style={styles.card}>
                            <Text style={styles.statLabel}>{game.Name}</Text>
                            <Text style={styles.statNumber}>{game.Global_Sales}M</Text> 
                        </Card>
                    ))}
                </ScrollView>
            </View>

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
                        {g.Genre} — {g.Games} games
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
        justifyContent: 'center'
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    
    statCard: {
        width: "48%",
        alignItems: "center"
    },
    
    statNumber: {
        fontSize: 22,
        fontWeight: "bold"
    },
    
    statLabel: {
        fontSize: 14,
        color: "#666"
    },

    section: {
        marginTop: 10
    },

    card: {
        width: 150,
        marginRight: 12
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },

    text: {
        color: '#fff'
    },

    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff'
    },
});
