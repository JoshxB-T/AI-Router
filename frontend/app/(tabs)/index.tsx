import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';

import { getAnalyticsDashboard, getFeaturedGame } from '../../api/userService';

import FeaturedGameBanner from '../../components/FeaturedGameBanner';
import StatsGrid from '../../components/StatsGrid';
import TopGamesRow from '../../components/TopGamesRow';
import PlatformList from '../../components/PlatformRow';
import GenreList from '../../components/GenreRow';
import GamesPerYearChart from '../../components/GamesPerYearChart';
import SalesPerYearChart from '../../components/SalesPerYearChart';

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
            <FeaturedGameBanner game={dashboard.featured_game} />

            <StatsGrid stats={dashboard.stats} />

            <TopGamesRow games={dashboard.top_games} />

            <GamesPerYearChart data={dashboard.games_per_year} />

            <SalesPerYearChart data={dashboard.sales_per_year} />

            <PlatformList platforms={dashboard.top_platforms} /> 

            <GenreList genres={dashboard.top_genres} />
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
