// components
import PageEditorSidebarBlock from './page-editor-sidebar-block';
import InputSubmitPage from '../inputs/InputSubmitPage';
import PageEditCategory from './PageEditCategory';

// utils
import { useRouter } from 'next/router';
import BlockBandeau from './BlockBandeau';
import BlockSource from './BlockSource'

const PageEditorSidebar = ({
    updateCurrentPage,
    addAttributedMedia,
    removeAttributedMedia,
    isEditing,
    originalPageId,
    source,
    language,
    languagesLists,
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
    updatePages,
    categories,
    notAllowedToSave
}) => {

    // hooks
    const { locale } = useRouter();

    // setters
    const setAuthor = e => updateCurrentPage({ author: e.target.value });

    // others
    const permalien = pagePermalien.startsWith("/") ? pagePermalien : ("/" + pagePermalien)

    return (
        <div>
            {/* Block langues */}
            <PageEditorSidebarBlock title="Langues">
                {
                    languagesLists.map(cat => {

                        const catIsSelected = cat.value === language

                        return (
                            <button key={cat.value} onClick={() => onChangeLanguage(cat.value)} className={`bg-gray-200 px-4 py-2 font-medium ${catIsSelected ? "bg-gray-400" : ""}`}>
                                {cat.title}
                            </button>
                        )
                    })
                }
            </PageEditorSidebarBlock>

            {/* Block bandeau */}
            <BlockBandeau
                updatePages={updatePages}
                addAttributedMedia={addAttributedMedia}
                removeAttributedMedia={removeAttributedMedia}
                bandeau_id={bandeau_id}
                originalPageId={originalPageId}
            />

            {/* Block source */}
            <BlockSource
                updatePages={updatePages}
                source={source}
            />

            {/* Block publier */}
            <PageEditorSidebarBlock title="Publier">
                {/* Author */}
                <div className="flex items-center w-full mb-2">
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
                        <div className="flex items-center mb-2">
                            <p className="mr-3 text-sm font-semibold" htmlFor="inputAuthor">
                                Date de publication :{' '}
                            </p>
                            <p className="text-sm">{created_at ? new Date(created_at).toLocaleString(locale) : ''}</p>
                        </div>

                        <div className="flex items-center mb-2">
                            <p className="mr-3 text-sm font-semibold" htmlFor="inputAuthor">
                                Dernière modification :{' '}
                            </p>
                            <p className="text-sm">{last_modified ? new Date(last_modified).toLocaleString() : ''}</p>
                        </div>
                    </>
                )}

                <div className="mt-4">

                    {/* Permalien */}
                    {isEditing && <div>
                        <a target="_blank" className="underline" href={permalien}>
                            Lien vers la page
                        </a>
                    </div>}

                    {/* Remove page */}
                    {isEditing && (
                        <div>
                            <button
                                type="button"
                                onClick={onRemovePage}
                                className="text-red-500 underline"
                            >
                                Supprimer la page et ses traductions.
                            </button>
                        </div>
                    )}

                </div>
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
            <PageEditCategory
                updatePages={updatePages}
                category={category}
                categories={categories}
            />

        </div>
    );
};

export default PageEditorSidebar;
