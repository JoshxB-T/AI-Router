import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { getGames } from '../../api/userService';

type VideoGame = {
    id: number;
    name: string;
    year_of_release: number | null;
};

export default function AboutScreen() {
    const [message, setMessage] = useState<VideoGame[]>([]);

    const getResponse = async() => {
        try {
            const games = await getGames();
            setMessage(games);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getResponse();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={message}
                keyExtractor={(item) => item.id.toString()}
                renderItem={ ({ item}) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.name} ({item.year_of_release ?? "Unknown"}) </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#25292e',
    },

    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#444",
        width: "100%",
    },

    text: {
        color: '#fff',
    },
});
