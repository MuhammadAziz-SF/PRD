-- Create ENUM types first
CREATE TYPE gender AS ENUM ('male', 'female', 'other');
CREATE TYPE job_status AS ENUM ('active', 'inactive', 'terminated');
CREATE TYPE proficiency AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE language_proficiency AS ENUM ('basic', 'conversational', 'fluent', 'native');
CREATE TYPE visa_status AS ENUM ('applied', 'approved', 'rejected', 'expired');
CREATE TYPE job_type AS ENUM ('full-time', 'part-time');
CREATE TYPE application_status AS ENUM ('submitted', 'under_review', 'shortlisted', 'rejected', 'accepted');
CREATE TYPE contract_status AS ENUM ('draft', 'active', 'completed', 'terminated');
CREATE TYPE notification AS ENUM ('job_alert', 'interview', 'contract', 'application_update', 'system');
CREATE TYPE user_action AS ENUM ('suspend', 'delete', 'warn', 'restrict');

-- Now create tables with ENUM types
CREATE TABLE users_profile (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    email VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    first_name VARCHAR(255) NULL,
    last_name VARCHAR(255) NULL,
    phone_number DECIMAL(8, 2) NULL,
    date_of_birth DATE NULL,
    profile_picture VARCHAR(255) NULL,
    bio TEXT NULL,
    gender gender NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id UUID NULL,
    PRIMARY KEY (id),
    UNIQUE (email),
    UNIQUE (phone_number)
);

CREATE TABLE addresses (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NULL,
    address_line1 VARCHAR(255) NULL,
    address_line2 VARCHAR(255) NULL,
    city VARCHAR(255) NULL,
    state VARCHAR(255) NULL,
    postal_code INTEGER NULL,
    is_primary BOOLEAN NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE resumes (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NULL,
    title VARCHAR(255) NULL,
    file_url VARCHAR(255) NULL,
    is_default BOOLEAN NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE education (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NULL,
    institution VARCHAR(255) NULL,
    degree VARCHAR(255) NULL,
    field_of_study VARCHAR(255) NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    grade VARCHAR(255) NULL,
    description TEXT NULL,
    country VARCHAR(255) NULL,
    is_foreign BOOLEAN NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE work_experience (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NULL,
    company_name VARCHAR(255) NULL,
    position VARCHAR(255) NULL,
    location VARCHAR(255) NULL,
    country VARCHAR(255) NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    current_job_status job_status NULL DEFAULT 'inactive',
    description TEXT NULL,
    is_foreign BOOLEAN NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE skills (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NULL,
    name VARCHAR(255) NULL,
    proficiency proficiency NULL,
    years_of_experience BIGINT NULL,
    has_certificate BOOLEAN NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE languages (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NULL,
    language_name VARCHAR(255) NULL,
    proficiency language_proficiency NULL,
    is_primary BOOLEAN NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE certifications (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NULL,
    name VARCHAR(255) NULL,
    issuing_organization VARCHAR(255) NULL,
    issue_date DATE NULL,
    expiration_date DATE NULL,
    credential_id VARCHAR(255) NOT NULL,
    credential_url VARCHAR(255) NOT NULL,
    is_foreign BOOLEAN NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE (credential_id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE visa_info (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NULL,
    visa_type VARCHAR(255) NULL,
    visa_country VARCHAR(255) NULL,
    visa_status visa_status NULL,
    expiry_date DATE NULL,
    multiple_entry BOOLEAN NULL,
    notes TEXT NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE companies (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(255) NULL,
    description TEXT NULL,
    industry VARCHAR(255) NULL,
    founded_year INTEGER NULL,
    website VARCHAR(255) NULL,
    logo VARCHAR(255) NULL,
    headquarters_country VARCHAR(255) NULL,
    is_verified BOOLEAN NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE (name)
);

CREATE TABLE company_locations (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE jobs (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    type job_type NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    relocation_assistance BOOLEAN NOT NULL,
    remote_option BOOLEAN NOT NULL,
    salary_min INTEGER NOT NULL,
    salary_max INTEGER NOT NULL,
    salary_currency VARCHAR(10) NOT NULL,
    salary_period VARCHAR(20) NOT NULL,
    visa_sponsorship BOOLEAN NOT NULL,
    experience_level VARCHAR(255) NOT NULL,
    education_requirement TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    deadline DATE NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE saved_jobs (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    job_id UUID NOT NULL,
    notes TEXT NOT NULL,
    saved_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id),
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

CREATE TABLE job_alerts (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    keywords TEXT NOT NULL,
    filters JSONB NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE applications (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    job_id UUID NOT NULL,
    resume_id UUID NOT NULL,
    cover_letter TEXT NOT NULL,
    status application_status NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id),
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (resume_id) REFERENCES resumes(id)
);

CREATE TABLE interviews (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL,
    type VARCHAR(255) NOT NULL,
    scheduled_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    timezone VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL,
    location_url VARCHAR(255) NOT NULL,
    interviewer VARCHAR(255) NOT NULL,
    feedback TEXT NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (application_id) REFERENCES applications(id)
);

CREATE TABLE contracts (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL,
    contract_type job_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    probation_period INTEGER,
    salary_amount DECIMAL(10,2) NOT NULL,
    salary_currency VARCHAR(10) NOT NULL,
    salary_period VARCHAR(20) NOT NULL,
    benefits TEXT,
    visa_support BOOLEAN NOT NULL DEFAULT false,
    relocation BOOLEAN NOT NULL DEFAULT false,
    status contract_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (application_id) REFERENCES applications(id)
);

CREATE TABLE notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    type notification NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE user_management (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    action user_action NOT NULL,
    reason TEXT,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE company_verification (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    verified_by UUID NOT NULL,
    verified_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (verified_by) REFERENCES users_profile(id)
);