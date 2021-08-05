import { useState, useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import IconClose from "../icons/IconClose";




export default function ImageModal({ url, className }) {
    const [open, setOpen] = useState(false);
    console.log(className);
    return (
        <div>
            <div onClick={e => {
                e.preventDefault();
                setOpen(true);
            }}
            >
                <img src={url} className={className} />
            </div>

            <Popup
                open={open}
                onClose={setOpen}
                className={'image-modal'}
                closeOnEscape={false} // beacause this can not be prevented
                closeOnDocumentClick={false} // beacause this event can not be prevented4
            >
                <div className="mt-6 p-1 flex flex-wrap justify-center ">
                    {/* Close */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-0 right-0 text-gray-700 hover:text-gray-800 flex flex-wrap ">
                        <IconClose />
                    </button>
                    <img
                        className=""
                        src={url}
                    />
                </div>
            </Popup>
        </div>
    )
}