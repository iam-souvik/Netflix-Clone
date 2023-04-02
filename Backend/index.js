const express = require("express")

const app = express()

const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();


// mOngodb Connect 

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());




// server connect on PORT 8080 connect
app.listen(8080, () => {
    console.log("server start on PORT 8080");
})

