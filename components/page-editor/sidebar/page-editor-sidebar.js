// components
import PageEditorSidebarBlock from './page-editor-sidebar-block';
import InputSubmitPage from '../inputs/InputSubmitPage';
import PageEditorInputImage from './PageEditorInputImage';

// utils
import Utils, {getPagePermalien} from '../../../utils/utils';
import {useRouter} from 'next/router';

const categories = [
    {
        title: 'Compositeurs',
        value: 'compositeurs',
    },

    {
        title: 'Paroisses',
        value: 'paroisses',
    },
];

const PageEditorSidebar = ({
    updateState,
    isEditing,

    language,
    languagesLists,
    pageSlug,
    author,
    category,
    created_at,
    last_modified,
    pagePermalien,
    bandeau_id,

    onSubmit,
    onRemovePage,
    isSubmitting,
    onChangeLanguage,
    onMediaUploaded,
    onRemoveMedia,

    notAllowedToSave,
}) => {
    // hooks
    const {locale} = useRouter();

    // setters
    const setAuthor = e => updateState({author: e.target.value});
    const setCategory = e => updateState({page: e.target.value});

    return (
        <div className="w-2/5">
            {/* Block langues */}
            <PageEditorSidebarBlock title="Langues">
                <select value={language || ''} onChange={onChangeLanguage} className="w-full px-4 py-3 border rounded">
                    {languagesLists.map(cat => (
                        <option key={cat.value} value={cat.value}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </PageEditorSidebarBlock>

            {/* Block bandeau */}
            <PageEditorSidebarBlock title="Bandeau de page">
                <PageEditorInputImage
                    onMediaUploaded={onMediaUploaded}
                    onRemoveMedia={onRemoveMedia}
                    mediaId={bandeau_id}
                />
            </PageEditorSidebarBlock>

            {/* Block publier */}
            <PageEditorSidebarBlock title="Publier">
                {/* Author */}
                <div className="flex items-center w-full my-2">
                    <label className="mr-3 text-sm font-semibold" htmlFor="inputAuthor">
                        Auteur :{' '}
                    </label>
                    <input
                        className="flex-1 px-3 py-1 border rounded"
                        id="inputAuthor"
                        type="text"
                        value={author}
                        onChange={setAuthor}
                    />
                </div>

                {/* Created at */}
                {isEditing && (
                    <>
                        <div className="flex items-center my-2">
                            <p className="mr-3 text-sm font-semibold" htmlFor="inputAuthor">
                                Date de publication :{' '}
                            </p>
                            <p className="text-sm">{created_at ? new Date(created_at).toLocaleString(locale) : ''}</p>
                        </div>

                        <div className="flex items-center my-2">
                            <p className="mr-3 text-sm font-semibold" htmlFor="inputAuthor">
                                Dernière modification :{' '}
                            </p>
                            <p className="text-sm">{last_modified ? new Date(last_modified).toLocaleString() : ''}</p>
                        </div>
                    </>
                )}

                {/* Permalien */}
                <div>
                    <a target="_blank" className="underline" href={pagePermalien}>
                        Lien vers la page
                    </a>
                </div>

                {/* Remove page */}
                {isEditing && (
                    <div>
                        <button
                            onClick={onRemovePage}
                            target="_blank"
                            className="text-red-500 underline"
                            href={pagePermalien}
                        >
                            Supprimer la page et ses traductions.
                        </button>
                    </div>
                )}

                {/* Publier */}
                <div className="flex justify-end">
                    <InputSubmitPage
                        isEditing={isEditing}
                        isSubmitting={isSubmitting}
                        notAllowedToSave={notAllowedToSave}
                        onSubmitPage={onSubmit}
                    />
                </div>
            </PageEditorSidebarBlock>

            {/* Block categorie */}
            <PageEditorSidebarBlock title="Catégories">
                {/* categorie */}
                <select value={category || ''} onChange={setCategory} className="w-full px-4 py-3 border rounded">
                    <option disabled value="">
                        {' '}
                        -- Selectionner une catégorie --{' '}
                    </option>
                    {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </PageEditorSidebarBlock>
        </div>
    );
};

export default PageEditorSidebar;
