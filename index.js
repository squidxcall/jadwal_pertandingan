import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import Api from './api/index.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.use(express.static('views/css'));

app.use(Api);

app.listen(8000, () => {
    console.log('Connected at port 8000')
});