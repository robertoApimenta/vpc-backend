import express from 'express';
import indexRouter from './routes/index';
import cors from 'cors';

const app = express();
const port = 8080;

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', indexRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
