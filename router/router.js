const express = require('express')

const jobController = require('../controllers/jobController')
const validatejobMiddleware = require('../middlewares/validatejobMiddleware')


const router = new express.Router()

// Create job
router.post('/create-job',validatejobMiddleware,jobController.createJobController);

// Get all jobs
router.get('/get-all-jobs',jobController.getAllJobsController);

//Search jobs
router.get('/search-jobs',jobController.getAllJobsController);

//Pagination
router.get('/pagination',jobController.getAllJobsController);

//Sorting
router.get('/sorting',jobController.getAllJobsController);

//Filter jobs by status
router.get('/filter-jobs',jobController.getAllJobsController);

//Combining all (search,pagination,sorting,status)
router.get('/filter-jobs',jobController.getAllJobsController);


// Get one job
router.get('/get-one-job/:id',jobController.getJobByIdController);

// Update complete job
router.put('/update-job/:id',validatejobMiddleware,jobController.updateJobController);

// Update only job status
router.patch('/update-status/:id/status',jobController.updateJobStatusController);

// Delete job
router.delete('/delete-job/:id',jobController.deleteJobController);




module.exports=router