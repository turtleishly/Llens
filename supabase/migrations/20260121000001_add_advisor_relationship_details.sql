-- Add advisor_relationship_details column to registrations table
ALTER TABLE public.registrations
ADD COLUMN IF NOT EXISTS advisor_relationship_details TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN public.registrations.advisor_relationship_details IS 'Additional details about the advisor relationship with participants';
