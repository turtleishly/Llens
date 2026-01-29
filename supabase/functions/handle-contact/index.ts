import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

serve(async (req) => {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const contactData: ContactFormData = await req.json();

        const resendApiKey = Deno.env.get("RESEND_API_KEY");
        if (!resendApiKey) {
            throw new Error("Resend API key not found");
        }

        console.log("Processing contact form submission from:", contactData.email);

        // Send email to organizers
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: "NAIC Website <noreply@rakantutor.org>",
                to: ["mingjackt@sunway.edu.my", "clemen@sunway.edu.my"],
                reply_to: contactData.email,
                subject: `Contact Form: ${contactData.subject}`,
                html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: sans-serif; line-height: 1.5; color: #333;">
              <h2>New Contact Form Submission</h2>
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
        `,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Resend API error: ${error}`);
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
                error: error.message,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});
