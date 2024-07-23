const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "frontend")));

// POST endpoint to handle form submission and send email
app.post("/api/send-email", (req, res) => {
  const { name, email, contact, terms } = req.body;

  // Validate form fields
  if (!name || !email || !contact || !terms) {
    return res
      .status(400)
      .send(
        "<html><body><script>window.parent.postMessage('error', '*');</script></body></html>"
      );
  }

  // Create Nodemailer transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rituanuragi1@gmail.com",
      pass: "geon ylan rgeq mfld",
    },
  });

  // Email options
  const mailOptions = {
    from: "rituanuragi1@gmail.com",
    to: "rituf2fintech@gmail.com",
    subject: "Loan Application Received",
    text: `Name: ${name}\nContact: ${contact}\nEmail: ${email}`, // Email content
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send(
          "<html><body><script>window.parent.postMessage('error', '*');</script></body></html>"
        );
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
