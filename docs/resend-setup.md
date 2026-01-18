# Resend Email Setup Instructions

## 1. Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## 2. Verify Your Domain (Recommended)

For production use, you should verify your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `naic2026.com`)
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)

### DNS Records to Add:
Resend will provide you with records like:
- **SPF Record** (TXT)
- **DKIM Record** (TXT)
- **DMARC Record** (TXT)

## 3. For Testing (Skip Domain Verification)

If you just want to test, you can use Resend's test domain:
- Emails will be sent from: `onboarding@resend.dev`
- They can only be sent to verified email addresses in your account

To add test recipients:
1. Go to **Settings** > **Email Addresses**
2. Add email addresses you want to test with
3. Verify them via the confirmation email

## 4. Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: `NAIC Registration Emails`
4. Select permission: **Sending access**
5. Click **Create**
6. **Copy the API key immediately** (it won't be shown again!)
7. Store it securely

The API key will look like: `re_123abc456def789...`

## 5. Update the Edge Function

Once you have your verified domain, update the Edge Function code:

In `/supabase/functions/handle-registration/index.ts`, change:

```typescript
from: "NAIC 2026 <noreply@yourdomain.com>", // Update this line
```

To:

```typescript
from: "NAIC 2026 <noreply@naic2026.com>", // Your actual domain
```

Or for testing:

```typescript
from: "NAIC 2026 <onboarding@resend.dev>", // Resend test domain
```

## 6. Customize Email Template (Optional)

The email template is in the Edge Function. You can customize:
- **Subject line**: Change `Registration Confirmed - Team ${data.team_name}`
- **HTML content**: Modify the HTML in the `html` field
- **Styling**: Update inline styles
- **Content**: Add/remove sections as needed

## 7. Set Up Email Tracking (Optional)

Resend provides email tracking features:

1. Go to **Settings** > **Webhooks**
2. Add webhook URL (if you want to track opens, clicks, bounces)
3. Select events to track:
   - `email.sent`
   - `email.delivered`
   - `email.opened`
   - `email.clicked`
   - `email.bounced`

## 8. Test Your Setup

After deploying, you can test emails:

1. Go to Resend dashboard > **Logs**
2. Submit a test registration
3. Check if the email appears in the logs
4. Verify delivery status

## 9. Monitor Usage

Free tier includes:
- **3,000 emails/month**
- **100 emails/day**

For higher volume, upgrade to a paid plan.

## Done! ✅

You now have:
- ✅ Resend account created
- ✅ Domain verified (or test domain ready)
- ✅ API key generated
- ✅ Email template configured

Next step: Deploy the Edge Function and set Supabase secrets!
