// models
import { getMenu } from "../../../model/menu";

// components
import Header from "../../../components/header/header"
import PageEditor from "../../../components/page-editor/page-editor"
import { useEffect } from "react";
import Utils from "../../../utils/utils";

export default function PageEditorCreate({menu}) {

    // methods
    const onSubmit = form => {

        fetch("/api/page", {
            method: "POST",
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

            // navigate to new post
            const newPostPermalink = Utils.getPagePermalink(body.pageSlug, body.language)
            window.location = newPostPermalink

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
    
    