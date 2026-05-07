import express from 'express'
import { createTask, getTasks, deleteTask, updateTask, getTaskById } from '../controllers/task.controller.js'
import { authMiddleware } from '../middleware/jwtMiddleware.js'

const taskrouter = express.Router()

taskrouter.get('/', authMiddleware, getTasks)
taskrouter.get('/:id', authMiddleware, getTaskById)
taskrouter.post('/', authMiddleware, createTask)
taskrouter.patch('/:id', authMiddleware, updateTask)
taskrouter.delete('/:id', authMiddleware, deleteTask)

export default taskrouter