import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import Card from '../../components/Card';
import StatsGrid from '../../components/StatsGrid';
import ScrollRow from '../../components/ScrollRow';
import PlatformList from '../../components/PlatformList';
import GenreList from '../../components/GenreList';
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
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <StatsGrid stats={dashboard.Stats} />

            <ScrollRow games={dashboard.Top_Games} />

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
        padding: 5,
    },

    text: {
        fontSize: 18,
        color: '#000'
    }
});
