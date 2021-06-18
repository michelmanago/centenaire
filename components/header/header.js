// libs
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';

// styles
import styles from '../../styles/components/header.module.css';

// components
import Image from 'next/image';
import Nav from '../nav/nav';
import LanguageSwitcher from "../../components/language-switcher/LanguageSwitcher"

export default function Header({ menu }) {
    const [session] = useSession();

    /** Hooks */
    const router = useRouter();
    const { locale, locales, defaultLocale } = router;

    /** States */
    const [isLangMenuOpened, setIsLangMenuOpened] = useState(false);

    return (
        <header className="bg-pyellow">
            <div className="container max-w-screen-xl bg-white sm:mx-auto">

                <div className="flex items-center">
                    <div className="flex justify-end w-1/5 md:w-1/4">
                        <Image src="/logo.svg" width={124} height={150} alt="logo" />
                    </div>
                    <div className="w-4/5 md:w-3/4">
                        <div>
                            <span className="ml-2 text-xl md:text-4xl font-bold text-pred font-logotitle">Centenaire de l'archevêché des églises </span>
                        </div>
                        <div>
                            <span className="ml-2 text-xl md:text-4xl font-bold text-pred font-logotitle"> Orthodoxes de tradition russe en Europe occidentale</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container max-w-screen-xl bg-white sm:mx-auto">
                <LanguageSwitcher />
            </div>

            {/* Top bar */}
            <Nav menu={menu} />

            {session && (
                <div className='flex flex-row items-center justify-center'>
                    {session.user.image && (
                        <span style={{ backgroundImage: `url(${session.user.image})` }} className={''} />
                    )}
                    <span className={'mr-2'}>
                        <small>Signed in as</small>
                        <br />

                        <strong>{session.userBase ? session.userBase.username : session.user.name}</strong>
                    </span>
                    <a
                        href={`/api/auth/signout`}
                        className={
                            'mx-1 text-white border border-transparent rounded-md bg-pblue hover:bg-pblue-dark px-2 py-2'
                        }
                        onClick={e => {
                            e.preventDefault();
                            signOut();
                        }}
                    >
                        Sign out
                    </a>
                </div>
            )}

            {/* Logo */}
            {/* <img className={"my-3 " + styles.logo} src="/logo.svg" alt="logo"/> */}
        </header>
    );
}
