require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const postCtrl = require('./controllers/posts');
const { register, login, getUser, logout } = require('./controllers/user');


const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const app = express();

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected');
}).catch((error) => {
    console.log(`there was a db: ${error}`);
});

app.use(session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: { 
            maxAge: 1000 * 60 * 60 
        }
    }));
    
    app.use(express.json());

//Auth Endpoints
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.get('/api/auth/me', getUser);
app.post('/api/auth/logout', logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost);

app.listen(SERVER_PORT, ()=> console.log(`running on ${SERVER_PORT}`));