const router = require("express").Router()
const User = require("../model/User")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const verify = require('../verifyToken')






//GET


router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).send(info);
    } catch (err) {
      res.status(500).send(err);
    }
  });




  //GET ALL

//   brarer token
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const users = query
          ? await User.find().sort({ _id: -1 }).limit(2)    // http://localhost:8080/?new=true
          : await User.find();
        res.status(200).send(users);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send("You are not allowed to see all users!");
    }
  });
  
  //GET USER STATS
  router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User has been deleted...");
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send("You can delete only your account!");
    }
  });

  //UPDATE

router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  });


  module.exports = router