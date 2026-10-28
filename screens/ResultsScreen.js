import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator, StyleSheet,
} from 'react-native';
import { CLASICAS } from '../data/clasicas';

export default function ResultsScreen({ route, navigation }) {
  const { query } = route.params;
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filter(): clásicas que coinciden con lo buscado
  const q = query.toLowerCase();
  const clasicas = CLASICAS.filter(
    (c) =>
      c.strMeal.toLowerCase().includes(q) ||
      c.palabras.some((p) => p.includes(q) || q.includes(p))
  );

  useEffect(() => {
    navigation.setOptions({ title: `Resultados: ${query}` });

    const cargarRecetas = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (e) {
        setError('No se pudo conectar con la API');
      } finally {
        setLoading(false);
      }
    };

    cargarRecetas();
  }, [query]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  // Clásicas primero, después las de la API
  const data = [...clasicas, ...meals];

  if (data.length === 0) {
    return <Text style={styles.msg}>{error || 'No se encontraron recetas 😕'}</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => {
        const esClasica = item.idMeal.startsWith('c');
        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalle', { id: item.idMeal })}
          >
            {esClasica ? (
              <View style={[styles.image, styles.emojiBox]}>
                <Text style={{ fontSize: 44 }}>{item.emoji}</Text>
              </View>
            ) : (
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            )}
            <View style={styles.info}>
              {esClasica && <Text style={styles.badge}>⭐ Receta clásica</Text>}
              <Text style={styles.name}>{item.strMeal}</Text>
              <Text style={styles.sub}>{item.strCategory} · {item.strArea}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
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
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  badge: { color: '#b8860b', fontWeight: 'bold', fontSize: 12, marginBottom: 2 },
  name: { fontSize: 16, fontWeight: 'bold' },
  sub: { color: '#666', marginTop: 4 },
});