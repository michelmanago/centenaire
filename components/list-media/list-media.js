// libs

// utils
import { getMediaLink } from "../../utils/utils-serveur-image"

// styles
import styles from "../../styles/pages/list-media.module.css"

// components
import ListMediaPagination from "./list-media-pagination"

// icons
import IconVideo from "../icons/IconVideo"
import IconHeadphone from "../icons/IconHeadphone"
import IconDocument from "../icons/IconDocument"
import IconUnknown from "../icons/IconUnknown"
import IconLinked from "../icons/IconLinked"
import ListMediaFilters from "./list-media-filters"


export default function ListMedia({media}){


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

                        return (
                            <div key={mediaItem.id} className={`relative ${styles.listItem}`}>
                                <div className="absolute w-full h-full p-2">
                                    {
                                        renderMediaPreview(mediaItem)
                                    }
                                </div>
                            </div>
                        )
                    }) : (
                        <div>
                            <p className="text-center font-semibold">Il n'y a aucun média</p>
                        </div>
                    )
                }
            </div>
            
        </main>
    )

}