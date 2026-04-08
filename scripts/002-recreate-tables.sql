-- Drop existing tables and recreate cleanly
DROP TABLE IF EXISTS user_clinics;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User-submitted clinics table
CREATE TABLE user_clinics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  region VARCHAR(255) NOT NULL DEFAULT 'Metro Atlanta',
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  website VARCHAR(500) DEFAULT '',
  services TEXT[] DEFAULT '{}',
  price_range VARCHAR(50) NOT NULL DEFAULT '$',
  hours VARCHAR(255) NOT NULL DEFAULT '9AM - 5PM',
  description TEXT NOT NULL DEFAULT '',
  image VARCHAR(500) DEFAULT '',
  status VARCHAR(50) DEFAULT 'approved',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_clinics_user_id ON user_clinics(user_id);
CREATE INDEX idx_user_clinics_status ON user_clinics(status);
CREATE INDEX idx_user_clinics_region ON user_clinics(region);
