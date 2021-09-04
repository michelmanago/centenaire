// models
import { getMenu } from "../../../model/menu";
import { getAllCategories } from "../../../model/category";

// components
import Header from "../../../components/header/header"
import PageEditor from "../../../components/page-editor/page-editor"

// libs
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head"
import {getSession, useSession} from 'next-auth/client';

// utils
import { toMysqlFormat } from "../../../utils/utils";
import { bulkAttributePageToMedia } from "../../../utils/fetch/attributePageToMedia";

export default function PageEditorCreate({menu, categories}) {

    // hooks
    const {defaultLocale} = useRouter()

    // methods
    const onSubmit = async (formPages, attributedMedia) => {

        // add created_at
        const now = toMysqlFormat(new Date())
        formPages = formPages.map(formPagesItem => ({
            ...formPagesItem,
            created_at: now
        })) 

        return fetch("/api/page", {
            method: "POST",
            body: JSON.stringify(formPages)
        })
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(async pages => {

            const originalPage = pages.find(page => page.language === defaultLocale)

            await bulkAttributePageToMedia(originalPage.id, attributedMedia)

            return pages
        })
        .then(pages => {

            // hard-coded :/
            const originalPage = pages.find(page => page.language === defaultLocale)
            
            if(originalPage){

                // do not prevent from leaving page
                window.onbeforeunload = null

                // navigate to post edition
                window.location = "/admin/page/" + originalPage.id

            }

            return pages
            
        })
        .catch(err => {
            console.log(err)
            alert("NOT OK")
        })

    }


    return (
        <>
            <Head>
                <title>Creation de page</title>
                
            </Head>
            {menu && <Header menu={menu.data}/>}
            <main className="">
                <PageEditor
                    onFormSubmitted={onSubmit}
                    categories={categories}
                />
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
                destination: '/login?redirect=admin/page/create',
            },
        };
    }

    // data
    const menu = await getMenu(context.locale)
    const categories = await getAllCategories()

    return {props: {
      menu: menu,
      categories
    }}
  }
    
    