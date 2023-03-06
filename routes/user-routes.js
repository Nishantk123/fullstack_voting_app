const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const router = express.Router();

router.post("/register", upload.single('logo'), async (req, res) => {
  try {
    //get user input
    const {
      name,
      email,
      mobile_no,
      pan_no,
      aadhaar_no,
      voter_id,
      age,
      dob,
      area,
      married,
      password
    } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      mobile_no,
      pan_no,
      aadhaar_no,
      voter_id,
      age,
      dob,
      area,
      married
    });
    // Create token
    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // get user input
    const { email, password } = req.body;
    // validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // validate if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      //create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY
      );

      //save user token
      user.token = token;

      // return response
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.get("/users", async(req,res)=>{
  let query = req.query;
  let page = query.page;
  let per_page = query.per_page;
  let company_name = query.company_name;
  let role = query.user_role
  const queryObj = {};
  if (role === "super_admin" ) {
    console.log("all jobs");
  } else {
    queryObj["company_name"] = company_name;
  }
  let userData = await User.find(queryObj)
  .limit(Number(per_page))
  .skip(Number(per_page) * (Number(page) - 1))
  .sort("desc");
res.status(200).json(userData);
})


module.exports = router;
