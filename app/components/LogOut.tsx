'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const LogOut = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
      
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
        });

        const data = await res.json();
        if (res.ok) {
            const { token, user } = data;
            console.log("Response data:", token, user);
            alert("User logout successfully!");
            dispatch(logout());  // Dispatching action to Redux store
            router.push('/auth/login');
        } else {
            setError(data.message || "Login failed. Try again.");
        }
    };

    return (
        <button onClick={logoutHandler} className="btn-logout hover:cursor-pointer">
      Log Out
    </button>
    );
};

export default LogOut;
