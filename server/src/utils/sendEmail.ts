import nodeMailer from 'nodemailer';

interface Options {
  subject: string;
  message: string;
  to: string;
}

const sendEmail = async (options: Options) => {
  const { to, subject, message } = options;
  const transporter = nodeMailer.createTransport({
    port: 587,
    host: process.env.MAIL_HOST,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Foo Foo "<foo@example.com>',
    to,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
