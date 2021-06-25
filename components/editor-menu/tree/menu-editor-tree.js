// libs
import SortableTree, { getVisibleNodeCount} from 'react-sortable-tree';

// components
import {RemoveButton, UpdateButton, CloseButton} from '../editor-menu-buttons';

export default function MenuEditorTree({onRemoveItem, onModifyItem, onChangeLocale, currentMenuData, currentLocale, locales, onChangeTreedata, editedMenuItem}){

    // others
    const count = getVisibleNodeCount({treeData: currentMenuData})
    
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
                                className={"w-1/8 h-10 px-6 uppercase rounded-t-lg text-lg " + (isCurrentTab ? "bg-purple-400 font-semibold" : "bg-purple-200")}
                            >{locale}</button>
                        )

                    })
                }
            </div>
                    
            {/* Tree */}
            <div style={{height: count* 62}} className="">
                <SortableTree
                    treeData={currentMenuData}
                    onChange={onChangeTreedata}
                    generateNodeProps={({node, path}) => {

                        let isEditing = editedMenuItem && editedMenuItem.node.id === node.id;

                        return {
                            buttons: [
                                <UpdateButton
                                    label={isEditing ? 'Fermer' : 'Modifier'}
                                    onClick={() => onModifyItem(node, path)}
                                />,
                                <RemoveButton onClick={() => onRemoveItem(path)} />,
                            ],
                            style: {
                                boxShadow: isEditing ? '0 0 0 4px #34D399' : '',
                            },
                        };
                    }}
                />
            </div>
        </div>
    )
}