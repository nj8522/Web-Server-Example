const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//CREATE A TODO
app.post("/todos", async(req, res) => {
   try{
      //console.log(req.body);
      const { description } = req.body;
      const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
      res.json(newTodo.rows[0]);
   } catch(err) {
      console.error(err.message);
   }
});

//UPDATE A TODO
app.put("/todos/:id", async(req, res) => {
   try {
      
      const { id }  = req.params;
      console.log("Param " + id);
      const { description }  = req.body;
      console.log("Desc " + description);
      const updatedValue = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", 
      [description, id]);

      res.json("The current value has been updated");
   } catch (err) {
      console.log(err);
   }
});

//DELETE A TODO
app.delete("/todos/:id", async(req, res) => {
   try {
      const { id } = req.params
      console.log("Id " + id);
      const deleted_todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
      res.json("Value has been deleted")
   } catch (err) {
      console.log(err.message);
   }
});


//GET ALL A TODO
app.get("/todos", async(req, res) => {
   try {
      const getAllTodos  = await pool.query("SELECT * FROM todo");
      console.log(getAllTodos)
      res.json(getAllTodos.rows);
   } catch (err) {
      console.log(err.message);
   }
});

//GET TODO
app.get("/todos/:id", async(req, res) => {
     try {
       //console.log(req.params);
      const { id } = req.params;
      const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
      res.json(getTodo.rows)
     } catch (err) {
       console.log(err.message);
     }
});

app.listen(5000, ()=> {
   console.log("Server has started");
});