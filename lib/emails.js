import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return null;

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data.to && data.message && data.subject) {
        try {
          const to = data.to;
          const subject = data.subject;
          const message = data.message;

          const sentInfo = await resend.emails.send({
            from: "onboarding@resend.dev", // resend domain
            to: to,
            subject: subject,
            react: EmailTemplate({ message }),
          });

          console.log(`Email sent to ${to}:`, sentInfo);
          return sentInfo;
        } catch (error) {
          console.error(`Error sending email to ${data.to}:`, error);
          throw error;
        }
      } else {
        const errorMsg = `Couldn't send email, missing required fields: ${JSON.stringify(
          data
        )}`;
        console.error(errorMsg);
        return Promise.reject(new Error(errorMsg));
      }
    })
  );
  return response;
};
