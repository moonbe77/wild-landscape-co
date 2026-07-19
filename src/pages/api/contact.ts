import type { APIRoute } from "astro";
import { Resend } from "resend";

// Server-rendered on demand (not prerendered) so it can read env vars
// and call Resend at request time.
export const prerender = false;

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const POST: APIRoute = async ({ request }) => {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
    });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();
  const phone = payload.phone?.trim();

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "Name, email and message are required." }),
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "Please enter a valid email address." }), {
      status: 400,
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_TO_EMAIL;
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Contact form submitted but RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL is not configured."
    );
    return new Response(
      JSON.stringify({
        error: "The contact form isn't fully configured yet. Please try again later.",
      }),
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `Wild Landscape Co. website <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `New enquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return new Response(
      JSON.stringify({ error: "Couldn't send your message. Please try again." }),
      { status: 502 }
    );
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
