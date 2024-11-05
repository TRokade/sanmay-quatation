// email-template.jsx

const EmailTemplate = ({ quotationLink, validUntil }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #333333; text-align: center; margin-bottom: 20px;">
              Your Custom Interior Design Quotation
            </h1>
            <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for your interest in our interior design services! We're excited to present your personalized quotation.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${quotationLink}" 
                style="background-color: #4CAF50; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                View Your Quotation
              </a>
            </div>
            <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
              Please note that this quotation is valid until <strong>${validUntil.toLocaleDateString()}</strong>. 
              We recommend reviewing it at your earliest convenience.
            </p>
            <div style="border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 20px; text-align: center;">
              <p style="color: #999999; font-size: 14px;">
                If you have any questions or need further assistance, please don't hesitate to contact our team.
              </p>
              <p style="color: #999999; font-size: 14px;">
                We look forward to helping you create your dream space!
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = EmailTemplate;
