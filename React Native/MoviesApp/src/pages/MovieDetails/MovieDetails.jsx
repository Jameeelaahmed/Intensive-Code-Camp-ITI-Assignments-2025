import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    Linking,
    Share
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getMovieDetails } from '../../utils/api';

const MovieDetails = ({ route, navigation }) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this movie: ${movie.Title} (${movie.Year})\nIMDb: ${movie.imdbRating}/10\n\n${movie.Plot}`,
                url: `https://www.imdb.com/title/${movie.imdbID}`,
                title: movie.Title
            });
        } catch (error) {
            console.error('Error sharing movie:', error);
        }
    };

    const openIMDb = () => {
        if (movie?.imdbID) {
            Linking.openURL(`https://www.imdb.com/title/${movie.imdbID}`);
        }
    };

    if (loading) {
        return (
            <LinearGradient colors={['#0c0c14', '#1a1a2e', '#16213e']} style={styles.container}>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#00cc99" />
                    <Text style={styles.loadingText}>Loading movie details...</Text>
                </View>
            </LinearGradient>
        );
    }

    if (!movie) {
        return (
            <LinearGradient colors={['#0c0c14', '#1a1a2e', '#16213e']} style={styles.container}>
                <View style={styles.noMovieContainer}>
                    <Ionicons name="sad-outline" size={60} color="#555" />
                    <Text style={styles.noMovieText}>Movie details not found</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={['#0c0c14', '#1a1a2e', '#16213e']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.posterContainer}>
                    {movie.Poster !== 'N/A' ? (
                        <Image
                            source={{ uri: movie.Poster }}
                            style={styles.poster}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={[styles.poster, styles.posterPlaceholder]}>
                            <Ionicons name="film-outline" size={80} color="#666" />
                        </View>
                    )}
                    <LinearGradient
                        colors={['transparent', 'rgba(12, 12, 20, 0.9)']}
                        style={styles.posterGradient}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{movie.Title} ({movie.Year})</Text>

                    <View style={styles.ratingContainer}>
                        <View style={styles.imdbRating}>
                            <Ionicons name="star" size={20} color="#F5C518" />
                            <Text style={styles.ratingText}>{movie.imdbRating}/10</Text>
                            <Text style={styles.ratingLabel}>IMDb</Text>
                        </View>

                        <Text style={styles.runtime}>{movie.Runtime}</Text>

                        <View style={styles.genreContainer}>
                            {movie.Genre.split(', ').map((genre, index) => (
                                <View key={index} style={styles.genreBadge}>
                                    <Text style={styles.genreText}>{genre}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={openIMDb}>
                            <Ionicons name="film" size={28} color="#F5C518" />
                            <Text style={styles.actionButtonText}>IMDb</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                            <Ionicons name="share-social" size={24} color="#00cc99" />
                            <Text style={styles.actionButtonText}>Share</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>Plot</Text>
                    <Text style={styles.plot}>{movie.Plot}</Text>

                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Director:</Text>
                            <Text style={styles.detailValue}>{movie.Director}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Cast:</Text>
                            <Text style={styles.detailValue}>{movie.Actors}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Language:</Text>
                            <Text style={styles.detailValue}>{movie.Language}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Country:</Text>
                            <Text style={styles.detailValue}>{movie.Country}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Awards:</Text>
                            <Text style={styles.detailValue}>{movie.Awards}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const { width } = Dimensions.get('window');
const POSTER_HEIGHT = width * 0.7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#aaa',
        marginTop: 15,
        fontSize: 16,
    },
    noMovieContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    noMovieText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 20,
        textAlign: 'center',
    },
    backButton: {
        marginTop: 30,
        backgroundColor: '#00cc99',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    backButtonText: {
        color: '#0c0c14',
        fontWeight: 'bold',
        fontSize: 16,
    },
    posterContainer: {
        height: POSTER_HEIGHT,
        width: '100%',
        position: 'relative',
    },
    poster: {
        width: '100%',
        height: '100%',
    },
    posterPlaceholder: {
        backgroundColor: '#1a1a2e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    posterGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    ratingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 20,
    },
    imdbRating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(245, 197, 24, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 15,
    },
    ratingText: {
        color: '#F5C518',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
    },
    ratingLabel: {
        color: '#F5C518',
        fontSize: 14,
        fontWeight: '600',
    },
    runtime: {
        color: '#aaa',
        fontSize: 16,
        marginRight: 15,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        width: '100%',
    },
    genreBadge: {
        backgroundColor: 'rgba(0, 204, 153, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    genreText: {
        color: '#00cc99',
        fontSize: 14,
        fontWeight: '600',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    actionButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 15,
        borderRadius: 15,
        width: '45%',
    },
    actionButtonText: {
        color: '#fff',
        marginTop: 8,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00cc99',
        marginBottom: 10,
    },
    plot: {
        color: '#ddd',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 15,
        padding: 20,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    detailLabel: {
        width: 100,
        color: '#00cc99',
        fontWeight: 'bold',
        fontSize: 16,
    },
    detailValue: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
});

export default MovieDetails;