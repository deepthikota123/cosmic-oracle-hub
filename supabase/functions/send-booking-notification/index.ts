import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface BookingNotification {
  fullName: string;
  phone: string;
  preferredPlan: string;
  transactionNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { fullName, phone, preferredPlan, transactionNumber }: BookingNotification = await req.json();

    console.log('📧 New booking notification received:', {
      fullName,
      phone,
      preferredPlan,
      transactionNumber,
    });

    // Compose notification message
    const message = `🌟 New CosmOracle Booking!\n\n` +
      `👤 Name: ${fullName}\n` +
      `📱 Phone: ${phone}\n` +
      `📋 Plan: ${preferredPlan}\n` +
      `💳 Transaction: ${transactionNumber}\n\n` +
      `Please verify and contact the client.`;

    // Log the notification (in production, integrate with WhatsApp API/Email service)
    console.log('Notification message:', message);

    // WhatsApp notification URL (can be opened by admin to send message)
    const adminPhone = '916230016403';
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    
    console.log('WhatsApp notification URL:', whatsappUrl);

    // Email notification would require RESEND_API_KEY
    // For now, we log the booking details for manual follow-up
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification logged successfully',
        whatsappUrl 
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
