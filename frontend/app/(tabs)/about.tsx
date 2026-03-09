import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getRoot } from '../../api/userService';

export default function AboutScreen() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getRoot();
                setMessage(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Top</Text>
            <Text style={styles.text}>{message}</Text>
            <Text style={styles.text}>Bottom</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: '#fff',
    },
});
