const router = require("express").Router()

const User = require("../model/User")
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")


//register

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});



/// lOgin 


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).json("Wrong password or username!");
        } else {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);   // you can scces this code from  npm crypto-js 

            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            if (originalPassword !== req.body.password) {
                res.status(401).send("Wrong password or username!");
            } else {
                const accessToken = jwt.sign(
                    { id: user._id, isAdmin: user.isAdmin },
                    process.env.SECRET_KEY,
                    { expiresIn: "5d" }
                );

                const { password, ...info } = user._doc; // this line meaning we want to hide password from mongoose doc

                res.status(200).send({ ...info, accessToken });  // send only info and token
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
});





module.exports = router;

