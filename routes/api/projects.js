const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const { isAdmin} = require("../../middelware/auth")
// GET all projects
router.get("/", (req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) => res.status(400).json({ error: err }));
});

// GET single project by id
router.get("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => res.status(400).json({ error: err }));
});

// CREATE new project
router.post("/",/*isAdmin,*/ async(req, res) => {
  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    technology: req.body.technology,
    assigned_to: req.body.assigned_to,
    start_date: req.body.start_date,
    due_date: req.body.due_date,
    status: req.body.status
  });

  newProject
    .save()
    .then((project) => res.json(project))
    .catch((err) => console.log(err));
});

// UPDATE project by id
router.put("/:id", (req, res) => {
  Project.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      technology: req.body.technology,
      assigned_to: req.body.assigned_to,
      start_date: req.body.start_date,
      due_date: req.body.due_date,
      status: req.body.status
    },
    { new: true } // returns updated document
  )
    .then((project) => res.json(project))
    .catch((err) => res.status(400).json({ error: err }));
});

// DELETE project by id
router.delete("/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;