// libs

import { useRouter } from "next/router";
import { useState } from "react"
import fetchCreateMedia from "../../../utils/fetch/fetchCreateMedia";


function isValidImage(type) {
    switch (type) {
      case 'image/jpg':
      case 'image/jpeg':
      case 'image/png':
        return true;
    }
    return false;
}

export default function ModalMediaUpload({onMediaUploaded}){

    // router
    const {locales} = useRouter()

    // states
    const [loading, setLoading] = useState()
    
    // methods
    const onFileChange = async event => {

        const input = event.target

        if (input.files && input.files[0]) {

            const file = input.files[0]

            if(isValidImage(file.type)){

                const defaultLegende = locales.map(locale => ({
                    locale,
                    value: ""
                }))

                const media = await fetchCreateMedia(file, defaultLegende)
                
                if(media){
                    onMediaUploaded(media)
                } else {
                    alert("not ok")
                }

            } else {
                alert("Les formats acceptés sont: .png, .jpg et .jpeg")
                setError(true)
            }
        }

    }

    // others

    return (
        <div className="flex flex-col justify-center items-center h-full">

            <p className="text-2xl font-medium">Déposez vos fichiers pour les téléversez</p>
            <p>ou</p>

            {/* Input file */}
            <div className="border bg-gray-100 hover:bg-gray-200 relative w-1/3 cursor-pointer">

                {/* Real */}
                <input onChange={onFileChange} className="cursor-pointer absolute w-full h-full left-0 top-0 opacity-0" type="file" />

                {/* Fake */}
                <div className="pointer-events-none relative py-3 rounded text-center border border-blue-600 text-blue-600">Séléctionner des fichiers</div>
            </div>
        </div>
    )

}