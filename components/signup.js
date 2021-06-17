import Link from 'next/link';
import React, {useState} from 'react';
import {useRouter} from 'next/router';

export default function Signup() {
    const router = useRouter();
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [signupButtonState, setSignupButtonState] = useState(false);
    const handleSignup = async event => {
        event.preventDefault();
        setSignupButtonState(true);
        if (password != confirmPassword) return;

        const resp = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: pseudo,
                email: email,
                password: password,
                provider: 'custom',
            }),
        });
        if (resp.status === 200) {
            if (router.query.redirect) router.push(`/login?redirect=${router.query.redirect}`);
            else router.push(`/login`);
        } else {
            setSignupButtonState(false);
        }
    };
    return (
        <div className="grid mt-20 place-items-center">
            <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12 card">
                <h1 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">Signup</h1>
                <form className="mt-6" onSubmit={handleSignup}>
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                        Pseudo
                        <input
                            id="pseudo"
                            type="text"
                            name="pseudo"
                            placeholder="pseudo"
                            autoComplete="pseudo"
                            value={pseudo}
                            onChange={e => {
                                setPseudo(e.target.value);
                            }}
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required
                        />
                    </label>
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                        E-mail
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="john.doe@company.com"
                            autoComplete="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required
                        />
                    </label>

                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                        Password
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="********"
                            autoComplete="new-password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required
                        />
                    </label>

                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                        Confirm password
                        <input
                            id="password-confirm"
                            type="password"
                            name="password-confirm"
                            placeholder="********"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={e => {
                                setConfirmPassword(e.target.value);
                            }}
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gray-800 shadow-lg focus:outline-none hover:bg-gray-700 hover:shadow-none"
                        disabled={signupButtonState}
                    >
                        Sign up
                    </button>
                    <Link href={router.query.redirect ? `/login?redirect=${router.query.redirect}` : `/login`}>
                        <a className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
                            Already registered?
                        </a>
                    </Link>
                </form>
            </div>
        </div>
    );
}
