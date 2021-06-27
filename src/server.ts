import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";
import { HttpError } from "./errors/HttpError";

const app = express();

// Middleware de habilitação de requisições/respostas no formato JSON
app.use(express.json());

// Middleware de rotas
app.use(router)

/*
    Middleware para tratamento de erros — demanda um parâmetro
    extra para o valor de erro.
*/
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    const httpError = HttpError.fromApplication(err);

    return response.status(httpError.statusCode).json(httpError.json);
})

app.listen(3000, () => console.log("Server running on port 3000..."));