import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, Image, ScrollView, Button,
  ActivityIndicator, StyleSheet,
} from 'react-native';
import { FavoritesContext } from '../FavoritesContext';
import { CLASICAS } from '../data/clasicas';

// MyMemory acepta 500 caracteres por consulta asi que voy a partir el texto en pedazos
const partirTexto = (texto, max = 450) => {
  const lineas = texto.split(/\r?\n/).filter((l) => l.trim() !== '');
  const pedazos = [];
  let actual = '';

  lineas.forEach((linea) => {
    // como esta linea es larga la voy a partir en pedazos
    const partes = linea.length > max ? linea.split(/(?<=\.)\s+/) : [linea];
    partes.forEach((parte) => {
      if ((actual + '\n' + parte).length > max && actual !== '') {
        pedazos.push(actual);
        actual = parte;
      } else {
        actual = actual ? actual + '\n' + parte : parte;
      }
    });
  });
  if (actual) pedazos.push(actual);
  return pedazos;
};

const traducirTexto = async (texto) => {
  const pedazos = partirTexto(texto);
  const resultado = [];
  for (const pedazo of pedazos) {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(pedazo)}&langpair=en|es`
    );
    const data = await response.json();
    if (data.responseStatus !== 200) throw new Error('Límite de traducción alcanzado');
    resultado.push(data.responseData.translatedText);
  }
  return resultado.join('\n');
};

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const esClasica = id.startsWith('c');

  const [meal, setMeal] = useState(null);
  const [traduccion, setTraduccion] = useState(null);
  const [verTraduccion, setVerTraduccion] = useState(false);
  const [traduciendo, setTraduciendo] = useState(false);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    // Las clásicas están guardadas en la app las demás se piden a la API
    if (esClasica) {
      setMeal(CLASICAS.find((c) => c.idMeal === id));
      return;
    }

    const cargarDetalle = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (e) {
        console.log('Error:', e);
      }
    };
    cargarDetalle();
  }, [id]);

  if (!meal) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  // Ingredientes: map() para armar cada texto y filter() para quitar vacíos
  const ingredientes = esClasica
    ? meal.ingredientes
    : Array.from({ length: 20 }, (_, i) => i + 1)
        .map((n) => ({
          nombre: meal[`strIngredient${n}`],
          cantidad: meal[`strMeasure${n}`],
        }))
        .filter((ing) => ing.nombre && ing.nombre.trim() !== '')
        .map((ing) => `${(ing.cantidad || '').trim()} ${ing.nombre}`.trim());

  const manejarTraduccion = async () => {
    // si ya está traducido, solo alternamos entre original y traducción
    if (traduccion) {
      setVerTraduccion(!verTraduccion);
      return;
    }
    try {
      setTraduciendo(true);
      const titulo = await traducirTexto(meal.strMeal);
      const ings = await traducirTexto(ingredientes.join('\n'));
      const instr = await traducirTexto(meal.strInstructions);
      setTraduccion({
        titulo,
        ingredientes: ings.split('\n').filter((l) => l.trim() !== ''),
        instrucciones: instr,
      });
      setVerTraduccion(true);
    } catch (e) {
      alert('No se pudo traducir. Probá de nuevo más tarde.');
    } finally {
      setTraduciendo(false);
    }
  };

  const mostrar = verTraduccion && traduccion;
  const tituloFinal = mostrar ? traduccion.titulo : meal.strMeal;
  const ingredientesFinal = mostrar ? traduccion.ingredientes : ingredientes;
  const instruccionesFinal = mostrar ? traduccion.instrucciones : meal.strInstructions;

  return (
    <ScrollView>
      {esClasica ? (
        <View style={[styles.image, styles.emojiBox]}>
          <Text style={{ fontSize: 90 }}>{meal.emoji}</Text>
        </View>
      ) : (
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      )}

      <View style={styles.content}>
        {esClasica && <Text style={styles.badge}>⭐ {meal.autor}</Text>}
        <Text style={styles.title}>{tituloFinal}</Text>
        <Text style={styles.sub}>{meal.strCategory} · {meal.strArea}</Text>

        <Button
          title={isFavorite(meal.idMeal) ? '💔 Quitar de favoritos' : '❤️ Agregar a favoritos'}
          onPress={() => toggleFavorite(meal)}
        />

        {/* Las clásicas ya están en español, no necesitan traducción */}
        {!esClasica && (
          <View style={{ marginTop: 10 }}>
            {traduciendo ? (
              <ActivityIndicator />
            ) : (
              <Button
                title={mostrar ? '🌐 Ver original (inglés)' : '🌐 Traducir al español'}
                onPress={manejarTraduccion}
                color="#2e8b57"
              />
            )}
          </View>
        )}

        <Text style={styles.section}>Ingredientes</Text>
        {ingredientesFinal.map((ing, index) => (
          <Text key={index} style={styles.text}>• {ing}</Text>
        ))}

        <Text style={styles.section}>Instrucciones</Text>
        <Text style={styles.text}>{instruccionesFinal}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 250 },
  emojiBox: { backgroundColor: '#fff3d6', justifyContent: 'center', alignItems: 'center' },
  content: { padding: 16 },
  badge: { color: '#b8860b', fontWeight: 'bold', marginBottom: 4 },
  title: { fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#666', marginBottom: 12 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  text: { fontSize: 15, lineHeight: 22 },
});