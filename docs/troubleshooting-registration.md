# Troubleshooting Registration System

## Issue: Supabase data entry works, but Google Sheets and Email automation don't work

### Root Cause
The database trigger that calls the Edge Function is not properly configured with the necessary settings.

### System Architecture

1. **User submits form** → Frontend inserts data into Supabase `registrations` table ✅
2. **Database trigger fires** → `on_registration_created` trigger runs after insert
3. **Trigger calls Edge Function** → Uses `pg_net.http_post()` to call `handle-registration` Edge Function
4. **Edge Function processes** → Syncs to Google Sheets and sends confirmation email
   - Calls `syncToGoogleSheets()`
   - Calls `sendConfirmationEmail()`

### The Problem

The trigger function at `supabase/migrations/20260118000000_add_registration_trigger.sql:12` tries to read:
- `app.settings.supabase_url` - Not configured ❌
- `app.settings.service_role_key` - Not configured ❌

This causes the HTTP call to fail silently, so Google Sheets and emails are never triggered.

### Solutions

#### Option 1: Apply the New Migration (Recommended)

1. **Deploy the new migration:**
   ```bash
   supabase db push
   ```

2. **Set the service role key manually** (for security):
   - Go to Supabase Dashboard → SQL Editor
   - Run this SQL (replace with your actual service role key):
   ```sql
   ALTER DATABASE postgres SET app.settings.service_role_key = 'your-service-role-key-here';
   ```
   - You can find your service role key in Supabase Dashboard → Settings → API

#### Option 2: Manual Database Configuration

If you don't want to apply the migration, manually configure the settings:

1. Go to Supabase Dashboard → SQL Editor
2. Run these commands:
   ```sql
   ALTER DATABASE postgres SET app.settings.supabase_url = 'https://barsjbjrgzubewjodzdd.supabase.co';
   ALTER DATABASE postgres SET app.settings.service_role_key = 'your-service-role-key-here';
   ```

#### Option 3: Modify Edge Function to Accept Anonymous Calls

Update the Edge Function to not require authentication (less secure but simpler):

1. The current function doesn't validate the Authorization header, so this might already work
2. Remove the Authorization header requirement from the trigger

### Verification Steps

After applying the fix:

1. **Test the trigger manually:**
   ```sql
   -- Insert a test registration via SQL Editor
   INSERT INTO registrations (...) VALUES (...);
   ```

2. **Check Edge Function logs:**
   ```bash
   supabase functions logs handle-registration
   ```
   Look for:
   - "Processing registration: [id]"
   - "Successfully synced to Google Sheets"
   - "Successfully sent confirmation email"

3. **Check for errors:**
   - Google Sheets errors: "Missing GOOGLE_CREDENTIALS_BASE64 env var" or authentication errors
   - Email errors: "Resend API key not found" or API errors

4. **Check pg_net logs:**
   ```sql
   SELECT * FROM net._http_response ORDER BY created DESC LIMIT 5;
   ```

### Common Issues

#### Issue 1: Google Sheets not updating
**Error**: "Missing GOOGLE_CREDENTIALS_BASE64 env var"
**Solution**: Ensure you've set the Supabase secret:
```bash
supabase secrets set GOOGLE_CREDENTIALS_BASE64="your-base64-credentials"
supabase secrets set GOOGLE_SHEET_ID="your-sheet-id"
```

#### Issue 2: Emails not sending
**Error**: "Resend API key not found"
**Solution**: Set the Resend API key:
```bash
supabase secrets set RESEND_API_KEY="your-resend-api-key"
```

#### Issue 3: Service account can't access Google Sheet
**Error**: "The caller does not have permission"
**Solution**:
1. Copy service account email from credentials JSON
2. Share the Google Sheet with that email
3. Give it "Editor" access

#### Issue 4: Database trigger not firing
**Check**: Query to see if trigger exists:
```sql
SELECT * FROM information_schema.triggers WHERE trigger_name = 'on_registration_created';
```

**Solution**: Reapply the migration:
```bash
supabase db reset
supabase db push
```

### Environment Variables Checklist

**Supabase Edge Function Secrets** (set via `supabase secrets set`):
- ✅ `GOOGLE_CREDENTIALS_BASE64` - Base64-encoded Google service account JSON
- ✅ `GOOGLE_SHEET_ID` - Your Google Sheet ID
- ✅ `RESEND_API_KEY` - Resend email API key

**Database Settings** (set via SQL):
- ✅ `app.settings.supabase_url` - Your Supabase project URL
- ✅ `app.settings.service_role_key` - Your Supabase service role key

**Frontend Environment Variables** (.env):
- ✅ `VITE_SUPABASE_URL` - Your Supabase project URL
- ✅ `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anonymous key

### Testing the Full Flow

1. **Submit a test registration** through the website form
2. **Check Supabase table:**
   ```sql
   SELECT * FROM registrations ORDER BY created_at DESC LIMIT 1;
   ```
3. **Check Google Sheets** - Should have a new row
4. **Check email** - Advisor and all team members should receive confirmation
5. **Check Edge Function logs** for any errors

### Debugging Commands

```bash
# List deployed Edge Functions
supabase functions list

# View Edge Function logs
supabase functions logs handle-registration

# View all secrets (hashed)
supabase secrets list

# Deploy Edge Function
supabase functions deploy handle-registration

# Push database migrations
supabase db push

# View migration status
supabase migration list
```

### Contact

If issues persist:
- Check Edge Function logs for specific error messages
- Verify all secrets are properly set
- Ensure Google Sheet is shared with service account
- Test Edge Function directly via Supabase Dashboard
