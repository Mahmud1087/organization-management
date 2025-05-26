import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
const sender = 'onboarding@resend.dev';

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Verify your email',
      html: verificationToken,
    });
    if (error) {
      console.log(error);
    }

    console.log('Email sent successfully', data);
  } catch (error) {
    console.error('Error sending verification', error);
    if (error instanceof Error) {
      throw new Error('Error sending verification email:', error);
    }
  }
};

export const sendWelcomeEmail = async (email: string, fullName: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Welcome!',
      html: `Welcome ${fullName}`,
    });

    if (error) {
      console.log(error);
    }

    console.log('Email sent successfully', data);
  } catch (error) {
    console.error('Error sending welcome email', error);
    if (error instanceof Error) {
      throw new Error('Error sending welcome email:', error);
    }
  }
};

export const sendResetPasswordToken = async (email: string, link: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Reset Password',
      html: link,
    });

    if (error) {
      console.log(error);
    }

    console.log('Email sent successfully', data);
  } catch (error) {
    console.error('Error sending verification', error);
    if (error instanceof Error) {
      throw new Error('Error sending reset token email:', error);
    }
  }
};

export const sendResetPasswordSuccessEmail = async (email: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Reset Password Successful',
      text: 'Your password have been reset successfully',
    });

    if (error) {
      console.log(error);
    }

    console.log('Email sent successfully', data);
  } catch (error) {
    console.error('Error sending reset password success', error);
    if (error instanceof Error) {
      throw new Error('Error sending reset password success:', error);
    }
  }
};
