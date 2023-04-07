import Head from 'next/head';
import {useState} from 'react';
import Header from '../components/header/header';
import {getMenu} from '../model/menu';

export default function ResetPassword({menu}) {
    const [messageObj, setMessageObj] = useState(null);
    const handleSubmit = async e => {
        e.preventDefault();
        let email = e.target.email.value;

        const res = await fetch(`/api/users/resetpassword/${email}`);
        if (res.status === 200) {
            const user = await res.json();
            console.log('reset', email, {user});
            setMessageObj({type: 'validate', message: 'Un email de réinitialisation vous a été envoyé'});
        } else {
            const error = await res.json();
            setMessageObj({type: 'error', message: error.message});
        }
    };
    return (
        <div>
            <Header menu={menu.data} />
            <Head>
                <title>Reset Password</title>
            </Head>
            <div className="flex flex-col">
                <div className="grid mx-2 my-20 place-items-center">
                    <div className="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
                        <h2 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">
                            Réinitialisation du mot de passe
                        </h2>
                        {messageObj && (
                            <div className={messageObj.type === 'error' ? 'text-red-500' : ''}>
                                {messageObj.message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="mt-10">
                            <div>
                                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    autoComplete="email"
                                    required={true}
                                    className="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 mt-10 font-medium text-white uppercase rounded-sm bg-pblue focus:outline-none hover:bg-pblue-dark hover:shadow-none"
                            >
                                Réinitialiser
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const menu = await getMenu(context.locale);
    return {
        props: {menu},
    };
}
