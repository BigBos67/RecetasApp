//pagina principal de la app
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const buscar = () => {
    if (query.trim() === '') return;
    navigation.navigate('Resultados', { query: query.trim() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué querés cocinar?</Text>
      <Text style={styles.hint}>Buscá en inglés: chicken, pasta, beef, cake...</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: chicken"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={buscar}
      />
      <Button title="Buscar" onPress={buscar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  hint: { textAlign: 'center', color: '#666', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginBottom: 16, fontSize: 16,
  },
});