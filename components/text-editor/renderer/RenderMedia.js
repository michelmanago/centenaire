// hooks
import Popup from "reactjs-popup";
import { Editor } from "slate";
import { useFocused, useSelected, useSlate } from "slate-react";
import { toggleBlockEffect } from "../EditorUtils";
import { AlignCenter, AlignLeft, AlignRight } from "../icon";

// utisl
import CLASS_EFFECT from "../helpers/classEffects";

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

export default function RenderMedia({attributes, element, children, newAttributes, type = "image", showInfo = true}){

    // parameters
    const selected = useSelected()
    const focused = useFocused()

    // others
    const selectedByUser = selected && focused
    console.log(type, selected, focused)
    
    // data
    const {credit, legende} = element

    return (
        <div {...attributes} className={`relative cursor-pointer ${selectedByUser ? selectedStyles : ""} ${newAttributes.className ? newAttributes.className : ""}`}>
            <div className="bg-gray-100" contentEditable={false}>

                {
                    selectedByUser && (
                        <ImageAlignToolbar/>
                    )
                }
                
                {/* Image */}
                {
                    type === "image" ? (
                        <img
                            src={element.url}
                            alt={element.url}
                            className={`block w-full`}
                        />
                    ) : (type === "video" ? (
                        <video
                            muted
                            src={element.url}
                            alt={element.url}
                            className={` block w-full`}
                        ></video>
                    ) : "")
                }

                {/* Info */}
                {
                    (showInfo && (legende || credit)) && (
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
        <div className="absolute z-10 rounded-sm left-4 top-4 bg-gray-200 px-3 py-1 flex">
            
            {/* Float left */}
            <ImageAlignToolbarButton effect={CLASS_EFFECT.imgFloatLeft.effect} onClick={changeAlign}>
                <AlignLeft/>                
            </ImageAlignToolbarButton>

            {/* Float center */}
            <ImageAlignToolbarButton effect={CLASS_EFFECT.imgFloatCenter.effect} onClick={changeAlign}>
                <AlignCenter/>                
            </ImageAlignToolbarButton>

            {/* Float right */}
            <ImageAlignToolbarButton effect={CLASS_EFFECT.imgFloatRight.effect} onClick={changeAlign}>
                <AlignRight/>
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
            className={`hover:bg-gray-300 w-8 h-8 rounded-sm mx-1 flex justify-center items-center ${isActive ? activeStyles : ""}`}
        >
            {children}
        </button>
    )

}