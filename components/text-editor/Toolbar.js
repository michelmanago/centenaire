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
    insertImage,
    insertVideo,
    insertVideoModal,
    insertAudio,
    insertPdf,
} from './EditorUtils';
import {useSlateStatic} from 'slate-react';
import {useCallback, useState} from 'react';

import Icons from './Icons';
import AnnotationSelector from '../Popup/annotation-selector';
import ModalMedia from '../modal-media/ModalMedia';
import Popup from 'reactjs-popup';
import VideoOptions from '../Popup/videoOptions';
import {Editor} from 'slate';

const PARAGRAPH_STYLES = ['multiple', 'h1', 'h2', 'h3', 'h4', 'paragraph'];
const CHARACTER_STYLES = ['bold', 'italic', 'underline'];
const LIST_STYLES = ['bulleted-list', 'numbered-list'];
const EFFECT_STYLES = ['align-left', 'align-center', 'align-right'];
const MEDIA_STYLES = ['image', 'video'];

export default function Toolbar({selection, previousSelection, originalPageId, addAttributedMedia}) {
    const [currentSelection, setCurrentSelection] = useState(null);
    const [openModalMedia, setOpenModalMedia] = useState(false);
    const [openTooltipPopup, setOpenTooltipPopup] = useState(false);
    const [openModalMediaVideo, setOpenModalMediaVideo] = useState(false);
    const [openModalVideoInfo, setOpenModalVideoInfo] = useState(false);
    const [openModalAudio, setOpenModalAudio] = useState(false);
    const [openModalPdf, setOpenModalPdf] = useState(false);
    const [mediaTmp, setMediaTmp] = useState(null);

    const urlServerMedia = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;

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

    const addTooltip = note => {
        //console.log(editor, selection, previousSelection);
        //var editorTmp = {...editor};
        //editorTmp.selection = tmpSelection;
        toggleTooltip(editor, note);
        //setOpenTooltipPopup(false);
    };

    const addImage = media => {
        console.log(media, editor.selection, selection);
        editor.selection = currentSelection;
        insertImage(editor, `${urlServerMedia}${media.public_path}`);
        setTimeout(() => addAttributedMedia(media.id), 1000);
        setOpenModalMedia(false);
        console.log('insertImage after:', editor);
    };
    const addVideo = media => {
        console.log(media, editor.selection, selection);
        //insertVideo(editor, `${urlServerMedia}${media.public_path}`);
        //insertVideoModal(editor, `${urlServerMedia}${media.public_path}`);
        setMediaTmp(media);
        //setTimeout(() => addAttributedMedia(media.id), 1000);
        setOpenModalMediaVideo(false);
        setOpenModalVideoInfo(true);
        console.log('insertVideo after:', editor);
    };
    const addVideoWithOpt = opt => {
        console.log('opt', opt);
        console.log('editor', editor);
        var timer = opt.timeStart ? `#t=${opt.timeStart},${opt.timeEnd}` : '';
        editor.selection = currentSelection;
        insertVideoModal(editor, `${urlServerMedia}${mediaTmp.public_path}${timer}`, opt.isModal);
        setTimeout(() => {
            addAttributedMedia(mediaTmp.id);
            setMediaTmp(null);
        }, 1000);
        setCurrentSelection(null);
        setOpenModalVideoInfo(false);
    };

    const addAudio = media => {
        editor.selection = currentSelection;
        insertAudio(editor, `${urlServerMedia}${media.public_path}`);
        setTimeout(() => addAttributedMedia(media.id), 1000);
        setOpenModalAudio(false);
    };
    const addPdf = media => {
        editor.selection = currentSelection;
        insertPdf(editor, `${urlServerMedia}${media.public_path}`);
        setTimeout(() => addAttributedMedia(media.id), 1000);
        setOpenModalPdf(false);
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
                    if (getActiveStyles(editor).has('tooltip')) {
                        toggleTooltip(editor, null);
                    } else {
                        var notePrompt = prompt('Note:');
                        toggleTooltip(editor, notePrompt);
                        //setOpenTooltipPopup(true);
                    }
                }}
            />
            <AnnotationSelector
                opened={openTooltipPopup}
                onClose={() => setOpenTooltipPopup(false)}
                sendNote={addTooltip}
            />
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
                    //setOpenImagePopup(true);
                    setCurrentSelection(editor.selection);
                    setOpenModalMedia(true);
                }}
            />
            <ModalMedia
                opened={openModalMedia}
                onClose={() => setOpenModalMedia(false)}
                onMediaSelected={addImage}
                submitLabel={'Ajouter le fichier'}
                originalPageId={originalPageId}
                accepts={['image']}
            />
            <ToolBarButton
                key={'video'}
                icon={<Icons type={'video'} />}
                isActive={getActiveEffect(editor) === 'video'}
                onMouseDown={event => {
                    event.preventDefault();
                    setCurrentSelection(editor.selection);
                    setOpenModalMediaVideo(true);
                }}
            />
            <ModalMedia
                opened={openModalMediaVideo}
                onClose={() => setOpenModalMediaVideo(false)}
                onMediaSelected={addVideo}
                submitLabel={'Ajouter le fichier'}
                originalPageId={originalPageId}
                accepts={['video']}
            />
            <VideoOptions
                open={openModalVideoInfo}
                setOpen={setOpenModalVideoInfo}
                onSubmit={addVideoWithOpt}
                mediaTmp={mediaTmp}
            />

            <ToolBarButton
                key={'audio'}
                icon={<Icons type={'audio'} />}
                isActive={getActiveEffect(editor) === 'audio'}
                onMouseDown={event => {
                    event.preventDefault();
                    setCurrentSelection(editor.selection);
                    setOpenModalAudio(true);
                }}
            />
            <ModalMedia
                opened={openModalAudio}
                onClose={() => setOpenModalAudio(false)}
                onMediaSelected={addAudio}
                submitLabel={'Ajouter le fichier'}
                originalPageId={originalPageId}
                accepts={['audio']}
            />
            <ToolBarButton
                key={'pdf'}
                icon={<Icons type={'pdf'} />}
                isActive={getActiveEffect(editor) === 'pdf'}
                onMouseDown={event => {
                    event.preventDefault();
                    setCurrentSelection(editor.selection);
                    setOpenModalPdf(true);
                }}
            />
            <ModalMedia
                opened={openModalPdf}
                onClose={() => setOpenModalPdf(false)}
                onMediaSelected={addPdf}
                submitLabel={'Ajouter le fichier'}
                originalPageId={originalPageId}
                accepts={['document']}
            />
        </div>
    );
}

function ToolBarButton(props) {
    const {icon, isActive, ...otherProps} = props;
    return (
        <button
            className={`p-1 my-1 mr-1 text-black border toolbar-btn ${isActive ? 'border-grey-500' : 'border-black'}`}
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
