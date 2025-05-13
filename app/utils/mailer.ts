import nodemailer from 'nodemailer';

// Configure transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Sends an email with an ebook attachment
 * 
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param bookTitle - Title of the book
 * @param pdfUrl - URL of the PDF to attach
 * @param buyerName - Name of the buyer
 * @returns Promise resolving to the send info
 */
export async function sendEbookEmail(
  to: string,
  subject: string,
  bookTitle: string,
  pdfUrl: string,
  buyerName: string
) {
  // HTML content for the email
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Thank you for your purchase!</h2>
      <p>Dear ${buyerName},</p>
      <p>Thank you for purchasing <strong>${bookTitle}</strong>. Your payment has been successfully verified.</p>
      <p>Please find your ebook attached to this email.</p>
      <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
      <p>Best regards,<br>The Team</p>
    </div>
  `;

  try {
    // Fetch the PDF file
    const response = await fetch(pdfUrl);
    const buffer = await response.arrayBuffer();
    
    // Send email with attachment
    const info = await transporter.sendMail({
      from: `"Book Store" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
      attachments: [
        {
          filename: `${bookTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
          content: Buffer.from(buffer),
          contentType: 'application/pdf',
        },
      ],
    });
    
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending ebook email:', error);
    throw error;
  }
}