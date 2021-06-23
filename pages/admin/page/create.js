// models
import { getMenu } from "../../../model/menu";

// components
import Header from "../../../components/header/header"
import PageEditor from "../../../components/page-editor/page-editor"
import { useEffect } from "react";
import Utils from "../../../utils/utils";

export default function PageEditorCreate({menu}) {

    // methods
    const onSubmit = formPages => {

        // add created_at
        const now = Utils.toMysqlFormat(new Date())
        formPages = formPages.map(formPagesItem => ({
            ...formPagesItem,
            created_at: now
        })) 

        fetch("/api/page", {
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
        .then(body => {

            // navigate to post edition
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
    
    