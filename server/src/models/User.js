const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// pre save hook - function that will run before we attempt to save an instance of user within our DB
// need to use keyword function here to get access to this within function scope
userSchema.pre('save', function(next) {
    const user = this;
    // if user hasn't modifed password
    if (!user.isModified('password')) {
        // move on
        return next();
    }

    // else salt password w bcrypt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            // replace plaintext password with salted and hashed password
            user.password = hash;
            next();
        });
    });
});

// automate password checking process if user is logging in
// need to use keyword function again here to get access to this within function scope (arrow function would assign this to context of this file)
// candidatePassword is what user is trying to login with
userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;

    // pass promise callback function that is invoked with 2 arguments: resolve & reject
    
    return new Promise ((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(false);
            }
            resolve(true);
        });
    });
};

mongoose.model('User', userSchema);