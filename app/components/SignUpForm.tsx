'use client';
import Link from "next/link";
import { useState } from "react"

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submitHandler = async () => {
        if (!email || !password || !name) {
            setError("please fill all the details");
            return;
        }
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        if (res.ok) {
            alert("User register successfully! Go to Login Page");
            window.location.reload();
        } else {
            setError(data.message || "Signup Failed. Try again.");
        }
    };
    return (
        // <div className="border p-2  bg-white rounded-lg max-h-max min-h-80">
        //     <span className="flex justify-center mb-4">

        //     <h1 className="text-2xl font-bold mt-12">SignUp Page</h1>
        //     </span>
            <div className="flex flex-col m-2">
                <input type="text"
                    className="mb-2 border-b-2  focus:outline-none rounded-sm border-gray-500"
                    value={name}
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input type="text"
                    className="mb-2 border-b-2  focus:outline-none rounded-sm border-gray-500"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

              
                <input type="password"
                    value={password}
                    className="mb-2 border-b-2 rounded-sm border-gray-500 focus:outline-none"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <div className="flex justify-center mt-6">

                <button type="submit" onClick={submitHandler}
                    className="hover:cursor-pointer bg-gradient-to-l from-fuchsia-300 to-blue-400 rounded-sm max-w-max p-1 hover:bg-gradient-to-l hover:from-fuchsia-500 hover:to-blue-500 min-w-36"
                    >SignUp</button>
                    </div>
                    <div className="mt-4 flex justify-center">Already have an account?
                        <Link href="../auth/login" className="text-blue-500 hover:underline"> Log in
                        </Link>
                    </div>

            </div>
        // </div>
    )
}
export default SignUpForm;