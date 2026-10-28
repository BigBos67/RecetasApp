import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoritesContext } from './FavoritesContext';

import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BuscarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={HomeScreen} options={{ title: 'Buscador de recetas' }} />
      <Stack.Screen name="Resultados" component={ResultsScreen} />
      <Stack.Screen name="Detalle" component={DetailScreen} options={{ title: 'Detalle de receta' }} />
    </Stack.Navigator>
  );
}

function FavoritosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MisFavoritos" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
      <Stack.Screen name="Detalle" component={DetailScreen} options={{ title: 'Detalle de receta' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const isFavorite = (id) => favorites.some((f) => f.idMeal === id);

  const toggleFavorite = (meal) => {
    if (isFavorite(meal.idMeal)) {
      // filter(): quitamos la receta de la lista
      setFavorites(favorites.filter((f) => f.idMeal !== meal.idMeal));
    } else {
      setFavorites([...favorites, meal]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Buscar" component={BuscarStack} />
          <Tab.Screen name="Favoritos" component={FavoritosStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
}
