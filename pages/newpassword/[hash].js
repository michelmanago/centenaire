import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRef, useState} from 'react';
import Header from '../../components/header/header';
import {getMenu} from '../../model/menu';
import {getUserByHash} from '../../model/user';

export default function NewPassword({menu, hash}) {
    const router = useRouter();
    const [status, setStatus] = useState('main');
    const [message, setMessage] = useState();
    const {locale} = router;
    let title;
    switch (locale) {
        case 'fr':
            title = 'Réinisialisation du mot de passe';
            break;
        case 'en':
            title = 'Reset Password';
            break;
        case 'ru':
            title = '';
            break;
        default:
            throw 'Erreur. langue inconnue dans maps.js : ' + locale;
    }

    const handleReset = async e => {
        e.preventDefault();

        const newPassword = e.target.password.value;
        const confirmePassword = e.target.password_confirm.value;
        if (newPassword === confirmePassword) {
            console.log(`/api/users/password/${hash}`, newPassword);
            const res = await fetch(`/api/users/password/${hash}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: newPassword,
                }),
            });
            if (res.ok) {
                setMessage();
                setStatus('ok');
            }
        } else {
            setMessage('Les champs ne sont pas identiques');
        }
    };
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="">
                <Header currentLanguage={locale} currentPage={''} menu={menu.data} />
                <div className="flex flex-col">
                    <div className="grid mx-2 my-5 place-items-center">
                        <div className="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
                            <h1 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">{title}</h1>
                            {message && <div className="text-red-500">{message}</div>}
                            {!hash && <p>Ce lien n'est pas valide</p>}
                            {hash && status === 'main' && (
                                <form className="mt-10" onSubmit={handleReset}>
                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                                        Mot de Passe
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="********"
                                            autoComplete="off"
                                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                            required
                                        />
                                    </label>

                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                                        Confirmer le mot de passe
                                        <input
                                            id="password_confirm"
                                            type="password"
                                            placeholder="********"
                                            autoComplete="off"
                                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                            required
                                        />
                                    </label>
                                    <button
                                        className="w-full py-3 mt-10 font-medium text-white uppercase rounded-sm bg-pblue focus:outline-none hover:bg-pblue-dark hover:shadow-none"
                                        type="submit"
                                    >
                                        Envoyer
                                    </button>
                                </form>
                            )}
                            {hash && status === 'ok' && (
                                <div className="flex flex-col gap-2">
                                    <div>Le mot de passe a été changé</div>
                                    <Link href="/login">
                                        <a className="w-full py-3 mt-10 font-medium text-center text-white uppercase rounded-sm bg-pblue focus:outline-none hover:bg-pblue-dark hover:shadow-none">
                                            Connection
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {hash} = context.query;
    const menu = await getMenu(context.locale);
    const user = await getUserByHash(hash);

    console.log(user, hash);

    if (!user || user.length === 0) {
        return {
            props: {menu},
        };
    }
    if (hash) {
        return {
            props: {menu, hash}, // will be passed to the page component as props
        };
    }
    return {props: {menu}};
}
