const router = require("express").Router();
let Task = require("../models/Task");

// Get All Tasks
router.route("/").get((req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a Single Task
router.route("/:id").get((req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add New Task
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newTask = new Task({ username, description, duration, date });

  newTask
    .save()
    .then(() => res.json("Task assigned successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a Task
router.route("/update/:id").post((req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.username = req.body.username;
      task.description = req.body.description;
      task.duration = Number(req.body.duration);
      task.date = Date.parse(req.body.date);

      task
        .save()
        .then(() => res.json("Task updated successfully"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete a Task
router.route("/:id").delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task deleted successfully"))
    .catch((err) => res.json("Error: " + err));
});

module.exports = router;
