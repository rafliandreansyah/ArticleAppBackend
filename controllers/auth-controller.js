const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.signUp = (req, res, next) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name
    const address = req.body.address
    const gender = req.body.gender
    const imageUrl = req.body.imageUrl

    User.findOne({ where: { email: email } })
        .then(userEmail => {
            if (userEmail){
                return res.status(422).json({
                    message: 'Email already registered, please use another email!'
                })
            }
            return User.findOne({ where: { username: username }})
        })
        .then(username => {
            if(username){
                return res.status(422).json({
                    message: 'Username already registered, please use another email!'
                })
            }

            //Hash password
            return bcrypt.hash(password, 12)
        })
        .then(passwordHash => {
            return User.create({ email: email, username: username, name: name, address: address, gender: gender, imageUrl: imageUrl, password: passwordHash})
        })
        .then(result => {
            res.status(201).json({
                message: 'Sign up success',
                user: {
                    email: result.email,
                    username: result.username,
                    name: result.name
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Sign up failed',
                err: err
            })
        })
}

exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'email or password is not correct'
                })
            }
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if(!isEqual) {
                return res.status(401).json({
                    message: 'email or password is not correct'
                })
            }
            res.status(200).json({message: 'You are logged in'})
        })
        .catch(err => {
            res.status(500).json({
                message: 'Login failed',
                err: err
            })
        })
}