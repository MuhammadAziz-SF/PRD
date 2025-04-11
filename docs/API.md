# 📚 API Documentation

## 🔐 Authentication

All API endpoints require authentication unless specified otherwise. Include the JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### Authentication Endpoints

#### Register New User
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "job_seeker" // or "employer"
}
```

**Response:**
```json
{
  "message": "Registration successful. Please check your email for verification.",
  "userId": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "userType": "job_seeker"
  }
}
```

## 👤 User Management

### Profile Endpoints

#### Get User Profile
```http
GET /user/profile
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "location": "New York, USA",
  "profilePicture": "https://example.com/profile.jpg",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update Profile
```http
PUT /user/profile
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "location": "New York, USA"
}
```

### Document Management

#### Upload Resume
```http
POST /user/upload-resume
Content-Type: multipart/form-data

{
  "file": <file>,
  "title": "Software Engineer Resume",
  "isDefault": true
}
```

#### Upload Additional Documents
```http
POST /user/upload-documents
Content-Type: multipart/form-data

{
  "files": [<file1>, <file2>],
  "type": "certificate" // or "portfolio", "cover_letter"
}
```

## 🔍 Job Search

### Search Jobs
```http
GET /jobs/search?location=USA&salary=50000&visa=sponsored&experience=senior&type=full_time
```

**Query Parameters:**
- `location`: Country or city
- `salary`: Minimum salary
- `visa`: "sponsored" or "not_required"
- `experience`: "entry", "mid", "senior"
- `type`: "full_time", "part_time", "contract"
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response:**
```json
{
  "jobs": [
    {
      "id": "job123",
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "location": "San Francisco, USA",
      "salary": {
        "min": 120000,
        "max": 180000,
        "currency": "USD"
      },
      "visaSponsorship": true,
      "postedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

### Save Job
```http
POST /jobs/save
Content-Type: application/json

{
  "jobId": "job123"
}
```

### Get Saved Jobs
```http
GET /jobs/saved
```

## 📝 Job Applications

### Apply for Job
```http
POST /applications
Content-Type: application/json

{
  "jobId": "job123",
  "resumeId": "resume456",
  "coverLetter": "I am interested in this position...",
  "additionalDocuments": ["doc789"]
}
```

### Track Applications
```http
GET /applications
```

**Response:**
```json
{
  "applications": [
    {
      "id": "app123",
      "jobId": "job123",
      "status": "under_review",
      "appliedAt": "2024-01-01T00:00:00Z",
      "lastUpdated": "2024-01-02T00:00:00Z"
    }
  ]
}
```

## 🏢 Employer Features

### Company Profile

#### Create/Update Company Profile
```http
POST /company/profile
Content-Type: application/json

{
  "name": "Tech Corp",
  "description": "Leading tech company...",
  "industry": "Technology",
  "size": "1000+",
  "website": "https://techcorp.com",
  "logo": "https://techcorp.com/logo.png",
  "locations": ["San Francisco", "New York"]
}
```

### Job Posting

#### Create Job Posting
```http
POST /jobs/post
Content-Type: application/json

{
  "title": "Senior Software Engineer",
  "description": "We are looking for...",
  "requirements": ["5+ years experience", "Node.js", "React"],
  "location": "San Francisco, USA",
  "salary": {
    "min": 120000,
    "max": 180000,
    "currency": "USD"
  },
  "type": "full_time",
  "visaSponsorship": true,
  "benefits": ["Health insurance", "401k", "Remote work"]
}
```

#### Manage Job Postings
```http
GET /company/jobs
PUT /jobs/:jobId
DELETE /jobs/:jobId
```

## 📅 Interview Management

### Schedule Interview
```http
POST /interviews/schedule
Content-Type: application/json

{
  "applicationId": "app123",
  "type": "video", // or "phone", "in_person"
  "scheduledAt": "2024-01-15T14:00:00Z",
  "duration": 60, // in minutes
  "notes": "Please join via Zoom link..."
}
```

### Get Interview Details
```http
GET /interviews/:interviewId
```

## 📄 Contract Management

### Create Contract
```http
POST /contracts
Content-Type: application/json

{
  "applicationId": "app123",
  "jobId": "job123",
  "salary": {
    "amount": 150000,
    "currency": "USD",
    "period": "yearly"
  },
  "benefits": ["Health insurance", "401k"],
  "startDate": "2024-02-01",
  "terms": "Full-time employment contract..."
}
```

### Manage Contract Status
```http
PUT /contracts/:contractId/status
Content-Type: application/json

{
  "status": "accepted" // or "rejected", "pending"
}
```

## 🔔 Notifications

### Get Notifications
```http
GET /notifications
```

**Response:**
```json
{
  "notifications": [
    {
      "id": "notif123",
      "type": "application_update",
      "message": "Your application status has been updated",
      "read": false,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Mark Notification as Read
```http
PUT /notifications/:notificationId/read
```

## 🌐 International Features

### Visa Management
```http
GET /user/visa
POST /user/visa
PUT /user/visa/:visaId
```

### Foreign Experience
```http
GET /user/foreign-experience
POST /user/foreign-experience
PUT /user/foreign-experience/:experienceId
```

## ⚠️ Error Responses

All endpoints may return the following error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      // Additional error details if available
    }
  }
}
```

Common error codes:
- `UNAUTHORIZED`: Invalid or missing authentication token
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `INTERNAL_ERROR`: Server error

## 📝 Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers are included in all responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1625097600
``` 