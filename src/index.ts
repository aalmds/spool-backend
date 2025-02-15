import Env from './env';
import app from './app';

app.listen(Env.PORT, () => {
    console.log(`Server running at http://localhost:${Env.PORT}`);
});
