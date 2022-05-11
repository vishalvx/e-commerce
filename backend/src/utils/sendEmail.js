import nodemailer from "nodemailer";

export const sendEmail = async (option) => {
  const transportar = await nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.SMTP_USER,
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transportar.sendMail(mailOption);
};
