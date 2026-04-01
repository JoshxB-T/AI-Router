import React from "react";
import { View, Pressable, Text, ScrollView, StyleSheet } from "react-native";

import FilterButton from './FilterButton';

export default function FilterRow({ filters }) {
    const [isToggled, setIsToggled] = React.useState(false);

    const handleToggle = () => {
        setIsToggled(previousState => !previousState);
    };

    return (
        <View style={styles.section}>
            <Text style={styles.buttonText}>Genre</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.row}
            >
                <Pressable
                    onPress={handleToggle}
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: isToggled ? '#cc0000' : '#E5E5E5',
                            opacity: pressed ? 0.7 : 1,
                        },
                    ]}
                >
                    {filters.map((filter, index) => (
                        <FilterButton key={index} style={styles.card}>
                            <Text style={styles.name}>{filter}</Text>
                        </FilterButton>
                    ))}
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 10
    },

    row: {
        marginVertical: 10,
        marginBottom: 10,
        height: 1
    },

    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    
});
