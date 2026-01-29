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

    // Compose notification message
    const message = `🌟 New CosmOracle Booking!\n\n` +
      `👤 Name: ${fullName}\n` +
      `📱 Phone: ${phone}\n` +
      `📋 Plan: ${preferredPlan}\n` +
      `🎂 DOB: ${dateOfBirth || 'Not provided'}\n` +
      `❓ Question: ${questionConcern?.substring(0, 100) || 'Not provided'}...\n\n` +
      `Please verify and contact the client.`;

    // Log the notification
    console.log('Notification message:', message);

    // WhatsApp notification URL for Saurabh
    const adminPhone = '916230016403';
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    
    console.log('WhatsApp notification URL:', whatsappUrl);

    // Email notification to niyati.nivriti@gmail.com
    // Note: This requires RESEND_API_KEY to be configured for actual email sending
    const emailTo = 'niyati.nivriti@gmail.com';
    console.log('Email should be sent to:', emailTo);
    console.log('Booking details for email:', {
      fullName,
      phone,
      preferredPlan,
      dateOfBirth,
      questionConcern,
    });

    // Try to send email if RESEND_API_KEY is available
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'CosmOracle <noreply@cosmoracle.com>',
            to: [emailTo],
            subject: `New Booking: ${fullName} - ${preferredPlan}`,
            html: `
              <h1>🌟 New CosmOracle Booking!</h1>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Plan:</strong> ${preferredPlan}</p>
              <p><strong>Date of Birth:</strong> ${dateOfBirth || 'Not provided'}</p>
              <p><strong>Question/Concern:</strong> ${questionConcern || 'Not provided'}</p>
              <hr>
              <p>Please verify payment and contact the client.</p>
            `,
          }),
        });
        
        if (emailResponse.ok) {
          console.log('Email sent successfully');
        } else {
          console.log('Email sending failed:', await emailResponse.text());
        }
      } catch (emailError) {
        console.error('Email error:', emailError);
      }
    } else {
      console.log('RESEND_API_KEY not configured - skipping email notification');
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification logged successfully',
        whatsappUrl,
        emailTo,
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
