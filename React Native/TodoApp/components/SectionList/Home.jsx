import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

const Home = () => {
    return (
        <BlurView intensity={100} tint="dark" style={styles.absoluteFill}>
            <View style={styles.container}>
                <View style={styles.welcomeCard}>
                    <Text style={styles.welcomeTitle}>Welcome!</Text>
                    <Text style={styles.welcomeSubtitle}>to Your Contact App</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    welcomeCard: {
        backgroundColor: 'rgba(25,30,45,0.85)',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(100,110,140,0.15)',
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#5E9DFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#EDF2F7',
        marginBottom: 20,
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: 16,
        color: '#A0AEC0',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    emoji: {
        fontSize: 40,
    },
});

export default Home;