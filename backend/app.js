require("dotenv").config();
require("./passport");

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");

const notesRoute = require("./routes/notesRoute");
const authRoute = require("./routes/authRoute");
const loginRoute = require("./routes/loginRoute");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/notes", notesRoute);
app.use("/auth", authRoute);
app.use("/auth", loginRoute);

app.get("/", (req, res) => {
    res.send("Notes API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});