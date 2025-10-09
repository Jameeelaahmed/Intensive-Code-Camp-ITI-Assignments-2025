import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Appbar = ({ onFilterPress, onFavoritesPress }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('LandingPage')}
            >
                <Ionicons name="home" size={28} color="#00cc99" />
            </TouchableOpacity>

            <View style={styles.headerContent}>
                <Text style={styles.title}>Explore Movies</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onFilterPress}
                >
                    <Ionicons name="filter" size={24} color="#00cc99" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onFavoritesPress}
                >
                    <Ionicons name="heart" size={24} color="#FF0000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
    },
    homeButton: {
        marginRight: 15,
    },
    headerContent: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    familyBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 204, 153, 0.2)',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginTop: 5,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#00cc99',
        marginLeft: 5,
        fontWeight: '600',
        fontSize: 14,
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 15,
    },
});

export default Appbar;