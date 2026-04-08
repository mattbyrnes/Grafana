-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User-submitted clinics table
CREATE TABLE IF NOT EXISTS user_clinics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  region VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  website VARCHAR(500),
  services TEXT[] DEFAULT '{}',
  price_range VARCHAR(50) NOT NULL DEFAULT '$',
  hours VARCHAR(255) NOT NULL DEFAULT '9AM - 5PM',
  description TEXT NOT NULL DEFAULT '',
  image VARCHAR(500),
  status VARCHAR(50) DEFAULT 'approved',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_clinics_user_id ON user_clinics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_clinics_status ON user_clinics(status);
CREATE INDEX IF NOT EXISTS idx_user_clinics_region ON user_clinics(region);
