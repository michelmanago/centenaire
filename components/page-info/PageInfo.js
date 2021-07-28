// libs
import Popup from "reactjs-popup"
import {useRouter} from 'next/router';

// icons
import IconInfo from "../icons/IconInfo"
import { legendeAsArray } from "../../utils/utils-media";


const wrapperStyles = {
    width: 400
}

export default function PageInfo({media, author}){

    // locales
    const {locale} = useRouter()

    return (

        <Popup
            trigger={TriggerDOM}
            on={["hover", "focus"]}
            // on={["click"]}
            position={["right top"]}
        >
            <div style={wrapperStyles} className="bg-gray-100 px-5 py-5 shadow-md border rounded">



                {/* Auteur */}
                {author && (
                    <div>
                        <p className="underline">Auteur</p>
                        <p>{author}</p>
                    </div>
                )}


                {/* Credits */}
                <p className="underline">Crédits</p>
                <ol className="pl-5 m-0">
                    {media.map(mediaItem => {

                        const jsonLegende = mediaItem.legende
                        const legendes = legendeAsArray(jsonLegende)
                        const currentLegende = legendes.find(l => l.locale === locale)

                        if(currentLegende && currentLegende.value){
                            return (
                                <li className="mb-2 text-sm">
                                    {currentLegende.value}
                                </li>
                            )
                        }

                    })}
                </ol>
            </div>
        </Popup>
    )

}

const TriggerDOM = (
    <div className="border mb-3 px-4 py-1 bg-gray-100 border-gray-300 hover:bg-gray-200 rounded inline-flex items-center">

        {/* Icon */}
        <IconInfo/>

        {/* Text */}
        <p className="pb-0 ml-3 text-md">Informations de la page</p>
    </div>
)