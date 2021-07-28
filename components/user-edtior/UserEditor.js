// libs
import { useEffect, useState } from "react"
import passwordGenerator from "fast-pass-gen"

// parameters
import {ROLES} from "../../utils/parameters"
import { capitalize } from "../../utils/utils"
const roleArray = Object.values(ROLES)

const getPassword = () => passwordGenerator(15, ["eng", "num", "extra"])

export default function UserEditor({onSubmit, submitLabel, pageTitle}){

    // states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("admin")
    const [name, setName] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    // utils
    const resetForm = () => {
        setEmail("")
        setRole("admin")
        setName("")
        regeneratePassword()
        setError(false)
    }

    // method
    const onSubmitForm = async () => {


        if(email && password && role && name){

            const res = await onSubmit({
                name,
                email,
                password,
                role,
            })
    
            if(res){
    
                // reset form
                resetForm()
    
                // feedback success
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 2000)
    
            }

        } else {

            alert("NOT OK")

        }
    }

    const regeneratePassword = () => {
        setPassword(getPassword())
    }

    useEffect(() => {
        // auto-generate password
        regeneratePassword()
    }, [])

    return (
        <div className="pb-5">

            {/* Title */}
            <h1 className="text-3xl font-medium mb-5">{pageTitle}</h1>

            {/* Error feedback */}
            {
                error && (
                    <span className=" text-red-500 inline-block"> 
                        * Vous devez remplir tous les champs du formulaire.
                    </span>
                )
            }

            {/* Form */}
            <form className="mt-3">

                {/* Name */}
                <div className="mb-4">
                    <Label htmlFor="name" text="Prénom et nom"/>
                    <Input 
                        id="name" 
                        placeholder={"John Doe"}
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <Label htmlFor="email" text="Email (identifiant)"/>
                    <Input 
                        id="email" 
                        placeholder={"monemail@mail.fr"}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <Label htmlFor="password" text="Mot de passe"/>
                    <button
                        type="button"
                        className="mb-3 border border-blue-400 text-blue-400 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                        onClick={() => regeneratePassword()}
                    >
                        Générer un mot de passe
                    </button>
                    <Input 
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                {/* Role */}
                <div className="mb-3">
                    <Label htmlFor="role" text="Rôle"/>
                    <select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        style={inputStyles} 
                        className="border w-full py-2 px-2 rounded" 
                        id="role"
                    >
                    {
                        roleArray.map(role => (
                            <option key={role} value={role}>{capitalize(role)}</option>
                        ))
                    }
                    </select>
                </div>

                {/* Submit */}
                <div className="flex items-center mt-5">

                    <button 
                        onClick={onSubmitForm}
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                    >{submitLabel}</button>

                    {success && <p className="text-green-500 pb-0 ml-3 text-sm">Utilisateur crée ✓</p>}

                </div>

            </form>
        </div>
    )

}


const Input = ({required = true, type = "text", id, onChange, value, placeholder}) => (
    <input 
        value={value}
        onChange={onChange} 
        style={inputStyles} 
        required={required} 
        type={type} 
        id={id} 
        placeholder={placeholder}
        className="border block px-2 py-1 rounded w-full bg-gray-100 border-gray-300"
    />
)

const Label = ({text, htmlFor}) => (
    <label 
        className="font-medium mb-2 block text-lg" 
        htmlFor={htmlFor}
    >{text}</label>
)



const inputStyles = {
    maxWidth: 300
}