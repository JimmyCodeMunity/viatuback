const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

//app routes
const userRoute = require("./routes/UserRoute");
const staffRoute = require("./routes/staffRoute");
const cartRoute = require("./routes/cartRoute");
const productRoute = require("./routes/productRoute");

const app = express();
require("dotenv").config();
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

const port = process.env.PORT;
const dbconnection = process.env.DB_CONNECTION;

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server Running Now!!We good to go.");
});

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "");
  // },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const profile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatar");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    files: 5, //max of 5 images
  },
});
const avatarupload = multer({
  storage: profile,
});

mongoose
  .connect(dbconnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((error) => {
    console.log("Error connecting to the database");
    console.log(error);
  });

app.get("/check-db", async (req, res) => {
  try {
    // Use the native MongoDB driver to query the $currentOp collection
    const currentOps = await mongoose
      .connect(dbconnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        res.status(200).json({message:'db connected'})
      })
      .catch((error) => {
        res.status(200).json({message:'error connecting'})
        console.log(error);
      });
  } catch (error) {
    res.status(500).send("Failed to connect to the database.");
    console.error("Error checking database connection:", error);
  }
});

//set up main app routes
//user access routes
app.use("/api/v2/user", avatarupload.single("file"), userRoute);
app.use("/api/v2/staff", avatarupload.single("file"), staffRoute);
app.use("/api/v2/cart", cartRoute);
app.use("/api/v2/product", upload.array("file", 5), productRoute);
