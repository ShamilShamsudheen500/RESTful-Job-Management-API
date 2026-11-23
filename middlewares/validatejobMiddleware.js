const validatejobMiddleware = (req, res, next) => {

    const { title, description, status, priority } = req.body;

    const errors = [];

    if (typeof title !== 'string' || !title.trim()) {
        errors.push('Job title is required');
    } else if (title.trim().length < 3) {
        errors.push('Job title must contain at least 3 characters');
    } else if (title.trim().length > 100) {
        errors.push('Job title cannot exceed 100 characters');
    }

    if (typeof description !== 'string' || !description.trim()) {
        errors.push('Job description is required');
    } else if (description.trim().length < 5) {
        errors.push('Description must contain at least 5 characters');
    } else if (description.trim().length > 1000) {
        errors.push('Description cannot exceed 1000 characters');
    }

    if (
        status !== undefined &&
        !['PENDING', 'IN_PROGRESS', 'DONE'].includes(status)
    ) {
        errors.push('Status must be PENDING, IN_PROGRESS or DONE');
    }

    if (
        priority !== undefined &&
        !['Low', 'Medium', 'High'].includes(priority)
    ) {
        errors.push('Priority must be Low, Medium or High');
    }

    if (errors.length > 0) {

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });

    }

    next();

};

module.exports = validatejobMiddleware;