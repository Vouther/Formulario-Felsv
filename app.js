const express = require('express');
const app = express();
require('dotenv').config();

const path = require('path');

const mainRoute = require('./src/routers/main');

app.listen(3000, ()=> {
    console.log('listening on port 3000');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/',mainRoute);

//Configuracion de motor de vista o template engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'src', 'views'));