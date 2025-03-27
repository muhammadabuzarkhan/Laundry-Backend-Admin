// app.js (the main file you provided)
const express = require("express");
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");
const swagger = require("./Swagger");

require("dotenv").config();
const { NODE_ENV, PORT } = process.env;

const app = express();

require("./config/db.js");

const coreOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders:
        "Content-Type, Authorization, X-Requested-With, Accept, VERSION",
    exposedHeaders:
        "Content-Type, Authorization, X-Requested-With, Accept, VERSION",
};

app.use(cors(coreOptions));
app.use(morgan("dev"));
app.use(express.json({ limit: '550mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/swagger', swagger.serve, swagger.setup);

// limiting the API calls
const limiter = rateLimit({
    max: 1000000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// static routes
app.use("/Uploads", express.static("./Uploads"));

// routes register
app.use("/api", require("./Routes/index"));

app.get("/", (req, res) => {
    console.log("NODE_ENV", NODE_ENV);
    res.send(`Laundry wash Server is Running on ${NODE_ENV}`);
});

module.exports = app; // Export app to use in lambda.js
