-- Migration: Fix trigger to properly call Edge Function
-- This updates the trigger to use hardcoded Supabase URL (since we can't set database parameters)

-- Drop the old function
DROP FUNCTION IF EXISTS handle_new_registration() CASCADE;

-- Create an improved function with hardcoded Supabase URL
CREATE OR REPLACE FUNCTION handle_new_registration()
RETURNS TRIGGER AS $$
DECLARE
  function_url TEXT;
  payload JSONB;
  service_role_key TEXT;
BEGIN
  -- Hardcode the Supabase URL since database settings can't be set via migration
  function_url := 'https://barsjbjrgzubewjodzdd.supabase.co/functions/v1/handle-registration';

  -- Try to get service role key from database settings (if manually configured)
  BEGIN
    service_role_key := current_setting('app.settings.service_role_key', true);
  EXCEPTION
    WHEN OTHERS THEN
      service_role_key := NULL;
  END;

  -- Prepare the payload
  payload := jsonb_build_object(
    'record', row_to_json(NEW)
  );

  -- Call the Edge Function asynchronously using pg_net
  PERFORM
    net.http_post(
      url := function_url,
      headers := CASE
        WHEN service_role_key IS NOT NULL AND service_role_key != '' THEN
          jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || service_role_key
          )
        ELSE
          jsonb_build_object(
            'Content-Type', 'application/json'
          )
      END,
      body := payload
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_registration_created ON public.registrations;

CREATE TRIGGER on_registration_created
  AFTER INSERT ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_registration();

-- NOTE: For better security, you can manually set the service_role_key via SQL Editor
-- in Supabase Dashboard (requires superuser privileges):
-- ALTER DATABASE postgres SET app.settings.service_role_key = 'your-service-role-key-here';
