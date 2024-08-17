require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const app = express();
app.use(cors());
app.use(express.json());

const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY,
});

const sentFrom = new Sender(`Maeva@${process.env.DOMAIN}`, "Maeva Delrue");

app.get("/", (req, res) => {
  try {
    return res
      .status(200)
      .json("Bienvenue sur notre back pour form de contact");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/contact", async (req, res) => {
  try {
    //   Le console.log de req.body nous affiche les données qui ont été rentrées dans les inputs (dans le formulaire frontend)
    console.log("body =>", req.body);
    const recipients = [
      new Recipient(
        req.body.email,
        `${req.body.firstName} ${req.body.lastName}`
      ),
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Demande de renseignements")
      .setHtml("<strong>" + req.body.message + "</strong>")
      .setText(req.body.message);

    const result = await mailerSend.email.send(emailParams);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.body.message });
  }
});

app.listen(3000, () => {
  console.log("Server started 📧");
});
