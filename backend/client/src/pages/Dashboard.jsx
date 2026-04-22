import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const token = localStorage.getItem("token");

    const fetchTasks = async () => {
        const res = await axios.get("http://localhost:5000/api/tasks", {
            headers: { Authorization: token },
        });
        setTasks(res.data);
    };

    const addTask = async () => {
        await axios.post(
            "http://localhost:5000/api/tasks",
            { title },
            { headers: { Authorization: token } }
        );
        setTitle("");
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
            headers: { Authorization: token },
        });
        fetchTasks();
    };

    const toggleTask = async (task) => {
        await axios.put(
            `http://localhost:5000/api/tasks/${task._id}`,
            { completed: !task.completed },
            { headers: { Authorization: token } }
        );
        fetchTasks();
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <button className="text-blue-500 text-sm" onClick={logout}>
                        Logout
                    </button>
                </div>

                <div className="flex gap-2 mb-4">
                    <input
                        className="flex-1 border p-2 rounded"
                        placeholder="New task"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white px-4 rounded"
                        onClick={addTask}
                    >
                        Add
                    </button>
                </div>

                {tasks.map((task) => (
                    <div
                        key={task._id}
                        className="flex justify-between items-center border p-2 mb-2 rounded"
                    >
                        <span
                            className={task.completed ? "line-through text-gray-400" : ""}
                        >
                            {task.title}
                        </span>

                        <div className="flex gap-2">
                            <button onClick={() => toggleTask(task)}>✔</button>
                            <button
                                className="text-red-500"
                                onClick={() => deleteTask(task._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;