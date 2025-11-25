import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { buscarDespesas, excluirDespesa } from '../database/database';

export default function ReportScreen() {
  const [despesas, setDespesas] = useState([]);
  const [total, setTotal] = useState(0);

  
  useFocusEffect(
    React.useCallback(() => {
      async function carregar() {
        try {
          const dados = await buscarDespesas();
          setDespesas(dados);

          const soma = dados.reduce((acc, item) => acc + Number(item.valor), 0);
          setTotal(soma);
        } catch (error) {
          console.log('Erro ao carregar despesas:', error);
        }
      }

      carregar();
    }, [])
  );


  async function remover(id) {
    Alert.alert(
      'Confirmar',
      'Deseja realmente excluir esta despesa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: async () => {
          await excluirDespesa(id);
          const dados = await buscarDespesas();
          setDespesas(dados);
          const soma = dados.reduce((acc, item) => acc + Number(item.valor), 0);
          setTotal(soma);
        }}
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Resumo Financeiro</Text>
      <Text style={styles.total}>Total Gasto: R$ {total.toFixed(2)}</Text>

      <FlatList
        data={despesas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.valor}>R$ {item.valor.toFixed(2)}</Text>
            <Text style={styles.categoria}>{item.categoria}</Text>

            <TouchableOpacity style={styles.delete} onPress={() => remover(item.id)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecf0f1', padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  total: { fontSize: 18, marginBottom: 15, color: '#27ae60' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  descricao: { fontSize: 16, fontWeight: '600' },
  valor: { fontSize: 16, color: '#e74c3c' },
  categoria: { fontSize: 14, color: '#7f8c8d' },
  delete: { backgroundColor: '#c0392b', padding: 8, borderRadius: 6, marginTop: 10, alignItems: 'center' },
  deleteText: { color: '#fff', fontWeight: 'bold' },
});
