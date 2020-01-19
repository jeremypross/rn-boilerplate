const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});