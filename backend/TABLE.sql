-- Create database

ALTER USER postgres PASSWORD 'postgres';

CREATE DATABASE postgres;

-- Create tables
CREATE TYPE role_enum AS ENUM ('Admin', 'Dosen');
CREATE TABLE user_account (
    id_user_account SERIAL PRIMARY KEY,
    nip VARCHAR(50) NOT NULL,
    password VARCHAR(25) NOT NULL,
    role role_enum 
);

CREATE TYPE gender_enum AS ENUM ('Laki-Laki', 'Perempuan');
CREATE TABLE profile_dosen (
    id_dosen SERIAL PRIMARY KEY,
    profile_picture TEXT,
    full_name VARCHAR(50) NOT NULL,
    place_of_birth VARCHAR(50),
    date_of_birth DATE,
    gender gender_enum,
    email VARCHAR(100),
    bio TEXT,
    id_user_account INT
);

CREATE TABLE teaching_history (
    id_teaching_history SERIAL PRIMARY KEY,
    id_dosen INT,
    institution VARCHAR(50) NOT NULL,
    position VARCHAR(50),
    start_date DATE,
    end_date DATE
);

CREATE TABLE education_history (
    id_education_history SERIAL PRIMARY KEY,
    id_dosen INT,
    institution VARCHAR(50) NOT NULL,
    degree VARCHAR(50) NOT NULL,
    graduation_date DATE
);

CREATE TABLE research (
    id_research SERIAL PRIMARY KEY,
    id_dosen INT,
    research_title VARCHAR(50) NOT NULL,
    publication_date DATE,
    doi_link TEXT
);

CREATE TABLE pkm (
    id_pkm SERIAL PRIMARY KEY,
    id_dosen INT,
    pkm_title VARCHAR(50) NOT NULL,
    pkm_year DATE,
    partner_name VARCHAR(50),
    description TEXT
);

-- Foreign key constraints


-- Drop foreign key constraints

ALTER TABLE profile_dosen DROP CONSTRAINT IF EXISTS profile_dosen_id_education_history_fk;
ALTER TABLE profile_dosen DROP CONSTRAINT IF EXISTS profile_dosen_id_teaching_history_fk;
ALTER TABLE profile_dosen DROP CONSTRAINT IF EXISTS profile_dosen_id_research_fk;
ALTER TABLE profile_dosen DROP CONSTRAINT IF EXISTS profile_dosen_id_pkm_fk;
ALTER TABLE profile_dosen DROP CONSTRAINT IF EXISTS profile_dosen_id_user_account_fk;
ALTER TABLE teaching_history DROP CONSTRAINT IF EXISTS teaching_history_id_dosen_fk;
ALTER TABLE education_history DROP CONSTRAINT IF EXISTS education_history_id_dosen_fk;
ALTER TABLE research DROP CONSTRAINT IF EXISTS research_id_dosen_fk;
ALTER TABLE pkm DROP CONSTRAINT IF EXISTS pkm_id_dosen_fk;
ALTER TABLE user_account DROP CONSTRAINT IF EXISTS user_account_id_dosen_fk;

--Update database
ALTER TABLE research ALTER COLUMN research_title TYPE VARCHAR(250);
ALTER TABLE pkm ADD COLUMN pkm_link TEXT;
ALTER TABLE profile_dosen ADD COLUMN major VARCHAR(100);
ALTER TABLE profile_dosen ADD COLUMN study_program VARCHAR(100);
ALTER TABLE profile_dosen ADD COLUMN position VARCHAR(100);

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


-- Drop database

DROP DATABASE IF EXISTS postgres;

-- Drop tables

DROP TABLE IF EXISTS profile_dosen;
DROP TABLE IF EXISTS teaching_history;
DROP TABLE IF EXISTS education_history;
DROP TABLE IF EXISTS research;
DROP TABLE IF EXISTS pkm;
DROP TABLE IF EXISTS user_account;

