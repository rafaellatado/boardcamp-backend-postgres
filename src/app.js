import express from 'express';
import 'express-async-errors';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { testeDBConnection } from './config/database.connection.js';
import gamesRouter from './routers/gamesRouter.js';
import customersRouter from './routers/customersRouter.js';
import rentalsRouter from './routers/rentalsRouter.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();
dotenv.config();
app.use(cors()); 
app.use(express.json());

app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);
app.use(errorMiddleware);

const serverPort = process.env.PORT || 5000;
app.listen(serverPort, () => {
  console.log(`Server up and running on port ${serverPort}`);
  testeDBConnection();
});
