import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {
  const formRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    console.log(formRef.current);
    emailjs
      .sendForm(
        "service_lambt8e",
        "template_1snfqxn",
        formRef.current,
        "97pI7JWf7O5EPMjAH"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <form ref={formRef} onSubmit={sendEmail}>
      <label>Name</label>
      <input
        type='text'
        name='from_name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        type='email'
        name='to_email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Link</label>
      <input
        type='text'
        name='message_html'
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <label>Message</label>
      <textarea
        name='message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input type='submit' value='Send' />
    </form>
  );
};

export default ContactForm;
