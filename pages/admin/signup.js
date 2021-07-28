import React from 'react';
import {getSession} from 'next-auth/client';
import Header from '../../components/header/header';
import SignupComp from '../../components/signup';
import {getMenu} from '../../model/menu';

export default function Login({menu}) {
    return (
        <div>
            {menu && <Header menu={menu.data} />}
            <SignupComp />
        </div>
    );
}

export async function getServerSideProps(context) {
    const {req} = context;
    const session = await getSession({req});

    if (!session)
        return {
            redirect: {
                permanent: false,
                destination: '/login?redirect=admin/signup',
            },
        };
    if (session.userBase.role != 'admin')
        return {
            redirect: {
                permanent: false,
                destination: '/admin',
            },
        };
    const menu = await getMenu(context.locale);

    return {
        props: {menu},
    };
}
