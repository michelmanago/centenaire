// libs
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import {useRouter} from 'next/router';


// utils
import { getMediaLink } from "../../utils/utils-serveur-image"
import fetchDeleteMedia from '../../utils/fetch/fetchDeleteMedia';
import fetchUpdateMedia from '../../utils/fetch/fetchUpdateMedia';
import { getFilenameFromPath, legendeAsArray, MEDIA_TYPES } from '../../utils/utils-media';
import IconClose from "../icons/IconClose";


// styles
const contentStyles = {
    width: "85%",
    height: "92%",
    overflow: "auto",
    borderRadius: ".2em",
    background: "#fff",
    boxShadow: "0 0 2px rgba(0, 0, 0, .2)"
}


export default function ListMediaEdit({media, onClose, updateList}){


    // hooks
    const {locales} = useRouter()
    const defaultLegendes = locales.map(locale => ({locale, value: ""}))

    // states
    const [modified, setModified] = useState(false)
    const [credit, setCredit] = useState(media ? media.credit : "")
    const [legendes, setLegendes] = useState(
        media ? (media.legende ? legendeAsArray(media.legende) : defaultLegendes) : defaultLegendes
    )


    // helpers
    const renderMediaPreview = () => {

        const media_link = getMediaLink(media.public_path)
        
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
    
    const onChangeCredit = event => {
        setCredit(event.target.value)

    }

    const onUpdateMedia = async () => {

        const form = {
            credit,
            legende: legendes,
        }

        try {

            // request update
            const newMedia = await fetchUpdateMedia(media.id, form)

            // update list
            updateList(list => {

                return list.map(mediaItem => {

                    if(mediaItem.id === media.id){
                        return newMedia
                    } else {
                        return mediaItem
                    }

                })

            })

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
                
                // remove from list
                updateList(list => {
                    return list.filter(mediaItem => mediaItem.id !== media.id)
                })

                // close
                onClose()

            } else {
                alert("Could not delete this media.")
            }

        }

    }

    // others
    const filename = media && getFilenameFromPath(media)

    useEffect(() => {

        return () => {
            onClose()
        }

    }, [])

    return (
        <Popup
            lockScroll={true}
            open={!!media}
            contentStyle={contentStyles}
            onClose={onClose}
            modal
        >
            {
                media && (
                    <div className="py-10 px-6">

                        
                        {/* Close */}
                        <button onClick={onClose} className="absolute text-gray-700 hover:text-gray-800 right-2 top-2">
                            <IconClose/>
                        </button>

                        {/* Type */}
                        <p>
                            <span>Ficher de type : </span>
                            <span className="inline-block mb-5 bg-purple-200 px-4 py-1 text-sm text-purple-800 rounded border-2 border-purple-300">{media.type}</span>
                        </p>

                        {/* Preview */}
                        <div className="w-2/3">
                            {
                                renderMediaPreview()
                            }
                        </div>

                        {/* Filename */}
                        <p className="text-sm mt-3 text-gray-600">Nom du fichier : <em>{filename}</em></p>

                        {/* Remove */}
                        <button onClick={onRemoveMedia} className="text-red-400 underline">Supprimer définitivement</button>

                        {/* Association */}


                        {/* Form */}
                        <div className="mt-4">

                            {/* Crédit */}
                            <InputText
                                label="Crédit :"
                                value={credit}
                                onChange={onChangeCredit}
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
                            <div className="relative border inline-block">
                                
                                {/* Button */}
                                <button type="button" onClick={onUpdateMedia} className="bg-green-500 hover:bg-green-600 px-3 py-1 text-white rounded">Sauvegarder le média</button>
                                
                                {/* Animation */}
                                {
                                    // hasModified && (
                                    //     <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                                    //         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    //         <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                    //     </span>
                                    // )
                                }
                            </div>
                            
                            {/* Feedback */}
                            {modified &&  <span className="ml-2 text-sm text-green-500">Modifié ✓</span>}
                        </div>

                    </div>
                )
            }
        </Popup>
    )

}

const InputText = ({placeholder, value, label, onChange, id}) => (
    <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor={id}>{label}</label>
        <input className="block w-full px-1 py-1 border rounded " type="text"id={id} placeholder={placeholder} onChange={onChange} value={value}/>
    </div>
)