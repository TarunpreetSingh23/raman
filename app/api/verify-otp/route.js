export async function POST(req) {
  try {
    const { mobile, otp } = await req.json();

    if (!mobile || !otp) {
      return new Response(JSON.stringify({ message: "Invalid data" }), { status: 400 });
    }

    if (global.otps?.[mobile] === otp) {
      delete global.otps[mobile]; // clear OTP after use

      // TODO: create session / JWT here
      return new Response(JSON.stringify({ message: "OTP verified" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Invalid OTP" }), { status: 400 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error verifying OTP" }), { status: 500 });
  }
}
