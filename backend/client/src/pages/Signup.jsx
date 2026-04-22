import { useState } from "react";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/signup", {
                email,
                password,
            });

            window.location.href = "/";
        } catch (err) {
            alert("Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

                <input
                    className="w-full p-2 border mb-3 rounded"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full p-2 border mb-3 rounded"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    onClick={handleSignup}
                >
                    Signup
                </button>
            </div>
        </div>
    );
}

export default Signup;