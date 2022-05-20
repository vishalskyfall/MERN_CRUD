const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// router.get("/",(req,res)=>{
//     console.log("connect get ");
// })

//Register User
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, email, age, mobile, work, address, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !address || !desc) {
    res.status(422).json("Please fill data completely");
  }
  try {
    const preVuser = await users.findOne({ email: email }); //first email is DB email
    console.log(preVuser);

    if (preVuser) {
      res.status(422).json("User is already present try adding new one");
    } else {
      const addUser = new users({
        name,
        email,
        age,
        mobile,
        work,
        address,
        desc,
      });

      await addUser.save();
      res.status(201).json(addUser);
      //   console.log(addUser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// get user data
router.get("/getData", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get single user
router.get("/getuser/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    // console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

//update userdata
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//delete user
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await users.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
