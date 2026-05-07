import Task from '../models/TaskModel.js'
import { allowedTaskStatuses } from '../utils/allowedTaskStatus.js'

// Get Task by User
export async function getTasks(req, res) {
    try {

        // Check if user logged in
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized, Please log in to access tasks"
            })
        }


        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks
        })
    } catch (error) {
        console.error(`Get tasks error: ${error}`)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export async function getTaskById(req, res) {
    try {

        const taskId = req.params.id

        // Check if user logged in
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized, Please log in to access tasks"
            })
        }

        const taskExist = await Task.findById(taskId)

        if (!taskExist) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (taskExist.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized to access this task"
            })
        }

        res.status(200).json({
            message: "Task retrieved successfully",
            task: taskExist
        })

    } catch (error) {
        console.error(`Get task by ID error: ${error}`)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


// Create Task
export async function createTask(req, res) {
    try {
        const taskdata = req.body


        // Basic validation
        if (!taskdata.title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }
        // Basic status validation
        if (taskdata.status && !allowedTaskStatuses.includes(taskdata.status)) {
            return res.status(400).json({
                message: "Invalid status value"
            })
        }

        const newTask = new Task({
            title: taskdata.title,
            description: taskdata.description || '',
            status: taskdata.status || 'pending',
            user: req.user._id
        })

        const savedTask = await newTask.save()
        res.status(201).json({
            message: "task created successfully",
            task: savedTask
        })
    } catch (error) {
        console.error(`Create task error: ${error}`)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


// Update Task
export async function updateTask(req, res) {
    try {
        const taskId = req.params.id
        const updatedData = req.body

        if (updatedData.status && !allowedTaskStatuses.includes(updatedData.status)) {
            return res.status(400).json({
                message: "Invalid status value"
            })
        }

        // Check if task exists and belongs to the user
        const taskExists = await Task.findById(taskId)
        if (!taskExists) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (taskExists.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized to update this task"
            })
        }

        const updatedTaskData = {}

        if (updatedData.title) updatedTaskData.title = updatedData.title
        if (updatedData.description) updatedTaskData.description = updatedData.description
        if (updatedData.status) updatedTaskData.status = updatedData.status

        taskExists.set(updatedTaskData)
        const updateTask = await taskExists.save()


        res.status(200).json({
            message: "Task updated successfully",
            task: updateTask
        })

    } catch (error) {
        console.log(`Update task error: ${error}`)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Delete Task
export async function deleteTask(req, res) {
    try {
        const taskId = req.params.id

        // Check if task exists and belongs to the user
        const taskExists = await Task.findById(taskId)

        if (!taskExists) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        if (taskExists.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized to delete this task"
            })
        }

        await Task.findByIdAndDelete(taskId)

        res.status(200).json({
            message: "Task deleted successfully"
        })

    } catch (error) {
        console.log(`Delete task error: ${error}`)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}