
// models
import { getMenu } from '../../../model/menu';

// libs
import Head from 'next/head';
import {getSession, useSession} from 'next-auth/client';

// components
import Header from '../../../components/header/header';

// parameters
import { CATEGORIES } from "../../../utils/parameters"
import { capitalize } from '../../../utils/utils';

export default function AdminCategory({menu}) {

    const categories = Object.values(CATEGORIES)

    return (
        <>
            <Head>
                <title>Admin - Catégories</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {menu && <Header menu={menu.data} />}

            <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
                <h1 className="mb-3 text-4xl font-semibold">Modifier les catégories</h1>
                <ul className="pl-5">
                    {
                        categories.map(cat => (
                            <li key={cat}>
                                <a className="text-lg text-blue-500 underline" key={cat} href={`/admin/category/${cat}`} >{capitalize(cat)}</a>
                            </li>
                        ))
                    }
                </ul>
            </main>
        </>
    );
}

export async function getServerSideProps(context) {
    const {req} = context;
    const session = await getSession({req});

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?redirect=admin/category`,
            },
        };
    }

    const menu = await getMenu(context.locale)
  
    return {props: {
      menu: menu
    }}
}
