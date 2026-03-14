import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart } from 'victory-native';

export default function SalesPerYearChart({ data }) {
    const chartData = data.map(d => ({
        x: d.year,
        y: d.sales
    }));

    return (
        <View>
            <Text style={styles.text}>Global Sales Per Year</Text>
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
