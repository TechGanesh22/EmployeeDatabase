const express = require("express");
const router = express.Router();

//here we import the schema of our database and store in Employee and by this Employee we perform all the CRUD Operations
const Employee = require("../models/employee");
router.get("/", (req, res) => {
  Employee.find({})
    .then((employees) => {
      res.render("index", { employees: employees });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
//get route start
router.get("/employee/new", (req, res) => {
  res.render("new");
});
router.get("/employee/search", (req, res) => {
  res.render("search", { employee: "" }); //this employee we dont pass
});
router.get("/employee", (req, res) => {
  let searchQuery = { name: req.query.name };
  Employee.findOne(searchQuery)
    .then((employee) => {
      res.render("search", { employee: employee }); //this employee we pass
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
//get route end
router.post("/employee/new", (req, res) => {
  let newEmployee = {
    name: req.body.name,
    designation: req.body.designation,
    salary: req.body.salary,
  };
  Employee.create(newEmployee)
    .then((employee) => {
      req.flash("success_msg", "Employee Added Successfully.");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});

router.get("/edit/:id", (req, res) => {
  let searchQuery = { _id: req.params.id };
  Employee.findOne(searchQuery)
    .then((employee) => {
      res.render("edit", { employee: employee });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
//post route end

// put routes start
router.put("/edit/:id", (req, res) => {
  let searchQuery = { _id: req.params.id };
  Employee.updateOne(searchQuery, {
    $set: {
      name: req.body.name,
      designation: req.body.designation,
      salary: req.body.salary,
    },
  })
    .then((employee) => {
      req.flash("success_msg", "Employee Updated Successfully.");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
// put routes end
// Routes for delete start
router.delete("/delete/:id", (req, res) => {
  let searchQuery = { _id: req.params.id };
  Employee.deleteOne(searchQuery)
    .then((employee) => {
      req.flash("success_msg", "Employee deleted Successfully.");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
    });
});
// Routes for delete end
module.exports = router;
