const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(

    {

        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true,
            minlength: [3, 'Title must contain at least 3 characters'],
            maxlength: [100, 'Title cannot exceed 100 characters']
        },

        description: {
            type: String,
            required: [true, 'Job description is required'],
            trim: true,
            minlength: [5, 'Description must contain at least 5 characters'],
            maxlength: [1000, 'Description cannot exceed 1000 characters']
        },

        status: {
            type: String,
            enum: {
                values: ['PENDING', 'IN_PROGRESS', 'DONE'],
                message: 'Invalid job status'
            },
            default: 'PENDING'
        },

        priority: {
            type: String,
            enum: {
                values: ['Low', 'Medium', 'High'],
                message: 'Priority must be Low, Medium or High'
            },
            default: 'Medium'
        }

    },

    {
        timestamps: true
    }

);

const jobs = mongoose.model('jobs', jobSchema);

module.exports = jobs;