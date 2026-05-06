import express from 'express'
import authrouter from './auth.route.js'

const rootrouter = express.Router()

rootrouter.use('/auth', authrouter)

export default rootrouter