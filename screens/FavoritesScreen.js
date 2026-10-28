// aqui es donde se guardaran las recetas que pongamos en favoritos
import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FavoritesContext } from '../FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return <Text style={styles.msg}>Todavía no tenés favoritos ❤️</Text>;
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Detalle', { id: item.idMeal })}
        >
          {item.emoji ? (
            <View style={[styles.image, styles.emojiBox]}>
              <Text style={{ fontSize: 44 }}>{item.emoji}</Text>
            </View>
          ) : (
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
          )}
          <View style={styles.info}>
            <Text style={styles.name}>{item.strMeal}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Text style={styles.remove}>Quitar 🗑️</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  msg: { textAlign: 'center', marginTop: 40, fontSize: 16 },
  card: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10,
    marginBottom: 12, overflow: 'hidden', elevation: 3,
  },
  image: { width: 100, height: 100 },
  emojiBox: { backgroundColor: '#fff3d6', justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold' },
  remove: { color: 'crimson' },
});