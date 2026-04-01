import React, { useState } from 'react';
import { FlatList, TextInput, Text, View, StyleSheet } from 'react-native';

import FilterRow from '../../components/FilterRow';
import { searchGame } from '../../api/userService';

export default function SearchScreen() {
    const filters = ["Sports", "Role-Playing", "Action"];
    const [filter, setFilter] = useState("All");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    async function handleSearch(text) {
        setQuery(text);

        try {
            const data = await searchGame(filter);
            setResults(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={styles.container}>
            <FilterRow
                filters={filters}
            />

            <TextInput
                style={styles.input}
                placeholder="Search games..."
                value={query}
                onChangeText={handleSearch}
            />

            <FlatList
                data={results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.result}>
                        {item.Name} ({item.Year_of_Release})
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },
    
    result: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#eee"
    }
});
