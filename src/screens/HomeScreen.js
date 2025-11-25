import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { buscarDespesas } from '../database/database'; 

export default function HomeScreen() {
  const navigation = useNavigation();

  const [saldoInicial, setSaldoInicial] = useState(8000); 
  const [limite, setLimite] = useState(2500); 
  const [despesas, setDespesas] = useState([]);
  const [saldoAtual, setSaldoAtual] = useState(saldoInicial);

  
  useFocusEffect(
    React.useCallback(() => {
      async function carregarDespesas() {
        try {
          const todasDespesas = await buscarDespesas(); 
          setDespesas(todasDespesas);

          const totalGasto = todasDespesas.reduce((acc, item) => acc + item.valor, 0);
          const novoSaldo = saldoInicial - totalGasto;
          setSaldoAtual(novoSaldo);

          if (totalGasto > limite) {
            Alert.alert(
              'Atenção!',
              `Você já gastou R$${totalGasto.toFixed(2)}, ultrapassando seu limite de R$${limite}!`
            );
          }
        } catch (error) {
          console.log('Erro ao buscar despesas:', error);
        }
      }

      carregarDespesas();
    }, [])
  );

  
  const renderDespesa = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardDescricao}>{item.descricao}</Text>
      <Text style={styles.cardValor}>R$ {item.valor.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Despesas</Text>
      <Text style={styles.subtitle}>Organize seu dinheiro de forma simples</Text>

      {/* Imagem */}
      <Image
        source={require('../../assets/money.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Saldo */}
      <View style={styles.saldoContainer}>
        <Text style={styles.saldoLabel}>Saldo Atual:</Text>
        <Text style={[styles.saldoValue, saldoAtual < 0 && { color: 'red' }]}>
          R$ {saldoAtual.toFixed(2)}
        </Text>
      </View>

      {/* Lista de despesas */}
      {despesas.length > 0 && (
        <FlatList
          data={despesas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDespesa}
          style={styles.listaDespesas}
        />
      )}

      {/* Botões */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.buttonText}>Adicionar Despesa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("Report", { despesas, saldoAtual })}
      >
        <Text style={styles.secondaryButtonText}>Ver Relatório</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2E7D32', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20 },
  image: { width: 260, height: 260, marginBottom: 20 },
  saldoContainer: { marginVertical: 20, alignItems: 'center' },
  saldoLabel: { fontSize: 18, color: '#555' },
  saldoValue: { fontSize: 26, fontWeight: 'bold', color: '#2E7D32' },
  listaDespesas: { width: '100%', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardDescricao: { fontSize: 16, color: '#333' },
  cardValor: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32' },
  button: { backgroundColor: '#2E7D32', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 12, marginBottom: 15, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  secondaryButton: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#2E7D32' },
  secondaryButtonText: { color: '#2E7D32', fontWeight: 'bold', fontSize: 18 },
});
