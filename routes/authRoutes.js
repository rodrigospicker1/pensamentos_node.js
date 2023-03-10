const express = require('express')
const AuthController = require('../controllers/AuthController')
const router = express.Router()


router.get('/login', AuthController.login)
router.get('/register', AuthController.register)
router.get('/logout', AuthController.logout)

router.post('/login', AuthController.loginPost)
router.post('/register', AuthController.registerPost)

module.exports = router