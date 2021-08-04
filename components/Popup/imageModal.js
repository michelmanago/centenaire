import { useState, useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import IconClose from "../icons/IconClose";


export default function ImageModal({ url, className }) {
    const [open, setOpen] = useState(false);
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
                closeOnDocumentClick={false} // beacause this event can not be prevented 
            >
                <div className="p-1  bg-white border rounded ">
                    {/* Close */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-0 right-0 text-gray-700 hover:text-gray-800 ">
                        <IconClose />
                    </button>
                    <img
                        className="mt-6  "
                        src={url}

                    />
                </div>
            </Popup>
        </div>
    )
}