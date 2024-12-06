const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
    const { name, time, tasks } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shominpaul4@gmail.com', // Replace with your email
            pass: 'eegd chvp quia goqr',       // Replace with your email password
        },
    });

    const mailOptions = {
        from: 'shominpaul4@gmail.com', // Replace with your email
        to: 'robinschacko6@gmail.com', // Replace with employer's email
        subject: 'Employee Checklist Submission',
        text: `Name: ${name}\nTime: ${time}\nTasks Completed:\n- ${tasks.join('\n- ')}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
