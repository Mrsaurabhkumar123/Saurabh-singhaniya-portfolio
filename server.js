require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to Saurabh's Portfolio API!");
});

app.get('/about', (req, res) => {
    res.json({
        name: "Saurabh Singhaniya",
        role: "Full Stack Developer",
        description: "Passionate developer with experience in web development, video editing, and UI/UX design."
    });
});

app.get('/services', (req, res) => {
    res.json([
        { id: 1, name: "Web Development", description: "Building modern and responsive web applications." },
        { id: 2, name: "Video Editing", description: "Creating high-quality video content for various platforms." },
        { id: 3, name: "UI/UX Design", description: "Designing intuitive and engaging user experiences." }
    ]);
});

app.get('/projects', (req, res) => {
    res.json([
        { id: 1, title: "Portfolio Website", link: "https://yourportfolio.com" },
        { id: 2, title: "E-commerce Site", link: "https://myecommerce.com" },
        { id: 3, title: "Video Editing Portfolio", link: "https://youtube.com/yourchannel" }
    ]);
});

// Contact Form Submission (Uses Nodemailer)
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error sending message." });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
