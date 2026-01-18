#!/bin/bash

# NAIC 2026 Backend Setup Script
# This script helps you set up the backend automation for Google Sheets and Resend

set -e

echo "🚀 NAIC 2026 Backend Setup"
echo "=========================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI is not installed${NC}"
    echo ""
    echo "Install it with:"
    echo "  macOS:   brew install supabase/tap/supabase"
    echo "  Windows: scoop install supabase"
    echo "  Linux:   brew install supabase/tap/supabase"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Supabase CLI is installed${NC}"
echo ""

# Check if logged in
if ! supabase projects list &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Supabase${NC}"
    echo "Logging in..."
    supabase login
fi

echo -e "${GREEN}✅ Logged in to Supabase${NC}"
echo ""

# Link project
echo -e "${BLUE}🔗 Linking to Supabase project...${NC}"
if [ ! -f "supabase/.temp/project-ref" ]; then
    supabase link --project-ref phkkcdimrokfpgxcbbma
fi
echo -e "${GREEN}✅ Project linked${NC}"
echo ""

# Prompt for secrets
echo -e "${BLUE}📝 Setting up secrets...${NC}"
echo ""

# Resend API Key
echo -e "${YELLOW}Enter your Resend API key:${NC}"
echo "(Get it from: https://resend.com/api-keys)"
read -r RESEND_API_KEY

if [ -z "$RESEND_API_KEY" ]; then
    echo -e "${RED}❌ Resend API key is required${NC}"
    exit 1
fi

supabase secrets set RESEND_API_KEY="$RESEND_API_KEY"
echo -e "${GREEN}✅ Resend API key set${NC}"
echo ""

# Google Credentials
echo -e "${YELLOW}Enter the path to your Google credentials JSON file:${NC}"
echo "(e.g., ./google-credentials.json)"
read -r GOOGLE_CREDS_PATH

if [ ! -f "$GOOGLE_CREDS_PATH" ]; then
    echo -e "${RED}❌ File not found: $GOOGLE_CREDS_PATH${NC}"
    exit 1
fi

# Base64 encode and set
GOOGLE_CREDS_BASE64=$(cat "$GOOGLE_CREDS_PATH" | base64)
supabase secrets set GOOGLE_CREDENTIALS_BASE64="$GOOGLE_CREDS_BASE64"
echo -e "${GREEN}✅ Google credentials set${NC}"
echo ""

# Google Sheet ID
echo -e "${YELLOW}Enter your Google Sheet ID:${NC}"
echo "(Find it in the URL: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit)"
read -r GOOGLE_SHEET_ID

if [ -z "$GOOGLE_SHEET_ID" ]; then
    echo -e "${RED}❌ Google Sheet ID is required${NC}"
    exit 1
fi

supabase secrets set GOOGLE_SHEET_ID="$GOOGLE_SHEET_ID"
echo -e "${GREEN}✅ Google Sheet ID set${NC}"
echo ""

# Deploy Edge Function
echo -e "${BLUE}🚀 Deploying Edge Function...${NC}"
supabase functions deploy handle-registration
echo -e "${GREEN}✅ Edge Function deployed${NC}"
echo ""

# Run migrations
echo -e "${BLUE}📊 Running database migrations...${NC}"
supabase db push
echo -e "${GREEN}✅ Migrations applied${NC}"
echo ""

# Success!
echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Test the registration form"
echo "2. Check Google Sheets for synced data"
echo "3. Verify confirmation emails are sent"
echo ""
echo "Useful commands:"
echo "  View logs:    supabase functions logs handle-registration --follow"
echo "  List secrets: supabase secrets list"
echo "  Test locally: supabase functions serve handle-registration"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "  Backend:       supabase/README.md"
echo "  Google Sheets: docs/google-sheets-setup.md"
echo "  Resend:        docs/resend-setup.md"
echo ""
