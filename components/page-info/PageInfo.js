// libs
import Popup from "reactjs-popup"

// icons
import IconInfo from "../icons/IconInfo"


const wrapperStyles = {
    width: 400
}

export default function PageInfo({media, author}){

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