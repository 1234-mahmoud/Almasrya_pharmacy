import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD
    }
})

console.log(process.env.MAIL_USER);
console.log(process.env.MAIL_PASSWORD);

export const sendEmail = async(to,subject,html)=>{
await transporter.sendMail({
    form:process.env.MAIL_USER,
    to,
    subject,
    html,
})
}