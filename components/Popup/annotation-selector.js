import {useState} from 'react';
import Popup from 'reactjs-popup';

export default function AnnotationSelector({opened, onClose, sendNote}) {
    const [tooltipNote, setTooltipNote] = useState('');

    const addTooltip = () => {
        sendNote(tooltipNote);
        onClose();
    };
    return (
        <>
            <Popup lockScroll={true} open={opened} onClose={onClose}>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row-reverse">
                        <button
                            className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                            onClick={() => onClose()}
                        >
                            Fermer
                        </button>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <label className="w-1/6 text-center" htmlFor="tooltip-note">
                            Note
                        </label>
                        <textarea
                            id="tooltip-note"
                            className="w-5/6 px-1 border border-black"
                            value={tooltipNote}
                            onChange={e => setTooltipNote(e.currentTarget.value)}
                        ></textarea>
                    </div>
                    <div className="flex flex-row justify-center">
                        <button
                            className="p-1 text-white bg-green-500 rounded hover:bg-green-600"
                            onClick={() => {
                                addTooltip();
                            }}
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            </Popup>
        </>
    );
}

function ToolBarButton(props) {
    const {icon, isActive, ...otherProps} = props;
    return (
        <button
            className={`p-1 my-1 mr-1 text-black border toolbar-btn ${isActive ? 'border-grey-500' : 'border-black'}`}
            active={isActive}
            {...otherProps}
        >
            {icon}
        </button>
    );
}
