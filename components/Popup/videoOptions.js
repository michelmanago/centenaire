import {useState} from 'react';
import Popup from 'reactjs-popup';
import IconClose from '../icons/IconClose';

export default function VideoOptions({open, setOpen, onSubmit, mediaTmp}) {
    const [isModal, setIsModal] = useState(false);
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    return (
        <Popup
            lockScroll={true}
            open={open}
            onClose={() => setOpen(false)}
            closeOnEscape={false} // because this event can not be prevented
            closeOnDocumentClick={false} // because this event can not be prevented
        >
            {/* Close */}
            <button onClick={() => setOpen(false)} className="absolute top-0 right-0 text-gray-700 hover:text-gray-800">
                <IconClose />
            </button>
            <div className="mb-3 text-3xl font-medium">Video Options</div>

            <div className="flex flex-row">
                <div>Mettre la Video dans une Popup:</div>
                <input
                    className="mx-1 mt-1"
                    type="checkbox"
                    defaultValue={isModal}
                    onClick={e => setIsModal(!isModal)}
                />
            </div>
            <div>Diffuser un extrait de la vidéo:</div>
            <div className="flex flex-col gap-px ml-2">
                <div className="flex flex-row gap-1">
                    <div>Début:</div>
                    <input
                        className="border rounded"
                        type="number"
                        value={timeStart}
                        onChange={e => setTimeStart(e.currentTarget.value)}
                    />
                    <div>s</div>
                </div>
                <div className="flex flex-row gap-1">
                    <div>Fin:</div>
                    <input
                        className="border rounded"
                        type="text"
                        value={timeEnd}
                        onChange={e => setTimeEnd(e.currentTarget.value)}
                    />
                    <div>s</div>
                </div>
            </div>

            {/* Bottom */}
            <div className="flex w-full h-16 px-3 pt-2 bg-white border-t border-gray-300">
                {/* Submit main action */}
                <button
                    onClick={() => onSubmit({isModal, timeStart, timeEnd})}
                    className={`ml-auto font-medium text-lg bg-blue-600 h-full text-white px-5 rounded hover:bg-blue-700`}
                >
                    {'Ajouter'}
                </button>
            </div>
        </Popup>
    );
}
