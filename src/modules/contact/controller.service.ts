import { prisma } from "../../lib/prisma";
import transporter from "./email";

interface ContactData {
  name: string;

  email: string;

  subject: string;

  message: string;
}

export const contactService = {
  createContactMessage: async (data: ContactData) => {
    // Save Database

    const contact = await prisma.contactMessage.create({
      data,
    });

    // Send Admin Email

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,

      to: process.env.ADMIN_EMAIL,

      subject: `New Contact Message - ${data.subject}`,

      html: `

      <div style="font-family:Arial">


        <h2>
          New RentNest Contact Message
        </h2>


        <p>
          <strong>Name:</strong>
          ${data.name}
        </p>


        <p>
          <strong>Email:</strong>
          ${data.email}
        </p>


        <p>
          <strong>Subject:</strong>
          ${data.subject}
        </p>


        <p>
          <strong>Message:</strong>
          ${data.message}
        </p>


      </div>

      `,
    });

    // Send confirmation email to user

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,

      to: data.email,

      subject: "We received your message - RentNest",

      html: `

      <h2>
        Thank you ${data.name}
      </h2>


      <p>
        We have received your message.
        Our team will contact you soon.
      </p>


      <p>
        Regards,
        <br/>
        RentNest Team
      </p>

      `,
    });

    return contact;
  },
};
