const express = require('express');

//controller
const { create, mark, deleteTask, getAll, updateTask } = require('../controllers/task')
const  router = express.Router();

router.get('/tasks', getAll)
router.post('/task', create)
router.put('/task/mark/:id', mark)
router.put('/task/update/:id', updateTask)
router.delete('/task/delete/:id', deleteTask)

module.exports = router;