-- Create ENUMs instead of tables
CREATE TYPE gender AS ENUM ('male', 'female');

CREATE TYPE certificate_status AS ENUM ('expired', 'active');

CREATE TYPE job_status AS ENUM ('active', 'inactive', 'terminated');

CREATE TYPE proficiency_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');

CREATE TYPE language_proficiency_level AS ENUM ('basic', 'conversational', 'fluent', 'native');

CREATE TYPE visa_status AS ENUM ('applied', 'approved', 'rejected', 'expired');

CREATE TYPE job_type AS ENUM ('full-time', 'part-time');

CREATE TYPE application_status AS ENUM ('submitted', 'under_review', 'shortlisted', 'rejected', 'withdrawn', 'hired', 'interviewing');

CREATE TYPE contract_status AS ENUM ('draft', 'active', 'completed', 'terminated');

CREATE TYPE notification_type AS ENUM ('job_alert', 'interview', 'contract', 'application_update', 'system');

CREATE TYPE user_action AS ENUM ('suspend', 'delete', 'warn', 'restrict');

CREATE TYPE role AS ENUM ('admin', 'employer', 'job_seeker', 'recruiter', 'moderator');

CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    role_id TINYINT NOT NULL,
    password VARCHAR(255),
    first_name VARCHAR(255) DEFAULT '',
    last_name VARCHAR(255) DEFAULT '',
    phone_number VARCHAR(20) UNIQUE DEFAULT NULL,
    date_of_birth DATE DEFAULT NULL,
    profile_picture VARCHAR(255) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    gender_id TINYINT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    FOREIGN KEY (gender_id) REFERENCES genders(id)
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    address_line_1 TEXT,
    address_line_2 TEXT,
    city VARCHAR(100) NOT NULL,  
    state VARCHAR(100) NOT NULL,
    postal_code int(20),
    country VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

create table resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) DEFAULT NULL,
    file_url VARCHAR(255) DEFAULT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
    
);

create table educations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    institution VARCHAR(255) DEFAULT NULL,
    degree VARCHAR(255) DEFAULT NULL,
    field_of_study VARCHAR(255) DEFAULT NULL,
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL,
    grade VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    country VARCHAR(255) DEFAULT NULL,
    is_foreign BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE work_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) DEFAULT NULL,
    position VARCHAR(255) DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    country VARCHAR(255) DEFAULT NULL,
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL,
    current_job_status job_statuses DEFAULT 'inactive',
    description TEXT DEFAULT NULL,
    is_foreign BOOLEAN DEFAULT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

create table skills (
    id UUID NOT NULL,
    user_id UUID NULL,
    name VARCHAR(255) NULL,
    proficiency proficiency_level DEFAULT 'beginner',
    years_of_experience BIGINT NULL,
    certificate_status certificate_status DEFAULT 'expired',
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);



create table languages (
    id UUID NOT NULL,
    user_id UUID NULL,
    language_name VARCHAR(255) NULL,
    proficiency language_proficiency_level DEFAULT 'basic',
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);


create table certifications (
    id UUID NOT NULL,
    user_id UUID NULL,
    name VARCHAR(255) NULL,
    issuing_organization VARCHAR(255) NULL,
    issue_date DATE NULL,
    expiration_date DATE NULL,
    credential_id VARCHAR(255) NOT NULL,
    credential_url VARCHAR(255) NOT NULL,
    is_foreign BOOLEAN NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);


create table visa_info (
    id UUID NOT NULL,
    user_id UUID NULL,
    visa_type VARCHAR(255) NULL,
    visa_country VARCHAR(255) NULL,
    visa_status visa_status DEFAULT 'applied',
    expiry_date DATE NULL,
    multiple_entry BOOLEAN NULL,
    notes TEXT NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

-- USERS TABLES END 

-- COmpanyS TABLES START

create table companies ();
create table jobs ();
create table saved_jobs ();
create table job_alerts ();
create table job_applications ();





