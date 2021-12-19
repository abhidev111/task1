const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.send('Hello vro!')
})
app.post('/',async(req,res) => {
	const{email}=req.body;
	//const{text}=req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'paula.terry83@ethereal.email', // generated ethereal user
      pass: 'buu5mUhRjtyyfTKge1', // generated ethereal password
    },
  });

  // send mail with defined transport object
const msg={

    from: '"The Express app" <theExpressApp@example.com>', // sender address
    to: '$(email)', // list of receivers
    subject: "Hello ", // Subject line
    text: "HEllo world", // plain text body

  }

const info=await transporter.sendMail(msg);
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

res.send('Email sent')
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
