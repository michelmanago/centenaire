// libs
import { useEffect, useState } from "react"
import { getMediaLink } from "../../../utils/utils-serveur-image"

// components
import ModalMediaListEdit from "./ModalMediaListEdit"

// styles
const imageItemContainerStyles = {
    paddingTop: "100%"
}

const imageItemStyles = {
    
}

export default function ModalMediaList({list, edited, setEdited}){

    // states

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

    // others

    return (
        <div className="h-full flex">
            
            {/* List */}
            <div className="w-2/3 overflow-auto h-full pr-2">
                {
                    list.map(image => {

                        const media_src = getMediaLink(image.public_path)
                        const isSelected = edited && edited.id === image.id

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
                                    <img style={imageItemStyles} className="block absolute left-0 top-0 w-full h-full object-cover" src={media_src} />
                                </div>
                            </button>
                        )

                    })
                }
            </div>

            {/* Sidebar */}
            <div className="w-1/3 bg-gray-100 overflow-auto">
                {edited && <ModalMediaListEdit key={edited.id} media={edited}/>}
            </div>
        </div>
    )

}