import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();





    const registerHandler = async () => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data)
        if(data.success) router.replace('/login')
    }

    return (
        <div className="signin-form">
            <h3>Registration Form</h3>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={registerHandler}>Register</button>
            <div>
                <p>Have an account?</p>
                <Link href="/signin">Sign in</Link>
            </div>
        </div>
    )
};
