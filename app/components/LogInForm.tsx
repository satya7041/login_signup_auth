'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

const LogInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const loginHandler = async () => {
        if (!email || !password) {
            setError("Please fill all the details");
            return;
        }
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (res.ok) {
            const { token, user } = data;
            console.log("Response data:", token, user);
            alert("User logged in successfully!");
            dispatch(loginSuccess({ token, user }));  // Dispatching action to Redux store
            router.push('/dashboard');
        } else {
            setError(data.message || "Login failed. Try again.");
        }
    };

    return (
        <div>
            {/* <span className="flex justify-center mb-4">
                <h1 className="text-2xl font-bold mt-12">Login</h1>
            </span> */}
            <div className="flex flex-col m-2 mt-8">
                <input
                    type="text"
                    className="mb-2  focus:outline-none border-b-2 border-gray-500"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    value={password}
                    className="mb-2  focus:outline-none border-b-2 border-gray-500"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="flex justify-center mt-6">

                <button
                    type="button"
                    onClick={loginHandler}
                    className="hover:cursor-pointer bg-gradient-to-l from-fuchsia-300 to-blue-400 rounded-sm min-w-36 max-w-max p-1 hover:bg-gradient-to-l hover:from-fuchsia-500 hover:to-blue-500"
                    >
                    LogIn
                </button>
                    </div>
                    <div className="mt-4 flex justify-center">Forgot 
                        <Link href="../auth/" className="text-blue-500 hover:underline ml-1"> Password
                        </Link>?
                    </div>
                    <div className="mt-4 flex justify-center">Don't have an account?
                        <Link href="../auth/signup" className="text-blue-500 hover:underline"> Sign up
                        </Link>
                    </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}  {/* Display error */}
        </div>
    );
};

export default LogInForm;
