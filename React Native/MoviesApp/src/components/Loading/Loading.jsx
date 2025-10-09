import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingIndicator = () => (
    <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00cc99" />
        <Text style={styles.loadingText}>Finding movies...</Text>
    </View>
);

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    loadingText: {
        color: '#aaa',
        marginTop: 15,
        fontSize: 16,
    },
});

export default LoadingIndicator;