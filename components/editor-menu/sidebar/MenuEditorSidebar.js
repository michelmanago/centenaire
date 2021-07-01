// libs
import { useState } from "react";

// utils
import { formatNewMenuItem } from "../../../utils/editor-menu-formats";
import generateUUID from "../../../utils/generateUUID";


// components
import MenuEditorLink from "../forms/MenuEditorLink";
import MenuEditorPageList from "./MenuEditorPageList";
import MenuEditorSidebarBlock from "./MenuEditorSidebarBlock";


export default function MenuEditorSidebar({availablePages, setAvailablePages, onAddLinks, currentMenu, currentLocale}){

    // states
    const [formCreateLabel, setFormCreateLabel] = useState('');
    const [formCreateHref, setFormCreateHref] = useState('');

    // form
    const addCustomLink = (stateLabel, stateHref) => {
        if (formCreateHref && formCreateLabel) {

            // add new item
            onAddLinks([formatNewMenuItem(formCreateLabel, formCreateHref)])
            
            // reset
            setFormCreateHref('');
            setFormCreateLabel('');
        }
    };

    const addPageLinks = pages => {

        // add all pages
        onAddLinks(pages.map(page => ({
            ...formatNewMenuItem(page.pageName, page.pageSlug),
            original_id: page.original_id
        })))
    }

    
    

    return (
        <div className="">

            {/* Lien personnalisés */}
            <MenuEditorSidebarBlock title="Liens personnalisés">

                <MenuEditorLink
                    // text
                    formTitle="Ajouter un lien"
                    formSubmitLabel="Ajouter au menu"
                    // submit
                    onSubmit={addCustomLink}
                    // values
                    label={formCreateLabel}
                    onLabelChange={setFormCreateLabel}
                    href={formCreateHref}
                    onHrefChange={setFormCreateHref}
                />

            </MenuEditorSidebarBlock>

            {/* Pages */}
            <MenuEditorSidebarBlock title="Pages existantes">
                <MenuEditorPageList
                    currentLocale={currentLocale}
                    addPageLinks={addPageLinks}
                    setAvailablePages={setAvailablePages}
                    availablePages={availablePages}
                />
            </MenuEditorSidebarBlock>
        </div>
    )
}