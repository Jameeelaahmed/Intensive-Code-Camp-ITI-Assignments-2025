import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
    const navigation = useNavigation();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const translateYAnim = useRef(new Animated.Value(30)).current;
    const buttonPulseAnim = useRef(new Animated.Value(1)).current;
    const particleAnim = useRef(new Animated.Value(0)).current;
    const filmReelAnim = useRef(new Animated.Value(0)).current;

    const particles = Array(15).fill(0).map(() => ({
        x: Math.random() * Dimensions.get('window').width,
        y: Math.random() * Dimensions.get('window').height,
        size: 5 + Math.random() * 15,
        speed: 1 + Math.random() * 3,
        delay: Math.random() * 2000
    }));

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.spring(translateYAnim, {
                toValue: 0,
                friction: 7,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(particleAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            }),
            Animated.loop(
                Animated.timing(filmReelAnim, {
                    toValue: 1,
                    duration: 20000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            )
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(buttonPulseAnim, {
                    toValue: 1.05,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true
                }),
                Animated.timing(buttonPulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true
                })
            ])
        ).start();

        const timer = setTimeout(() => {
            navigation.navigate('MoviesPages');
        }, 8000);

        return () => clearTimeout(timer);
    }, []);

    const handleExplore = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1.2,
                friction: 5,
                useNativeDriver: true,
            })
        ]).start(() => {
            navigation.navigate('MoviesPages');
        });
    };

    const filmReelTransform = filmReelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const renderFilmReel = (size, position) => (
        <Animated.View style={[styles.filmReel, {
            ...position,
            width: size,
            height: size,
            transform: [{ rotate: filmReelTransform }]
        }]}>
            <View style={styles.reelCenter} />
            {[...Array(8)].map((_, i) => {
                const rotation = i * 45;
                return (
                    <View
                        key={i}
                        style={[
                            styles.reelHole,
                            {
                                transform: [
                                    { translateX: size * 0.3 },
                                    { rotate: `${rotation}deg` }
                                ]
                            }
                        ]}
                    />
                );
            })}
        </Animated.View>
    );

    return (
        <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            style={styles.container}
        >
            {particles.map((particle, index) => {
                const opacity = particleAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 0.7, 0]
                });

                const scale = particleAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 1, 0]
                });

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.particle,
                            {
                                left: particle.x,
                                top: particle.y,
                                width: particle.size,
                                height: particle.size,
                                opacity,
                                transform: [{ scale }],
                                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                            }
                        ]}
                    />
                );
            })}

            {renderFilmReel(100, { left: '10%', top: '15%' })}
            {renderFilmReel(80, { right: '12%', bottom: '20%' })}

            <Animated.View style={[styles.clapperContainer, { opacity: fadeAnim }]}>
                <Ionicons name="film" size={60} color="#FFD700" style={styles.clapperTop} />
                <Ionicons name="film" size={60} color="#FFD700" style={styles.clapperBottom} />
            </Animated.View>

            <View style={styles.content}>
                <Animated.View style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}>
                    <View style={styles.popcornContainer}>
                        <Ionicons name="film" size={80} color="#00cc99" style={styles.popcornIcon} />
                        <View style={styles.popcornPiece1} />
                        <View style={styles.popcornPiece2} />
                        <View style={styles.popcornPiece3} />
                    </View>
                    <Text style={styles.logoText}>Movies App</Text>
                </Animated.View>

                <Animated.Text style={[
                    styles.tagline,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: translateYAnim }]
                    }
                ]}>
                    Where Every Frame Tells a Story
                </Animated.Text>

                <Animated.View style={[
                    styles.featuresContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: translateYAnim }]
                    }
                ]}>
                    <Animated.View style={[styles.feature, { opacity: fadeAnim }]}>
                        <View style={styles.featureIcon}>
                            <Ionicons name="heart" size={28} color="#00cc99" />
                        </View>
                        <Text style={styles.featureText}>Family-Friendly Content</Text>
                    </Animated.View>

                    <Animated.View style={[styles.feature, { opacity: fadeAnim }]}>
                        <View style={styles.featureIcon}>
                            <Ionicons name="sparkles" size={28} color="#00cc99" />
                        </View>
                        <Text style={styles.featureText}>Personalized Recommendations</Text>
                    </Animated.View>

                    <Animated.View style={[styles.feature, { opacity: fadeAnim }]}>
                        <View style={styles.featureIcon}>
                            <Ionicons name="infinite" size={28} color="#00cc99" />
                        </View>
                        <Text style={styles.featureText}>Endless Discoveries</Text>
                    </Animated.View>
                </Animated.View>

                <Animated.View style={{
                    opacity: fadeAnim,
                    transform: [
                        { translateY: translateYAnim },
                        { scale: buttonPulseAnim }
                    ]
                }}>
                    <TouchableOpacity
                        style={styles.exploreButton}
                        onPress={handleExplore}
                    >
                        <Text style={styles.exploreButtonText}>Begin Your Journey</Text>
                        <Ionicons name="arrow-forward" size={24} color="#0f0c29" />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </LinearGradient>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        overflow: 'hidden',
    },
    content: {
        alignItems: 'center',
        marginBottom: 40,
        zIndex: 10,
    },
    particle: {
        position: 'absolute',
        borderRadius: 50,
        zIndex: 1,
    },
    filmReel: {
        position: 'absolute',
        borderRadius: 50,
        borderWidth: 10,
        borderColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.2,
        zIndex: 2,
    },
    reelCenter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFD700',
        position: 'absolute',
    },
    reelHole: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFD700',
        position: 'absolute',
    },
    clapperContainer: {
        position: 'absolute',
        top: '5%',
        right: '5%',
        width: 120,
        height: 120,
        zIndex: 3,
    },
    clapperTop: {
        position: 'absolute',
        top: 10,
        right: 10,
        transform: [{ rotate: '-15deg' }]
    },
    clapperBottom: {
        position: 'absolute',
        top: 40,
        right: 30,
        transform: [{ rotate: '15deg' }]
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    popcornContainer: {
        position: 'relative',
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popcornIcon: {
        zIndex: 2,
        transform: [{ rotate: '15deg' }]
    },
    popcornPiece1: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFD700',
        top: 30,
        left: 40,
        transform: [{ rotate: '45deg' }],
        zIndex: 1,
    },
    popcornPiece2: {
        position: 'absolute',
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#FFD700',
        bottom: 40,
        right: 40,
        transform: [{ rotate: '-30deg' }],
        zIndex: 1,
    },
    popcornPiece3: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFD700',
        top: 50,
        right: 50,
        transform: [{ rotate: '10deg' }],
        zIndex: 1,
    },
    logoText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
        letterSpacing: 2,
        textShadowColor: 'rgba(255, 255, 255, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    tagline: {
        fontSize: 24,
        color: '#eee',
        textAlign: 'center',
        marginBottom: 40,
        maxWidth: width * 0.8,
        lineHeight: 34,
    },
    featuresContainer: {
        marginBottom: 40,
        width: '100%',
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        width: width * 0.85,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    featureIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 204, 153, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    featureText: {
        color: '#fff',
        fontSize: 18,
        flex: 1,
    },
    exploreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD700',
        paddingVertical: 18,
        paddingHorizontal: 35,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    exploreButtonText: {
        color: '#0f0c29',
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 15,
    },
    footerText: {
        position: 'absolute',
        bottom: 40,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        letterSpacing: 1,
        zIndex: 10,
    },
});

export default LandingPage;