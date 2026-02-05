const express = require('express')
const router = express.Router()
const {
  register,
  login,
  getRefreshToken,
  logout,
  forgotPassSendMail,
  forgotPassCheck,
} = require('../controllers/users.controller.js')

const { isLogin } = require('../middlewere/PrivateRoutes')

router.post('/create_user', register)
router.post('/login', login)
router.get('/get_access_token', getRefreshToken)
router.delete('/logout', logout)
router.post('/sendMail', forgotPassSendMail)
router.post('/forgot_pass', forgotPassCheck)

module.exports = router
