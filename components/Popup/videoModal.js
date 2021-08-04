import {useEffect, useRef} from 'react';
import {useState} from 'react';
import Popup from 'reactjs-popup';
import IconClose from '../icons/IconClose';

export default function VideoModal({url}) {
    const [open, setOpen] = useState(false);
    const videoRef = useRef();
    return (
        <div>
            <div
                onClick={e => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                <video src={url}></video>
            </div>
            <Popup
                lockScroll={true}
                open={open}
                onClose={setOpen}
                className={'video-modal'}
                closeOnEscape={false} // because this event can not be prevented
                closeOnDocumentClick={false} // because this event can not be prevented
            >
                <div className="p-1 bg-white border rounded">
                    {/* Close */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-0 right-0 text-gray-700 hover:text-gray-800"
                    >
                        <IconClose />
                    </button>
                    <video
                        ref={videoRef}
                        className="mt-6"
                        controls
                        src={url}
                        onPause={() => {
                            console.log('video pause');
                            setOpen(false);
                        }}
                        autoPlay
                    ></video>
                </div>
            </Popup>
        </div>
    );
}
