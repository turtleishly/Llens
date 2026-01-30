import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NAICContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    source?: string;
}

interface RakanTutorContactFormData {
    name: string;
    email: string;
    purposeOfContact: string;
    mobileNumber: string;
    profession: string;
    message?: string;
    source: string;
}

serve(async (req) => {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const requestData = await req.json();
        const source = requestData.source || "naic";

        // Initialize Supabase client with service role key
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error("Missing Supabase credentials");
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        const resendApiKey = Deno.env.get("RESEND_API_KEY");
        if (!resendApiKey) {
            throw new Error("Resend API key not found");
        }

        console.log("Processing contact form submission from:", requestData.email, "Source:", source);

        let emailHtml = "";
        let emailSubject = "";
        let emailRecipients: string[] = [];
        let dbInsertResult;

        if (source === "rakan-tutor") {
            // Handle Rakan Tutor contact form
            const contactData = requestData as RakanTutorContactFormData;

            // Save to database
            dbInsertResult = await supabase
                .from("rakan_tutor_contacts")
                .insert({
                    name: contactData.name,
                    email: contactData.email,
                    mobile_number: contactData.mobileNumber,
                    purpose_of_contact: contactData.purposeOfContact,
                    profession: contactData.profession,
                    message: contactData.message || "",
                });

            if (dbInsertResult.error) {
                console.error("Database insert error:", dbInsertResult.error);
                throw new Error(`Failed to save to database: ${dbInsertResult.error.message}`);
            }

            const purposeLabels: Record<string, string> = {
                volunteer: "Volunteer as a workshop speaker",
                host: "Host a free workshop in your school",
                partner: "Partner with us to scale free AI education",
                other: "Other Enquiries",
            };

            emailRecipients = ["team@rakantutor.org", "ashvin.praveen@rakantutor.org"];
            emailSubject = `Rakan Tutor Contact: ${purposeLabels[contactData.purposeOfContact] || contactData.purposeOfContact}`;
            emailHtml = `
                <!DOCTYPE html>
                <html>
                    <body style="font-family: sans-serif; line-height: 1.5; color: #333;">
                        <h2>New Rakan Tutor Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${contactData.name}</p>
                        <p><strong>Email:</strong> ${contactData.email}</p>
                        <p><strong>Mobile Number:</strong> ${contactData.mobileNumber}</p>
                        <p><strong>Purpose of Contact:</strong> ${purposeLabels[contactData.purposeOfContact] || contactData.purposeOfContact}</p>
                        <p><strong>Profession:</strong> ${contactData.profession}</p>
                        ${contactData.message ? `
                        <p><strong>Message:</strong></p>
                        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                            ${contactData.message.replace(/\n/g, '<br>')}
                        </div>
                        ` : ''}
                        <hr>
                        <p style="font-size: 0.8em; color: #666;">This message was sent from the Rakan Tutor website contact form.</p>
                    </body>
                </html>
            `;
        } else {
            // Handle NAIC contact form
            const contactData = requestData as NAICContactFormData;

            // Save to database
            dbInsertResult = await supabase
                .from("contact_submissions")
                .insert({
                    name: contactData.name,
                    email: contactData.email,
                    subject: contactData.subject,
                    message: contactData.message,
                    source: "naic",
                });

            if (dbInsertResult.error) {
                console.error("Database insert error:", dbInsertResult.error);
                throw new Error(`Failed to save to database: ${dbInsertResult.error.message}`);
            }

            emailRecipients = ["mingjackt@sunway.edu.my", "clement@sunway.edu.my", "kaveen@rakantutor.org", "ashvin.praveen@rakantutor.org"];
            emailSubject = `NAIC Contact Form: ${contactData.subject}`;
            emailHtml = `
                <!DOCTYPE html>
                <html>
                    <body style="font-family: sans-serif; line-height: 1.5; color: #333;">
                        <h2>New NAIC Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${contactData.name}</p>
                        <p><strong>Email:</strong> ${contactData.email}</p>
                        <p><strong>Subject:</strong> ${contactData.subject}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                            ${contactData.message.replace(/\n/g, '<br>')}
                        </div>
                        <hr>
                        <p style="font-size: 0.8em; color: #666;">This message was sent from the National AI Competition website contact form.</p>
                    </body>
                </html>
            `;
        }

        // Send email to organizers
        const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: "NAIC Website <noreply@rakantutor.org>",
                to: emailRecipients,
                reply_to: requestData.email,
                subject: emailSubject,
                html: emailHtml,
            }),
        });

        if (!emailResponse.ok) {
            const error = await emailResponse.text();
            console.error("Email sending failed:", error);
            // Don't throw - data is already saved to DB
            console.warn("Email failed but data was saved to database");
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Message sent successfully",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error processing contact form:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: (error as Error).message,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});
