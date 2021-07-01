// libs
import SortableTree, { getVisibleNodeCount} from 'react-sortable-tree';
import { voidFunction } from '../../../utils/utils';

// components
import {RemoveButton} from '../editor-menu-buttons';
import ModalEditLink from './ModalEditLink';


const MAX_TREE_DEPTH = 3

export default function MenuEditorTree({onVisibilityToggle, onMoveNode, onRemoveItem, onModifyItem, onChangeLocale, currentMenuData, currentLocale, locales, editedMenuItem, label, href, setHref, setLabel, closeEditModal, onSubmitEdit}){

    // others
    const count = getVisibleNodeCount({treeData: currentMenuData})

    // form
    
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
            <div style={{height: count * 62}} className="">
                <SortableTree
                    onChange={voidFunction} // this props is required
                    maxDepth={MAX_TREE_DEPTH}
                    treeData={currentMenuData}
                    onMoveNode={onMoveNode}
                    onVisibilityToggle={onVisibilityToggle}
                    generateNodeProps={({node, path, treeIndex}) => {

                        let isCurrentEditingNode = editedMenuItem && editedMenuItem.node.uuid === node.uuid;

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
                />
            </div>
        </div>
    )
}
