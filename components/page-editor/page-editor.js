// libs
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useState } from "react"
import Utils from "../../utils/utils"

// components
import CustomEditor from "../Slate/customEditor"

let slug = "https://archeveche.eu/pere-rene-doyen-…notre-archeveche/"

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
    const usernameFromSession = session && session.userBase ? session.userBase.username : ""

    // States
    const [title, setTitle] = useState(editedPage ? editedPage.pageName : "")
    const [slug, setSlug] = useState(editedPage ? editedPage.pageSlug : "")
    const [content, setContent] = useState(editedPage ? editedPage.blockcontent : "")
    const [category, setCategory] = useState(editedPage ? editedPage.page : null)
    const [language, setLanguage] = useState(editedPage ? editedPage.language :defaultLocale)
    const [author, setAuthor] = useState(editedPage ? editedPage.author : usernameFromSession)

    // const [canSave, setCanSave] = useState(false)


    // methods
    const onSubmit = () => {
        
        onFormSubmitted({
            title: title,
            slug: isEditing ? slug : (`mapage-${Date.now()}` || slug),
            content: content,
            category: category,
            language: language,
            author: author,
            created_at: Utils.getSQLDatatime(new Date())
        })

    }

    // others
    const languagesLists = locales.map(_locale => ({title: _locale.toUpperCase(), value: _locale}))

    return (
        <div className="p-8 bg-white gap-x-8 border flex">
            
            {/* Left */}
            <div className="w-3/5">
                {/* Mode de page */}
                <h1 className="text-4xl font-bold mb-5">{isEditing ? "Modifier la page" : "Ajouter une nouvelle page"}</h1>

                {/* Title */}
                <input onChange={e => setTitle(e.target.value)} value={title} className="border rounded px-5 py-4 w-full mb-5" type="text" placeholder="Titre de la page"/>

                {/* Slug */}
                <div className=" flex items-center">
                    <label className="mr-5" htmlFor="inputSlug">Slug : </label>
                    <input onChange={e => setSlug(e.target.value)} value={slug} id="inputSlug" className="border rounded px-1 py-2 w-1/2" type="text" placeholder="le-nom-de-ma-page"/>  
                </div>

                {/* Content */}
                <CustomEditor block={content} setContent={setContent} />
            </div>

            {/* Right */}

            <div className="w-1/5">
                
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
                                    <p className="text-md">{new Date(editedPage.last_modified).toLocaleString(locale)}</p>
                                </div>
                            
                            </>
                        )
                    }
                    

                    {/* Publier */}
                    <div className="flex justify-end">
                        <button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700 px-3 py-2 text-white font-semibold mt-10 rounded w-full">
                            {isEditing ? "Mettre à jour" : "Sauvegarder"}
                        </button>
                    </div>

                </PageBlock>

                {/* Block langues */}
                <PageBlock title="Langues">

                    <select value={language} defaultValue={"first"} onChange={e => setLanguage(e.target.value)} className="border rounded px-4 py-3 w-full">
                        <option disabled value="first"> -- Selectionner une langue -- </option>
                        {
                            languagesLists.map(cat => (<option key={cat.value} value={cat.value}>{cat.title}</option>))
                        }
                    </select>

                </PageBlock>

                {/* Block categorie */}
                <PageBlock title="Catégories">

                    {/* categorie */}
                    <select value={category} defaultValue={"first"} onChange={e => setCategory(e.target.value)} className="border rounded px-4 py-3 w-full">
                        <option disabled value="first"> -- Selectionner une catégorie -- </option>
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