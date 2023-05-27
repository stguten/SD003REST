import sqlite3 from "sqlite3";

const db = new sqlite3.Database('./.data/database.db', (err) => {
  if (err) {
    console.error(`Erro ao conectar-se ao banco de dados: ${err}`);
  } else {
    db.run("PRAGMA journal_mode=WAL");
    db.run("PRAGMA synchronous=OFF");
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  }
});

export default db;
