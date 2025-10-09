import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../../context/FavoritesContext';
import MovieCard from '../../components/MovieCard/MovieCard';

const FavoritesPage = () => {
    const navigation = useNavigation();
    const { favorites } = useFavorites();

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={28} color="#00cc99" />
            </TouchableOpacity>
            <Text style={styles.title}>My Favorites</Text>
            <View style={styles.placeholder} />
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={80} color="#666" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>
                Start adding movies to your favorites by tapping the heart icon!
            </Text>
            <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => navigation.navigate('MoviesPages')}
            >
                <Text style={styles.exploreButtonText}>Explore Movies</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}>
            <StatusBar style="light" />
            <SafeAreaView style={styles.safeArea}>
                {renderHeader()}

                {favorites.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <FlatList
                        data={favorites}
                        renderItem={({ item }) => (
                            <MovieCard item={item} navigation={navigation} />
                        )}
                        keyExtractor={(item) => item.imdbID}
                        numColumns={2}
                        contentContainerStyle={styles.list}
                        columnWrapperStyle={styles.row}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    placeholder: {
        width: 38,
    },
    list: {
        paddingHorizontal: 15,
        paddingBottom: 30,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    },
    exploreButton: {
        backgroundColor: '#00cc99',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    exploreButtonText: {
        color: '#0f2027',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FavoritesPage;
