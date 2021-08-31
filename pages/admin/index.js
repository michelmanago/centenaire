// libs
import {getSession, useSession} from 'next-auth/client';
import Link from 'next/link';
import Head from 'next/head';

// components
import Header from '../../components/header/header';

// models
import {getMenu} from '../../model/menu';

const linkStyles = {
    width: 300,
};

export default function AdminIndex({menu}) {
    const [session] = useSession();

    return (
        <>
            <Head>
                <title>Administrer le site</title>
                
            </Head>

            {menu && <Header menu={menu.data} />}
            <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
                <h1 className="mb-5 text-4xl font-semibold">Administrer le site</h1>
                <div className="flex flex-col">
                    <BlockLink label="Pages" href="/admin/page" />
                    <BlockLink label="Catégories" href="/admin/category" />
                    <BlockLink label="Menus de navigation" href="/admin/editor-menu" />
                    <BlockLink label="Utilisateurs" href="/admin/users/create" />
                    <BlockLink label="Media" href="/admin/media" />
                </div>
            </main>
        </>
    );
}

const BlockLink = ({label, href}) => (
    <div>
        <Link href={href}>
            <a
                style={linkStyles}
                className="inline-block px-3 py-1 mb-3 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
            >
                {label}
            </a>
        </Link>
    </div>
);

export async function getServerSideProps(context) {
    const {req, locale} = context;
    const session = await getSession({req});

    const menu = await getMenu(locale);

    if (!session)
        return {
            redirect: {
                permanent: false,
                destination: '/login?redirect=admin',
            },
        };
    return {
        props: {
            menu,
        },
    };
}
