
// libs
import {useRouter} from 'next/router';
import { useState } from "react"


// utils
import { getMediaLink } from "../../../utils/utils-serveur-image"
import fetchDeleteMedia from '../../../utils/fetch/fetchDeleteMedia';
import fetchUpdateMedia from '../../../utils/fetch/fetchUpdateMedia';
import { legendeAsArray } from '../../../utils/utils-media';

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

        const deleted = await fetchDeleteMedia(media.id)

        if(deleted){
            deleteMediaFromList(media.id)
        } else {
            alert("Could not delete this media.")
        }

    }

    // others
    const media_src = getMediaLink(media.public_path)
    const filename = media.public_path ? (media.public_path.split("/")).pop() : ""
    const type = media.type

    return (
        <div>
            {
                media && (
                    <>
                        <div className="py-3 px-2">
                            <p className="mb-3">Détails du fichier joint</p>

                            {/* Preview */}
                            {
                                type === "image" && (
                                    <div className="border-2 border-gray-400 w-1/2">
                                        <img src={media_src} alt="" />
                                    </div>
                                )
                            }

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