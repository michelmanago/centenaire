import {useEffect, useRef} from 'react';
import {useState} from 'react';
import Popup from 'reactjs-popup';
import IconClose from '../icons/IconClose';

function getTimerEnd(url) {
    var value = '';
    if (url.includes('#')) {
        const [urlMedia, timer] = url.split('#');
        const [start, end] = timer?.split(',');
        value = end;
    }

    return value;
}

export default function VideoModal({url}) {
    const [open, setOpen] = useState(false);
    //const [timeEnd ,setTimeEnd] = useState(null);
    const videoRef = useRef();

    const end = getTimerEnd(url);

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
                        onPause={e => {
                            console.log('video pause');
                            console.log('event', e);
                            if (end && e.currentTarget.currentTime >= end) {
                                setTimeout(() => setOpen(false), 1000);
                            }
                        }}
                        autoPlay
                    ></video>
                </div>
            </Popup>
        </div>
    );
}
