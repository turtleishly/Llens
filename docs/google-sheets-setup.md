# Google Sheets Setup Instructions

## 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Name it something like "NAIC Registration Sync"

## 2. Enable Google Sheets API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click **Enable**

## 3. Create Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the details:
   - Service account name: `naic-sheets-sync`
   - Service account ID: (auto-generated)
   - Description: "Service account for syncing NAIC registrations to Google Sheets"
4. Click **Create and Continue**
5. Grant role: **Editor** (or create custom role with Sheets access)
6. Click **Done**

## 4. Create and Download Credentials

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** format
5. Click **Create**
6. Save the downloaded JSON file securely (you'll need this later)

## 5. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "NAIC 2026 Registrations"
4. Create a sheet named "Registrations"
5. Add headers in the first row:

```
A1: Registration Date
B1: Team Name
C1: Track
D1: Category
E1: Heard About
F1: Member 1 - Name
G1: Member 1 - Email
H1: Member 1 - Phone
I1: Member 1 - IC Number
J1: Member 1 - School
K1: Member 1 - Qualification
L1: Member 1 - Graduation Date
M1: Member 2 - Name
N1: Member 2 - Email
O1: Member 2 - Phone
P1: Member 2 - IC Number
Q1: Member 2 - School
R1: Member 2 - Qualification
S1: Member 2 - Graduation Date
T1: Member 3 - Name
U1: Member 3 - Email
V1: Member 3 - Phone
W1: Member 3 - IC Number
X1: Member 3 - School
Y1: Member 3 - Qualification
Z1: Member 3 - Graduation Date
AA1: Member 4 - Name
AB1: Member 4 - Email
AC1: Member 4 - Phone
AD1: Member 4 - IC Number
AE1: Member 4 - School
AF1: Member 4 - Qualification
AG1: Member 4 - Graduation Date
AH1: Advisor - Name
AI1: Advisor - Email
AJ1: Advisor - Phone
AK1: Advisor - Relationship
```

## 6. Share Sheet with Service Account

1. Copy the service account email from the JSON credentials file (looks like: `naic-sheets-sync@your-project.iam.gserviceaccount.com`)
2. In your Google Sheet, click **Share**
3. Paste the service account email
4. Give it **Editor** access
5. Uncheck "Notify people"
6. Click **Share**

## 7. Get Sheet ID

The Sheet ID is in the URL of your Google Sheet:
```
https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
```

Copy the `SHEET_ID` part - you'll need this for the Supabase secrets.

## 8. Prepare Credentials for Supabase

You need to base64 encode your credentials file:

```bash
# On Mac/Linux:
cat path/to/your-credentials.json | base64

# On Windows (PowerShell):
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\your-credentials.json"))
```

Copy the output - you'll use this when setting Supabase secrets.

## Done! ✅

You now have:
- ✅ Google Cloud Project with Sheets API enabled
- ✅ Service Account with credentials
- ✅ Google Sheet ready to receive data
- ✅ Sheet ID and base64-encoded credentials

Next step: Set up Resend for email notifications!
