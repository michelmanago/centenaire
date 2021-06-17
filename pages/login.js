import {useRouter} from 'next/router';
import {providers, useSession} from 'next-auth/client';
import Header from '../components/header/header';
import LoginComp from '../components/login';
import React, {useEffect} from 'react';
import Head from 'next/head';
import { getMenu } from '../model/menu';

export default function Login({providerList, menu}) {
    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session && router.query && router.query.redirect) router.push(router.query.redirect);
        else if (session) router.push('/');
    });
    return (
        <div>
            <Header menu={menu.data} />
            <Head>
                <title>Login</title>
            </Head>
            <LoginComp providers={providerList} />
        </div>
    );
}
// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    const providerList = await providers();
    const menu = await getMenu(context);
    console.log(context.locale);
    return {
        props: {providerList, menu},
    };
}
