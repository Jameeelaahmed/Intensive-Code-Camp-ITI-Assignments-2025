import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = ({ movies, loading, loadMore, searchQuery, navigation }) => (
    <View style={styles.mainContent}>
        <Text style={styles.sectionTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : 'Popular Movies'}
        </Text>
        <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard item={item} navigation={navigation} />}
            keyExtractor={(item, index) => `${item.imdbID}-${index}`}
            numColumns={2}
            contentContainerStyle={styles.list}
            columnWrapperStyle={styles.row}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListFooterComponent={
                loading ? (
                    <View style={styles.footerLoader}>
                        <ActivityIndicator size="small" color="#00cc99" />
                        <Text style={styles.footerText}>Loading more movies...</Text>
                    </View>
                ) : null
            }
        />
    </View>
);

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
        marginLeft: 5,
        paddingHorizontal: 10,
    },
    list: {
        paddingBottom: 30,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    footerLoader: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    footerText: {
        color: '#aaa',
        marginTop: 10,
    },
});

export default MovieList;