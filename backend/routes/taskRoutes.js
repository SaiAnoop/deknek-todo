const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Create task
router.post("/", auth, async (req, res) => {
    const task = await Task.create({
        userId: req.user.id,
        title: req.body.title,
        completed: false
    });
    res.json(task);
});

// Get tasks
router.get("/", auth, async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
});

// Update task
router.put("/:id", auth, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Deleted");
});

module.exports = router;