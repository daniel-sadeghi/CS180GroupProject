const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//all todos and name a.


router.get("/", authorization, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );
    
    const user = await pool.query(
      "SELECT user_id, user_name, user_email, restrictions, image FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//update restriction :

router.patch('/restrictions', authorization, async (req, res) => {
  const userId = req.user.id; // Assuming you have user_id in req.user.id

  try {
    const { restriction } = req.body; // Assuming the client sends the updated restriction in the request body

    // Update the restriction field for the specific user in the database
    const updateQuery = 'UPDATE users SET restrictions = $1 WHERE user_id = $2';
    await pool.query(updateQuery, [restriction, userId]);

    res.status(200).json({ message: 'Restriction updated successfully' });
  } catch (error) {
    console.error('Error updating restriction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//create a todo

router.post("/todos", authorization, async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

router.put("/todos/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

router.delete("/todos/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This Todo is not yours");
    }

    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;