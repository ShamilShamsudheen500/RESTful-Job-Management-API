# Job Management API

A RESTful Job Management API built using **Node.js, Express.js, and MongoDB**. This application allows users to create, view, search, filter, update, and delete jobs.

## Features

- Create a new job
- Get all jobs
- Get a single job by ID
- Search jobs by title or description
- Filter jobs by status
- Pagination
- Sort jobs by creation date
- Update complete job details
- Update job status
- Delete a job
- Input validation

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- JavaScript

## Project Structure

```text
JOB-MANAGEMENT-API/
│
├── controllers/
│   └── jobController.js
│
├── database/
│   └── dbconnection.js
│
├── middlewares/
│   ├── 
│   ├── 
│   └── validatejobMiddleware.js
│
├── models/
│   └── jobModel.js
│
├── router/
│   └── router.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd JOB-MANAGEMENT-API
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
MONGO_URL=your_mongodb_connection_string
```

Use your actual MongoDB connection string.

### 5. Start the server

```bash
npm start
```

Or, if you use Nodemon:

```bash
npm run dev
```

Server URL:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/create-job` | Create a job |
| GET | `/get-all-jobs` | Get all jobs |
| GET | `/get-one-job/:id` | Get job by ID |
| GET | `/search-jobs?search=backend` | Search jobs |
| GET | `/filter-jobs?status=PENDING` | Filter jobs |
| GET | `/pagination?page=1&limit=5` | Paginate jobs |
| GET | `/sorting?sort=newest` | Sort jobs |
| PUT | `/update-job/:id` | Update complete job |
| PATCH | `/update-status/:id/status` | Update job status |
| DELETE | `/delete-job/:id` | Delete a job |

## Job Data Format

Example request body:

```json
{
  "title": "Backend Developer",
  "description": "Develop REST APIs using Node.js and Express",
  "status": "PENDING",
  "priority": "High"
}
```

### Available Job Statuses

- PENDING
- IN_PROGRESS
- DONE

### Available Priorities

- Low
- Medium
- High

## Query Parameters

You can combine search, filtering, pagination, and sorting.

Example:

```text
GET /get-all-jobs?status=IN_PROGRESS&search=Backend&page=1&limit=5&sort=newest
```

## Error Handling

The project includes centralized error handling for:

- Mongoose validation errors
- Invalid MongoDB ObjectId


## Testing

All API endpoints can be tested using **Postman**.

## Author

Developed as a Node.js backend project.