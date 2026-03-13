import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet } from "react-native";

import { getAnalyticsDashboard } from '../../api/userService';

import StatsGrid from '../../components/StatsGrid';
import TopGamesRow from '../../components/TopGamesRow';
import PlatformList from '../../components/PlatformList';
import GenreList from '../../components/GenreList';


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
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <StatsGrid stats={dashboard.Stats} />

            <TopGamesRow games={dashboard.Top_Games} />

            <PlatformList platforms={dashboard.Top_Platforms} /> 

            <GenreList genres={dashboard.Top_Genres} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        flex: 1,
        padding: 5
    },

    text: {
        fontSize: 18,
        color: '#000'
    }
});
