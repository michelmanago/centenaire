// libs
import { useEffect, useState } from "react"

// styles
import styles from "../../styles/pages/list-media.module.css"
const mediaSelectedStyles = "ring-4 ring-green-400"

// components
import ListMediaPagination from "./list-media-pagination"
import ListMediaEdit from "./list-media-edit"
import ListMediaFilters from "./list-media-filters"

// icons
import { getFilenameFromPath } from "../../utils/utils-media"
import MediaPreview from "../media-preview/media-preview"


export default function ListMedia({media}){

    // States
    const [selected, setSelected] = useState(null)
    const [list, setList] = useState(media.array)

    // Methods
    const onCloseEditModal = () => {
        setSelected(null)
    }

    const updateList = fn => setList(fn(list))

    // Listeners
    const selectMedia = item => {

        if(selected && selected.id === item.id){
            setSelected(null)
        } else {
            setSelected(item)
        }

    }
    
    // refresh list on navigation
    useEffect(() => {
        setList(media.array)
    }, [media])


    // others
    const emptyList = !list.length

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
                    !emptyList ? list.map(mediaItem => {

                        const isSelected = selected && selected.id === mediaItem.id
                        const filename = getFilenameFromPath(mediaItem)

                        return (
                            <button 
                                onClick={() => selectMedia(mediaItem)}
                                key={mediaItem.id} 
                                className={`relative ${styles.listItem}`}>

                                <div className={`absolute border w-full h-full p-2 ${isSelected ? mediaSelectedStyles : ""}`}>
                                    <div className="h-full relative">

                                        {/* Preview */}
                                        {
                                            <MediaPreview type={mediaItem.type} public_path={mediaItem.public_path}/>
                                        }

                                        {/* Title */}
                                        <div className="truncate px-3 text-sm py-1 opacity-70 z-10 absolute bottom-0 w-full bg-gray-500 text-white">
                                                {filename}
                                        </div>
                                    </div>
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
            <ListMediaEdit 
                media={selected} 
                onClose={onCloseEditModal}
                updateList={updateList}
            />
            
        </main>
    )

}