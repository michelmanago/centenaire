// libs

// components
import { useEffect, useState } from "react"
import SortableTree from "react-sortable-tree"
import PageEditorSidebarBlock from "./page-editor-sidebar-block"


export default function PageEditCategoryOrder({updatePages, position, language, category, pageName, isEditing, pageId}){

    // states
    const [treedata, setTreedata] = useState([])

    // fetch
    useEffect(() => {

        const url = new URL(window.location.origin + "/api/page/all")
        url.searchParams.append("locale", language)
        url.searchParams.append("category", category)

        fetch(url.href)
        .then(response => {

            if(response.ok){
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(body => {

            let list = []

            const currentPage = {
                title: pageName,
                id: pageId,
            }

            if(!isEditing){

                // current page             
                list.push(currentPage)

            } else {

                // add pages
                const pagesWithoutThisCurrentPage = body.map(page => ({
                    title: page.pageName,
                    id: page.id,
                    orginal_id: page.orginal_id,
                })).filter(p => p.id !== pageId)

                // 
                list = pagesWithoutThisCurrentPage
                list.splice(position, 0, currentPage)

            }

            setTreedata(list)
        })

    }, [language])

    // synchronized
    const setCategoryOrder = e => {
        updatePages({
            position: e.target.value
        })
    }

    // listeners
    const onChangePosition = newTreedata => {

        // new position
        const newPosition = newTreedata.findIndex(node => node.id === pageId)     
        
        // update treedata
        setTreedata(newTreedata)

        // update position in pages
        updatePages({
            position: newPosition
        })

    }

    return (
        <PageEditorSidebarBlock title="Ordre d'affichage">
            

            <input onChange={setCategoryOrder} value={position} className="px-1 w-20 bg-gray-200" type="number"/> 

            <div style={{height: 300}} className="">
                {/* Tree */}
                <SortableTree
                    onChange={onChangePosition}
                    treeData={treedata}
                    rowHeight={40}
                    maxDepth={1}
                    generateNodeProps={({node}) => {

                        const isCurrentPage = node.id === pageId

                        return ({
                            className: `text-sm font-medium ${isCurrentPage ? "border-2 border-green-500 " : ""}`
                        })

                    }}
                />
            </div>

        </PageEditorSidebarBlock>
    )
}