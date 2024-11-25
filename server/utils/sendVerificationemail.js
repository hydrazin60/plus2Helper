import nodemailer from "nodemailer";
export const sendVerificationEmail = async (email, VerificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your account",
    text: `Please click on the link to verify your account:  http://localhost:4000/api/v1/jbn/plus2helper/auth/verify/${VerificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(`
       Something went wrong on Registering the user ${error.message} `);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};


