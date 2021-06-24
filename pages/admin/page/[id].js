//libs
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// models
import { getMenu } from "../../../model/menu";
import { getPageTranslations } from "../../../model/page";

// components
import Header from "../../../components/header/header"
import PageEditor from "../../../components/page-editor/page-editor"

// utils
import Utils from "../../../utils/utils";

// utils

export default function PageEditorUpdate({menu, pageTranslations}) {

    // states
    const router = useRouter()

    useEffect(() => {

        console.warn("redirect if not found")
        // if(!pageData || (pageData && Array.isArray(pageData) && !pageData.length)){
        //     router.push("/404")
        // }

    }, [])

    // methods
    const onSubmit = formPages => {

        // add last_modified

        const originalPage = pageTranslations.find(page => page.language === router.defaultLocale)

        const now = Utils.toMysqlFormat(new Date())
        formPages = formPages.map(formPagesItem => ({
            ...formPagesItem,
            last_modified: now
        })) 
        
        fetch("/api/page", {
            method: "PUT",
            body: JSON.stringify(formPages)
        })
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(body => {

            console.log(body)

            // window.location = "/admin/page/" + body.pageSlug

        })
        .catch(err => {
            console.log(err)
            alert("NOT OK")
        })

    }

    return (
        <>
            {menu && <Header menu={menu.data}/>}
            <main className="bg-white">
                <PageEditor
                    editedPages={pageTranslations}
                    onFormSubmitted={onSubmit}
                />
            </main>
        </>
    );
}

export async function getServerSideProps(context) {

    // menu
    const menu = await getMenu(context.locale)
  
    // current page edited
    const {id} = context.params;
    const pageTranslations = await getPageTranslations(id);

    return {props: {
        menu: menu,
        pageTranslations
    }}
  }
    
    