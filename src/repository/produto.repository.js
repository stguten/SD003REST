import db from "../config/sqlite.config.js";

async function inserirProduto(dados) {
  return new Promise((resolve, reject) => {
    db.run("BEGIN");
    db.run(
      "INSERT INTO produtos (produto, quantidade, quantidade_minima, quantidade_maxima) VALUES (?,?,?,?)",
      dados,
      function (error) {
        if (error) {
          db.run("ROLLBACK");
          console.error("Erro ao salvar registro:", error);
          return reject(error);
        }
        db.run("COMMIT");
        return resolve(this.lastID);
      }
    );
  });
}

async function buscarProduto(numeroProduto) {
  return new Promise((resolve, reject) => {
    try {
      db.get("SELECT * FROM produtos where id = ?", [numeroProduto],(err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    } catch (error) {}
  });
}

async function listarProdutos() {
  return new Promise((resolve, reject) => {
    try {
      db.all("SELECT * FROM produtos", (err, rows) => {
        if (err) return reject("Ocorreu um erro!");
        return resolve(rows);
      });
    } catch (error) {
      console.error(error);
    }
  });
}

async function removerProduto(numeroProduto) {
  return new Promise((resolve, reject) => {
    try {
      db.run(
        "DELETE FROM produtos where id = ?",
        numeroProduto,
        function (err) {
          if (err) return reject("Ocorreu um erro!");
          return resolve(this.changes);
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
}

async function atualizarProduto(numeroProduto, dadosAtualizacao) {  
  let query = 'UPDATE produtos SET ';  
  const params = [];

  ['produto', 'quantidade', 'quantidade_maxima', 'quantidade_minima'].forEach((coluna, index) => {
    if (dadosAtualizacao[index] != null) {
      query += `${coluna} = ?, `;
      params.push(dadosAtualizacao[index]);
    }
  });

  query = query.slice(0, -2);
  query += ' WHERE id = ?';
  params.push(numeroProduto);
  return new Promise((reject, resolve) => { 
      db.run("BEGIN");
      db.run(query, params, function (error) {
        if (error) {
          db.run("ROLLBACK");
          console.error("Erro ao salvar registro:", error);
          return reject(error);
        }
        db.run("COMMIT");
        return resolve(this.changes);
      });    
  });
}

export { inserirProduto, buscarProduto, removerProduto, atualizarProduto, listarProdutos };
