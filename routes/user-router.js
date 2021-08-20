const { Router } = require('express')

const router = Router()
const isUserAuth = require('../helpers/is-auth')

const userController = require('../controllers/user-controller')

// POST => http://localhost:3000/user/edit -> For user sign up(Pembaca)
router.post('/user/edit', isUserAuth, userController.editUser)

module.exports = router