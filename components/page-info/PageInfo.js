// libs
import Popup from "reactjs-popup"

// icons
import IconInfo from "../icons/IconInfo"

// utils
import { useRouter } from 'next/router';


const wrapperStyles = {
    width: 400
}


export default function PageInfo({ media, author, created_at, last_modified, source }) {

    // router
    const { locale } = useRouter();

    // others
    const thereIsCredit = (media.length && media.some(m => m.credit))
    const creditsVideo = media.filter(m => m.type === "video")
    const creditsImage = media.filter(m => m.type === "image")

    return (

        <Popup
            trigger={TriggerDOM}
            on={["hover", "focus"]}
            position={["right top"]}
        >
            <div style={wrapperStyles} className="bg-gray-100 px-5 py-5 shadow-md border rounded">



                {/* Date créate page*/}
                {created_at && (
                    <div>
                        <p className="underline">Date de création</p>
                        <p className="text-sm">{created_at ? new Date(created_at).toLocaleString(locale) : ''}</p>
                    </div>
                )}

                {/* last date modified */}
                {last_modified && (
                    <div>
                        <p className="underline">Dernière modification</p>
                        <p className="text-sm">{last_modified ? new Date(last_modified).toLocaleString(locale) : ''}</p>
                    </div>
                )}

                {/* Source */}
                {source && (
                    <div>
                        <p className="underline">Source</p>
                        <p className="-mt-2">{source}</p>
                    </div>
                )}

                {/* Auteur */}
                {author && (
                    <div>
                        <p className="underline">Auteur</p>
                        <p>{author}</p>
                    </div>
                )}

                {/* Credits images */}
                {
                    (creditsImage && creditsImage.length) && <ListCredtit media={creditsImage} title={"Credits photo"}/> 
                }

                {/* Credits images */}
                {
                    (creditsVideo && creditsVideo.length) && <ListCredtit media={creditsVideo} title={"Crédits vidéo"}/> 
                }
            </div>
        </Popup>
    )

}

const ListCredtit = ({media, title}) => (
    <div className="mb-1">
        <p className="underline">{title}</p>
        <div className="max-h-44 overflow-auto">
            <ol className="pl-8 m-0">
                {media.map(mediaItem => {

                    if(mediaItem.credit){
                        return (
                            <li key={mediaItem.id} className="mb-2 text-sm">
                                {mediaItem.credit}
                            </li>
                        )
                    }

                })}
            </ol>
        </div>
    </div>
)

const TriggerDOM = (
    <div className="border mb-3 px-4 py-1 border-gray-300 hover:bg-gray-200 rounded inline-flex items-center">

        {/* Icon */}
        <IconInfo />

        {/* Text */}
        <p className="pb-0 ml-3 text-md">Informations de la page</p>
    </div>
)