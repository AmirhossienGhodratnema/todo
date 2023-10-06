import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const { status } = useSession();


    useEffect(() => { if (status === 'authenticated') router.replace('/') }, [status])

    const loginHandler = async () => {
        const res = await signIn('credentials', { email, password, redirect: false });
        console.log(res)
        if (!res.error) window.location.href = '/';
    }

    return (
        <div className="signin-form">
            <h3>Login Form</h3>
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
            <button onClick={loginHandler}>Login</button>
            <div>
                <p>Create an account?</p>
                <Link href="/signup">Sign up</Link>
            </div>
        </div>
    )
};
