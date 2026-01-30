import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface BookingNotification {
  fullName: string;
  phone: string;
  preferredPlan: string;
  dateOfBirth?: string;
  questionConcern?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { fullName, phone, preferredPlan, dateOfBirth, questionConcern }: BookingNotification = await req.json();

    console.log('📧 New booking notification received:', {
      fullName,
      phone,
      preferredPlan,
      dateOfBirth,
    });

    // Admin notification details
    const adminPhone = '916230016403';
    const adminEmail = 'niyati.nivriti@gmail.com';

    // Compose notification message
    const message = `🌟 New CosmOracle Booking!\n\n` +
      `👤 Name: ${fullName}\n` +
      `📱 Phone: ${phone}\n` +
      `📋 Plan: ${preferredPlan}\n` +
      `🎂 DOB: ${dateOfBirth || 'Not provided'}\n` +
      `❓ Question: ${questionConcern?.substring(0, 100) || 'Not provided'}...\n\n` +
      `Please verify payment and contact the client.`;

    // WhatsApp notification URL
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    console.log('WhatsApp URL generated:', whatsappUrl);

    // Send email notification using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    let emailSent = false;

    if (resendApiKey) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'CosmOracle <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `🌟 New Booking: ${fullName} - ${preferredPlan}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
                  🌟 New CosmOracle Booking!
                </h1>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 10px 0;"><strong>👤 Name:</strong> ${fullName}</p>
                  <p style="margin: 10px 0;"><strong>📱 Phone:</strong> ${phone}</p>
                  <p style="margin: 10px 0;"><strong>📋 Plan:</strong> ${preferredPlan}</p>
                  <p style="margin: 10px 0;"><strong>🎂 Date of Birth:</strong> ${dateOfBirth || 'Not provided'}</p>
                  <p style="margin: 10px 0;"><strong>❓ Question/Concern:</strong></p>
                  <p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #7c3aed;">
                    ${questionConcern || 'Not provided'}
                  </p>
                </div>

                <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #856404;">
                    ⚠️ <strong>Action Required:</strong> Please verify payment screenshot and contact the client.
                  </p>
                </div>

                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                  This is an automated notification from CosmOracle booking system.
                </p>
              </div>
            `,
          }),
        });
        
        if (emailResponse.ok) {
          console.log('Email sent successfully');
          emailSent = true;
        } else {
          const errorText = await emailResponse.text();
          console.error('Email sending failed:', errorText);
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    } else {
      console.log('RESEND_API_KEY not configured - skipping email notification');
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification processed successfully',
        whatsappUrl,
        emailSent,
        emailTo: adminEmail,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in send-booking-notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
