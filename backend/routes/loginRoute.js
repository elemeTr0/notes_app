const { Router } = require("express");
const passport = require("passport");

const loginRoute = Router();

loginRoute.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({
        message: "Logged in successfully",
        user: {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email
        }
    });
});

module.exports = loginRoute;