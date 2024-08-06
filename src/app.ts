import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import indexRouter from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/api', indexRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
