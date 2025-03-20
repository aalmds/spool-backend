import Env from './env';
import app from './app';
import routes from './routes';

app.use(routes);

app.listen(Env.PORT, () => {
    console.log(`Server running at http://localhost:${Env.PORT}`);
});

