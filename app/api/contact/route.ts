import { NextResponse } from "next/server";

export const runtime = "nodejs";

const resendEndpoint = "https://api.resend.com/emails";
const recipientEmail = "ly13845267281@sina.com";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "Local China <noreply@localchinatrip.com>";

function value(formData: FormData, key: string) {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, content: string) {
  if (!content) return "";
  return `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #eee;background:#faf7ef;">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(content).replace(/\n/g, "<br />")}</td></tr>`;
}

function statusRedirect(request: Request, status: string) {
  const target = new URL("/contact", request.url);
  target.searchParams.set("status", status);
  return NextResponse.redirect(target, 303);
}

export async function POST(request: Request) {
  const formData = await request.formData();

  if (value(formData, "_honey")) {
    return NextResponse.redirect(new URL("/thank-you", request.url), 303);
  }

  const name = value(formData, "name");
  const email = value(formData, "email");
  const travelDates = value(formData, "travel_dates");
  const numberOfPeople = value(formData, "number_of_people");
  const message = value(formData, "message");
  const formType = value(formData, "form_type") || "Travel enquiry";
  const isPrivateCarEnquiry = formType.toLowerCase().includes("private car");

  if (!name || !email || !message) {
    return statusRedirect(request, "missing");
  }

  const extraRows = [
    row("Travel dates", travelDates),
    row("Number of people", numberOfPeople),
    row("Private car days", value(formData, "days")),
    row("Destination", value(formData, "destination")),
    row("Group size", value(formData, "group")),
    row("Special requests", value(formData, "needs")),
  ].join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#222;line-height:1.5;">
      <h2 style="margin:0 0 16px;">New Local China enquiry</h2>
      <p style="margin:0 0 16px;">Recipient: ${escapeHtml(recipientEmail)}</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px;border:1px solid #eee;">
        ${row("Form", formType)}
        ${row("Name", name)}
        ${row("Email", email)}
        ${extraRows}
        ${row("Message", message)}
      </table>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return statusRedirect(request, "email-not-configured");
  }

  let response: Response;
  try {
    response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: email,
        subject: `${isPrivateCarEnquiry ? "Private car enquiry" : "New Local China enquiry"} from ${name}`,
        html,
        text: [
          `Recipient: ${recipientEmail}`,
          `Form: ${formType}`,
          `Name: ${name}`,
          `Email: ${email}`,
          travelDates ? `Travel dates: ${travelDates}` : "",
          numberOfPeople ? `Number of people: ${numberOfPeople}` : "",
          value(formData, "days") ? `Private car days: ${value(formData, "days")}` : "",
          value(formData, "destination") ? `Destination: ${value(formData, "destination")}` : "",
          value(formData, "group") ? `Group size: ${value(formData, "group")}` : "",
          value(formData, "needs") ? `Special requests: ${value(formData, "needs")}` : "",
          "",
          message,
        ].filter(Boolean).join("\n"),
      }),
    });
  } catch (error) {
    console.error("Resend email request failed:", error);
    return statusRedirect(request, "email-failed");
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend email failed:", errorText);
    return statusRedirect(request, "email-failed");
  }

  return NextResponse.redirect(new URL("/thank-you", request.url), 303);
}
