import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleClearSearch
}) => (
    <View style={styles.searchContainer}>
        <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
        />
        {searchQuery ? (
            <TouchableOpacity onPress={handleClearSearch} style={styles.searchButton}>
                <Ionicons name="close" size={24} color="#aaa" />
            </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#00cc99" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 30,
        paddingHorizontal: 15,
        height: 50,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        paddingVertical: 5,
    },
    searchButton: {
        padding: 10,
    },
});

export default SearchBar;