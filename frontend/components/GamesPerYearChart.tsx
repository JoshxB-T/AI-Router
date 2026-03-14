import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart } from 'victory-native';

export default function GamesPerYearChart({ data }) {
    const chartData = data.map(d => ({
        x: d.year,
        y: d.games
    }));

    return (
        <View>
            <Text style={styles.text}>Game Releases Per Year</Text>
            <VictoryChart>
                <VictoryLine data={chartData} />
            </VictoryChart>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
});
