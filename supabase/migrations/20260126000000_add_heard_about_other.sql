-- Add heard_about_other column to registrations table
ALTER TABLE public.registrations
ADD COLUMN heard_about_other TEXT;
