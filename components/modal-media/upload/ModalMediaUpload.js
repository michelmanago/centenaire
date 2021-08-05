// libs

import { useEffect, useRef, useState } from "react"

// utils
import fetchCreateMedia from "../../../utils/fetch/fetchCreateMedia";
import { getValidFileTypes, isValidFileType } from "../../../utils/utils-media";
import attributePageToMedia from "../../../utils/fetch/attributePageToMedia"

export default function ModalMediaUpload({active, onMediaUploaded, accepts, originalPageId}){

    if(!active) return ""

    // router

    // ref
    const inputRef = useRef()

    // states
    const [loading, setLoading] = useState(false)
    const [media, setMedia] = useState(null)

    // utils
    const resetInput = () => {
        if(inputRef && inputRef.current){
            inputRef.current.value = ""
        }
    }

    const uploadFile = async file => {

        try {
            
            const media = await fetchCreateMedia(file)
                
            if(media){
                const mediaAssociated = await attributePageToMedia(originalPageId, media.id)    
                setMedia(mediaAssociated)
            } else {
                alert("not ok")
                resetInput()
            }

        } catch (error) {
            alert("not ok")
            resetInput()

            console.log(error)
        }

    }
    
    // methods
    const onFileChange = async event => {

        const input = event.target

        if (input.files && input.files[0]) {

            const file = input.files[0]

            if(isValidFileType(accepts, file.type)){

                setLoading(true)
                await uploadFile(file)
                setLoading(false)

            } else {
                alert("Le format n'est pas accepté.")
                resetInput()
            }
        }

    }

    // lifecycle
    useEffect(() => {

        if(media){
            onMediaUploaded(media)
        }

    }, [media])

    // others
    const acceptableFilesAttribute = getValidFileTypes(accepts).join(", ")

    // acceptable files string
    let acceptableFiles = acceptableFilesAttribute
    acceptableFiles = acceptableFiles.replace(/image\//g, ".") // images
    acceptableFiles = acceptableFiles.replace(/video\//g, ".") // video
    acceptableFiles = acceptableFiles.replace(/audio\//g, ".") // audio
    acceptableFiles = acceptableFiles.replace(/(?:file|application|text)\//g, ".") // document


    return (
        <div className="flex flex-col justify-center items-center h-full">
            
            {
                loading ? (
                    <>
                        <div className="flex flex-col items-center justify-center mt-6">
                            <p className="mb-4 text-center">Chargement du fichier sur le serveur</p>
                            <div className="">
                                <svg className="w-10 h-10 mr-3 -ml-1 text-gray-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-2xl font-medium">Déposez vos fichiers pour les téléversez</p>
                        <p>ou</p>

                        {/* Input file */}
                        <div className="border bg-gray-100 hover:bg-gray-200 relative w-1/3 cursor-pointer">

                            {/* Real */}
                            <input 
                                ref={inputRef} 
                                accepts={acceptableFilesAttribute} 
                                onChange={onFileChange} 
                                className="cursor-pointer absolute w-full h-full left-0 top-0 opacity-0" 
                                type="file" 
                            />

                            {/* Fake */}
                            <div className="pointer-events-none relative py-3 rounded text-center border border-blue-600 text-blue-600">Séléctionner des fichiers</div>
                        </div>

                        {/* Acceptable files */}
                        <p className="text-sm mt-3 max-w-md text-center">Formats acceptés : {acceptableFiles}</p>
                    </>
                )
            }
        </div>
    )

}
