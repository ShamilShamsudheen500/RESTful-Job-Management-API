const jobs = require("../models/jobModel")
const mongoose = require("mongoose");

// =====================================
// 1. CREATE JOB
// =====================================

exports.createJobController = async (req, res, next) => {
    try {
        const { title, description, status, priority } = req.body;

        const newJob = await jobs.create({
            title,
            description,
            status,
            priority
        });

        return res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: newJob
        });

    } catch (error) {
        next(error);
    }
};


// =====================================
// 2. GET ALL JOBS (all jobs,searching,pagination,status)
// =====================================

exports.getAllJobsController = async (req, res, next) => {
    try {

        const {
            status,
            search,
            page = 1,
            limit = 5,
            sort = "newest"
        } = req.query;

        // 1. Create empty filter
        const filter = {};

        // 2. Filter jobs by status
        if (status) {

            if (!["PENDING", "IN_PROGRESS", "DONE"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status filter"
                });
            }

            filter.status = status;
        }

        // 3. Search by title or description
        if (search && search.trim()) {

            const searchRegex = new RegExp(
                search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                "i"
            );

            filter.$or = [
                { title: searchRegex },
                { description: searchRegex }
            ];
        }

        // 4. Validate pagination
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (
            !Number.isInteger(pageNumber) ||
            !Number.isInteger(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1
        ) {
            return res.status(400).json({
                success: false,
                message: "Page and limit must be positive integers"
            });
        }

        const currentPage = pageNumber;
        const perPage = Math.min(100, limitNumber);

        // 5. Validate sorting
        if (!["newest", "oldest"].includes(sort)) {
            return res.status(400).json({
                success: false,
                message: "Sort must be newest or oldest"
            });
        }

        // 6. Sorting
        const sortOption = sort === "oldest"
            ? { createdAt: 1 }
            : { createdAt: -1 };

        // 7. Count total matching jobs
        const totalJobs = await jobs.countDocuments(filter);

        // 8. Fetch jobs
        const allJobs = await jobs.find(filter)
            .sort(sortOption)
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        // 9. Send response
        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: allJobs,
            pagination: {
                currentPage,
                totalPages: Math.ceil(totalJobs / perPage),
                totalJobs,
                limit: perPage
            }
        });

    } catch (error) {
        next(error);
    }
};

// =====================================
// 3. GET JOB BY ID
// =====================================

exports.getJobByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID"
            });
        }

        const job = await jobs.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job fetched successfully",
            data: job
        });

    } catch (error) {
        next(error);
    }
};


// =====================================
// 4. UPDATE JOB
// =====================================

exports.updateJobController = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID"
            });
        }

        const { title, description, status, priority } = req.body;

        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (status !== undefined) updateData.status = status;
        if (priority !== undefined) updateData.priority = priority;

        const updatedJob = await jobs.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob
        });

    } catch (error) {
        next(error);
    }
};


// =====================================
// 5. DELETE JOB
// =====================================

exports.deleteJobController = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID"
            });
        }

        const deletedJob = await jobs.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
            data: deletedJob
        });

    } catch (error) {
        next(error);
    }
};


// =====================================
// 6. UPDATE JOB STATUS
// =====================================

exports.updateJobStatusController   = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID"
            });
        }

        if (!["PENDING", "IN_PROGRESS", "DONE"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job status"
            });
        }

        const updatedJob = await jobs.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job status updated successfully",
            data: updatedJob
        });

    } catch (error) {
        next(error);
    }
};