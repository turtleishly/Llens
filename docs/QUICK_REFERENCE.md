# Backend Automation - Quick Reference

## 🎯 What Gets Automated

When a user submits the registration form:

1. ✅ **Data saved** to Supabase database
2. ✅ **Synced** to Google Sheets automatically
3. ✅ **Email sent** to all 4 team members + advisor

## ⚡ Quick Setup (5 minutes)

```bash
# Run the automated setup script
./scripts/setup-backend.sh
```

The script will prompt you for:
- Resend API key
- Google credentials file path
- Google Sheet ID

## 🔑 Required Accounts

| Service | Purpose | Free Tier | Sign Up |
|---------|---------|-----------|---------|
| **Supabase** | Database & Edge Functions | 500K function calls/month | [supabase.com](https://supabase.com) |
| **Resend** | Email delivery | 3,000 emails/month | [resend.com](https://resend.com) |
| **Google Cloud** | Sheets API | 300 requests/min | [console.cloud.google.com](https://console.cloud.google.com) |

## 📋 Pre-Setup Checklist

### Google Sheets
- [ ] Create Google Cloud Project
- [ ] Enable Google Sheets API
- [ ] Create Service Account
- [ ] Download credentials JSON
- [ ] Create Google Sheet with headers
- [ ] Share sheet with service account email
- [ ] Copy Sheet ID from URL

**Detailed guide:** [`docs/google-sheets-setup.md`](../docs/google-sheets-setup.md)

### Resend
- [ ] Sign up for account
- [ ] Verify domain (or use test domain)
- [ ] Create API key
- [ ] Update `from` email in Edge Function

**Detailed guide:** [`docs/resend-setup.md`](../docs/resend-setup.md)

## 🚀 Manual Setup

If you prefer manual setup:

```bash
# 1. Install Supabase CLI
brew install supabase/tap/supabase

# 2. Login
supabase login

# 3. Link project
supabase link --project-ref phkkcdimrokfpgxcbbma

# 4. Set secrets
supabase secrets set RESEND_API_KEY=re_xxxxx
cat google-creds.json | base64 | supabase secrets set GOOGLE_CREDENTIALS_BASE64=-
supabase secrets set GOOGLE_SHEET_ID=your_sheet_id

# 5. Deploy
supabase functions deploy handle-registration
supabase db push
```

## 🧪 Testing

### Test the full flow:

1. Submit a test registration
2. Check Supabase dashboard → Table Editor → `registrations`
3. Check Google Sheet for new row
4. Check email inbox for confirmation

### View logs:

```bash
# Real-time logs
supabase functions logs handle-registration --follow

# Recent logs
supabase functions logs handle-registration --limit 20
```

## 🔧 Common Commands

```bash
# View all secrets
supabase secrets list

# Update a secret
supabase secrets set SECRET_NAME=new_value

# Redeploy function
supabase functions deploy handle-registration

# Test function locally
supabase functions serve handle-registration

# View database
supabase db diff

# Reset database (⚠️ destructive)
supabase db reset
```

## 📊 Monitoring

### Supabase Dashboard
- **Database**: View registrations in Table Editor
- **Edge Functions**: Check invocations and errors
- **Logs**: Real-time function logs

### Resend Dashboard
- **Emails**: View sent emails and delivery status
- **Logs**: Check for bounces or failures
- **Analytics**: Email open rates (if tracking enabled)

### Google Sheets
- **Data**: View synced registrations
- **Formulas**: Add calculations or charts
- **Export**: Download as CSV/Excel

## 🐛 Troubleshooting

### Function not triggering
```bash
# Check if trigger exists
supabase db diff

# View function logs
supabase functions logs handle-registration
```

### Google Sheets not syncing
- Verify service account has Editor access
- Check Sheet ID is correct
- Verify credentials are valid

### Emails not sending
- Check Resend API key
- Verify domain is verified
- Check recipient emails (for test domain)

### Check secrets
```bash
supabase secrets list
```

## 📁 File Locations

```
supabase/
├── functions/handle-registration/index.ts  # Main automation logic
└── migrations/20260118000000_*.sql         # Database trigger

docs/
├── google-sheets-setup.md                  # Google setup guide
└── resend-setup.md                         # Email setup guide

scripts/
└── setup-backend.sh                        # Automated setup script
```

## 💡 Tips

1. **Test with your own email first** before going live
2. **Use test domain** for Resend during development
3. **Monitor logs** after first deployment
4. **Set up alerts** in Supabase for function errors
5. **Backup Google Sheet** regularly

## 🔗 Useful Links

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Google Sheets API Reference](https://developers.google.com/sheets/api)
- [Resend API Docs](https://resend.com/docs)
- [Full Backend README](../supabase/README.md)

## 💰 Cost Estimate (Monthly)

For ~1000 registrations/month:

| Service | Usage | Cost |
|---------|-------|------|
| Supabase | 1K function calls | **Free** |
| Resend | 1K emails | **Free** |
| Google Sheets | 1K API calls | **Free** |
| **Total** | | **$0** |

All services have generous free tiers! 🎉

## 🆘 Need Help?

1. Check the [troubleshooting section](#-troubleshooting)
2. Review [full documentation](../supabase/README.md)
3. Check Edge Function logs
4. Verify all secrets are set correctly

---

**Last updated:** 2026-01-18
