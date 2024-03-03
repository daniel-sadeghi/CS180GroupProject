const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query("select * from favorites where user_id = $1", [req.user.id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});
module.exports = router;


//add a favorite, to do a.
router.post("/", authorization, async (req, res) => {
try {
    console.log(req.body);
    const {food_id, title, imageURL, sourceURL, spoonacularSourceUrl} = req.body;
    const newTodo = await pool.query(
    "INSERT INTO favorites (food_id, title, imageURL, sourceURL, spoonacularSourceUrl, user_id) VALUES ($1, $2) RETURNING *",
    [food_id, title, imageURL, sourceURL, spoonacularSourceUrl, req.user.id]
    );

    res.json(newTodo.rows[0]);
} catch (err) {
    console.error(err.message);
}
});


//delete a favorite

router.delete("/:id", authorization, async (req, res) => {
try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
    "DELETE FROM favorites WHERE favorite_id = $1 AND user_id = $2 RETURNING *",
    [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
    return res.json("This food item is not on your favorite list");
    }

    res.json("Todo was deleted");
} catch (err) {
    console.error(err.message);
}
});