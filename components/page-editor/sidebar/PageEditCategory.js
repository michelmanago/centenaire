// utils
import { CATEGORIES } from '../../../utils/parameters';

// components
import { capitalize } from "../../../utils/utils"
import PageEditorSidebarBlock from "./page-editor-sidebar-block"


const categories = Object.values(CATEGORIES);


const noCategoryValue = ""

export default function PageEditCategory({updatePages, category}){

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
                <option value={noCategoryValue}>Aucune catégorie</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>
                        {capitalize(cat)}
                    </option>
                ))}
            </select>
        </PageEditorSidebarBlock>
    )
}