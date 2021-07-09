
// libs
import {useRouter} from 'next/router';
import { useState } from "react"


// utils
import { getMediaLink } from "../../../utils/utils-serveur-image"
import fetchDeleteMedia from '../../../utils/fetch/fetchDeleteMedia';
import fetchUpdateMedia from '../../../utils/fetch/fetchUpdateMedia';
import { legendeAsArray, MEDIA_TYPES } from '../../../utils/utils-media';

export default function ModalMediaListEdit({media, deleteMediaFromList, updateMediaFromList}){

    // utils

    // hooks
    const {locales} = useRouter()

    // states
    const [modified, setModified] = useState(false)
    const [credit, setCredit] = useState(media.credit || "")
    const [legendes, setLegendes] = useState(
        media.legende ? legendeAsArray(media.legende) : locales.map(locale => ({locale, value: ""})))


    // helpers
    const renderMediaPreview = () => {

        const media_link = getMediaLink(media.public_path)
        
        console.log(media.type)
        switch(media.type){
            case MEDIA_TYPES.IMAGE:
                return (
                   <div className="w-1/2 rounded border-2 border-gray-400">
                        <img src={media_link} alt="" />
                   </div>
                )
            break;
            case MEDIA_TYPES.VIDEO:
                return (
                    <div className="w-3/4 rounded border-2 border-gray-400">
                        <video controls src={media_link} muted loop></video>
                    </div>
                )
            break;
            case MEDIA_TYPES.AUDIO:
                return (
                    <div className="rounded border-2 border-gray-400">
                        <audio className="w-full" src={media_link} controls loop></audio>
                    </div>
                )
            break;
            case MEDIA_TYPES.DOCUMENT:
            default:
                    return (
                    <div className="">
                        <a target="_blank" className="underline text-blue-500" href={media_link}>Voir le fichier</a>
                    </div>
                )
            break;
        
        }

    }

    // setters
    const setOneLegende = (value, index) => {

        const nextLegendes = legendes.map((legende, legendeIndex) => {

            if(legendeIndex === index){
                return {
                    ...legende,
                    value,
                }
            } else {
                return legende
            }

        })

        setLegendes(nextLegendes)
    }

    // methods
    const OnUpdateMedia = async () => {

        const form = {
            credit,
            legende: legendes,
        }

        try {

            // request update
            const newMedia = await fetchUpdateMedia(media.id, form)

            // update in list 
            updateMediaFromList(newMedia)

            // show feedback
            setModified(true)
            setTimeout(() => setModified(false), 1500)

        } catch (error) {
            console.log(error)
        }

    }

    const onRemoveMedia = async () => {

        // Prevent miss click
        if(confirm("Êtes vous sûr de vouloir supprimer définitivement l'image ?")){

            // fetch DELETE
            const deleted = await fetchDeleteMedia(media.id)

            if(deleted){
                deleteMediaFromList(media.id)
            } else {
                alert("Could not delete this media.")
            }

        }

    }

    // others
    const filename = media.public_path ? (media.public_path.split("/")).pop() : ""

    return (
        <div>
            {
                media && (
                    <>
                        <div className="py-4 px-5">

                            {/* Type */}
                            <p>
                                <span>Ficher de type : </span>
                                <span className="inline-block mb-5 bg-purple-200 px-4 py-1 text-sm text-purple-800 rounded border-2 border-purple-300">{media.type}</span>
                            </p>

                            {/* Preview */}
                            <div className="">
                                {
                                    renderMediaPreview()
                                }
                            </div>

                            {/* Filename */}
                            <p className="text-sm mt-3 text-gray-600">{filename}</p>

                            {/* Remove */}
                            <button onClick={onRemoveMedia} className="text-red-400 underline">Supprimer définitivement</button>

                            {/* Form */}
                            <div className="mt-4">

                                {/* Crédit */}
                                <InputText
                                    label="Crédit :"
                                    value={credit}
                                    onChange={e => setCredit(e.target.value)}
                                />

                                {/* Legendes */}
                                {
                                    legendes.map(({locale}, index) => (
                                        <InputText
                                            key={locale}
                                            label={`Légende ${locale} :`}
                                            value={legendes[index].value}
                                            onChange={e => setOneLegende(e.target.value, index)}
                                        />
                                    ))
                                }

                                {/* Submit */}
                                <button type="button" onClick={OnUpdateMedia} className="bg-green-500 hover:bg-green-600 px-3 py-1 text-white rounded">Modifier l'image</button>
                                
                                {/* Feedback */}
                                {modified &&  <span className="ml-2 text-sm text-green-500">Modifié ✓</span>}
                            </div>

                        </div>
                    </>
                )
            }
        </div>
    )

}

const InputText = ({placeholder, value, label, onChange, id}) => (
    <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor={id}>{label}</label>
        <input className="block w-full px-1 py-1 border rounded " type="text"id={id} placeholder={placeholder} onChange={onChange} value={value}/>
    </div>
)