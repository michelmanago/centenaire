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

// styles
const imageItemContainerStyles = {
    paddingTop: "100%"
}

export default function ModalMediaList({list, edited, setEdited, deleteMediaFromList, updateMediaFromList, originalPageId, accepts}){

    // states
    const [filterByPage, setFilterByPage] = useState(!!originalPageId)

    // methods
    const onSelectMedia = (media) => e => {

        // close current
        if(edited && edited.id === media.id){
            setEdited(null)
        } 
        
        // switch
        else {
            setEdited(media)
        }
    }

    // helpers
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
    const filteredList = (originalPageId && filterByPage) ? filteredByType.filter(l => l.page_id === originalPageId || l.justUploaded) : filteredByType

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
                        filteredList.map(image => {

                            const isSelected = edited && edited.id === image.id
                            const type = image.type

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
                                        {renderMediaPreview(image)}
                                    </div>
                                </button>
                            )

                        })
                    }
                </div>
            </div>

            {/* Sidebar */}
            <div className="w-1/3 bg-gray-100 overflow-auto">
                {edited && <ModalMediaListEdit key={edited.id} updateMediaFromList={updateMediaFromList} deleteMediaFromList={deleteMediaFromList} media={edited}/>}
            </div>
        </div>
    )

}