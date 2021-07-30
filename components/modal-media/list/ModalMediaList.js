// libs
import { useEffect, useState } from "react"
import { getMediaLink } from "../../../utils/utils-serveur-image"

// components
import ModalMediaListEdit from "./ModalMediaListEdit"

// icons
import IconVideo from "../../icons/IconVideo"
import IconHeadphone from "../../icons/IconHeadphone"
import IconDocument from "../../icons/IconDocument"
import IconUnknown from "../../icons/IconUnknown"
import IconLinked from "../../icons/IconLinked"

// utils
import { getFilenameFromPath } from "../../../utils/utils-media"

// styles
const imageItemContainerStyles = {
    paddingTop: "100%"
}

export default function ModalMediaList({list, fetching, edited, setEdited, deleteMediaFromList, updateMediaFromList, originalPageId, accepts, hasModified, setHasModified}){

    // states
    const [filterByPage, setFilterByPage] = useState(!!originalPageId)

    const onSelectMedia = (media) => e => {

        if(!hasModified || (hasModified && confirm("Êtes vous sûr de vouloir quitter l'édition du média sans sauvegarder vos modifications ?"))){

            // close current
            if(edited && edited.id === media.id){
                setEdited(null)
            } 
            
            // switch
            else {
                setEdited(media)
            }

            // reset after switched
            setHasModified(false)
            
        }
    }

    // helpers

    const getAssociatedMediaOnly = list => {

        // we can filter by page
        if(originalPageId && filterByPage){
            return list.filter(mediaItem => {

                // this media is associated to a page with id = originalPageId                
                return mediaItem.pages && mediaItem.pages.find(page => page.id === originalPageId)

            })
        }

        else {
            return list
        }
    }

    const renderMediaPreview = media => {
        switch(media.type){
            case "video":
                return (
                    <div className="border rounded absolute w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                            <IconVideo className={"w-24 text-gray-100"}/>
                    </div>
                )
            break;
            case "image":
                const media_src = getMediaLink(media.public_path)
                return (
                    <img className="block absolute left-0 top-0 w-full h-full object-cover" src={media_src} />
                )
            break;
            case "document":
                return (
                    <div className="border rounded absolute w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                        <IconDocument className={"w-24 text-gray-100"}/>
                    </div>
                )
            break;
            case "audio":
                return (
                    <div className="border rounded absolute w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                        <IconHeadphone className={"w-24 text-gray-100"}/>
                    </div>
                )
            break;
            default:
                return (
                    <div className="border rounded absolute w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                        <IconUnknown className={"w-24 text-gray-100"}/>
                    </div>
                )
        }
    }

    // others
    // only show acceptable files and files with no type
    const filteredByType = list.filter(l => accepts.includes(l.type) || !l.type)
    // filter by page
    const filteredList = getAssociatedMediaOnly(filteredByType)

    return (
        <div className="h-full flex">
            
            
            {/* List */}
            <div className="w-2/3 overflow-auto h-full pr-2">

                {/* Filters */}
                {/* Not allowed to filter when creating the page because there is no media attributed to this page currently */}
                {
                    originalPageId && (
                        <div className="border-b px-2 py-2">
                            <label className="select-none" htmlFor="filterByPage">Uniquement les fichiers de cette page : </label>
                            <input type="checkbox" checked={filterByPage} onChange={e => setFilterByPage(e.target.checked)} id="filterByPage" />
                        </div>
                    )
                }

                {/* List */}
                <div className="">
                    {
                        fetching ? (

                            // Loading
                            <div className="flex flex-col items-center justify-center mt-6">
                                <p className="mb-4 text-center">Chargement des images</p>
                                <div className="">
                                    <svg className="w-10 h-10 mr-3 -ml-1 text-gray-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            </div>

                        ) : filteredList.map(image => {

                            const isSelected = edited && edited.id === image.id
                            const type = image.type
                            const filename = getFilenameFromPath(image)
                            const linkedToThisPage = image.pages && image.pages.some(page => page.id === originalPageId)

                            return (
                                <button 
                                    type="button"
                                    key={image.id}
                                    onClick={onSelectMedia(image)} 
                                    className={`w-1/2 md:w-1/3 lg:w-1/4 p-2 rounded`}
                                >
                                    <div
                                    style={imageItemContainerStyles} 
                                    className={`relative rounded border-4 border-transparent ${isSelected ? "border-green-400" : ""}`}
                                    >   
                                        {
                                            linkedToThisPage && (
                                                <div className="text-gray-100 absolute left-0 top-0 border-gray-900 opacity-50 px-1 bg-yellow-600 z-10">
                                                    <IconLinked/>
                                                </div>
                                            )
                                        }

                                        {/* Image preview */}
                                        {renderMediaPreview(image)}

                                        {/* Title */}
                                        <div className="truncate px-3 text-sm py-1 opacity-70 z-10 absolute bottom-0 left-0 w-full bg-gray-500 text-white">
                                            {filename}
                                        </div>
                                    </div>
                                </button>
                            )

                        })
                    }
                </div>
            </div>

            {/* Sidebar */}
            <div className="w-1/3 bg-gray-100 overflow-auto">
                {edited && <ModalMediaListEdit 
                    key={edited.id} 
                    originalPageId={originalPageId} 
                    updateMediaFromList={updateMediaFromList} 
                    deleteMediaFromList={deleteMediaFromList} 
                    media={edited} 
                    hasModified={hasModified} 
                    setHasModified={setHasModified} 
                    setEdited={setEdited}
                />}
            </div>
        </div>
    )

}