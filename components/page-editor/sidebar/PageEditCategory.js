// utils

// components
import { capitalize } from "../../../utils/utils"
import PageEditorSidebarBlock from "./page-editor-sidebar-block"


const noCategoryValue = ""

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
            <select value={category || noCategoryValue} onChange={setCategory} className="w-full px-4 py-3 border rounded">

                {/* No category */}
                <option value={noCategoryValue}>Aucune catégorie</option>

                {/* List */}
                {categories.map(cat => (
                    <option key={cat.id} value={cat.title}>
                        {capitalize(cat.title)}
                    </option>
                ))}

            </select>
        </PageEditorSidebarBlock>
    )
}