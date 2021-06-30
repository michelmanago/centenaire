// libs

// components
import PageEditorSidebarBlock from "./page-editor-sidebar-block"


export default function PageEditCategoryOrder({updatePages, order}){

    // synchronized
    const setCategoryOrder = e => {
        updatePages({
            order: e.target.value
        })
    }

    return (
        <PageEditorSidebarBlock title="Ordre d'affichage">
            <input onChange={setCategoryOrder} value={order} className="px-1 w-20 bg-gray-200" type="number" name={order}/> 
        </PageEditorSidebarBlock>
    )
}