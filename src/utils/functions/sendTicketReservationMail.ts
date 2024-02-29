import emailjs from "@emailjs/browser";

export const sendTicketReservationMail = async (body: any) => {
  try {
    await emailjs.send(
      "service_p9jhk2a",
      "template_fgzuk99",
      body,
      "BfhwgUQ2r5B7tGVTR"
    );

    return `Your will receive an email containing the details of the ${
      body.regularTickets + body.vipTickets
    } ticket(s) reserved`;
  } catch (error) {
    console.log(error);
    return null;
  }
};
