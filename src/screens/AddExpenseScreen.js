import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { inserirDespesa } from '../database/database'; 
import { useNavigation } from '@react-navigation/native';

export default function AddExpenseScreen() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Alimentação');

  const navigation = useNavigation();

  async function handleAddExpense() {
    if (!title || !value) {
      alert("Preencha a descrição e o valor!");
      return;
    }

  
    await inserirDespesa(title, Number(value), category);


    navigation.navigate("Report");
  }

  const categories = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Outros'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Despesa</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <Text style={styles.subtitle}>Categoria</Text>

      <View style={styles.categoryContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              category === item && styles.activeCategory
            ]}
            onPress={() => setCategory(item)}
          >
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleAddExpense}>
        <Text style={styles.saveText}>Salvar Despesa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#666',
    padding: 10,
    borderRadius: 20
  },
  activeCategory: { backgroundColor: '#4CAF50' },
  categoryText: { color: '#000' },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  saveText: { color: '#fff', fontWeight: 'bold' }
});
