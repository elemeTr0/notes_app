const { Router } = require("express");
const bcrypt = require("bcryptjs");

const prisma = require("../prisma");

const authRoute = Router();

authRoute.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });

    res.json({
        message: "User created",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
});

module.exports = authRoute;