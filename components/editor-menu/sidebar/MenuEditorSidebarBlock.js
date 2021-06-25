
// libs
import { useState } from "react"

// components
import IconArrowUp from "../../icons/IconArrowUp"
import IconArrowDown from "../../icons/IconArrowDown"

export default function MenuEditorSidebarBlock({title, children}){

    // states
    const [opened, setOpened] = useState(true)


    return(
        <div className="border">

            {/* Header */}
            <div className="bg-gray-100 flex items-center px-3 py-2">

                {/* Title */}
                <p className="font-medium pb-0 mr-auto">{title}</p>

                {/* Trigger */}
                <button onClick={() => setOpened(!opened)} className="">
                    {opened ? <IconArrowUp/> : <IconArrowDown/>}
                </button>
            </div>

            {/* Body */}
            <div style={{height: opened ? "" : 0}} className={`px-3 overflow-hidden ${opened ? "py-5" : ""}`}>
                {children}
            </div>
        </div>
    )

}