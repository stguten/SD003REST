import { responseBuilder } from "../builder/builders.js";
import { atualizarProduto, buscarProduto, inserirProduto, listarProdutos, removerProduto } from "../repository/produto.repository.js";

async function inserirProdutoController(req, res) {
    try {
        const produto = req.body.produto;
        const quantidade = req.body.quantidade;
        const quantidadeMinima = req.body.quantidadeMinima;    
        const quantidadeMaxima = req.body.quantidadeMaxima;
        
        if(isNaN(quantidade) || isNaN(quantidadeMinima) || isNaN(quantidadeMaxima)){
          res.status(400).send(responseBuilder(400, "Parametros Incorretos"));
          return;
        }

        const produtoId = await inserirProduto([produto, quantidade, quantidadeMinima, quantidadeMaxima]);
        res.status(201).send(responseBuilder(201, `O codigo do produto cadastrado e: ${produtoId}`));
    } catch (error) {
        res.status(500).send(responseBuilder(500, `Ocorreu um erro: ${error}`));
    }

}

async function buscarProdutoController(req, res) {
  const numeroProduto = req.params.numeroProduto;
  try {
    if(isNaN(numeroProduto)){
      res.status(400).send(400, responseBuilder(400, "Argumentos invalidos."));
      return;
    }

    const produto = await buscarProduto(parseInt(req.query.numeroProduto));
    console.log(produto);
    if(produto == undefined){
      res.status(404).send(responseBuilder(404, "Produto não encontrado."));
      return;
    }

    res.status(200).send(responseBuilder(200, produto));
  } catch (error) {
    res.status(500).send(responseBuilder(500, "Erro interno no servidor.\n"+error));
  }
}

async function listarProdutosController(req, res) {
  try {
    res.status(200).send(responseBuilder(200, await listarProdutos()));
  } catch (error) {
    res.status(500).send(responseBuilder(500, "Erro interno no servidor.\n"+error));
  }
}

async function removerProdutoController(req, res) {
  const numeroProduto = req.param.numeroProduto;
  try {
    if(!isNaN(req.param.numeroProduto)){
      res.status(400).send(400, responseBuilder(400, "Argumentos invalidos."));
      return;
    }

    const produto = await removerProduto(parseInt(numeroProduto));

    if(produto == undefined || produto == 0){
      res.status(404).send(responseBuilder(404, "Produto não encontrado."));
      return;
    }

    res.status(204).send(responseBuilder(204, `${numeroProduto} deletado do sistema.`));
  } catch (error) {
    res.status(500).send(500, "Erro interno no servidor.\n"+error);
  }
}

async function atualizarProdutoController(req, res) {  
  if(Object.values(req.body).length == 0 || Object.values(req.body).length > 4){
    res.status(400).send(responseBuilder(400, "Excesso de parametros ou atualização vazia."));
    return;
  }

  try {
    const numeroProduto = req.params.numeroProduto;
    const produto = req.body.produto || null;
    const quantidade = req.body.quantidade || null;
    const quantidadeMinima = req.body.quantidadeMinima || null;    
    const quantidadeMaxima = req.body.quantidadeMaxima || null;

    console.log([produto, quantidade, quantidadeMinima, quantidadeMaxima]);
    if(isNaN(quantidade) || isNaN(quantidadeMinima) || isNaN(quantidadeMaxima) || [produto, quantidade, quantidadeMinima, quantidadeMaxima].every(element => element == null)){
      res.status(400).send(responseBuilder(400, "Parametros Incorretos"));
      return;
    }
    const produtoId = await atualizarProduto(numeroProduto, [produto, quantidade, quantidadeMinima, quantidadeMaxima]);
    res.status(200).send(responseBuilder(200, `Produto ${produtoId} atualizado com sucesso.`));
  } catch (error) {
      res.status(500).send(responseBuilder(500, `Ocorreu um erro: ${error}`));
  } 
}

export { inserirProdutoController, buscarProdutoController, removerProdutoController, atualizarProdutoController, listarProdutosController };
