import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 46) / 2;

const MovieCard = ({ item, navigation }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(item.imdbID);

    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(item.imdbID);
        } else {
            addFavorite(item);
        }
    };

    return (
        <TouchableOpacity
            style={styles.movieCard}
            onPress={() => navigation.navigate('MovieDetails', {
                movieId: item.imdbID,
                movieTitle: item.Title
            })}
        >
            {item.Poster !== 'N/A' ? (
                <Image
                    source={{ uri: item.Poster }}
                    style={styles.poster}
                    resizeMode="cover"
                />
            ) : (
                <View style={[styles.poster, styles.posterPlaceholder]}>
                    <Ionicons name="film-outline" size={50} color="#666" />
                </View>
            )}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
            />

            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={toggleFavorite}
            >
                <Ionicons
                    name={favorite ? "heart" : "heart-outline"}
                    size={24}
                    color={favorite ? "#FF0000" : "#FFF"}
                />
            </TouchableOpacity>

            <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={1}>{item.Title}</Text>
                <View style={styles.movieDetails}>
                    <Text style={styles.movieYear}>{item.Year}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.Rated || 'PG'}</Text>
                    </View>
                </View>
            </View>
            {['G', 'PG', 'PG-13'].includes(item.Rated) && (
                <View style={styles.familyBadge}>
                    <Ionicons name="heart" size={14} color="#00cc99" />
                    <Text style={styles.familyBadgeText}>Family</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    movieCard: {
        width: ITEM_WIDTH,
        margin: 5,
        borderRadius: 16,
        overflow: 'hidden',
        height: ITEM_WIDTH * 1.5,
        position: 'relative',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    poster: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    posterPlaceholder: {
        backgroundColor: '#2a2a40',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
    },
    movieInfo: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12,
    },
    movieTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    movieDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    movieYear: {
        color: '#ddd',
        fontSize: 13,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        color: '#FFD700',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    familyBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 204, 153, 0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    familyBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 5,
        zIndex: 10,
    },
});

export default MovieCard;