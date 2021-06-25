// libs
import { useState } from "react";


// components
import MenuEditorLink from "../forms/MenuEditorLink";
import MenuEditorSidebarBlock from "./MenuEditorSidebarBlock";

// utils


export default function MenuEditorSidebar({editedItem, updateCurrentMenuState, currentMenu, canSave, setCanSave}){

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
        const submitAddMenuItem = (stateLabel, stateHref) => {
            if (formCreateHref && formCreateLabel) {
                // add new item
                // update current state menu
                
                updateCurrentMenuState(
                    [formatNewMenuItem(formCre^ateLabel, formCreateHref)].concat(currentMenu)
                )
                
                // // reset
                setFormCreateHref('');
                setFormCreateLabel('');
    
                if(!canSave){
                    setCanSave(true)
                }
            }
        };
    

    return (
        <div className="">

            <MenuEditorSidebarBlock title="Liens personnalisés">

                {/* Lien personnalisés */}
                <MenuEditorLink
                    // text
                    formTitle="Ajouter un lien"
                    formSubmitLabel="Ajouter au menu"
                    // submit
                    onSubmit={submitAddMenuItem}
                    // values
                    label={formCreateLabel}
                    onLabelChange={setFormCreateLabel}
                    href={formCreateHref}
                    onHrefChange={setFormCreateHref}
                />

            </MenuEditorSidebarBlock>
        </div>
    )
}