export const resetEmailHTML = (name, resetLink) => `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4; padding:30px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; padding:40px; border-radius:8px; font-family: Arial, sans-serif;">
        <tr>
          <td align="center" style="padding-bottom:20px;">
            <h1 style="color:#333; margin: 0;">JOB PORTAL APP </h1>
          </td>
        </tr>
        <tr>
          <td style="font-size:16px; color:#555;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>You requested a password reset. Click the button below to reset your password:</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:20px 0;">
            <a href="${resetLink}" target="_blank" style="display:inline-block; background-color:#4CAF50; color:white; padding:15px 30px; border-radius:5px; font-size:16px; font-weight:bold; text-decoration:none;">
              Reset Password
            </a>
          </td>
        </tr>
        <tr>
          <td style="font-size:16px; color:#555; text-align:center; padding-top:10px;">
            <p>If the button doesn't work, copy and paste this link in your browser:</p>
            <p style="word-break:break-all;"><a href="${resetLink}" style="color:#1a73e8;">${resetLink}</a></p>
          </td>
        </tr>
        <tr>
          <td style="font-size:14px; color:#777; padding-top:20px;">
            <p>This link will expire in 1 hour.</p>
            <p>If you did not request this, please ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-top:40px; font-size:12px; color:#aaa;">
            <p>&copy; ${new Date().getFullYear()} JOB PORTAL APP . All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;