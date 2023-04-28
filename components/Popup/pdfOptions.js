import {useState} from 'react';
import Popup from 'reactjs-popup';
import IconClose from '../icons/IconClose';

export default function PdfOptions({open, setOpen, onSubmit}) {
    const [value, setValue] = useState('');
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
            <div className="mb-3 text-3xl font-medium">Options du Fichier</div>
            <div className="flex flex-col items-center mb-2">
                <label htmlFor="valueInput">Nom du fichier</label>
                <input
                    type="text"
                    id="valueInput"
                    className="px-1 border rounded"
                    value={value}
                    onChange={e => setValue(e.currentTarget.value)}
                />
            </div>
            {/* Bottom */}
            <div className="flex w-full h-16 px-3 pt-2 bg-white border-t border-gray-300">
                {/* Submit main action */}
                <button
                    onClick={() => {
                        onSubmit({value});
                        setValue('');
                    }}
                    className={`ml-auto font-medium text-lg bg-blue-600 h-full text-white px-5 rounded hover:bg-blue-700`}
                >
                    {'Ajouter'}
                </button>
            </div>
        </Popup>
    );
}
