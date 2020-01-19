// middleware function that takes incoming login request and does some pre-processing login logic over it
// we need to make sure user includes token - if they have token we will give them access to a given HTTP route
// if no token, throw error

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  // destructure authorization property off headers property object:
  const { authorization } = req.headers;

  // if user doesn't provide Authorization header
  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.'});
  }

  // remove "Bearer " value before token
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, playload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in' });
    }
    // extract userId from payload and use it to look up users within MongoDB
    const { userId } = payload;
    // tell Mongo to look up MongoDB collection of Users
    const user = await User.findById(userId);
    // take user and attach to request object (middleware!)
    req.user = user;
    // once middleware is done:
    next();
  });
};