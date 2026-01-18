# NAIC 2026 Backend Automation

This directory contains the backend automation setup for the NAIC 2026 registration system, including Google Sheets synchronization and automated email notifications.

## 📋 Overview

When a user submits a registration form:
1. **Data is saved** to Supabase database
2. **Database trigger fires** automatically
3. **Edge Function executes** to:
   - Sync registration data to Google Sheets
   - Send confirmation email to all team members and advisor

## 🏗️ Architecture

```
┌─────────────────┐
│  Registration   │
│      Form       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Supabase     │
│    Database     │
└────────┬────────┘
         │ (Trigger)
         ▼
┌─────────────────┐
│  Edge Function  │
│ handle-registration
└────┬───────┬────┘
     │       │
     ▼       ▼
┌─────────┐ ┌─────────┐
│ Google  │ │ Resend  │
│ Sheets  │ │  Email  │
└─────────┘ └─────────┘
```

## 📁 File Structure

```
supabase/
├── functions/
│   └── handle-registration/
│       └── index.ts              # Edge Function for automation
├── migrations/
│   ├── 20260117185937_*.sql     # Initial registrations table
│   ├── 20260117193623_*.sql     # Additional schema updates
│   └── 20260118000000_*.sql     # Registration trigger
└── config.toml                   # Supabase project config

docs/
├── google-sheets-setup.md        # Google Sheets setup guide
└── resend-setup.md               # Resend email setup guide

.agent/workflows/
└── setup-backend-automation.md   # Complete setup workflow
```

## 🚀 Quick Start

### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Google Cloud account with Sheets API enabled
- Resend account with API key
- Node.js/npm installed

### Step 1: Install Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
brew install supabase/tap/supabase
```

### Step 2: Login and Link Project

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref phkkcdimrokfpgxcbbma
```

### Step 3: Set Up Google Sheets

Follow the detailed guide: [`docs/google-sheets-setup.md`](../docs/google-sheets-setup.md)

**Quick checklist:**
- [ ] Create Google Cloud Project
- [ ] Enable Google Sheets API
- [ ] Create Service Account
- [ ] Download credentials JSON
- [ ] Create Google Sheet with headers
- [ ] Share sheet with service account email
- [ ] Get Sheet ID from URL

### Step 4: Set Up Resend

Follow the detailed guide: [`docs/resend-setup.md`](../docs/resend-setup.md)

**Quick checklist:**
- [ ] Sign up for Resend
- [ ] Verify domain (or use test domain)
- [ ] Get API key
- [ ] Update `from` email in Edge Function

### Step 5: Configure Secrets

```bash
# Set Resend API key
supabase secrets set RESEND_API_KEY=re_your_api_key_here

# Set Google credentials (base64 encoded)
cat google-credentials.json | base64 | supabase secrets set GOOGLE_CREDENTIALS_BASE64=-

# Set Google Sheet ID
supabase secrets set GOOGLE_SHEET_ID=your_sheet_id_here
```

### Step 6: Deploy

```bash
# Deploy the Edge Function
supabase functions deploy handle-registration

# Run migrations (if not already applied)
supabase db push
```

### Step 7: Test

Submit a test registration through your form and verify:
- ✅ Data appears in Supabase database
- ✅ Data syncs to Google Sheets
- ✅ Confirmation email is received

## 🔧 Configuration

### Environment Variables

The Edge Function uses these Supabase secrets:

| Secret | Description | Example |
|--------|-------------|---------|
| `RESEND_API_KEY` | Resend API key for sending emails | `re_123abc...` |
| `GOOGLE_CREDENTIALS_BASE64` | Base64-encoded Google service account JSON | `eyJhbGc...` |
| `GOOGLE_SHEET_ID` | ID of the Google Sheet to sync to | `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` |

### Email Template

The email template is defined in `supabase/functions/handle-registration/index.ts` in the `sendConfirmationEmail` function.

To customize:
1. Edit the HTML in the `html` field
2. Update subject line, styling, or content
3. Redeploy: `supabase functions deploy handle-registration`

### Google Sheets Columns

The data is synced in this order (columns A-AK):

1. Registration Date
2. Team Name
3. Track
4. Category
5. Heard About
6-12. Member 1 details (Name, Email, Phone, IC, School, Qualification, Graduation)
13-19. Member 2 details
20-26. Member 3 details
27-33. Member 4 details
34-37. Advisor details (Name, Email, Phone, Relationship)

## 🐛 Troubleshooting

### Edge Function not triggering

1. Check if trigger exists:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_registration_created';
```

2. Check Edge Function logs:
```bash
supabase functions logs handle-registration
```

### Google Sheets sync failing

1. Verify service account has Editor access to the sheet
2. Check credentials are correctly base64 encoded
3. Verify Sheet ID is correct
4. Check Edge Function logs for specific errors

### Emails not sending

1. Verify Resend API key is correct
2. Check domain is verified (or using test domain)
3. For test domain, ensure recipient emails are verified
4. Check Resend dashboard logs
5. Verify `from` email matches your verified domain

### Check secrets

```bash
supabase secrets list
```

## 📊 Monitoring

### View Edge Function Logs

```bash
# Real-time logs
supabase functions logs handle-registration --follow

# Recent logs
supabase functions logs handle-registration --limit 50
```

### Check Database

```sql
-- View recent registrations
SELECT id, team_name, created_at 
FROM registrations 
ORDER BY created_at DESC 
LIMIT 10;
```

### Monitor Email Delivery

1. Go to [Resend Dashboard](https://resend.com/emails)
2. View **Logs** for delivery status
3. Check for bounces or failures

## 🔒 Security

- **Secrets**: All API keys are stored as encrypted Supabase secrets
- **RLS**: Row Level Security is enabled on the registrations table
- **CORS**: Edge Function has CORS headers configured
- **Service Account**: Google credentials use service account (not user account)

## 💰 Costs

### Supabase
- **Free tier**: 500,000 Edge Function invocations/month
- **Pro**: $25/month for higher limits

### Resend
- **Free tier**: 3,000 emails/month, 100/day
- **Paid**: Starting at $20/month for 50,000 emails

### Google Sheets API
- **Free**: 300 requests/minute per project
- No cost for typical usage

## 📚 Additional Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Resend Documentation](https://resend.com/docs)
- [Workflow Guide](.agent/workflows/setup-backend-automation.md)

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Edge Function logs
3. Verify all secrets are set correctly
4. Check the detailed setup guides in `/docs`

## 📝 License

This automation setup is part of the NAIC 2026 project.
