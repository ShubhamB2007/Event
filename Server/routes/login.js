const express = require('express')
const cors = require('cors')
const router = express.Router()

const {login} = require('../controllers/login')

router.use(cors())

router.post('/login', login)

module.exports = router;