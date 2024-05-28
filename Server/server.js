const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db.js')
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes.js')
const quizRoutes = require('./routes/quizRoutes.js')

const app = express();
app.use(express.json())

app.use(cors({
    "origin" : `${process.env.FRONTEND_URL}`,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));


app.use("/auth/v1",authRoutes)
app.use("/api/v1",quizRoutes)

app.use((error, req, res , next) => {
  console.error(error)
  res.status(500).json({ errorMessage: "Something went wrong" });
})

// Serve static files
app.use(express.static(path.join(__dirname, "../Client/build")));

app.get("/*",function (req,res) {
    res.sendFile(
        path.join(__dirname, "../Client/build"),
        function(err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    );
})

const PORT = process.env.PORT || 3002;
connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
        console.log(`Server is running at port ${PORT}`)
    })
}).catch((error)=>{
    console.error("Error while server is getting up",error)
})