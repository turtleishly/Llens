# Quick Fix: Google Sheets & Email Automation Not Working

## What Was The Problem?

The database trigger was trying to access configuration settings (`app.settings.supabase_url`) that weren't set up, causing the HTTP call to your Edge Function to fail silently.

**Result:** Data was saved to Supabase ✅, but Google Sheets and emails never triggered ❌

## What Was Fixed?

✅ Updated the database trigger to use a hardcoded Supabase URL
✅ Deployed the fix via migration `20260129044852_configure_trigger_settings.sql`
✅ The trigger now properly calls the `handle-registration` Edge Function

## Verify The Fix Works

### Option 1: Test via SQL (Recommended for first test)

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run the test script from `test-registration.sql`
3. Check the results:
   - ✅ New record in `registrations` table
   - ✅ New row in Google Sheets
   - ✅ Confirmation email sent to advisor and all team members

### Option 2: Test via Website Form

1. Fill out a registration form on the website
2. Check:
   - ✅ Google Sheets has the new registration
   - ✅ Email received by advisor and team members

## Debugging Steps (If It Still Doesn't Work)

### 1. Check Edge Function Logs

```bash
# In terminal:
supabase functions logs handle-registration

# Or view in Supabase Dashboard:
# Edge Functions → handle-registration → Logs
```

**Look for:**
- ✅ "Processing registration: [id]"
- ✅ "Successfully synced to Google Sheets"
- ✅ "Successfully sent confirmation email"

**Common errors:**
- ❌ "Missing GOOGLE_CREDENTIALS_BASE64 env var" → Secret not set
- ❌ "Google credentials not found" → Secret not set correctly
- ❌ "Resend API key not found" → Email secret not set
- ❌ "The caller does not have permission" → Service account not shared with Sheet

### 2. Verify Secrets Are Set

```bash
supabase secrets list
```

**Required secrets:**
- ✅ `GOOGLE_CREDENTIALS_BASE64` - Base64-encoded Google service account JSON
- ✅ `GOOGLE_SHEET_ID` - Your Google Sheet ID
- ✅ `RESEND_API_KEY` - Resend email API key

**If any are missing, set them:**

```bash
# Google Sheets credentials
cat path/to/google-credentials.json | base64 | supabase secrets set GOOGLE_CREDENTIALS_BASE64

# Google Sheet ID (from the URL)
supabase secrets set GOOGLE_SHEET_ID="your-sheet-id-here"

# Resend API key
supabase secrets set RESEND_API_KEY="re_xxxxxxxxxxxxx"
```

### 3. Check Database Trigger Logs

```sql
-- In Supabase SQL Editor:
SELECT
  id,
  status_code,
  content::text,
  created
FROM net._http_response
ORDER BY created DESC
LIMIT 10;
```

**What to look for:**
- ✅ `status_code: 200` → Success
- ✅ `status_code: 207` → Partial success (one of Google Sheets or email failed)
- ❌ `status_code: 500` → Complete failure
- ❌ Empty result → Trigger didn't fire or `pg_net` not working

### 4. Verify Google Sheets Setup

1. **Service Account Email:** Found in your Google credentials JSON file
   ```json
   {
     "client_email": "naic-sheets-sync@your-project.iam.gserviceaccount.com"
   }
   ```

2. **Share the Sheet:**
   - Open your Google Sheet
   - Click "Share"
   - Add the service account email
   - Give it "Editor" access
   - Uncheck "Notify people"

3. **Check Sheet Name:**
   - The sheet tab must be named exactly: `Registrations`
   - Case-sensitive!

### 5. Verify Resend Email Setup

1. **Get API Key:** From [Resend Dashboard](https://resend.com/api-keys)
2. **Verify Domain:** The sender email `noreply@rakantutor.org` must be verified
3. **Test Email:** Check spam folder if not in inbox

## Quick Reference

### File Locations

- **Edge Function:** [supabase/functions/handle-registration/index.ts](../supabase/functions/handle-registration/index.ts)
- **Database Trigger:** [supabase/migrations/20260129044852_configure_trigger_settings.sql](../supabase/migrations/20260129044852_configure_trigger_settings.sql)
- **Original Trigger:** [supabase/migrations/20260118000000_add_registration_trigger.sql](../supabase/migrations/20260118000000_add_registration_trigger.sql)
- **Test Script:** [test-registration.sql](../test-registration.sql)
- **Setup Guide:** [google-sheets-setup.md](./google-sheets-setup.md)
- **Full Troubleshooting:** [troubleshooting-registration.md](./troubleshooting-registration.md)

### System Flow

```
User fills form
    ↓
Frontend submits to Supabase
    ↓
Data inserted into `registrations` table ✅
    ↓
Database trigger `on_registration_created` fires
    ↓
pg_net.http_post() calls Edge Function
    ↓
Edge Function `handle-registration` receives request
    ↓
Parallel execution:
    ├─→ syncToGoogleSheets() → Appends row to Google Sheet
    └─→ sendConfirmationEmail() → Sends via Resend API
```

### Environment Variables Summary

| Variable | Location | Required For | Status |
|----------|----------|--------------|--------|
| `GOOGLE_CREDENTIALS_BASE64` | Edge Function Secret | Google Sheets sync | ✅ Set |
| `GOOGLE_SHEET_ID` | Edge Function Secret | Google Sheets sync | ✅ Set |
| `RESEND_API_KEY` | Edge Function Secret | Email automation | ✅ Set |
| Supabase URL (hardcoded) | Database Trigger | Edge Function call | ✅ Fixed |

## Still Having Issues?

1. **Check Edge Function logs** for specific error messages
2. **Run the test SQL script** to isolate the issue
3. **Verify all secrets** are set correctly
4. **Check Google Sheet permissions** for service account
5. **Review the full troubleshooting guide** at [troubleshooting-registration.md](./troubleshooting-registration.md)

## Next Steps After Confirming Fix

1. ✅ Test with a real registration via the website form
2. ✅ Monitor Edge Function logs for any errors
3. ✅ Check Google Sheets for new entries
4. ✅ Verify emails are being received
5. ✅ Delete test registrations from database and Google Sheets
