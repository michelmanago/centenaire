// libs
import { useState } from "react";


// components
import MenuEditorLink from "../forms/MenuEditorLink";
import MenuEditorPageList from "./MenuEditorPageList";
import MenuEditorSidebarBlock from "./MenuEditorSidebarBlock";

// utils


export default function MenuEditorSidebar({updateCurrentMenuState, currentMenu, currentLocale, canSave, setCanSave}){

    // states
    const [formCreateLabel, setFormCreateLabel] = useState('');
    const [formCreateHref, setFormCreateHref] = useState('');

    // utils
    const formatNewMenuItem = (label, href) => {
    
        return {
            id: "new-item" + currentMenu.length,
            title: label,
            href: href || '#'
        }
    }

    // form
    const addCustomLink = (stateLabel, stateHref) => {
        if (formCreateHref && formCreateLabel) {
            // add new item
            // update current state menu
            
            updateCurrentMenuState([
                formatNewMenuItem(formCreateLabel, formCreateHref),
                ...currentMenu,
            ])
            
            // reset
            setFormCreateHref('');
            setFormCreateLabel('');

            if(!canSave){
                setCanSave(true)
            }
        }
    };

    const addPageLinks = links => {


        console.log({links})
        updateCurrentMenuState([
            ...links.map(link => formatNewMenuItem(link.label, link.href)),
            ...currentMenu
        ])

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
                />
            </MenuEditorSidebarBlock>
        </div>
    )
}