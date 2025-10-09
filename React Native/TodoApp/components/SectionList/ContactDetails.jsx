import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const ContactDetails = ({ route, navigation }) => {
    const { contact } = route.params;

    return (
        <BlurView intensity={100} tint="dark" style={styles.absoluteFill}>
            <View style={styles.container}>
                {/* Header with back button */}
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#5E9DFF" />
                    </Pressable>
                    <Text style={styles.headerText}>Contact Details</Text>
                </View>

                {/* Contact Card */}
                <View style={styles.contactCard}>
                    <View style={styles.imageContainer}>
                        {contact.gender === 'F' ? (
                            <Image source={require('../../assets/F.jpg')} style={styles.profileImage} />
                        ) : (
                            <Image source={require('../../assets/M.jpg')} style={styles.profileImage} />
                        )}
                    </View>

                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactNumber}>{contact.number}</Text>

                    {/* Action Buttons */}
                    <View style={styles.actionsContainer}>
                        <Pressable style={styles.actionButton}>
                            <Ionicons name="call" size={24} color="#5E9DFF" />
                            <Text style={styles.actionText}>Call</Text>
                        </Pressable>

                        <Pressable style={styles.actionButton}>
                            <Ionicons name="chatbubble" size={24} color="#5E9DFF" />
                            <Text style={styles.actionText}>Message</Text>
                        </Pressable>

                        <Pressable style={styles.actionButton}>
                            <Ionicons name="mail" size={24} color="#5E9DFF" />
                            <Text style={styles.actionText}>Email</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    absoluteFill: {
        flex: 1,
        backgroundColor: 'rgba(10,15,25,0.7)',
        paddingTop: 15,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(20,25,40,0.95)',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 15,
        marginBottom: 30,
    },
    backButton: {
        marginRight: 15,
    },
    headerText: {
        color: '#5E9DFF',
        fontWeight: '700',
        fontSize: 18,
        letterSpacing: 1.2,
    },
    contactCard: {
        backgroundColor: 'rgba(25,30,45,0.65)',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(100,110,140,0.15)',
    },
    imageContainer: {
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    contactName: {
        fontSize: 28,
        fontWeight: '600',
        color: '#EDF2F7',
        marginBottom: 8,
        textAlign: 'center',
    },
    contactNumber: {
        fontSize: 18,
        color: '#A0AEC0',
        marginBottom: 40,
        textAlign: 'center',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    actionButton: {
        backgroundColor: 'rgba(30,35,50,0.7)',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(100,110,140,0.15)',
        minWidth: 80,
    },
    actionText: {
        color: '#5E9DFF',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
    },
});

export default ContactDetails;