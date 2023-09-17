const Task = require('../models/task')

// Add a new task
exports.create = async (req, res) => {

    try {
        const { title, description, status } = req.body;
        const task = new Task({ title, description, status });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }

}

// Mark a task as completed
exports.mark = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { check } = req.body;

        const task = await Task.findByIdAndUpdate(taskId, { status: check && 'completed' }, {
            new: true
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to mark task as completed' });
    }
}

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};
// View a list of tasks
exports.getAll = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};
// Update a task
exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, status },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};