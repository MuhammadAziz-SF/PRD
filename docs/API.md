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

## 📋 Data Types

### ENUM Types

#### Gender
```sql
ENUM ('male', 'female', 'other')
```

#### Job Status
```sql
ENUM ('active', 'inactive', 'terminated')
```

#### Proficiency
```sql
ENUM ('beginner', 'intermediate', 'advanced', 'expert')
```

#### Language Proficiency
```sql
ENUM ('basic', 'conversational', 'fluent', 'native')
```

#### Visa Status
```sql
ENUM ('applied', 'approved', 'rejected', 'expired')
```

#### Job Type
```sql
ENUM ('full-time', 'part-time')
```

#### Application Status
```sql
ENUM ('submitted', 'under_review', 'shortlisted', 'rejected', 'accepted')
```

#### Contract Status
```sql
ENUM ('draft', 'active', 'completed', 'terminated')
```

#### Notification Type
```sql
ENUM ('job_alert', 'interview', 'contract', 'application_update', 'system')
```

#### User Action
```sql
ENUM ('suspend', 'delete', 'warn', 'restrict')
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
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "profilePicture": "https://example.com/profile.jpg",
  "bio": "Software Engineer with 5 years of experience",
  "gender": "male",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Update Profile
```http
PUT /user/profile
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "bio": "Updated bio"
}
```

### Address Management

#### Add/Update Address
```http
POST /user/address
Content-Type: application/json

{
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 4B",
  "city": "New York",
  "state": "NY",
  "postalCode": 10001,
  "isPrimary": true
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

## 📝 Professional Information

### Education

#### Add Education
```http
POST /user/education
Content-Type: application/json

{
  "institution": "University of Technology",
  "degree": "Bachelor of Science",
  "fieldOfStudy": "Computer Science",
  "startDate": "2015-09-01",
  "endDate": "2019-05-30",
  "grade": "3.8",
  "description": "Focused on software development and algorithms",
  "country": "USA",
  "isForeign": false
}
```

### Work Experience

#### Add Work Experience
```http
POST /user/work-experience
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "position": "Senior Software Engineer",
  "location": "San Francisco",
  "country": "USA",
  "startDate": "2019-06-01",
  "endDate": "2023-12-31",
  "currentJobStatus": "active",
  "description": "Led development of core features",
  "isForeign": false
}
```

### Skills

#### Add Skill
```http
POST /user/skills
Content-Type: application/json

{
  "name": "JavaScript",
  "proficiency": "expert",
  "yearsOfExperience": 5,
  "hasCertificate": true
}
```

### Languages

#### Add Language
```http
POST /user/languages
Content-Type: application/json

{
  "languageName": "Spanish",
  "proficiency": "fluent",
  "isPrimary": false
}
```

### Certifications

#### Add Certification
```http
POST /user/certifications
Content-Type: application/json

{
  "name": "AWS Certified Solutions Architect",
  "issuingOrganization": "Amazon Web Services",
  "issueDate": "2023-01-15",
  "expirationDate": "2026-01-15",
  "credentialId": "AWS-123456",
  "credentialUrl": "https://aws.amazon.com/certification",
  "isForeign": false
}
```

### Visa Information

#### Add Visa Info
```http
POST /user/visa
Content-Type: application/json

{
  "visaType": "H1B",
  "visaCountry": "USA",
  "visaStatus": "approved",
  "expiryDate": "2025-12-31",
  "multipleEntry": true,
  "notes": "Valid for employment"
}
```

## 🔍 Job Search

### Search Jobs
```http
GET /jobs/search?location=USA&salary=50000&visa=sponsored&experience=senior&type=full-time
```

**Query Parameters:**
- `location`: Country or city
- `salary`: Minimum salary
- `visa`: "sponsored" or "not_required"
- `experience`: "entry", "mid", "senior"
- `type`: "full-time", "part-time"
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
  "type": "full-time",
  "visaSponsorship": true,
  "benefits": ["Health insurance", "401k", "Remote work"]
}
```

## 📅 Interview Management

### Schedule Interview
```http
POST /interviews/schedule
Content-Type: application/json

{
  "applicationId": "app123",
  "type": "video", // or "phone", "in_person"
  "scheduledTime": "2024-01-15T14:00:00Z",
  "timezone": "America/New_York",
  "duration": 60, // in minutes
  "locationUrl": "https://zoom.us/j/123456789",
  "interviewer": "John Smith"
}
```

## 📄 Contract Management

### Create Contract
```http
POST /contracts
Content-Type: application/json

{
  "applicationId": "app123",
  "contractType": "full-time",
  "startDate": "2024-02-01",
  "endDate": "2025-02-01", // Optional
  "probationPeriod": 90,
  "salary": {
    "amount": 150000,
    "currency": "USD",
    "period": "yearly"
  },
  "benefits": "Health insurance, 401k, Remote work",
  "visaSupport": true,
  "relocation": true
}
```

### Update Contract Status
```http
PUT /contracts/:contractId/status
Content-Type: application/json

{
  "status": "active" // draft, active, completed, terminated
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
      "type": "contract",
      "message": "New contract has been sent for review",
      "isRead": false,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Mark Notification as Read
```http
PUT /notifications/:notificationId/read
```

## 🛡 Admin Controls

### User Management

#### Manage User Status
```http
POST /admin/users/:userId/manage
Content-Type: application/json

{
  "action": "suspend", // suspend, delete, warn, restrict
  "reason": "Violation of terms of service"
}
```

### Company Verification

#### Verify Company
```http
POST /admin/companies/:companyId/verify
Content-Type: application/json

{
  "verified": true,
  "notes": "Company documents verified successfully"
}
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