import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      })
    }


    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "52ab09cd2a9e0b",
        pass: "e1ba4d2d672530"
      }
    });


    const mailOptions = {
      from: 'hemant@hemant.ai>',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href=${process.env.DOMAIN}/verifyEmail?token=${hashedToken}>here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}
      or copy and paste the link below in your browser.
      <br/> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
      </p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
}