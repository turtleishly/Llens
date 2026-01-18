---
description: Setup Google Sheets sync and Resend email automation
---

# Backend Automation Setup Guide

This workflow sets up automated Google Sheets syncing and email notifications using Supabase Edge Functions.

## Prerequisites

1. **Supabase CLI** installed
2. **Google Cloud Project** with Sheets API enabled
3. **Resend API Key** (sign up at resend.com)
4. **Google Service Account** credentials

## Step 1: Install Supabase CLI

```bash
brew install supabase/tap/supabase
```

## Step 2: Login to Supabase

```bash
supabase login
```

## Step 3: Link your project

```bash
supabase link --project-ref phkkcdimrokfpgxcbbma
```

## Step 4: Create Edge Function for registration handling

```bash
supabase functions new handle-registration
```

## Step 5: Set up Google Sheets API

1. Go to Google Cloud Console (console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create a Service Account
5. Download the JSON credentials file
6. Share your Google Sheet with the service account email

## Step 6: Set up Resend

1. Sign up at resend.com
2. Verify your domain (or use their test domain)
3. Get your API key from the dashboard
4. Create an email template

## Step 7: Set Supabase secrets

```bash
# Set Resend API key
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxx

# Set Google credentials (base64 encoded)
cat google-credentials.json | base64 | supabase secrets set GOOGLE_CREDENTIALS_BASE64=-

# Set Google Sheet ID
supabase secrets set GOOGLE_SHEET_ID=your_sheet_id_here
```

## Step 8: Create Database Trigger

Create a new migration file to add a trigger that calls the Edge Function when a new registration is inserted.

```bash
supabase migration new add_registration_trigger
```

## Step 9: Deploy Edge Function

```bash
supabase functions deploy handle-registration
```

## Step 10: Test the integration

Submit a test registration through the form and verify:
- Data appears in Supabase
- Data syncs to Google Sheets
- Confirmation email is sent

## Architecture Overview

```
User submits form
    ↓
Frontend → Supabase Database (INSERT)
    ↓
Database Trigger fires
    ↓
Edge Function executes
    ↓
    ├─→ Google Sheets API (sync data)
    └─→ Resend API (send email)
```

## Notes

- Edge Functions run on Deno runtime
- All secrets are encrypted and managed by Supabase
- Functions have access to the database via the Supabase client
- Rate limits apply based on your Supabase plan
