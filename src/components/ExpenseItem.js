import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function ExpenseItem({ item }) {
return (
<View style={styles.container}>
<View>
<Text style={styles.desc}>{item.descricao}</Text>
<Text style={styles.cat}>{item.categoria} • {new Date(item.data).toLocaleDateString()}</Text>
</View>
<Text style={styles.valor}>R$ {Number(item.valor).toFixed(2)}</Text>
</View>
);
}


const styles = StyleSheet.create({
container: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
desc: { fontSize: 16, fontWeight: '600' },
cat: { fontSize: 12, color: '#666' },
valor: { fontSize: 16, fontWeight: '700' }
});