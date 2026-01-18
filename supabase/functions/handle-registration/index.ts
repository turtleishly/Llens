import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { google } from "https://esm.sh/googleapis@118";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationData {
    id: string;
    created_at: string;
    heard_about: string;
    team_name: string;
    track: string;
    category: string;
    member1_full_name: string;
    member1_contact_number: string;
    member1_ic_number: string;
    member1_email: string;
    member1_school: string;
    member1_qualification: string;
    member1_graduation_date: string;
    member2_full_name: string;
    member2_contact_number: string;
    member2_ic_number: string;
    member2_email: string;
    member2_school: string;
    member2_qualification: string;
    member2_graduation_date: string;
    member3_full_name: string;
    member3_contact_number: string;
    member3_ic_number: string;
    member3_email: string;
    member3_school: string;
    member3_qualification: string;
    member3_graduation_date: string;
    member4_full_name: string;
    member4_contact_number: string;
    member4_ic_number: string;
    member4_email: string;
    member4_school: string;
    member4_qualification: string;
    member4_graduation_date: string;
    advisor_full_name: string;
    advisor_relationship: string;
    advisor_contact_number: string;
    advisor_email: string;
}

// Sync registration data to Google Sheets
async function syncToGoogleSheets(data: RegistrationData) {
    try {
        // Decode base64 credentials
        const credentialsBase64 = Deno.env.get("GOOGLE_CREDENTIALS_BASE64");
        if (!credentialsBase64) {
            throw new Error("Google credentials not found");
        }

        const credentials = JSON.parse(atob(credentialsBase64));
        const sheetId = Deno.env.get("GOOGLE_SHEET_ID");

        // Authenticate with Google
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Prepare row data
        const rowData = [
            data.created_at,
            data.team_name,
            data.track,
            data.category,
            data.heard_about,
            // Member 1
            data.member1_full_name,
            data.member1_email,
            data.member1_contact_number,
            data.member1_ic_number,
            data.member1_school,
            data.member1_qualification,
            data.member1_graduation_date,
            // Member 2
            data.member2_full_name,
            data.member2_email,
            data.member2_contact_number,
            data.member2_ic_number,
            data.member2_school,
            data.member2_qualification,
            data.member2_graduation_date,
            // Member 3
            data.member3_full_name,
            data.member3_email,
            data.member3_contact_number,
            data.member3_ic_number,
            data.member3_school,
            data.member3_qualification,
            data.member3_graduation_date,
            // Member 4
            data.member4_full_name,
            data.member4_email,
            data.member4_contact_number,
            data.member4_ic_number,
            data.member4_school,
            data.member4_qualification,
            data.member4_graduation_date,
            // Advisor
            data.advisor_full_name,
            data.advisor_email,
            data.advisor_contact_number,
            data.advisor_relationship,
        ];

        // Append to sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: "Registrations!A:AK", // Adjust range as needed
            valueInputOption: "RAW",
            requestBody: {
                values: [rowData],
            },
        });

        console.log("Successfully synced to Google Sheets");
        return { success: true };
    } catch (error) {
        console.error("Error syncing to Google Sheets:", error);
        throw error;
    }
}

// Send confirmation email via Resend
async function sendConfirmationEmail(data: RegistrationData) {
    try {
        const resendApiKey = Deno.env.get("RESEND_API_KEY");
        if (!resendApiKey) {
            throw new Error("Resend API key not found");
        }

        // Collect all member emails
        const memberEmails = [
            data.member1_email,
            data.member2_email,
            data.member3_email,
            data.member4_email,
        ];

        // Send email to all team members
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: "NAIC 2026 <noreply@yourdomain.com>", // Update with your verified domain
                to: memberEmails,
                cc: [data.advisor_email],
                subject: `Registration Confirmed - Team ${data.team_name}`,
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>NAIC 2026 Registration Confirmation</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Registration Confirmed!</h1>
              </div>
              
              <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px; margin-bottom: 20px;">Dear <strong>${data.member1_full_name}</strong> and team,</p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Congratulations! Your team <strong>"${data.team_name}"</strong> has been successfully registered for the <strong>National AI Competition 2026</strong>.
                </p>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                  <h2 style="margin-top: 0; color: #667eea; font-size: 20px;">Registration Details</h2>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600;">Team Name:</td>
                      <td style="padding: 8px 0;">${data.team_name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600;">Track:</td>
                      <td style="padding: 8px 0;">${data.track}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600;">Category:</td>
                      <td style="padding: 8px 0;">${data.category}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600;">Registration Date:</td>
                      <td style="padding: 8px 0;">${new Date(data.created_at).toLocaleDateString()}</td>
                    </tr>
                  </table>
                </div>

                <h3 style="color: #667eea; font-size: 18px; margin-top: 30px;">Team Members</h3>
                <ul style="list-style: none; padding: 0;">
                  <li style="padding: 5px 0;">1. ${data.member1_full_name} (${data.member1_email})</li>
                  <li style="padding: 5px 0;">2. ${data.member2_full_name} (${data.member2_email})</li>
                  <li style="padding: 5px 0;">3. ${data.member3_full_name} (${data.member3_email})</li>
                  <li style="padding: 5px 0;">4. ${data.member4_full_name} (${data.member4_email})</li>
                </ul>

                <h3 style="color: #667eea; font-size: 18px; margin-top: 30px;">Advisor</h3>
                <p style="margin: 10px 0;">${data.advisor_full_name} (${data.advisor_relationship})</p>

                <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 30px 0; border-radius: 4px;">
                  <h3 style="margin-top: 0; color: #856404; font-size: 16px;">📌 Next Steps</h3>
                  <ol style="margin: 10px 0; padding-left: 20px; color: #856404;">
                    <li>Check your email regularly for competition updates</li>
                    <li>Join our official communication channels (details coming soon)</li>
                    <li>Start preparing for the competition!</li>
                  </ol>
                </div>

                <p style="font-size: 16px; margin-top: 30px;">
                  If you have any questions, please don't hesitate to contact us at 
                  <a href="mailto:support@naic2026.com" style="color: #667eea; text-decoration: none;">support@naic2026.com</a>
                </p>

                <p style="font-size: 16px; margin-top: 20px;">
                  Best of luck!<br>
                  <strong>The NAIC 2026 Team</strong>
                </p>
              </div>

              <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
                <p>© 2026 National AI Competition. All rights reserved.</p>
                <p>
                  <a href="https://naic2026.com/terms" style="color: #667eea; text-decoration: none; margin: 0 10px;">Terms</a> | 
                  <a href="https://naic2026.com/privacy" style="color: #667eea; text-decoration: none; margin: 0 10px;">Privacy</a>
                </p>
              </div>
            </body>
          </html>
        `,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Resend API error: ${error}`);
        }

        const result = await response.json();
        console.log("Successfully sent confirmation email:", result);
        return { success: true, emailId: result.id };
    } catch (error) {
        console.error("Error sending confirmation email:", error);
        throw error;
    }
}

serve(async (req) => {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { record } = await req.json();
        const data = record as RegistrationData;

        console.log("Processing registration:", data.id);

        // Run both operations in parallel
        const [sheetsResult, emailResult] = await Promise.allSettled([
            syncToGoogleSheets(data),
            sendConfirmationEmail(data),
        ]);

        // Check results
        const errors = [];
        if (sheetsResult.status === "rejected") {
            errors.push(`Google Sheets: ${sheetsResult.reason}`);
        }
        if (emailResult.status === "rejected") {
            errors.push(`Email: ${emailResult.reason}`);
        }

        if (errors.length > 0) {
            console.error("Partial failure:", errors);
            return new Response(
                JSON.stringify({
                    success: false,
                    errors,
                    sheetsSuccess: sheetsResult.status === "fulfilled",
                    emailSuccess: emailResult.status === "fulfilled",
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 207, // Multi-Status
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Registration processed successfully",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error processing registration:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});
