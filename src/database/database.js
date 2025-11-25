import * as SQLite from 'expo-sqlite';

let db;

export async function openDatabase() {
  db = await SQLite.openDatabaseAsync('despesas.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS despesas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT,
      valor REAL,
      categoria TEXT
    );
  `);
}

export async function inserirDespesa(descricao, valor, categoria) {
  await db.runAsync(
    'INSERT INTO despesas (descricao, valor, categoria) VALUES (?, ?, ?);',
    [descricao, valor, categoria]   
  );
}

export async function buscarDespesas() {
  return await db.getAllAsync('SELECT * FROM despesas;');
}

export async function excluirDespesa(id) {
  await db.runAsync('DELETE FROM despesas WHERE id = ?;', [id]);
}
