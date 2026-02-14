const express = require('express')
const router = express.Router()
const {
  register,
  login,
  getRefreshToken,
  logout,
  forgotPassSendMail,
  forgotPassCheck,
  getMe,
  editInfo
} = require('../controllers/users.controller.js')

const { isLogin } = require('../middlewere/PrivateRoutes')

router.post('/register', register)
router.post('/login', login)
router.get('/get_acceses_token', getRefreshToken)
router.delete('/logout', logout)
router.post('/sendMail', forgotPassSendMail)
router.post('/forgot_pass', forgotPassCheck)
router.get('/me', isLogin, getMe)
router.put('/edit-info', isLogin, editInfo)

module.exports = router
