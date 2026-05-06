const { useState, useEffect } = React;

function App() {
    const [workouts, set_workouts] = useState([])
    const [title, set_title] = useState("");
    const[details, set_details] = useState("");
    const[intensity, set_intensity] = useState("medium");

    useEffect(() => {
        fetch("http://localhost:5000/api/workouts")
        .then((res) => res.json())
        .then((data) => set_workouts(data));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const workoutData = {
            title,
            details,
            intensity
        };

        const response = await fetch("http://localhost:5000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workoutData)
        });

        const newWorkout = await response.json();

        set_workouts([newWorkouts, ...workouts]);

        set_title("");
        set_details("");
        set_intensity("medium");

    }

    return (
        <div className="page">
            <section className="form-panel">
                <h1>LogWorkout</h1>

                <form onSubmit={handleSubmit}>
                    <label>Workout Title</label>
                    <input 
                        value={title}
                        onChange={(e) => set_title(e.target.value)}
                        placeholder="Leg day"
                        required
                    />

                    <label>Details</label>
                    <textarea
                        value={details}
                        onChange={(e) => set_details(e.target.value)}
                        placeholder="Squats, lunges, leg press"
                        required
                    />

                    <label>Intensity</label>
                    <div className="radio-row">
                        <button
                            type="button"
                            className={intensity === "low" ? "choice selected" : "choice"}
                            onClick={() => set_intensity("low")}
                        >Low</button>

                        <button
                            type="button"
                            className={intensity === "medium" ? "choice selected" : "choice"}
                            onClick={() => set_intensity("medium")}
                        >Medium</button>

                        <button
                            type="button"
                            className={intensity === "high" ? "choice selected" : "choice"}
                            onClick={() => set_intensity("high")}
                        >Low</button>
                    </div>

                    <button className="submit_btn" type="submit">Submit Workout</button>

                </form>
            </section>

            <section className="feed-panel">
                <h2>Workout Feed</h2>

                {workouts.length == 0 ? (
                    <p className="empty">No workouts yet.</p>
                ) : (
                    workouts.map((workout) => (
                        <div className="feed-card" key={workout.id}>
                            <div className="feed-header">
                                <h3>{workout.title}</h3>
                                <span>{workout.date}</span>
                            </div>

                            <p>{workout.details}</p>

                            <div className="tag">
                                {workout.intensity}
                            </div>
                        </div>
                    ))
                )}
            </section>

        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);