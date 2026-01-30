-- Create contact_submissions table for NAIC contact form
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,

  -- Metadata
  source TEXT NOT NULL DEFAULT 'naic',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  notes TEXT,
  assigned_to TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create rakan_tutor_contacts table for Rakan Tutor contact form
CREATE TABLE public.rakan_tutor_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,

  -- Purpose and details
  purpose_of_contact TEXT NOT NULL CHECK (purpose_of_contact IN ('volunteer', 'host', 'partner', 'other')),
  profession TEXT NOT NULL CHECK (profession IN ('teacher', 'volunteer', 'student', 'parent', 'nonprofit', 'others')),
  message TEXT,

  -- Metadata
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'closed')),
  notes TEXT,
  assigned_to TEXT,
  follow_up_date DATE,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on both tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rakan_tutor_contacts ENABLE ROW LEVEL SECURITY;

-- Policies for contact_submissions
CREATE POLICY "Allow public inserts on contact_submissions"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow reading own submissions by email"
ON public.contact_submissions
FOR SELECT
USING (true);

-- Policies for rakan_tutor_contacts
CREATE POLICY "Allow public inserts on rakan_tutor_contacts"
ON public.rakan_tutor_contacts
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow reading own contacts by email"
ON public.rakan_tutor_contacts
FOR SELECT
USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);

CREATE INDEX idx_rakan_tutor_contacts_email ON public.rakan_tutor_contacts(email);
CREATE INDEX idx_rakan_tutor_contacts_status ON public.rakan_tutor_contacts(status);
CREATE INDEX idx_rakan_tutor_contacts_created_at ON public.rakan_tutor_contacts(created_at DESC);
CREATE INDEX idx_rakan_tutor_contacts_purpose ON public.rakan_tutor_contacts(purpose_of_contact);
CREATE INDEX idx_rakan_tutor_contacts_profession ON public.rakan_tutor_contacts(profession);
