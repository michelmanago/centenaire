// libs
import { useRouter } from "next/router";
import Popup from "reactjs-popup"

// styles
const submittingclassNames = "cursor-wait opacity-50"
const notAllowedClassNames = "cursor-not-allowed opacity-50"
const notDisabledClassNames = "hover:bg-blue-800"

export default function InputSubmitPage({onSubmitPage, isSubmitting, isEditing, notAllowedToSave}){

    // utils
    const disabled = isSubmitting || notAllowedToSave
    

    return (

        <Popup
            trigger={
                <button
                    type="button"
                    onClick={disabled ? undefined : onSubmitPage}
                    className={`mt-10 w-full px-3 py-3 font-semibold text-white bg-blue-700 rounded flex items-center justify-center ${isSubmitting ? submittingclassNames : ""} ${notAllowedToSave ? notAllowedClassNames : ""} ${disabled ? "" : notDisabledClassNames}`}
                >

                    {/* ANIMATION - LOADING */}
                    {isSubmitting && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}

                    {/* Label */}
                    {isEditing ? 'Mettre à jour' : 'Publier'}
                </button>
            }
            position="left top"
            on={notAllowedToSave ? ["hover", "focus"] : []}
        >
            <span className="text-sm">Vous devez au moins remplir le titre d'une traduction.</span>
        </Popup>
    )

}