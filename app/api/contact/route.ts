import { NextResponse } from "next/server";

export const runtime = "nodejs";

const resendEndpoint = "https://api.resend.com/emails";
const toEmail = "ly13845267281@sina.com";
const fromEmail = "Local China <noreply@localchinatrip.com>";

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

  if (!name || !email || !message) {
    return NextResponse.redirect(new URL("/contact?status=missing", request.url), 303);
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
    return NextResponse.redirect(new URL("/contact?status=email-not-configured", request.url), 303);
  }

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New Local China enquiry from ${name}`,
      html,
      text: [
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

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend email failed:", errorText);
    return NextResponse.redirect(new URL("/contact?status=email-failed", request.url), 303);
  }

  return NextResponse.redirect(new URL("/thank-you", request.url), 303);
}
