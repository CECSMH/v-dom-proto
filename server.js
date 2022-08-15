
import express from 'express';
import routes from './routes.js';
import path from 'path';

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));

app.use(routes);

app.listen(3030, () => {
    console.log('ONLINE! rodando na porta 3030');
    console.log('http://localhost:3030');
})
