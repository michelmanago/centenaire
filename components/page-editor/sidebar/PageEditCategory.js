// libs

// components
import { capitalize } from "../../../utils/utils"
import PageEditorSidebarBlock from "./page-editor-sidebar-block"


export default function PageEditCategory({updatePages, category, categories}){

    // synchronized
    const setCategory = e => {
        updatePages({
            page: e.target.value
        })
    }

    return (
        <PageEditorSidebarBlock title="Catégories">
            {/* categorie */}
            <select value={category || ''} onChange={setCategory} className="w-full px-4 py-3 border rounded">
                <option disabled value="">
                    {' '}
                    -- Selectionner une catégorie --{' '}
                </option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>
                        {capitalize(cat)}
                    </option>
                ))}
            </select>
        </PageEditorSidebarBlock>
    )
}