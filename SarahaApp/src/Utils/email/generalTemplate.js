export function template({ otp, firstName }) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
    </head>
  
    <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
  
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 20px;">
  
            <table width="500" cellpadding="0" cellspacing="0"
              style="background:#ffffff; border-radius:10px; padding:30px;">
              
              <tr>
                <td align="center">
                  <h2 style="color:#333;">🔐 OTP Verification</h2>
                </td>
              </tr>
  
              <tr>
                <td align="center" style="padding: 10px 0;">
                  <p style="font-size:16px; color:#555;">
                    Hello <strong>${firstName}</strong>,
                  </p>
                  <p style="font-size:16px; color:#555;">
                    Use the code below to verify your account:
                  </p>
                </td>
              </tr>
  
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <div style="display:inline-block; background:#f1f1f1; padding:15px 30px;
                    border-radius:8px; font-size:28px; font-weight:bold; letter-spacing:6px;">
                    ${otp}
                  </div>
                </td>
              </tr>
  
              <tr>
                <td align="center">
                  <p style="font-size:14px; color:#999;">
                    ⏳ This code expires in <strong>5 minutes</strong>.
                  </p>
                </td>
              </tr>
  
              <tr>
                <td align="center" style="padding-top:20px;">
                  <p style="font-size:12px; color:#aaa;">
                    If you didn’t request this, ignore this email.
                  </p>
                </td>
              </tr>
  
            </table>
  
          </td>
        </tr>
      </table>
  
    </body>
    </html>
    `;
  }


  export function templateForgetPassword({ otp, firstName }) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
  
    <body style="margin:0; padding:0; background:linear-gradient(135deg,#667eea,#764ba2); font-family:Arial, sans-serif;">
  
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 40px 20px;">
  
            <table width="500" cellpadding="0" cellspacing="0"
              style="background:#ffffff; border-radius:12px; padding:35px; box-shadow:0 8px 20px rgba(0,0,0,0.15);">
              
              <!-- Header -->
              <tr>
                <td align="center">
                  <h2 style="color:#333; margin-bottom:5px;">🔑 Reset Your Password</h2>
                  <p style="color:#777; font-size:14px;">Secure your account</p>
                </td>
              </tr>
  
              <!-- Greeting -->
              <tr>
                <td align="center" style="padding: 15px 0;">
                  <p style="font-size:16px; color:#555;">
                    Hello <strong>${firstName}</strong>,
                  </p>
                  <p style="font-size:15px; color:#555; line-height:1.6;">
                    We received a request to reset your password.<br/>
                    Use the verification code below to continue:
                  </p>
                </td>
              </tr>
  
              <!-- OTP -->
              <tr>
                <td align="center" style="padding: 25px 0;">
                  <div style="
                    display:inline-block;
                    background:linear-gradient(135deg,#667eea,#764ba2);
                    color:#fff;
                    padding:18px 40px;
                    border-radius:10px;
                    font-size:30px;
                    font-weight:bold;
                    letter-spacing:8px;
                    box-shadow:0 4px 10px rgba(0,0,0,0.2);
                  ">
                    ${otp}
                  </div>
                </td>
              </tr>
  
              <!-- Expiry -->
              <tr>
                <td align="center">
                  <p style="font-size:14px; color:#999;">
                    ⏳ This code expires in <strong>5 minutes</strong>.
                  </p>
                </td>
              </tr>
  
              <!-- Warning -->
              <tr>
                <td align="center" style="padding-top:15px;">
                  <p style="font-size:13px; color:#e74c3c;">
                    ⚠️ If you didn’t request a password reset, please ignore this email.
                  </p>
                </td>
              </tr>
  
              <!-- Footer -->
              <tr>
                <td align="center" style="padding-top:25px;">
                  <p style="font-size:12px; color:#bbb;">
                    © ${new Date().getFullYear()} Your App. All rights reserved.
                  </p>
                </td>
              </tr>
  
            </table>
  
          </td>
        </tr>
      </table>
  
    </body>
    </html>
    `;
  }