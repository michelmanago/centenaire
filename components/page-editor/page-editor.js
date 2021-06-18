// libs
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useState } from "react"

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
    const {defaultLocale, locales} = useRouter()
    const [session] = useSession()
    const usernameFromSession = session && session.userBase ? session.userBase.username : ""

    // States
    const [title, setTitle] = useState(editedPage ? editedPage.pageName : "")
    const [slug, setSlug] = useState(editedPage ? editedPage.pageSlug : "")
    const [content, setContent] = useState(editedPage ? editedPage.blockcontent : "")
    const [category, setCategory] = useState(editedPage ? editedPage.page : null)
    const [language, setLanguage] = useState(editedPage ? editedPage.language :defaultLocale)
    const [author, setAuthor] = useState(editedPage ? editedPage.author : usernameFromSession)

    const [canSave, setCanSave] = useState(false)


    // methods
    const onSubmit = () => {
        
        onFormSubmitted({
            title: title,
            slug: isEditing ? slug : (`mapage-${Date.now()}` || slug),
            content: content,
            category: category,
            language: language,
            author: author,
        })

    }

    // others
    const languagesLists = locales.map(_locale => ({title: _locale.toUpperCase(), value: _locale}))

    return (
        <div className="p-8 bg-white flex">
            
            {/* Left */}
            <div className="w-3/4">
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

            <div className="ml-6 flex-1">
                
                {/* Block publier */}
                <PageBlock title="Publier">

                    {/* Author */}
                    <div className="flex items-center my-2">
                        <label className="mr-3" htmlFor="inputAuthor">Auteur : </label>
                        <input className="border rounded px-3 py-1" id="inputAuthor" type="text" value={author} onChange={e => setAuthor(e.target.value)}/>
                    </div>

                    {/* Publier */}
                    <div className="flex justify-end">
                        <button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700 px-3 py-2 text-white font-semibold rounded w-full">
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
            <div className="border-b mb-4 px-3 pb-2">
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>

            {/* Block */}
            <div className="px-3">
                {children}
            </div>
        </div>
    )
}