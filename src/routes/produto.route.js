import { Router } from "express";
import { atualizarProdutoController, buscarProdutoController, inserirProdutoController, listarProdutosController, removerProdutoController } from "../controller/produto.controller.js";

const produtos = Router();

produtos.get("/", listarProdutosController);
produtos.get("/buscar-produto/:numeroProduto", buscarProdutoController);
produtos.post("/inserir-produto", inserirProdutoController);
produtos.delete("/deletar-produto/:numeroProduto", removerProdutoController);
produtos.put("/atualizar-produto/:numeroProduto", atualizarProdutoController);

export default produtos;