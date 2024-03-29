// libs
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

// styles
import styles from '../../styles/components/header.module.css';

// components
import Image from 'next/image';
import Nav from '../nav/nav';

export default function Header({ menu, translations }) {
    const [session] = useSession();

    /** Hooks */
    const router = useRouter();
    const { t } = useTranslation()
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
                        <div className="w-4/5 md:w-3/4 ml-2 text-xl md:text-4xl font-bold text-pred font-logotitle">
                            {t("common:site_title")}
                        </div>
                    </div>

                    
                </div>
            </div>

            {/* Top bar */}
            <Nav 
                menu={menu}
                translations={translations}
            />

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
                    <Link
                        href={`/api/auth/signout`}
                    >
                        <a
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
                    </Link>
                </div>
            )}

            {/* Logo */}
            {/* <img className={"my-3 " + styles.logo} src="/logo.svg" alt="logo"/> */}
        </header>
    );
}
