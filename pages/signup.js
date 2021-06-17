import React from 'react';
import Header from '../components/header/header';
import SignupComp from '../components/signup';
import { getMenu } from '../model/menu';

export default function Login({menu}) {
    return (
        <div>
            {menu && <Header menu={menu.data}/>}
            <SignupComp />
        </div>
    );
}

export async function getServerSideProps(context) {
    const menu = await getMenu(context.locale);
    
    return {
        props: {menu},
    };
}
