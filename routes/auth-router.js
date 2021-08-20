const { Router } = require('express')

const router = Router()
const authController = require('../controllers/auth-controller')

// POST => http://localhost:3000/sign-up -> For user sign up(Pembaca)
router.post('/sign-up', authController.signUp)

// POST => http://localhost:3000/login -> For user login(Pembaca)
router.post('/login', authController.login)

// POST => http://localhost:3000/writer-login -> For writer login(Penulis)
router.post('/writer-login', authController.writerLogin)


module.exports = router