import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getRoot } from '../../api/userService';

export default function AboutScreen() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://10.0.0.24:8000/")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log(data.data);
                setMessage(data.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Top</Text>
            <Text style={styles.text}>I {message} I</Text>
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
