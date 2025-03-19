import express from 'express';
import routes from './routes';

const app: express.Express = express();
const prefix: string = '/api';

app.use(express.json());

app.use(prefix,routes);

// Rota para healthcheck
app.use("/_health", (req: express.Request, res: express.Response) => {
    res.status(200).json({ status: "OK" });
})

export default app;