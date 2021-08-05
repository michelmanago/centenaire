import { useState, useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import IconClose from "../icons/IconClose";




export default function ImageModal({url, className, legende}){
    const[open, setOpen] = useState(false);
    console.log(className);
    return (
        <div>
            <div onClick={e => {
                e.preventDefault();
                setOpen(true);
            }}
        >
                <img src={url} className={className} />
                <div>{legende}</div>
            </div>
            <div className="popup">
            <div className="h-auto my-6 overflow-hidden bg-white rounded-xl md:max-w-full mb-9">
 
        <Popup
            open={open}
            onClose={setOpen}
            className={'image-modal'}
            closeOnEscape={false} // beacause this can not be prevented
            closeOnDocumentClick={false} // beacause this event can not be prevented4
            
            >
                  <div className="flex flex-wrap justify-center p-1 mt-6 ">
                  
                      {/* Close */}
                      <button
                        onClick={() => setOpen(false)}
                        className="absolute top-0 right-0 flex flex-wrap text-gray-700 hover:text-gray-800 ">
                            <IconClose />
                        </button>
                        <img
                            className=""
                            src={url}
                            
                        />
                  </div>
            </Popup>
            </div>
            </div>
        </div>
    )
}