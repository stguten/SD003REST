import { responseBuilder } from "./builder/builders.js";
import app from "./config/express.config.js";
import produtos from "./routes/produto.route.js";

app.use("/produtos", produtos);

// Rota para lidar com outras solicitações GET inválidas
app.get('*', (req, res) => {
  res.status(404).send(responseBuilder(404, "Endpoint não encontrado."));
});

// Rota para lidar com erros de servidor
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(responseBuilder(500, "Erro interno."));
});

export default app;
