import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const {
    // name,
    email, password, firstName, lastName } = req.body;
  // name = name.trim();
  // email = email.trim();
  // password = password.trim();
  // firstName = firstName.trim();
  // lastName = lastName.trim();



  try {

    // if (
    //   // userName == "" ||
    //   email == "" || password == "" || firstName == "" || lastName == "") {
    //   res.json({
    //     status: "Failed",
    //     message: "Empty input not allowed!"
    //   })
    // }
    // //  else if (!/^[a-zA-Z]*$/.test(userName)) {
    // //   res.json({
    // //     status: "Failed",
    // //     message: 'Invalid name entered'
    // //   })
    // // }
    // else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    //   res.json({
    //     status: "Failed",
    //     message: 'Invalid name entered'
    //   })
    // } else if (password.length < 8) {
    //   res.json({
    //     status: "Failed",
    //     message: 'Invalid is too short!'
    //   })
    // }

    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);



    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });





    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'musaddiqelearning@gmail.com',
        pass: 'nqedbychyiqtapiz'
      }
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent: %s", info.messageId);
          res.status(201).json({ result, token });
          // console.log('Email sent: ' + info.response);
        }
      });
    }
    main().catch(console.error);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


export const hello = async (req, res) => {
  res.send('hello')
};
