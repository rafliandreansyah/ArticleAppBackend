const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.editUser = (req, res, next) => {
    const updateUsername = req.body.username
    const updatePassword = req.body.password
    const updateName = req.body.name
    const updateAddress = req.body.address
    const updateGender = req.body.gender
    let imageUrl = req.body.imageUrl
    const image = req.file

    if (image) {
        imageUrl = image.path
    }

    let userData

    User.findByPk(req.userId)
        .then(user => {
            userData = user
            //Hash password
            return bcrypt.hash(updatePassword, 12)
        })
        .then(passwordHash => {
            userData.username = updateUsername
            userData.name = updateName
            userData.gender = updateGender
            userData.address = updateAddress
            userData.imageUrl = imageUrl
            userData.password = passwordHash
            return userData.save()
        })
        .then(updateResult => {
            res.status(200).json({
                message: 'Update profile success',
                result: updateResult
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Edit profile failed',
                err: err
            })
        })
}