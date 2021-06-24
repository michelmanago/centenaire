// models
import { getMenu } from "../../../model/menu";

// components
import Header from "../../../components/header/header"
import PageEditor from "../../../components/page-editor/page-editor"
import { useEffect } from "react";
import Utils from "../../../utils/utils";
import { useRouter } from "next/router";

export default function PageEditorCreate({menu}) {

    // hooks
    const {defaultLocale} = useRouter()

    // methods
    const onSubmit = async formPages => {

        // add created_at
        const now = Utils.toMysqlFormat(new Date())
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
        .then(pages => {

            // hard-coded :/
            const originalPage = pages.find(page => page.language === defaultLocale)
            
            if(originalPage){

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
            {menu && <Header menu={menu.data}/>}
            <main className="bg-white">
                <PageEditor
                    onFormSubmitted={onSubmit}
                />
            </main>
        </>
    );
}

export async function getServerSideProps(context) {

    const menu = await getMenu(context.locale)
  
    return {props: {
      menu: menu
    }}
  }
    
    