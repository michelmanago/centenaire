import {
    getActiveEffect,
    getActiveStyles,
    getTextBlockStyle,
    toggleBlockEffect,
    toggleBlockType,
    toggleStyle,
    insertLink,
    isLinkActive,
    unwrapLink,
    toggleTooltip,
} from './EditorUtils';
import {useSlateStatic} from 'slate-react';
import {useCallback, useState} from 'react';
import Popup from 'reactjs-popup';

import Icons from './Icons';
import ImageSelector from '../Popup/image-selector';

const PARAGRAPH_STYLES = ['multiple', 'h1', 'h2', 'h3', 'h4', 'paragraph'];
const CHARACTER_STYLES = ['bold', 'italic', 'underline'];
const LIST_STYLES = ['bulleted-list', 'numbered-list'];
const EFFECT_STYLES = ['align-left', 'align-center', 'align-right'];
const MEDIA_STYLES = ['image', 'video'];

export default function Toolbar({selection, previousSelection}) {
    const [openImagePopup, setOpenImagePopup] = useState(false);
    const [openVideoPopup, setOpenVideoPopup] = useState(false);

    const [openTooltipPopup, setOpenTooltipPopup] = useState(false);
    const [tooltipNote, setTooltipNote] = useState('');
    const [tmpSelection, setTmpSelection] = useState(null);

    const editor = useSlateStatic();
    const onBlockTypeChange = useCallback(
        targetType => {
            if (targetType === 'multiple') {
                return;
            }
            toggleBlockType(editor, targetType);
        },
        [editor],
    );
    const blockType = getTextBlockStyle(editor);
    //console.log(blockType, editor);

    const addTooltip = () => {
        console.log(editor, selection, previousSelection);
        toggleTooltip(editor, tooltipNote);
        setOpenTooltipPopup(false);
    };
    return (
        <div className="text-black toolbar">
            {/* Dropdown for paragraph styles */}
            <select
                id="block-style"
                className="pt-1 mr-1 border border-black"
                value={blockType ?? 'paragraph'}
                onChange={e => onBlockTypeChange(e.currentTarget.value)}
            >
                {PARAGRAPH_STYLES.map(blockType => (
                    <option value={blockType} key={blockType}>
                        {blockType}
                    </option>
                ))}
            </select>
            {/* Buttons for character styles */}
            {LIST_STYLES.map(style => (
                <ToolBarButton
                    key={style}
                    icon={<Icons type={style} />}
                    isActive={getActiveStyles(editor).has(style)}
                    onMouseDown={event => {
                        event.preventDefault();
                        toggleBlockType(editor, style);
                        //toggleStyle(editor, style);
                    }}
                />
            ))}
            {CHARACTER_STYLES.map(style => (
                <ToolBarButton
                    key={style}
                    icon={<Icons type={style} />}
                    isActive={getActiveStyles(editor).has(style)}
                    onMouseDown={event => {
                        event.preventDefault();
                        toggleStyle(editor, style);
                    }}
                />
            ))}
            <ToolBarButton
                key={'tooltip'}
                icon={'note'}
                isActive={getActiveStyles(editor).has('tooltip')}
                onMouseDown={event => {
                    event.preventDefault();
                    //toggleBlockEffect(editor, effect);
                    //console.log(editor, selection);
                    setOpenTooltipPopup(true);
                }}
            />
            <Popup
                className=""
                open={openTooltipPopup}
                position="bottom center"
                modal="true"
                closeOnDocumentClick={false}
                onClose={e => {
                    setOpenTooltipPopup(false);
                }}
            >
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row-reverse">
                        <button
                            className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                            onClick={() => setOpenTooltipPopup(false)}
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
            {EFFECT_STYLES.map(effect => (
                <ToolBarButton
                    key={effect}
                    icon={<Icons type={effect} />}
                    isActive={getActiveEffect(editor) === effect}
                    onMouseDown={event => {
                        event.preventDefault();
                        toggleBlockEffect(editor, effect);
                    }}
                />
            ))}
            <ToolBarButton
                key={'link'}
                icon={<Icons type={'link'} />}
                isActive={getActiveEffect(editor) === 'link'}
                onMouseDown={event => {
                    event.preventDefault();
                    //toggleBlockEffect(editor, 'link');
                    if (isLinkActive(editor)) {
                        unwrapLink(editor);
                        return;
                    }
                    const url = window.prompt('Enter the URL of the link:');
                    if (!url) return;
                    insertLink(editor, url);
                }}
            />
            <ToolBarButton
                key={'image'}
                icon={<Icons type={'image'} />}
                isActive={getActiveEffect(editor) === 'image'}
                onMouseDown={event => {
                    event.preventDefault();
                    setOpenImagePopup(true);
                }}
            />
            <Popup
                className="image-popup"
                open={openImagePopup}
                position="bottom center"
                modal="true"
                closeOnDocumentClick={false}
                onClose={e => {
                    setOpenImagePopup(false);
                }}
            >
                <div className="flex flex-row-reverse">
                    <button
                        className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => setOpenImagePopup(false)}
                    >
                        Fermer
                    </button>
                </div>

                <ImageSelector />
            </Popup>
            <ToolBarButton
                key={'video'}
                icon={<Icons type={'video'} />}
                isActive={getActiveEffect(editor) === 'video'}
                onMouseDown={event => {
                    event.preventDefault();
                }}
            />
        </div>
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

/*function ToolBarEffectButton(props) {
    const {icon, isActive, ...otherProps} = props;
    return (
        <button>
            {icon}
        </button>
    )
}*/
