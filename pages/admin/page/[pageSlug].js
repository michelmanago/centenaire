//libs
import { useEffect, useState } from "react";

// models
import { getMenu } from "../../../model/menu";
import { getPageBySlug } from "../../../model/page";

// components
import Header from "../../../components/header/header"
import PageEditor from "../../../components/page-editor/page-editor"
import Utils from "../../../utils/utils";
import { useRouter } from "next/router";

// utils

export default function PageEditorUpdate({menu, pageSlug, pageData}) {

    // states
    const router = useRouter()

    useEffect(() => {

        if(!pageData || (pageData && Array.isArray(pageData) && !pageData.length)){
            router.push("/404")
        }

    }, [])

    // methods
    const onSubmit = form => {

        // add last_modified
        form.last_modified = Utils.toMysqlFormat(new Date())

        fetch("/api/page/" + pageData.id, {
            method: "PUT",
            body: JSON.stringify(form)
        })
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(body => {

            window.location = "/admin/page/" + body.pageSlug

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
                    editedPage={pageData}
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
    const {pageSlug} = context.params;
    const pageData = await getPageBySlug(pageSlug);

    return {props: {
      menu: menu,
      pageSlug, 
      pageData,
    }}
  }
    
    