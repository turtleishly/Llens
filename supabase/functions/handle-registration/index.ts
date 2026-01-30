import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { google } from "npm:googleapis@126";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationData {
  id: string;
  created_at: string;
  heard_about: string;
  heard_about_other: string | null;
  team_name: string;
  track: string;
  category: string;
  member1_full_name: string;
  member1_contact_number: string;
  member1_ic_number: string;
  member1_email: string;
  member1_nationality: string;
  member1_country_of_residence: string;
  member1_school: string;
  member1_qualification: string;
  member1_graduation_date: string;
  member2_full_name: string;
  member2_contact_number: string;
  member2_ic_number: string;
  member2_email: string;
  member2_nationality: string;
  member2_country_of_residence: string;
  member2_school: string;
  member2_qualification: string;
  member2_graduation_date: string;
  member3_full_name: string;
  member3_contact_number: string;
  member3_ic_number: string;
  member3_email: string;
  member3_nationality: string;
  member3_country_of_residence: string;
  member3_school: string;
  member3_qualification: string;
  member3_graduation_date: string;
  member4_full_name: string;
  member4_contact_number: string;
  member4_ic_number: string;
  member4_email: string;
  member4_nationality: string;
  member4_country_of_residence: string;
  member4_school: string;
  member4_qualification: string;
  member4_graduation_date: string;
  advisor_full_name: string;
  advisor_relationship: string;
  advisor_relationship_other: string | null;
  advisor_relationship_details: string;
  advisor_contact_number: string;
  advisor_email: string;
}

// Sync registration data to Google Sheets
async function syncToGoogleSheets(data: RegistrationData) {
  try {
    // Decode base64 credentials
    // Decode base64 credentials with robust character handling
    const credentialsBase64 = Deno.env.get("GOOGLE_CREDENTIALS_BASE64");
    if (!credentialsBase64) {
      console.error("Missing GOOGLE_CREDENTIALS_BASE64 env var");
      throw new Error("Google credentials not found");
    }

    let credentials;
    try {
      // Remove any whitespace which can break atob in some environments
      const cleanedBase64 = credentialsBase64.replace(/\s/g, '');
      const jsonStr = atob(cleanedBase64);
      credentials = JSON.parse(jsonStr);
    } catch (parseError: any) {
      console.error("Failed to parse Google Credentials:", parseError);
      throw new Error(`Credential parsing failed: ${parseError.message}`);
    }
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
      data.heard_about_other,
      // Member 1
      data.member1_full_name,
      data.member1_email,
      data.member1_nationality,
      data.member1_country_of_residence,
      data.member1_contact_number,
      data.member1_ic_number,
      data.member1_school,
      data.member1_qualification,
      data.member1_graduation_date,
      // Member 2
      data.member2_full_name,
      data.member2_email,
      data.member2_nationality,
      data.member2_country_of_residence,
      data.member2_contact_number,
      data.member2_ic_number,
      data.member2_school,
      data.member2_qualification,
      data.member2_graduation_date,
      // Member 3
      data.member3_full_name,
      data.member3_email,
      data.member3_nationality,
      data.member3_country_of_residence,
      data.member3_contact_number,
      data.member3_ic_number,
      data.member3_school,
      data.member3_qualification,
      data.member3_graduation_date,
      // Member 4
      data.member4_full_name,
      data.member4_email,
      data.member4_nationality,
      data.member4_country_of_residence,
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
      data.advisor_relationship_other,
      data.advisor_relationship_details,
    ];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Registrations!A:AV", // Adjust range as needed
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
        from: "National AI Competition <noreply@rakantutor.org>",
        reply_to: ["mingjackt@sunway.edu.my", "clement@sunway.edu.my"],
        to: [data.advisor_email],
        cc: memberEmails,
        subject: `Registration Received: Team ${data.team_name} - National AI Competition`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
              <title>Registration Received - NAIC 2026</title>
            </head>
            <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2E2D2B; background-color: #FDFCF6; margin: 0; padding: 0;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FDFCF6;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #E5E7EB;">
                      <!-- Header Gradient -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #2E2D2B 0%, #1A1A1A 100%); padding: 60px 40px; text-align: center;">
                          <h1 style="font-family: 'Outfit', sans-serif; color: #FDFCF6; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.02em;">National AI Competition</h1>
                          <p style="color: rgba(253, 252, 246, 0.7); margin: 10px 0 0 0; font-size: 16px; font-family: 'Inter', sans-serif;">Registration Received</p>
                        </td>
                      </tr>
                      
                      <!-- Main Content -->
                      <tr>
                        <td style="padding: 50px 40px;">
                          <p style="font-size: 18px; margin-bottom: 24px;">Hi <strong>Team ${data.team_name}</strong>,</p>
                          
                          <p style="font-size: 16px; margin-bottom: 30px; color: #4B5563;">
                            Thank you for registering for the competition! We're happy to confirm that we've received your team's submission. All four members will be participating under:
                          </p>

                          <!-- Track & Category Info -->
                          <div style="background-color: #F9FAFB; border-radius: 16px; padding: 24px; margin-bottom: 30px; border: 1px solid #F3F4F6;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="padding-bottom: 12px; font-weight: 600; color: #2E2D2B; width: 100px;">Track:</td>
                                <td style="padding-bottom: 12px; color: #4B5563;">${data.track}</td>
                              </tr>
                              <tr>
                                <td style="font-weight: 600; color: #2E2D2B;">Category:</td>
                                <td style="color: #4B5563;">${data.category}</td>
                              </tr>
                            </table>
                          </div>

                          <h3 style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 600; color: #2E2D2B; margin-bottom: 16px;">Team Members:</h3>
                          <ul style="list-style: none; padding: 0; margin: 0 0 30px 0;">
                            <li style="padding: 8px 12px; background-color: #FDFCF6; border-radius: 8px; margin-bottom: 8px; border: 1px solid #F3F4F6; color: #4B5563;">1. ${data.member1_full_name}</li>
                            <li style="padding: 8px 12px; background-color: #FDFCF6; border-radius: 8px; margin-bottom: 8px; border: 1px solid #F3F4F6; color: #4B5563;">2. ${data.member2_full_name}</li>
                            <li style="padding: 8px 12px; background-color: #FDFCF6; border-radius: 8px; margin-bottom: 8px; border: 1px solid #F3F4F6; color: #4B5563;">3. ${data.member3_full_name}</li>
                            <li style="padding: 8px 12px; background-color: #FDFCF6; border-radius: 8px; margin-bottom: 8px; border: 1px solid #F3F4F6; color: #4B5563;">4. ${data.member4_full_name}</li>
                          </ul>

                          <p style="font-size: 15px; margin-bottom: 24px; color: #4B5563;">
                            Masterclass links will be sent out on the <strong>19 March 2026 (Thursday)</strong>, so keep an eye on your inbox. In the meantime, for more information please log on to <a href="https://linktr.ee/nationalAIcompetition" style="color: #2E2D2B; text-decoration: underline; font-weight: 500;">linktr.ee/nationalAIcompetition</a>.
                          </p>

                          <!-- WhatsApp CTA -->
                          <div style="text-align: center; margin: 40px 0;">
                            <a href="https://bit.ly/naic26WA" style="background-color: #2E2D2B; color: #FDFCF6; padding: 18px 32px; border-radius: 100px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 4px 14px rgba(0,0,0,0.1);">Join WhatsApp Community</a>
                            <p style="font-size: 14px; color: #6B7280; margin-top: 12px;">Keep up to date on the latest announcements</p>
                          </div>

                          <p style="font-size: 15px; color: #4B5563; margin-top: 40px; border-top: 1px solid #F3F4F6; pt: 30px;">
                            On behalf of Sunway University and Rakan Tutor, we truly appreciate your interest and enthusiasm.
                          </p>

                          <div style="background-color: #FFFBEB; border-radius: 16px; padding: 24px; margin-top: 30px; border: 1px solid #FEF3C7;">
                            <h4 style="margin: 0 0 12px 0; color: #92400E; font-size: 16px; font-weight: 600;">Need any help?</h4>
                            <p style="margin: 0; color: #B45309; font-size: 14px;">If you have any further questions, please email <a href="mailto:mingjackt@sunway.edu.my" style="color: inherit; text-decoration: none; font-weight: 600;">mingjackt@sunway.edu.my (Jack)</a> / <a href="mailto:clement@sunway.edu.my" style="color: inherit; text-decoration: none; font-weight: 600;">clement@sunway.edu.my (Clemen)</a> or WhatsApp Jack at <a href="https://wa.me/60192004268" style="color: inherit; text-decoration: none; font-weight: 600;">(019-200 4268)</a>.</p>
                          </div>

                          <p style="font-size: 16px; margin-top: 40px; color: #2E2D2B;">
                            Looking forward to seeing your team in action!
                          </p>

                          <p style="font-size: 16px; margin-top: 24px; color: #2E2D2B; font-weight: 600;">
                            Best regards,<br>
                            <span style="color: #4B5563; font-weight: 400;">The National AI Competition Committee</span>
                          </p>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="padding: 30px 40px; background-color: #F9FAFB; border-top: 1px solid #F3F4F6; text-align: center;">
                          <p style="font-size: 12px; color: #9CA3AF; margin: 0;">
                            &copy; 2026 National AI Competition. Organized by Sunway University & Rakan Tutor.
                          </p>
                          <p style="font-size: 12px; color: #9CA3AF; margin: 10px 0 0 0;">
                            <a href="https://rakantutor.org/naic/terms" style="color: #2E2D2B; text-decoration: none;">Terms & Conditions</a> &nbsp;&bull;&nbsp;
                            <a href="https://rakantutor.org/naic/privacy" style="color: #2E2D2B; text-decoration: none;">Privacy Policy</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
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
