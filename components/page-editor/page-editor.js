// libs
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

// utils
import cleanForSlug from "../../utils/cleanForSlug"
import checkSlugExistance from "../../utils/checkSlugExistance"
import Utils from "../../utils/utils"

// components
import CustomEditor from "../Slate/customEditor"

const categories = [
    {
        title: "Compositeurs",
        value:  "compositeurs"
    },

    {
        title: "Paroisses",
        value:  "paroisses"
    },
]

export default function PageEditor({onFormSubmitted, editedPage}){

    // others
    const isEditing = !!editedPage


    // hooks
    const {defaultLocale, locales, locale} = useRouter()
    const [session] = useSession()

    // States
    // form
    const [title, setTitle] = useState(editedPage ? editedPage.pageName : "")
    const [slug, setSlug] = useState(editedPage ? editedPage.pageSlug : "")
    const [content, setContent] = useState(editedPage ? editedPage.blockcontent : "")
    const [category, setCategory] = useState(editedPage ? editedPage.page || "" : "")
    const [language, setLanguage] = useState(editedPage ? editedPage.language :defaultLocale)
    const [author, setAuthor] = useState(editedPage ? editedPage.author : "")

    // const [canSave, setCanSave] = useState(false)

    // methods
    const onSubmit = async () => {


        const checkedSlug = await checkSlugExistance(slug)
        
        onFormSubmitted({
            title: title,
            slug: checkedSlug,
            content: content,
            category: category,
            language: language,
            author: author,
        })

    }

    const onChangeTitle = e => {

        setTitle(e.target.value)


        setSlug(cleanForSlug(e.target.value))

    }

    // others
    const languagesLists = locales.map(_locale => ({title: _locale.toUpperCase(), value: _locale}))
    const pageLink = editedPage ? Utils.getPagePermalink(editedPage.pageSlug, editedPage.language) : null

    return (
        <div className="p-8 bg-white gap-x-8 border flex">

            {/* Left */}
            <div className="w-2/5 flex-1">

                {/* Mode de page */}
                <h1 className="text-4xl font-bold mb-5">{isEditing ? "Modifier la page" : "Ajouter une nouvelle page"}</h1>

                {/* Title */}
                <input onChange={onChangeTitle} value={title} className="border rounded px-5 py-4 w-full mb-5" type="text" placeholder="Titre de la page"/>

                {/* Slug */}
                {slug && (
                    <InputSlug
                        slug={slug}
                        setSlug={setSlug}
                    />
                )}

                {/* Content */}
                <CustomEditor block={content} setContent={setContent} />
            </div>

            {/* Right */}

            <div className="w-2/5">
                
                {/* Block publier */}
                <PageBlock title="Publier">

                    {/* Author */}
                    <div className="flex items-center my-2 w-full">
                        <label className="text-lg mr-3 font-semibold" htmlFor="inputAuthor">Auteur : </label>
                        <input className="border rounded px-3 py-1 flex-1" id="inputAuthor" type="text" value={author} onChange={e => setAuthor(e.target.value)}/>
                    </div>

                    {/* Created at */}
                    {
                        isEditing && (
                            <>
                                <div className="flex items-center my-2">
                                    <p className="text-md mr-3 font-semibold" htmlFor="inputAuthor">Date de publication : </p>
                                    <p className="text-md">{new Date(editedPage.created_at).toLocaleString(locale)}</p>
                                </div>

                                <div className="flex items-center my-2">
                                    <p className="text-md mr-3 font-semibold" htmlFor="inputAuthor">Dernière modification : </p>
                                    <p className="text-md">{new Date(editedPage.last_modified).toLocaleString()}</p>
                                </div>
                            
                            </>
                        )
                    }

                    {/* Permalink */}
                    {pageLink && (
                        <div>
                            <a target="_blank" className="text-blue-500 underline" href={pageLink}>Lien vers la page</a>
                        </div>
                    )}

                    {/* Publier */}
                    <div className="flex justify-end">
                        <button onClick={onSubmit} className="bg-blue-700 hover:bg-blue-800 px-3 py-2 text-white font-semibold mt-10 rounded w-full">
                            {isEditing ? "Mettre à jour" : "Sauvegarder"}
                        </button>
                    </div>

                </PageBlock>

                {/* Block langues */}
                <PageBlock title="Langues">

                    <select value={language} onChange={e => setLanguage(e.target.value)} className="border rounded px-4 py-3 w-full">
                        {
                            languagesLists.map(cat => (<option key={cat.value} value={cat.value}>{cat.title}</option>))
                        }
                    </select>

                </PageBlock>

                {/* Block categorie */}
                <PageBlock title="Catégories">

                    {/* categorie */}
                    <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded px-4 py-3 w-full">
                        <option disabled value=""> -- Selectionner une catégorie -- </option>
                        {
                            categories.map(cat => (<option key={cat.value} value={cat.value}>{cat.title}</option>))
                        }
                    </select>

                </PageBlock>
            </div>

        </div>
    )

}

const PageBlock = ({title, children}) => {
    return (
        <div className="border rounded-sm mb-5 py-3">

            {/* Header */}
            <div className="border-b mb-4 px-4 pb-2">
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>

            {/* Block */}
            <div className="px-4">
                {children}
            </div>
        </div>
    )
}

const InputSlug = ({slug, setSlug}) => {

    // state
    const [opened, setOpened] = useState(false)
    const [origin, setOrigin] = useState("")

    // effects
    // find app url
    useEffect(() => {
        setOrigin(window.location.origin)        
    }, [slug])

    // helpers
    

    // methods
    const onSubmit = async () => {

        const cleanedSlug = cleanForSlug(slug)
        const checkedSlug = await checkSlugExistance(cleanedSlug)

        setSlug(checkedSlug)
        setOpened(false)
    }


    return (
        <div className=" flex items-center mb-6">

            {/* Label */}
            <label className="mr-5 w-1/5 font-semibold" htmlFor="inputSlug">Permalien : </label>

            {/* Input container */}
            <div className={`border rounded px-3 py-2 w-full ${opened ? "border-blue-500" : ""}`}>

                {/* Label */}
                <label htmlFor="inputSlug" className="text-gray-500">{origin + "/"}</label>

                {/* Input */}
                <input disabled={!opened} onChange={e => setSlug(e.target.value)} value={slug} id="inputSlug" className="w-1/2 outline-none" type="text" placeholder="le-titre-de-ma-page"/>
            </div>  

            {/* Actions */}
            <div className="w-1/4 ml-3">
                {/* When closed */}
                {
                    !opened && (
                        <button onClick={() => setOpened(true)} className="border rounded bg-blue-500 text-white px-2 py-1 w-full">Modifier</button>
                    )
                }

                {/* When open */}
                {
                    opened && (
                        <>
                            <button onClick={onSubmit} className="border rounded border-gray-500 text-gray-500 px-2 py-1">OK</button>
                            <button onClick={() => setOpened(false)} className="underline px-2 py-1">Annuler</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}