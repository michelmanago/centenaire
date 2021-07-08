import { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import {useRouter} from 'next/router';

// utils
import {getMediaLink, getServerImageEndpoint, getServeurImageMedia} from "../../../utils/utils-serveur-image"

function isValidImage(type) {
    switch (type) {
      case 'image/jpg':
      case 'image/jpeg':
      case 'image/png':
        return true;
    }
    return false;
}


export default function PageEditorInputImage({onMediaUploaded, onRemoveMedia, mediaId}){
    


    // ref
    const refInputFile = useRef()

    // hooks
    const {locales} = useRouter()

    // utils
    const getDefaultLegendes = () => locales.map(locale => ({locale, value: ""}))

    // states
    const [src, setSrc] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    // Form
    const [legendes, setLegendes] = useState(getDefaultLegendes())
    const [credit, setCredit] = useState("")

    // when user submit a file we save it to state until he complete (legende, csredit) then we uplaod it to the server
    const [uploadingMedia, setUploadingMedia] = useState(false)


    // lifecycle
    useEffect(() => {

        // load image
        if(mediaId){

            setIsLoading(true)
            getServeurImageMedia(mediaId)
            .then(media => {
                if(media){
                    setSrc(getMediaLink(media.public_path))
                }
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
            })

        } else {
            setSrc(null)
        }

    }, [mediaId])

    // methods

    const setLegendesState = locale => e => {
        setLegendes(legendes.map(legende => {

            if(legende.locale === locale){
                return {
                    ...legende,
                    value: e.target.value
                }
            } else {
                return legende
            }

        }))
    }

    const closeModal = () => {

        // close
        setUploadingMedia(false)

        // reset form
        setLegendes(getDefaultLegendes())
        setCredit("")

        // reset input
        if(refInputFile && refInputFile.current){
            refInputFile.current.value = ""
        }

    }

    const validateUpload = async () => {

        // request PUT media
        await insertMedia()
        .then(media => {
            setError(false)
            onMediaUploaded(media)
        })
        .catch(err => {
            console.log("err", err)
        })

        // close
        closeModal()

    }

    const insertMedia = () => {

        const serverImage = getServerImageEndpoint()

        const file = uploadingMedia.file

        // form
        const formdata = new FormData()
        formdata.append("file", file, file.name)
        formdata.append("legende", JSON.stringify(legendes))
        formdata.append("credit", credit)

        return fetch(serverImage, {
            method: "POST",
            body: formdata
        })
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(err => {
            console.log(err)
            return err
        })
    }

    const onRemove = () => {

        onRemoveMedia()
        setError(false)

        if(refInputFile && refInputFile.current){
            refInputFile.current.value = ""
        }

    }

    const onFileChange = event => {

        const input = event.target

        if (input.files && input.files[0]) {

            const file = input.files[0]

            if(isValidImage(file.type)){

                const reader = new FileReader()
                reader.onload = () => {
                    setUploadingMedia({
                        src: reader.result,
                        file: file
                    })
                }
                reader.readAsDataURL(file)
            } else {
                alert("Les formats acceptés sont: .png, .jpg et .jpeg")
                setError(true)
            }
        }

    }
        
    return (
        <div className="">

            {/* Input media info */}
            <Popup
                open={!!uploadingMedia}
                modal
            >
                <div className="p-5 rounded">

                    {/* Legendes */}
                    {
                        legendes.map(legende => {

                            const key = legende.locale
                            const id = "legende" + key

                            return (
                                <div key={key}>
                                    <label className="font-medium mb-1 block" htmlFor={id}>Legende {legende.locale}: </label>
                                    <input maxLength="60" className="px-3 border rounded w-full mb-4 py-1" onChange={setLegendesState(legende.locale)} value={legende.value} type="text"id={id} />
                                </div>
                            )
                        })
                    }
                    

                    <label className="font-medium mb-1 block" htmlFor="credit">Crédit : </label>
                    <input className="px-3 border rounded w-full mb-4 py-1" onChange={e => setCredit(e.target.value)} value={credit} type="text" name="" id="credit" />

                    <img className="w-1/3 h-auto border-2 rounded" src={uploadingMedia.src} alt="" />

                    <button onClick={validateUpload} type="button" className="bg-blue-500 text-white px-3 py-2 rounded font-medium mt-4">Confirmer l'upload de l'image</button>
                    <button onClick={closeModal} className="ml-2 bg-gray-500 text-white px-3 py-2 rounded font-medium mt-4">Annuler</button>
                </div>
            </Popup>


            {/* Input container */}
            <div style={{minHeight: 200}} className={`flex flex-col`}>

                <div className={`flex-1 flex flex-col relative h-full hover:bg-gray-100 rounded-lg border border`}>
                        
                    {/* Loaded image */}
                    {src && <img className="block object-contain w-full rounded-lg" src={src} alt="" />}
                    
                    {/* Icon */}
                    {(!src && !isLoading) && (
                        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full h-full cursor-pointer pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-1/5 text-blue-600 fill-current  h-1/5" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm5 9h14l-3.5-4.5-2.5 3.01L11.5 9zM22 4h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 12H6V4h5.17l1.41 1.41.59.59H22v10z"/></svg>
                            <div className="mt-1 ">Glisser ou cliquer</div>
                        </div>
                    )}
                    
                    {/* Loading upload */}
                    {
                        isLoading && (
                            <div className="flex flex-col items-center justify-center flex-1">
                                <svg className="w-10 h-10 mr-3 -ml-1 text-gray-300 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="mt-2">Chargement de l'image</span>
                            </div>
                        )
                    }
                                        
                    {/* Input */}
                    <input 
                        ref={refInputFile}
                        id="inputMedia"
                        type="file" 
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={onFileChange} 
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </div>

            <small>Formats acceptés : .png, .jpg et .jpeg</small>


            {/* Actions */}
            {
                src && (
                    <div>

                        <hr className="my-3"/>

                        {/* Modifier */}
                        <label className="block mt-2 text-blue-500 underline cursor-pointer" htmlFor="inputMedia">Modifier l'image</label>

                        {/* Remove */}
                        <button onClick={onRemove} className="text-red-500 underline">Supprimer l'image</button>
                        
                    </div>
                )
            }            
        </div>
    )

}