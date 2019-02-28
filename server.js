const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');

//controllers for routes
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//knex postgres config
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'pass',
        database: 'postgres'
    }
});

const PORT = process.env.PORT || 2000;

//ENTRYPOINT 
app.get('/', (req, res) => {
    res.json('Serving!');
});

//-----------------------------------------------------------------
//SIGNIN
app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt);
});

//-----------------------------------------------------------------
//REGISTER
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

//-----------------------------------------------------------------
//USER INFO BASED ON ID
app.get('/profile/:id', (req, res, db) => {
    profile.handleProfile(req, res, db);
});

//-----------------------------------------------------------------
//INCREMENT AND UPDATE USER ENTRIES ON IMAGE UPLOADS
app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

//SEND URL ENTRY TO BACKEND
app.post('/imageUrl', (req, res) => {
    image.handleApiCall(req, res);
});

app.listen(PORT, () => {
    console.log(`Serving on port: ${PORT}`);
});