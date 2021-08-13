// libs
import { useState } from "react"

// utils
import { getMediaLink } from "../../utils/utils-serveur-image"

// styles
import styles from "../../styles/pages/list-media.module.css"
const mediaSelectedStyles = "ring-4 ring-green-400"

// components
import ListMediaPagination from "./list-media-pagination"
import ListMediaEdit from "./list-media-edit"
import ListMediaFilters from "./list-media-filters"

// icons
import IconVideo from "../icons/IconVideo"
import IconHeadphone from "../icons/IconHeadphone"
import IconDocument from "../icons/IconDocument"
import IconUnknown from "../icons/IconUnknown"


export default function ListMedia({media}){


    // States
    const [selected, setSelected] = useState(null)

    // Methods
    const onCloseEditModal = () => {
        setSelected(null)
    }

    // Listeners
    const selectMedia = item => {

        if(selected && selected.id === item.id){
            setSelected(null)
        } else {
            setSelected(item)
        }

    }
    
    // helpers
    const renderMediaPreview = media => {
        switch(media.type){
            case "video":
                return (
                    <div className="border rounded w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                            <IconVideo className={"w-24 text-gray-100"}/>
                    </div>
                )
            break;
            case "image":
                const media_src = getMediaLink(media.public_path)
                return (
                    <img className="block left-0 top-0 w-full h-full object-cover" src={media_src} />
                )
            break;
            case "document":
                return (
                    <div className="border rounded w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                        <IconDocument className={"w-24 text-gray-100"}/>
                    </div>
                )
            break;
            case "audio":
                return (
                    <div className="border rounded w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                        <IconHeadphone className={"w-24 text-gray-100"}/>
                    </div>
                )
            break;
            default:
                return (
                    <div className="border rounded w-full h-full bg-gray-300 left-0 top-0 flex justify-center items-center">
                        <IconUnknown className={"w-24 text-gray-100"}/>
                    </div>
                )
        }
    }

    // others
    const emptyList = !media.array.length

    return (
        <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
            
            {/* Title */}
            <h1 className="text-4xl mb-5">Médiatèque</h1>

            {/* Filter */}
            <div className="bg-gray-100 py-3 px-2">
                <ListMediaFilters/>
            </div>

            {/* Pagination */}
            {
                !emptyList && (
                    <ListMediaPagination pagination={media.pagination} changePaginationPage={() => {}}/>
                )
            }

            {/* List */}
            <div className="mt-5">
                {
                    !emptyList ? media.array.map(mediaItem => {

                        const isSelected = selected && selected.id === mediaItem.id

                        return (
                            <button 
                                onClick={() => selectMedia(mediaItem)}
                                key={mediaItem.id} 
                                className={`relative ${styles.listItem}`}>

                                <div className={`absolute w-full h-full p-2 ${isSelected ? mediaSelectedStyles : ""}`}>
                                    {
                                        renderMediaPreview(mediaItem)
                                    }
                                </div>
                            </button>
                        )
                    }) : (
                        <div>
                            <p className="text-center font-semibold">Il n'y a aucun média</p>
                        </div>
                    )
                }
            </div>

            {/* Edit */}
            {/* {selected && <ListMediaEdit 
                media={selected} 
                onClose={onCloseEditModal}
            />} */}
            
        </main>
    )

}