// hooks
import Popup from "reactjs-popup";
import { Editor } from "slate";
import { useFocused, useSelected, useSlate } from "slate-react";
import { toggleBlockEffect } from "../EditorUtils";

// helpers
const isFormatActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => n["effect"] === format,
      mode: 'all',
    })
    return !!match
}

// styles
const selectedStyles = "ring-4 ring-green-500 ring-opacity-50 rounded"

export default function RenderImage({attributes, element, children, newAttributes}){

    // parameters
    const selected = useSelected()
    const focused = useFocused()

    // others
    const selectedByUser = selected && focused
    
    // data
    const {credit, legende} = element

    return (
        <div {...attributes} className={`bg-gray-100 relative w-2/3 ${selectedByUser ? selectedStyles : ""} ${newAttributes.className ? newAttributes.className : ""}`}>
            <div contentEditable={false}>

                {
                    selectedByUser && (
                        <ImageAlignToolbar/>
                    )
                }
                
                {/* Image */}
                <img
                    src={element.url}
                    alt={element.url}
                    className={`block max-w-full`}
                />

                {/* Info */}
                {
                    (legende || credit) && (
                        <div className="mt-2 ">
                            {legende && <p className='font-bold text-center'>{legende}</p>}
                            {credit && <p className='italic text-center'>{credit}</p>}
                        </div>
                    )
                }
            </div>
            {children}
        </div>
    )

}

const overlayStyle = { background: "none" }

const ImageAlignToolbar = ({}) => {

    // hooks
    const editor = useSlate()

    // methods
    const changeAlign = effect => {
        toggleBlockEffect(editor, effect)
    }

    return (
        <div className="absolute rounded-sm left-4 top-4 bg-gray-200 px-3 py-1">
            
            {/* Float left */}
            <ImageAlignToolbarButton effect="img-float-left" onClick={changeAlign}>
                L
            </ImageAlignToolbarButton>
            
            {/* Float center */}
            <ImageAlignToolbarButton effect="img-center" onClick={changeAlign}>
                C
            </ImageAlignToolbarButton>

            {/* Float right */}
            <ImageAlignToolbarButton effect="img-float-right" onClick={changeAlign}>
                R
            </ImageAlignToolbarButton>
        </div>
    )

}

const activeStyles = "bg-gray-300"
const ImageAlignToolbarButton = ({children, onClick, effect}) => {

    // hooks
    const editor = useSlate()

    // others
    const isActive = isFormatActive(editor, effect)

    return (
        <button
            onMouseDown={event => {
                event.preventDefault()
                onClick(effect)
            }}
            className={`border hover:border-gray-700 w-8 h-8 rounded-sm mx-1 ${isActive ? activeStyles : ""}`}
        >
            {children}
        </button>
    )

}