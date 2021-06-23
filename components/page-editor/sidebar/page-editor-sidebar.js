
// components
import PageEditorSidebarBlock from './page-editor-sidebar-block';


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

    language, languagesLists,
    pageSlug,
    author,
    category,
    created_at, last_modified,
    
    onSubmit,
    isSubmitting,
    onChangeLanguage,

}) => {
    
    
    // setters
    const setAuthor = e => updateState({author: e.target.value})
    const setCategory = e => updateState({page: e.target.value})

    // others
    const pageLink = isEditing ? Utils.getPagePermalink(pageSlug, language) : null;

    
    return (
        <div className="w-2/5">
            {/* Block langues */}
            <PageEditorSidebarBlock title="Langues">
                <select
                    value={language}
                    onChange={onChangeLanguage}
                    className="w-full px-4 py-3 border rounded"
                >
                    {languagesLists.map(cat => (
                        <option key={cat.value} value={cat.value}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </PageEditorSidebarBlock>

            {/* Block publier */}
            <PageEditorSidebarBlock title="Publier">
                {/* Author */}
                <div className="flex items-center w-full my-2">
                    <label className="mr-3 text-lg font-semibold" htmlFor="inputAuthor">
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
                            <p className="mr-3 font-semibold text-md" htmlFor="inputAuthor">
                                Date de publication :{' '}
                            </p>
                            <p className="text-md">
                                {created_at
                                    ? new Date(created_at).toLocaleString(locale)
                                    : ''}
                            </p>
                        </div>

                        <div className="flex items-center my-2">
                            <p className="mr-3 font-semibold text-md" htmlFor="inputAuthor">
                                Dernière modification :{' '}
                            </p>
                            <p className="text-md">
                                {last_modified
                                    ? new Date(last_modified).toLocaleString()
                                    : ''}
                            </p>
                        </div>
                    </>
                )}

                {/* Permalink */}
                {pageLink && (
                    <div>
                        <a target="_blank" className="text-blue-500 underline" href={pageLink}>
                            Lien vers la page
                        </a>
                    </div>
                )}

                {/* Publier */}
                <div className="flex justify-end">
                    <button
                        disabled={isSubmitting}
                        onClick={onSubmit}
                        className={"w-full px-3 py-2 mt-10 font-semibold text-white bg-blue-700 rounded flex items-center justify-center " + (isSubmitting ? " cursor-not-allowed opacity-70 " : " hover:bg-blue-800 ")}
                    >
                        {isSubmitting && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}


                        {isEditing ? 'Mettre à jour' : 'Sauvegarder'}
                    </button>
                </div>
            </PageEditorSidebarBlock>

            {/* Block categorie */}
            <PageEditorSidebarBlock title="Catégories">
                {/* categorie */}
                <select
                    value={category}
                    onChange={setCategory}
                    className="w-full px-4 py-3 border rounded"
                >
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
    )
}

export default PageEditorSidebar