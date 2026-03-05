import { StyleSheet, View } from 'react-native';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background.png');

export default function PicScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} />
            </View>
            <View style={styles.footerContainer}>
                <Button label="Choose a photo" />
                <Button label="Use this photo" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },

    imageContainer: {
        flex: 1,
    },

    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
});
