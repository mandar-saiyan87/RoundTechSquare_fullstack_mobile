import express from 'express'
import authrouter from './auth.route.js'
import taskrouter from './task.route.js'

const rootrouter = express.Router()

rootrouter.use('/auth', authrouter)
rootrouter.use('/tasks', taskrouter)

export default rootrouter