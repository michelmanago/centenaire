// libs
import { useEffect, useState } from "react"
import { getPagePermalien } from "../../../utils/utils"

export default function MenuEditorPageList({currentLocale, addPageLinks}){

    const [pages, setPages] = useState([])

    // lifecylce
    useEffect(() => {

        const url = new URL(window.location.origin + "/api/page/all")
        url.searchParams.append("locale", currentLocale)

        fetch(url.toString())
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(body => (
            setPages(body.map(page => ({...page, selected: false})))
        ))
        .catch(err => {
            console.log("err", err)
        })

    }, [currentLocale])


    // listeners
    const onAddPage = page => event => {

        const isAdding = event.target.checked

        setPages(pages.map(p => {
            if(p.id === page.id){
                return {...p, selected: isAdding}
            } else {
                return p
            }
        }))

    }

    const onSubmitPages = () => {

        const selectedPages = pages.filter(page => page.selected).map(page => ({
            label: page.pageName,
            href: page.pageSlug
        }))
        
        // call parent props
        addPageLinks(selectedPages)

        // reset page list
        setPages(pages.map(page => ({...page, selected: false})))
    }

    return (
        <div className="">

            {/* List */}
            <div className="border rounded px-5 py-3">
                {
                    pages.map(page => {

                        const permalien = getPagePermalien(page)

                        return (
                            <div key={"link" + page.id} className="flex items-center">
    
                                {/* Checkbox */}
                                <input checked={page.selected} onChange={onAddPage(page)} className="mr-5" type="checkbox" />
    
                                {/* Label */}
                                <a className="inline-block text-blue-400 underline min-w-max" target="_blank" href={permalien} >{page.pageName}</a>
    
                                {/* Preview link */}
                                <span className="text-xs ml-5 truncate">{permalien}</span>
    
                            </div>
                        )
                    })
                }
            </div>

            {/* Add button */}
            <button
                type="button"
                onClick={onSubmitPages}
                className="h-10 bg-green-400 hover:bg-green-500 px-3 py-1 rounded text-white font-medium text-md mr-3 mt-4"
            >
               Ajouter au menu 
            </button>
        </div>
    )

}