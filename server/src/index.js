const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);

const mongoUri = 'mongodb+srv://jeremyross.dev:w1epqkgf@cluster0-qeayx.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB instance!');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${res.user.email}.`);
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});