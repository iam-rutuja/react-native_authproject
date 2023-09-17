const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    title: String,
    description: String,
    status: {
        type: String,
        default: 'inProgress',
        enum: ['completed', 'incomplete', 'inProgress']
    },
});

module.exports = mongoose.model('Task', TaskSchema);
