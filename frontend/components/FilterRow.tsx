import React from "react";
import { Pressable, Text, ScrollView, StyleSheet } from "react-native";

import FilterButton from '../../components/FilterButton';

export default function FilterRow({ selected, setSelected }) {
    const [isToggled, setIsToggled] = React.useState(false);

    const handleToggle = () => {
        setIsToggled(previousState => !previousState);
    };

    return (
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
                <Text style={styles.buttonText}>Genre</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
    }
});
