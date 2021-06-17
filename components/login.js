import Link from 'next/link';
import {signIn} from 'next-auth/client';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

export default function Login({providers}) {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [loginButtonState, setLoginButtonState] = useState(false);
    const [password, setPassword] = useState('');
    const handleSubmit = async e => {
        e.preventDefault();
        setLoginButtonState(true);
        const signInResponce = await signIn('credentials', {
            username: username,
            password: password,
            redirect: false,
        });

        if (signInResponce.ok && router.query && router.query.redirect) router.push(router.query.redirect);
        else if (signInResponce.ok) router.push('/');
        else setLoginButtonState(false);
    };
    return (
        <div className="flex flex-col">
            <div className="grid mx-2 my-20 place-items-center">
                <div className="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">Login</h2>
                    <form className="mt-10" onSubmit={handleSubmit}>
                        <label className="block text-xs font-semibold text-gray-600 uppercase">
                            Pseudo
                            <input
                                id="pseudo"
                                type="text"
                                name="pseudo"
                                placeholder="pseudo"
                                autoComplete="pseudo"
                                className="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                value={username}
                                onChange={e => {
                                    setUsername(e.target.value);
                                }}
                                required
                            />
                        </label>
                        <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                            Password
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="password"
                                autoComplete="current-password"
                                className="block w-full px-1 py-3 mt-2 mb-4 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                }}
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            value="Envoyer"
                            className="w-full py-3 mt-10 font-medium text-white uppercase rounded-sm bg-pblue focus:outline-none hover:bg-pblue-dark hover:shadow-none"
                            disabled={loginButtonState}
                        >
                            Login
                        </button>
                        {/*<div className="mt-4">
                            <p className="text-center text-gray-500 text-md sm:my-auto">or</p>
                            </div>*/}
                        <>
                            {/*providers &&
                                Object.values(providers).map(provider => {
                                    if (provider.name != 'CredentialsCustom')
                                        return (
                                            <div key={provider.name}>
                                                <button
                                                    className="w-full py-3 mt-4 font-medium text-white uppercase bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        signIn(provider.id);
                                                    }}
                                                >
                                                    Sign in with {provider.name}
                                                </button>
                                            </div>
                                        );
                                })*/}
                        </>
                        <div className="mt-8 text-sm text-center sm:flex sm:flex-wrap sm:mb-4">
                            <Link href="">
                                <a href="forgot-password" className="underline flex-2">
                                    Forgot password?
                                </a>
                            </Link>
                            <p className="flex-1 mx-4 my-1 text-gray-500 text-md sm:my-auto">or</p>
                            <Link
                                href={router.query.redirect ? `/signup?redirect=${router.query.redirect}` : `/signup`}
                            >
                                <a className="underline flex-2">Create an Account</a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
