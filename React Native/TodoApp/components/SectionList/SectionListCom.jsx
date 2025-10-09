import { View, Text, Pressable, SectionList, StyleSheet, Image, TextInput, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
const CONTACTS = [
    { name: 'Alice', number: '123-456-7890', gender: 'F' },
    { name: 'Amina', number: '123-111-2222', gender: 'F' },
    { name: 'Ahmed', number: '111-222-3333', gender: 'M' },
    { name: 'Amr', number: '111-333-4444', gender: 'M' },
    { name: 'Bob', number: '234-567-8901', gender: 'M' },
    { name: 'Basma', number: '234-111-2222', gender: 'F' },
    { name: 'Charlie', number: '345-678-9012', gender: 'F' },
    { name: 'Carmen', number: '345-222-3333', gender: 'F' },
    { name: 'David', number: '456-789-0123', gender: 'M' },
    { name: 'Dina', number: '555-666-7777', gender: 'F' },
    { name: 'Eman', number: '222-333-4444', gender: 'F' },
    { name: 'Ehab', number: '222-444-5555', gender: 'M' },
    { name: 'Fady', number: '333-444-5555', gender: 'M' },
    { name: 'Farah', number: '333-555-6666', gender: 'F' },
    { name: 'Ghada', number: '444-555-6666', gender: 'F' },
    { name: 'Gamal', number: '444-666-7777', gender: 'M' },
    { name: 'Hassan', number: '555-666-7778', gender: 'M' },
    { name: 'Huda', number: '555-777-8888', gender: 'F' },
    { name: 'Ibrahim', number: '666-777-8888', gender: 'M' },
    { name: 'Iman', number: '666-888-9999', gender: 'F' },
    { name: 'Jana', number: '777-888-9999', gender: 'F' },
    { name: 'Jad', number: '777-999-0000', gender: 'M' },
]

const SectionListCom = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, []);

    const filteredContacts = CONTACTS.filter(
        c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.number.includes(search)
    )
    const grouped = filteredContacts.reduce((acc, contact) => {
        const firstLetter = contact.name[0].toUpperCase()
        if (!acc[firstLetter]) acc[firstLetter] = []
        acc[firstLetter].push(contact)
        return acc
    }, {})

    const SECTIONS = Object.keys(grouped)
        .sort()
        .map(letter => ({
            title: letter,
            data: grouped[letter],
        }))

    const handleContactPress = (contact) => {
        navigation.navigate('ContactDetails', { contact });
    };
    return (
        <BlurView intensity={100} tint="dark" style={styles.absoluteFill}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#A0AEC0" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search contacts..."
                    placeholderTextColor="#A0AEC0"
                    value={search}
                    onChangeText={setSearch}
                    selectionColor="#5E9DFF"
                />
            </View>


            <SectionList
                showsVerticalScrollIndicator={false}
                sections={SECTIONS}
                keyExtractor={(item, idx) => item.name + idx}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleContactPress(item)}>
                        <View style={styles.item}>
                            <View style={styles.row}>
                                {item.gender === 'F' ? (
                                    <Image source={require('../../assets/F.jpg')} style={styles.image} />
                                ) : (
                                    <Image source={require('../../assets/M.jpg')} style={styles.image} />
                                )}
                                <View>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.number}>{item.number}</Text>
                                </View>
                            </View>
                            <Ionicons name="call" size={24} color="#5E9DFF" />
                        </View>
                    </Pressable>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.listContent}
                stickySectionHeadersEnabled={true}
            />
        </BlurView>
    );
};

const styles = StyleSheet.create({
    absoluteFill: {
        flex: 1,
        backgroundColor: 'rgba(10,15,25,0.7)',
        paddingTop: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(30,35,50,0.7)',
        marginTop: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        color: '#EDF2F7',
        paddingVertical: 14,
        fontSize: 16,
        fontWeight: '500',
    },
    header: {
        backgroundColor: 'rgba(20,25,40,0.95)',
        paddingVertical: 8,
        paddingHorizontal: 25,
    },
    headerText: {
        color: '#5E9DFF',
        fontWeight: '700',
        fontSize: 16,
        letterSpacing: 1.2,
    },
    item: {
        backgroundColor: 'rgba(25,30,45,0.65)',
        padding: 16,
        marginHorizontal: 20,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(100,110,140,0.15)',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 17,
        fontWeight: '600',
        color: '#EDF2F7',
        marginBottom: 3,
    },
    number: {
        fontSize: 14,
        color: '#A0AEC0',
    },
    separator: {
        height: 8,
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    listContent: {
        paddingBottom: 30,
    },
});

export default SectionListCom;