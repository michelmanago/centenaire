// libs
import { useEffect, useState } from "react"

// utils
import { onSubmitPreventForm } from "../../../utils/utils"


export default function MenuEditorPageList({setAvailablePages, availablePages, currentLocale, addPageLinks}){


    

    // listeners
    const onAddPage = page => event => {

        const isAdding = event.target.checked

        setAvailablePages(availablePages.map(p => {
            if(p.id === page.id){
                return {...p, selected: isAdding}
            } else {
                return p
            }
        }))

    }

    const onSubmitPages = () => {

        const selectedPages = availablePages.filter(page => page.selected)

        // call parent props
        addPageLinks(selectedPages)

        // reset page list
        setAvailablePages(availablePages.map(page => ({...page, selected: false})))
    }

    // other
    const pages = availablePages.filter(page => page.language === currentLocale)
    const isSubmittingDisabled = !pages.filter(p => p.selected).length

    return (
        <form onSubmit={onSubmitPreventForm} className="">

            {/* List */}
            <div className="border rounded px-5 py-3 overflow-scroll">
                {
                    // show only pages from current language
                    pages.map(page => {

                        const permalien = page.pageSlug

                        return (
                            <div key={"link" + page.id} className="flex items-center whitespace-nowrap">
    
                                {/* Checkbox */}
                                <input checked={page.selected} onChange={onAddPage(page)} className="mr-5" type="checkbox" />
    
                                {/* Label */}
                                <a className="inline-block text-blue-400 underline min-w-max" target="_blank" href={permalien} >{page.pageName}</a>
    
                                {/* Preview link */}
                                <span className="text-xs ml-5">{permalien}</span>
    
                            </div>
                        )
                    })
                }
            </div>

            {/* Add button */}
            <button
                disabled={isSubmittingDisabled}
                type="submit"
                onClick={(onSubmitPages)}
                className={`h-10 bg-green-400 px-3 py-1 rounded text-white font-medium text-md mr-3 mt-4 ${isSubmittingDisabled ? "opacity-50 cursor-" : "hover:bg-green-500"}`}
            >
               Ajouter au menu 
            </button>
        </form>
    )

}