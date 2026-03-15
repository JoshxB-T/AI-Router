import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import TagButton from "./TagButton";

export default function FilterRow({ selected, setSelected }) {

    const filters = ["All", "Platform", "Genre", "Year"];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.row}
        >
            {filters.map((filter) => (
                <TagButton
                    key={filter}
                    label={filter}
                    active={selected === filter}
                    onPress={() => setSelected(filter)}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: {
        marginVertical: 10
    }
});
