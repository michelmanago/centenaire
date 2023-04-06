// libs
import {useRouter} from 'next/router';
import {useState} from 'react';

// utils
import {getMediaLink} from '../../../utils/utils-serveur-image';
import fetchDeleteMedia from '../../../utils/fetch/fetchDeleteMedia';
import fetchUpdateMedia from '../../../utils/fetch/fetchUpdateMedia';
import {getFilenameFromPath, legendeAsArray, MEDIA_TYPES} from '../../../utils/utils-media';
import fetchDissociateMediaFromPage from '../../../utils/fetch/fetchDissociateMediaFromPage';

// icons
import IconUnlink from '../../icons/IconUnlink';

export default function ModalMediaListEdit({
    media,
    setEdited,
    deleteMediaFromList,
    updateMediaFromList,
    hasModified,
    setHasModified,
    originalPageId,
}) {
    // utils

    // hooks
    const {locales} = useRouter();

    // states
    const [modified, setModified] = useState(false);
    const [credit, setCredit] = useState(media.credit || '');
    const [legendes, setLegendes] = useState(
        media.legende ? legendeAsArray(media.legende) : locales.map(locale => ({locale, value: ''})),
    );

    // helpers
    const renderMediaPreview = () => {
        const media_link = getMediaLink(media.public_path);

        switch (media.type) {
            case MEDIA_TYPES.IMAGE:
                return (
                    <div className="w-1/2 border-2 border-gray-400 rounded">
                        <img src={media_link} alt="" />
                    </div>
                );
                break;
            case MEDIA_TYPES.VIDEO:
                return (
                    <div className="w-3/4 border-2 border-gray-400 rounded">
                        <video controls src={media_link} muted loop></video>
                    </div>
                );
                break;
            case MEDIA_TYPES.AUDIO:
                return (
                    <div className="border-2 border-gray-400 rounded">
                        <audio className="w-full" src={media_link} controls loop></audio>
                    </div>
                );
                break;
            case MEDIA_TYPES.DOCUMENT:
            default:
                return (
                    <div className="">
                        <a target="_blank" className="text-blue-500 underline" href={media_link}>
                            Voir le fichier
                        </a>
                    </div>
                );
                break;
        }
    };

    // setters
    const setOneLegende = (value, index) => {
        const nextLegendes = legendes.map((legende, legendeIndex) => {
            if (legendeIndex === index) {
                return {
                    ...legende,
                    value,
                };
            } else {
                return legende;
            }
        });

        setLegendes(nextLegendes);

        // has modified
        if (!hasModified) {
            setHasModified(true);
        }
    };

    // methods

    const onUnlink = async media_id => {
        try {
            const res = await fetchDissociateMediaFromPage(media_id, originalPageId);

            // unlink in state
            const newMedia = {
                ...media,
                pages: media.pages ? media.pages.filter(page => page.id !== originalPageId) : [],
            };

            // unselect this media
            setEdited(null);

            updateMediaFromList(newMedia);
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeCredit = event => {
        setCredit(event.target.value);

        // has modified
        if (!hasModified) {
            setHasModified(true);
        }
    };

    const OnUpdateMedia = async () => {
        const form = {
            credit,
            legende: legendes,
        };

        try {
            // request update
            const newMedia = await fetchUpdateMedia(media.id, form);

            // update in list
            updateMediaFromList(newMedia);

            // show feedback
            setModified(true);
            setTimeout(() => setModified(false), 1500);
        } catch (error) {
            console.log(error);
        }

        // reset
        setHasModified(false);
    };

    const onRemoveMedia = async () => {
        // Prevent miss click
        if (confirm("Êtes vous sûr de vouloir supprimer définitivement l'image ?")) {
            // fetch DELETE
            const deleted = await fetchDeleteMedia(media);

            if (deleted) {
                deleteMediaFromList(media.id);
            } else {
                alert('Could not delete this media.');
            }
        }
    };

    // others
    const filename = media && getFilenameFromPath(media);
    const linkedToThisPage = media.pages && media.pages.some(page => page.id === originalPageId);
    const showAssociationSection = linkedToThisPage;

    return (
        <div>
            {media && (
                <>
                    <div className="py-4 pl-5 pr-2">
                        {/* {
                                media.page ? (
                                    <div className="max-w-full"> 
                                        <a href={`/${media.page.pageSlug}`} target="_blank" className="inline-block max-w-full px-3 py-1 mb-5 text-sm text-yellow-800 truncate bg-yellow-400 border-2 border-yellow-500 rounded">Associé à <em className="italic underline">{media.page.pageName}</em></a>
                                    </div>
                                ) : (
                                    <span className="inline-block px-3 py-1 mb-5 text-sm text-yellow-800 bg-yellow-400 border-2 border-yellow-500 rounded opacity-50">Associé à aucune page</span>
                                )
                            } */}

                        {/* Type */}
                        <p>
                            <span>Ficher de type : </span>
                            <span className="inline-block px-4 py-1 mb-5 text-sm text-purple-800 bg-purple-200 border-2 border-purple-300 rounded">
                                {media.type}
                            </span>
                        </p>

                        {/* Preview */}
                        <div className="">{renderMediaPreview()}</div>

                        {/* Filename */}
                        <p className="mt-3 text-sm text-gray-600">
                            Nom du fichier : <em>{filename}</em>
                        </p>

                        {/* Remove */}
                        <button onClick={onRemoveMedia} className="text-red-400 underline">
                            Supprimer définitivement
                        </button>

                        {/* Association */}

                        {showAssociationSection && (
                            <div className="my-3">
                                <p>Associations</p>
                                {linkedToThisPage && (
                                    <div>
                                        {/* Unlink */}
                                        <button
                                            onClick={e => onUnlink(media.id)}
                                            className="z-20 inline-flex items-center justify-end px-2 py-1 mb-5 bg-gray-300 border border-gray-600 rounded opacity-50 hover:bg-gray-400"
                                        >
                                            <IconUnlink size="24px" />
                                            <span className="ml-2">Dissocier de la page</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Form */}
                        <div className="mt-4">
                            {/* Crédit */}
                            <InputText label="Crédit :" value={credit} onChange={onChangeCredit} />

                            {/* Legendes */}
                            {legendes.map(({locale}, index) => (
                                <InputText
                                    key={locale}
                                    label={`Légende ${locale} :`}
                                    value={legendes[index].value}
                                    onChange={e => setOneLegende(e.target.value, index)}
                                />
                            ))}

                            {/* Submit */}
                            <div className="relative inline-block border">
                                {/* Button */}
                                <button
                                    type="button"
                                    onClick={OnUpdateMedia}
                                    className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                                >
                                    Sauvegarder le média
                                </button>

                                {/* Animation */}
                                {hasModified && (
                                    <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
                                        <span className="absolute inline-flex w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping"></span>
                                        <span className="relative inline-flex w-3 h-3 bg-blue-500 rounded-full"></span>
                                    </span>
                                )}
                            </div>

                            {/* Feedback */}
                            {modified && <span className="ml-2 text-sm text-green-500">Modifié ✓</span>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

const InputText = ({placeholder, value, label, onChange, id}) => (
    <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor={id}>
            {label}
        </label>
        <input
            className="block w-full px-1 py-1 border rounded "
            type="text"
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    </div>
);
