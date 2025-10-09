import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Appbar from '../../components/Appbar/Appbar';
import SearchBar from '../../components/Searchbar/Searchbar';
import MovieList from '../../components/MoviesList/MoviesList';
import LoadingIndicator from '../../components/Loading/Loading';
import NoResults from '../../components/NoResults/NoResults';
import { fetchMovies } from '../../utils/api';
import { shuffleArray, filterAdultContent } from '../../utils/helpers';

const MoviesPages = () => {
    const navigation = useNavigation();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        minYear: '',
        maxYear: '',
    });

    const popularSearchTerms = ['animation'];
    const randomSearchTerm = popularSearchTerms[Math.floor(Math.random() * popularSearchTerms.length)];

    useEffect(() => {
        fetchMoviesData();
    }, [page]);

    const fetchMoviesData = async () => {
        try {
            setLoading(true);
            const searchTerm = searchQuery || randomSearchTerm;

            const data = await fetchMovies(searchTerm, page);

            if (data.Response === 'True') {
                let newMovies = filterAdultContent(data.Search);

                if (page === 1) {
                    newMovies = shuffleArray(newMovies);
                    setMovies(newMovies);
                    setTotalResults(parseInt(data.totalResults));
                } else {
                    setMovies(prev => {
                        const existingIds = new Set(prev.map(movie => movie.imdbID));
                        const uniqueNewMovies = newMovies.filter(movie => !existingIds.has(movie.imdbID));
                        return [...prev, ...uniqueNewMovies];
                    });
                }
            } else {
                setPage(1);
                setMovies([]);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') return;
        setPage(1);
        fetchMoviesData();
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setPage(1);
        fetchMoviesData();
    };

    const loadMore = () => {
        if (!loading && movies.length < totalResults) {
            setPage(prev => prev + 1);
        }
    };

    const applyFilters = () => {
        setShowFilters(false);
    };

    const resetFilters = () => {
        setFilters({
            minYear: '',
            maxYear: '',
        });
    };

    const filteredMovies = movies.filter(movie => {
        const movieYear = parseInt(movie.Year);

        if (filters.minYear && movieYear < parseInt(filters.minYear)) {
            return false;
        }
        if (filters.maxYear && movieYear > parseInt(filters.maxYear)) {
            return false;
        }
        return true;
    });

    return (
        <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}>
            <StatusBar style="light" />
            <SafeAreaView style={styles.safeArea}>
                <Appbar
                    onFilterPress={() => setShowFilters(true)}
                    onFavoritesPress={() => navigation.navigate('FavoritesPage')}
                />

                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    handleClearSearch={handleClearSearch}
                />

                {loading && page === 1 ? (
                    <LoadingIndicator />
                ) : filteredMovies.length > 0 ? (
                    <MovieList
                        movies={filteredMovies}
                        loading={loading}
                        loadMore={loadMore}
                        searchQuery={searchQuery}
                        navigation={navigation}
                    />
                ) : (
                    <NoResults handleClearSearch={handleClearSearch} />
                )}
            </SafeAreaView>

            <Modal
                visible={showFilters}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFilters(false)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <LinearGradient colors={['#0c0c14', '#1a1a2e', '#16213e']} style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Filter Movies</Text>
                                    <TouchableOpacity onPress={() => setShowFilters(false)}>
                                        <Ionicons name="close" size={28} color="#fff" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.filterGroup}>
                                    <Text style={styles.filterLabel}>Release Year</Text>
                                    <View style={styles.yearContainer}>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.inputLabel}>From</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Min year"
                                                placeholderTextColor="#888"
                                                value={filters.minYear}
                                                onChangeText={text => setFilters({ ...filters, minYear: text })}
                                                keyboardType="numeric"
                                                returnKeyType="done"
                                                onSubmitEditing={() => { }}
                                                blurOnSubmit={true}
                                            />
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.inputLabel}>To</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Max year"
                                                placeholderTextColor="#888"
                                                value={filters.maxYear}
                                                onChangeText={text => setFilters({ ...filters, maxYear: text })}
                                                keyboardType="numeric"
                                                returnKeyType="done"
                                                onSubmitEditing={() => { }}
                                                blurOnSubmit={true}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.resetButton}
                                        onPress={resetFilters}
                                    >
                                        <Text style={styles.resetButtonText}>Reset Filters</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.applyButton}
                                        onPress={applyFilters}
                                    >
                                        <Text style={styles.applyButtonText}>Apply Filters</Text>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    filterGroup: {
        marginBottom: 25,
    },
    filterLabel: {
        color: '#aaa',
        fontSize: 16,
        marginBottom: 10,
    },
    yearContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputContainer: {
        width: '48%',
    },
    inputLabel: {
        color: '#ddd',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#2a2a40',
        borderRadius: 10,
        padding: 12,
        color: '#fff',
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingInput: {
        width: '30%',
    },
    ratingIcon: {
        marginLeft: 10,
    },
    typeContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    typeButton: {
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    typeButtonActive: {
        backgroundColor: '#00cc99',
        borderColor: '#00cc99',
    },
    typeButtonText: {
        color: '#ddd',
    },
    typeButtonTextActive: {
        color: '#0f2027',
        fontWeight: 'bold',
    },
    filterNote: {
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.3)',
    },
    filterNoteText: {
        color: '#ffc107',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    resetButton: {
        backgroundColor: '#2a2a40',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    resetButtonText: {
        color: '#ddd',
        fontWeight: 'bold',
    },
    applyButton: {
        backgroundColor: '#00cc99',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        flex: 1,
    },
    applyButtonText: {
        color: '#0f2027',
        fontWeight: 'bold',
    },
});

export default MoviesPages;