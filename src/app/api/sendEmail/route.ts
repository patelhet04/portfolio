import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const { name, email, subject, message } = await req.json();

    // Set up the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      logger: true,
      debug: true,
    });

    // Use await for sendMail instead of callback
    const info = await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_EMAIL_ADDRESS,
      subject: subject,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          .email-container {
            background: url('https://your-image-url.com/background.jpg') no-repeat center center;
            background-size: cover;
            padding: 60px 20px;
            min-height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .overlay {
            background: rgba(255, 255, 255, 0.8);
            padding: 40px;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
          }
          .content-box {
            padding: 30px;
          }
          h2 {
            text-align: center;
            color: #0073e6;
          }
          p {
            color: #333;
            line-height: 1.6;
          }
          .message {
            padding: 20px;
            margin: 20px 0;
            border-left: 5px solid #0073e6;
            background: #f4f4f4;
            font-size: 16px;
            color: #333;
          }

          /* Responsive Design */
          @media only screen and (max-width: 600px) {
            .overlay {
              padding: 20px;
            }
            .message {
              font-size: 14px;
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="overlay">
            <h2>New Message from Your Website</h2>
            <p>Hello,</p>
            <p>You’ve received a new message via your contact form:</p>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <div class="message">
              ${message}
            </div>
          </div>
        </div>
      </body>
      </html>`,
    });

    // Return success response
    return NextResponse.json({
      message: "Email sent successfully!",
      accepted: info.accepted,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error sending email:", error);

    // Return error response with 500 status code
    return NextResponse.json(
      { error: "Failed to send the email." },
      { status: 500 }
    );
  }
}
