#!/bin/bash

# Verification Script for NAIC Registration System
# This script checks if all required components are properly configured

echo "🔍 NAIC Registration System - Setup Verification"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if supabase CLI is installed
echo "1. Checking Supabase CLI..."
if command -v supabase &> /dev/null; then
    echo -e "${GREEN}✓${NC} Supabase CLI is installed"
    supabase --version
else
    echo -e "${RED}✗${NC} Supabase CLI is not installed"
    echo "   Install from: https://supabase.com/docs/guides/cli"
    exit 1
fi
echo ""

# Check if logged in to Supabase
echo "2. Checking Supabase authentication..."
if supabase projects list &> /dev/null; then
    echo -e "${GREEN}✓${NC} Logged in to Supabase"
else
    echo -e "${RED}✗${NC} Not logged in to Supabase"
    echo "   Run: supabase login"
    exit 1
fi
echo ""

# Check Edge Function deployment
echo "3. Checking Edge Function deployment..."
if supabase functions list 2>&1 | grep -q "handle-registration"; then
    echo -e "${GREEN}✓${NC} Edge Function 'handle-registration' is deployed"
    supabase functions list | grep "handle-registration"
else
    echo -e "${RED}✗${NC} Edge Function 'handle-registration' is not deployed"
    echo "   Run: supabase functions deploy handle-registration"
fi
echo ""

# Check required secrets
echo "4. Checking required secrets..."
SECRETS=$(supabase secrets list 2>&1)

if echo "$SECRETS" | grep -q "GOOGLE_CREDENTIALS_BASE64"; then
    echo -e "${GREEN}✓${NC} GOOGLE_CREDENTIALS_BASE64 is set"
else
    echo -e "${RED}✗${NC} GOOGLE_CREDENTIALS_BASE64 is NOT set"
    echo "   Set with: cat credentials.json | base64 | supabase secrets set GOOGLE_CREDENTIALS_BASE64"
fi

if echo "$SECRETS" | grep -q "GOOGLE_SHEET_ID"; then
    echo -e "${GREEN}✓${NC} GOOGLE_SHEET_ID is set"
else
    echo -e "${RED}✗${NC} GOOGLE_SHEET_ID is NOT set"
    echo "   Set with: supabase secrets set GOOGLE_SHEET_ID='your-sheet-id'"
fi

if echo "$SECRETS" | grep -q "RESEND_API_KEY"; then
    echo -e "${GREEN}✓${NC} RESEND_API_KEY is set"
else
    echo -e "${RED}✗${NC} RESEND_API_KEY is NOT set"
    echo "   Set with: supabase secrets set RESEND_API_KEY='re_xxxxx'"
fi
echo ""

# Check migrations
echo "5. Checking database migrations..."
if supabase migration list 2>&1 | grep -q "configure_trigger_settings"; then
    echo -e "${GREEN}✓${NC} Trigger configuration migration exists"
else
    echo -e "${YELLOW}⚠${NC} Trigger configuration migration not found"
    echo "   This migration should fix the trigger issue"
fi
echo ""

# Check .env file
echo "6. Checking frontend environment variables..."
if [ -f ".env" ]; then
    if grep -q "VITE_SUPABASE_URL" .env && grep -q "VITE_SUPABASE_PUBLISHABLE_KEY" .env; then
        echo -e "${GREEN}✓${NC} Frontend .env file is configured"
    else
        echo -e "${RED}✗${NC} Frontend .env file is missing required variables"
        echo "   Required: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY"
    fi
else
    echo -e "${RED}✗${NC} .env file not found"
    echo "   Copy .env.example to .env and fill in the values"
fi
echo ""

# Summary
echo "=================================================="
echo "📋 Next Steps:"
echo ""
echo "1. If any secrets are missing, set them using the commands above"
echo "2. Test the system by submitting a registration via the web form"
echo "3. Check Edge Function logs: supabase functions logs handle-registration"
echo "4. Verify data appears in Google Sheets"
echo "5. Check that confirmation emails are sent"
echo ""
echo "📚 Documentation:"
echo "   - Setup: docs/google-sheets-setup.md"
echo "   - Quick Fix: docs/QUICK_FIX.md"
echo "   - Troubleshooting: docs/troubleshooting-registration.md"
echo "   - Test SQL: test-registration.sql"
echo ""
echo "✅ Verification complete!"
