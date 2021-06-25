// libs
import { useState } from "react";


// components
import MenuEditorLink from "../forms/MenuEditorLink";
import MenuEditorSidebarBlock from "./MenuEditorSidebarBlock";

export default function MenuEditorSidebar({editedItem}){

        // states
        const [formCreateLabel, setFormCreateLabel] = useState('');
        const [formCreateHref, setFormCreateHref] = useState('');

        // form
        const submitAddMenuItem = (stateLabel, stateHref) => {
            if (formCreateHref && formCreateLabel) {
                // add new item
                // update current state menu
                
                updateCurrentMenuState(
                    [formatNewMenuItem(formCreateLabel, formCreateHref)].concat(currentMenu)
                )
                
                // // reset
                setFormCreateHref('');
                setFormCreateLabel('');
    
                if(!canSave){
                    setCanSave(true)
                }
            }
        };
    
        const submitModifyMenuItem = () => {
            if (formUpdateHref && formUpdateLabel) {
    
                let {path, node} = editedMenuItem;
    
                updateCurrentMenuState(changeNodeAtPath({
                    treeData: currentMenu,
                    path,
                    getNodeKey,
                    newNode: {
                        ...node,
                        title: formUpdateLabel,
                        href: formUpdateHref,
                    },
                }))
    
                if(!canSave){
                    setCanSave(true)
                }
                
            }
        }
    
    return (
        <div className="">

            <MenuEditorSidebarBlock title="Liens personnalisés">

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

            {/* Form modify */}
            {/* {editedItem && (
                <FormMenuItem
                    // text
                    formTitle="Modifier un lien"
                    formSubmitLabel="Modifier le lien"
                    // submit
                    onSubmit={submitModifyMenuItem}
                    // values
                    label={formUpdateLabel}
                    onLabelChange={setFormUpdateLabel}
                    href={formUpdateHref}
                    onHrefChange={setFormUpdateHref}

                    afterSubmit={
                        <CloseButton
                            onClick={closeModifyForm}
                        />
                    }
                />
            )} */}
        </div>
    )
}