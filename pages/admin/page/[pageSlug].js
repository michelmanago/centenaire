//libs
import { useEffect } from "react";

// models
import { getMenu } from "../../../model/menu";
import { getPageBySlug } from "../../../model/page";

// components
import Header from "../../../components/header/header"
import PageEditor from "../../../components/page-editor/page-editor"
import Utils from "../../../utils/utils";

// utils

export default function PageEditorUpdate({menu, pageSlug, pageData}) {

    // methods
    const onSubmit = form => {

        // add last_modified
        form.last_modified = Utils.getSQLDatatime(new Date())

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

            window.location.reload()

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
    
    