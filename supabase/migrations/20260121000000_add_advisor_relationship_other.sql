-- Add advisor_relationship_other column to registrations table
ALTER TABLE public.registrations
ADD COLUMN IF NOT EXISTS advisor_relationship_other TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN public.registrations.advisor_relationship_other IS 'Additional details when advisor_relationship is "Other"';
