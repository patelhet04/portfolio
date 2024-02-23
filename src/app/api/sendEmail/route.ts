import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    transporter.sendMail(
      {
        from: name,
        to: process.env.GMAIL_EMAIL_ADDRESS,
        replyTo: email,
        subject: subject,
        html: `<div className="font-mono">
        <h1>Hi, Het</h1>
        <p>
          <strong>From: ${email}</strong>
        </p>
        <p>
          <strong>Message:&nbsp;${message}</strong>
        </p>
      </div>`,
      },
      (err, info) => {
        if (err) {
          return NextResponse.json({ err });
        } else {
          return NextResponse.json(info.accepted);
        }
      }
    );
    // const { data, error } = await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: "hetpatel0499@gmail.com",
    //   subject: subject,
    //   react: EmailTemplate({
    //     name,
    //     email,
    //     message,
    //   }) as React.ReactElement,
    // });

    // return NextResponse.json(data);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error sending email:", error);

    // Use res.status().json() to send the response
    return NextResponse.json({ error });
  }
}

export const dynamic = "force-static";
