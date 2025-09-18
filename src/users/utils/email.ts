// import nodemailer from 'nodemailer';

// export async function sendEmail(to: string, subject: string, html: string) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: Number(process.env.EMAIL_PORT),
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"QuickCart" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html, // important: send HTML to make the button clickable
//   });
// }

import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"QuickCart" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
