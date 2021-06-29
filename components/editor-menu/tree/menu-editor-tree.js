// libs
import SortableTree, { getVisibleNodeCount} from 'react-sortable-tree';

// components
import {RemoveButton} from '../editor-menu-buttons';
import ModalEditLink from './ModalEditLink';

export default function MenuEditorTree({onRemoveItem, onModifyItem, onChangeLocale, currentMenuData, currentLocale, locales, onChangeTreedata, editedMenuItem, label, href, setHref, setLabel, closeEditModal, onSubmitEdit}){

    // others
    const count = getVisibleNodeCount({treeData: currentMenuData})


    // form

    console.log("la lib", SortableTree)
    
    return (
        <div>

            
            {/* Tabs */}
            <div className="flex">
                {
                    locales.map((locale, index) => {
                        
                        const isCurrentTab = currentLocale === locale

                        return (
                            <button
                                key={"tab-button-" + index}
                                onClick={() => onChangeLocale(index)}
                                className={"w-1/8 h-10 px-6 uppercase rounded-t-lg text-lg " + (isCurrentTab ? "bg-blue-400 font-medium" : "bg-blue-200")}
                            >{locale}</button>
                        )

                    })
                }
            </div>
                    
            {/* Tree */}
            <div style={{height: count* 62}} className="">
                {/* <SortableTree
                    treeData={currentMenuData}
                    onChange={onChangeTreedata}
                    generateNodeProps={({node, path}) => {

                        let isCurrentEditingNode = editedMenuItem && editedMenuItem.node.id === node.id;

                        return {
                            buttons: [
                                <ModalEditLink 
                                    onClick={() => onModifyItem(node, path)} 
                                    label={label}
                                    href={href}
                                    setHref={setHref}
                                    setLabel={setLabel}
                                    isEditing={isCurrentEditingNode}
                                    closeEditModal={closeEditModal}
                                    onSubmitEdit={onSubmitEdit}
                                />,
                                <RemoveButton onClick={() => onRemoveItem(path)} />,
                            ],
                            style: {
                                boxShadow: isCurrentEditingNode ? '0 0 0 4px #34D399' : '',
                            },
                        };
                    }}
                /> */}
            </div>
        </div>
    )
}
