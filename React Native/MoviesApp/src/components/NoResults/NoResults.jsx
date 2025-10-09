import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NoResults = ({ handleClearSearch }) => (
    <View style={styles.noResultsContainer}>
        <Ionicons name="happy-outline" size={60} color="#00cc99" />
        <Text style={styles.noResultsText}>No movies found</Text>
        <Text style={styles.noResultsSubtext}>
            Try searching for different family-friendly movies
        </Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={handleClearSearch}>
            <Text style={styles.tryAgainText}>Show Popular Movies</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 100,
    },
    noResultsText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 20,
        textAlign: 'center',
    },
    noResultsSubtext: {
        color: '#aaa',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    tryAgainButton: {
        marginTop: 20,
        backgroundColor: '#00cc99',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
    },
    tryAgainText: {
        color: '#0f2027',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default NoResults;