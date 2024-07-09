const nodemailer = require("nodemailer");

const SendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure:true,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: "E-shop <kingsrt315@gmail.com>", // البريد الإلكتروني الذي سيُرسل منه
        to: options.email, // بريد المستخدم الذي قام بالتسجيل
        subject: options.subject,
        text: options.message,
        //   timeout: 10000, // زيادة وقت انتظار الاتصال (بالمللي ثانية)
      };

      await transporter.sendMail(mailOptions)
}

module.exports = SendEmail;