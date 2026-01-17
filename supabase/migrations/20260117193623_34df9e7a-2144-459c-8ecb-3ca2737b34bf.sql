-- Drop the overly permissive SELECT policy that exposes all registration data
DROP POLICY IF EXISTS "Allow reading by member email" ON registrations;

-- Since this is a public registration form without user authentication,
-- there's no need for a SELECT policy. Only admins should view registrations
-- (via the Supabase dashboard or a future admin panel with proper auth).