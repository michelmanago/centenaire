// libs
import Head from "next/head"
import {getSession, useSession} from 'next-auth/client';

// model
import { getMenu } from "../../../model/menu"

// components
import Header from "../../../components/header/header"
import ListPage from "../../../components/list-page/ListPage"
import { getAllPages } from "../../../model/page"

export default function Page({menu, pages}) {
    return (
        <>

            <Head>
                <title>Administrer le site</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {menu && <Header menu={menu.data}/>}

            <ListPage pages={pages}/>

        </>
    )
}

export async function getServerSideProps(context) {
    const {req} = context;
    const session = await getSession({req});

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?redirect=admin/page`,
            },
        };
    }
    
    const category = context.query.cat

    const menu = await getMenu(context.locale)
    const pages = await getAllPages(context.defaultLocale, category ? category : null)
  
    return {props: {
      menu: menu,
      pages: pages
    }}

}