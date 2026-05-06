const express = require("express"); // import Express and create an app instance
const cors = require("cors");

const app = express(); // create app instance
const PORT = 5000;

app.use(cors());
app.use(express.json());

let workouts = [];

app.get("/api/workouts", (req, res) => {
    res.json(workouts);
});

app.post("/api/workouts", (req, res) => {
    const { title, details, intensity } = req.body;

    const newWorkout = {
        id: Date.now(),
        title,
        details,
        intensity,
        date: new Date().toLocaleString()
    };
    workouts.unshift(newWorkout);

    res.status(201).json(newWorkout);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});