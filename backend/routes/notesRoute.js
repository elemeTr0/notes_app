const { Router } = require ("express")

const isAuthenticated = require("../middleware/isAuthenticated");

const prisma = require("../prisma")
const notesRoute = Router()

notesRoute.get("/", isAuthenticated ,async(req,res) =>{
    const notes = await prisma.note.findMany({
        where: {
            userId: req.user.id
        }
});

    res.json(notes)
})

notesRoute.post("/", isAuthenticated, async(req,res) =>{
    const {title,content} = req.body;

    const note  = await prisma.note.create({
        data:{
            title,
            content,
            userId: req.user.id
        }
    })

    res.json(note)
})
notesRoute.delete("/:id", isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);

    const note = await prisma.note.findFirst({
        where: {
            id: id,
            userId: req.user.id
        }
    })

    if(!note){
        return res.status(404).json({
            message: "Note not found"
        })
    }

    await prisma.note.delete({
        where:{
            id: id
        }
    })

    res.json({ message: "Note deleted" });
});

module.exports = notesRoute;