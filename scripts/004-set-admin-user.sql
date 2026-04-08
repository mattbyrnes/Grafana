-- To create a super admin account, run this SQL query:
-- Replace 'admin@bridgeglobalhealth.com' with your admin email

UPDATE users
SET is_admin = true
WHERE email = 'admin@bridgeglobalhealth.com';

-- Verify the admin was created:
SELECT id, email, is_admin FROM users WHERE email = 'admin@bridgeglobalhealth.com';
