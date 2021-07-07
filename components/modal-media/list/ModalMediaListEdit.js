
// libs
import {useRouter} from 'next/router';
import { useState } from "react"
import fetchUpdateMedia from '../../../utils/fetch/fetchUpdateMedia';

// utils
import { getMediaLink } from "../../../utils/utils-serveur-image"

export default function ModalMediaListEdit({media}){

    // utils
    const retrieveLegende = () => {

        let legendeArray = ""

        try {
            legendeArray = JSON.parse(media.legende) 
        } catch (error) {
            console.warn("ModalMediaListEdit : legende invalide")
        }

        return Array.isArray(legendeArray) ? legendeArray : []
    }

    // hooks
    const {locales} = useRouter()

    // states
    const [credit, setCredit] = useState(media.credit || "")
    const [legendes, setLegendes] = useState(
        media.legende ? retrieveLegende() : locales.map(locale => ({locale, value: ""})))


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
    const onSubmitMedia = async () => {

        const form = {
            credit,
            legende: legendes,
        }

        try {
            const newMedia = await fetchUpdateMedia(media.id, form)
            console.log(newMedia)
        } catch (error) {
            console.log(error)
        }

    }

    // others
    const media_src = getMediaLink(media.public_path)
    const filename = media.public_path ? (media.public_path.split("/")).pop() : ""

    return (
        <div>
            {
                media && (
                    <>
                        <div className="py-3 px-2">
                            <p className="mb-3">Détails du fichier joint</p>

                            {/* Image */}
                            <div className="border-2 border-gray-400 w-1/2">
                                <img src={media_src} alt="" />
                            </div>

                            {/* Filename */}
                            <p className="text-sm mt-3 text-gray-600">{filename}</p>

                            {/* Remove */}
                            <button className="text-red-400 underline">Supprimer définitivement</button>

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
                                <button type="button" onClick={onSubmitMedia} className="bg-blue-600 hover-bg-blue-700 px-3 py-1 text-white rounded">Modifier l'image</button>
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