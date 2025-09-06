import twilio from "twilio";

export async function POST(req) {
  try {
    const { mobile } = await req.json();
    if (!mobile) {
      return new Response(JSON.stringify({ message: "Mobile required" }), { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in memory (use DB/Redis in prod)
    global.otps = global.otps || {};
    global.otps[mobile] = otp;

    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

    await client.messages.create({
      body: `Your login OTP is ${otp}`,
      from: process.env.TWILIO_PHONE, // Twilio number
      to: `+91${mobile}`, // E.164 format (+91xxxxxxxxxx for India)
    });

    return new Response(JSON.stringify({ message: "OTP sent" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Failed to send OTP", error: err.message }), { status: 500 });
  }
}
