const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const isAuthenticated = require("../middleware/isAuthenticated");

const prisma = new PrismaClient();
const newNoteRouter = Router();

newNoteRouter.post("/", isAuthenticated, async (req, res) => {
    const { title, content } = req.body;

    const note = await prisma.note.create({
        data: {
            title,
            content,
            userId: req.user.id
        }
    });

    res.json(note);
});

module.exports = newNoteRouter;