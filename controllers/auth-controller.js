const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Writer = require('../models/writer')

exports.signUp = (req, res, next) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name
    const address = req.body.address
    const gender = req.body.gender
    const image = req.file

    let imageUrl
    if(image){
        imageUrl = image.path
    }

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
        .then(userResult => {
            res.status(200).json({
                message: 'Sign up success',
                id: userResult.id
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

    let userData

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'email or password is not correct'
                })
            }
            userData = user
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if(!isEqual) {
                return res.status(401).json({
                    message: 'email or password is not correct'
                })
            }
            return jwt.sign({
                email: userData.email,
                userId: userData.id,
                username: userData.username
            }, 'mykeyjwtforapparticle', {expiresIn: '2h'})
        })
        .then(token => {
            res.status(200).json({
                token: token,
                userId: userData.id
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Login failed',
                err: err
            })
        })
}


exports.writerLogin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    let writerData

    Writer.findOne({ where: { email: email } })
        .then(writer => {
            if (!writer) {
                return res.status(401).json({
                    message: 'email or password is not correct'
                })
            }

            if (password !== writer.password) {
                return res.status(401).json({
                    message: 'email or password is not correct'
                })
            }
            writerData = writer
            return jwt.sign({
                email: writer.email,
                writerId: writer.id
            }, 'keyforwriter', {expiresIn: '2h'})
        })
        .then(token => {
            res.status(200).json({
                token: token,
                writerId: writerData.id
            })
        })
        .catch(err => [
            res.status(500).json({
                message: 'Login failed',
                err: err
            })
        ])
}