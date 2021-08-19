const { Router } = require('express')

const router = Router()
const authController = require('../controllers/auth-controller')

// POST => http://localhost:3000/sign-up
router.post('/sign-up', authController.signUp)

// POST => http://localhost:3000/login
router.post('/login', authController.login)

module.exports = router