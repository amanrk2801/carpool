-- Initialize the carpool database
CREATE DATABASE IF NOT EXISTS carpool_db;
USE carpool_db;

-- Create an admin user (optional)
INSERT IGNORE INTO users (email, password_hash, first_name, last_name, phone, is_verified, is_driver) 
VALUES (
    'admin@carpool.com',
    '$2a$10$DowJonesHashExample', -- This should be a proper BCrypt hash
    'Admin',
    'User',
    '+919876543210',
    true,
    false
);

-- Add some sample locations for testing
-- This can be used to populate dropdown menus in the frontend
