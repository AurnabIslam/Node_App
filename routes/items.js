var express = require("express");
var router = express.Router();
var sql = require("../bin/db");

var Task = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};

/* GET items listing. */
router.get("/", function (req, res, next) {
  sql.query("Select * from tasks", function (err, result) {
    if (err) {
      console.log("error: ", err);
      res.send(err);
    } else {
      console.log("tasks : ", result);
      res.render("todolist", {results: result});
    }
  });
});

/* POST new item. */
router.post("/", function (req, res, next) {
  const newTask = {
    task: req.body.task,
    status: 0,
    created_at: new Date()
  }
  sql.query("INSERT INTO tasks set ?", newTask, function (err, result) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(result.insertId);
      res.status(200)
    }
  });
});

/* GET item. */
router.get("/:id", function (req, res, next) {
  sql.query(
    "select * from tasks where id = ? ",
    req.params.id,
    function (err, result) {
      if (err) {
        console.log("error: ", err);
        res.send(err);
      } else {
        console.log(result)
        res.render("todoitem", {result: result[0]});
      }
    }
  );
});

/* UPDATE item. */
router.put("/:id", function (req, res, next) {
  let task = req.body.task;
  let status = req.body.status;
  let qry = "";
  if(task){
    qry = "UPDATE tasks SET task = ? WHERE id = ?"
  } else {
    qry = "UPDATE tasks SET status = ? WHERE id = ?"
  }
  sql.query(
    qry,
    [task ? task : status, req.params.id],
    function (err, result) {
      if (err) {
        console.log("error: ", err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* DELETE item. */
router.delete("/:id", function (req, res, next) {
  sql.query(
    "DELETE FROM tasks WHERE id = ?",
    [req.params.id],
    function (err, result) {
      if (err) {
        console.log("error: ", err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
