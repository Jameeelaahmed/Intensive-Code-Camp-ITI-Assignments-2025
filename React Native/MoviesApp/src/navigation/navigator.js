import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from '../pages/landingpage/Landing';
import MoviesPages from '../pages/Movies/MoviesPages';
import MovieDetails from '../pages/MovieDetails/MovieDetails';
import FavoritesPage from '../pages/Favorites/FavoritesPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#0f2027',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            initialRouteName="LandingPage"
        >
            <Stack.Screen
                name="LandingPage"
                component={LandingPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MoviesPages"
                component={MoviesPages}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MovieDetails"
                component={MovieDetails}
                options={({ route }) => ({
                    title: route.params.movieTitle || 'Movie Details',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: '#0c0c14',
                        shadowColor: 'transparent',
                    },
                    headerTintColor: '#00cc99',
                })}
            />
            <Stack.Screen
                name="FavoritesPage"
                component={FavoritesPage}
                options={{
                    title: 'My Favorites',
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;