// libs
import {getSession, useSession} from 'next-auth/client';
import Link from 'next/link';
import Head from "next/head"

// components
import Header from '../../components/header/header';

// models
import { getMenu } from '../../model/menu';

// styles
const blockLinkStyles = {
    width: 200,
    height: 100
}


export default function AdminIndex({menu}) {

    const [session] = useSession();

    return (
        <>
            <Head>
                <title>Administrer le site</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {menu && <Header menu={menu.data}/>}
            <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
                <h1 className="text-4xl mb-5 font-semibold">Administrer le site</h1>
                {session && session.userBase.role === 'admin' ? (
                    <div className='flex flex-row'>
                        <Link href="/admin/signup">
                            <a className='px-2 py-1 mr-2 text-white rounded bg-pblue hover:bg-pblue-dark'>Ajouter un User</a>
                        </Link>
                        <Link href="/admin/page">
                            <a className='px-2 py-1 text-white rounded bg-pblue hover:bg-pblue-dark'>Administrer les pages</a>
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-x-5">
                        <BlockLink label="Catégories" href="/admin/category"/>
                        <BlockLink label="Menus de navigation" href="/admin/editor-menu"/>
                        <BlockLink label="Pages" href="/admin/page"/>
                    </div>
                )}
            </main>
        </>
    );
}


const BlockLink = ({label, href}) => (
    <Link href={href}>
        <a style={blockLinkStyles} className='inline-block flex justify-center items-center font-medium rounded h-30 w-10 bg-gray-600 hover:bg-gray-700 text-white'>{label}</a>
    </Link>
)


export async function getServerSideProps(context) {
    const {req, locale} = context;
    const session = await getSession({req});

    const menu = await getMenu(locale)


    console.warn("ENLEVER FALSE")
    if (false && !session)
        return {
            redirect: {
                permanent: false,
                destination: '/login?redirect=admin',
            },
        };
    return {
        props: {
            menu
        },
    };
}
