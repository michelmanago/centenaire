// libs
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

// styles
import styles from "../../styles/components/header.module.css"

// components
import Image from "next/image"
import Nav from "../nav/nav"



export default function Header () {


    /** Hooks */
    const router = useRouter()
    const { locale, locales, defaultLocale } = router

    /** States */
    const [isLangMenuOpened, setIsLangMenuOpened] = useState(false)


  
    return (

        <header className="bg-pyellow">
            <div className="container max-w-screen-xl bg-white sm:mx-auto">

            <div className="flex sm:items-center">
                <div className="flex justify-end w-1/4">
                    <Image src="/logo.svg" width={124} height={150} alt="logo" />
                </div>
                <div className="w-3/4">
                    <div>                    
                        <span className="ml-2 text-4xl font-bold text-pred font-logotitle">Centenaire de l'archevêché des églises Orthodoxes</span> 
                    </div>
                    <div> 
                        <span className="ml-2 text-4xl font-bold text-pred font-logotitle"> de tradition russe en Europe occidentale</span> 
                    </div>
                </div>
            </div>
            </div>

            {/* Top bar */}
            <Nav/>
            

            {/* Logo */}
            {/* <img className={"my-3 " + styles.logo} src="/logo.svg" alt="logo"/> */}
 
        </header>
    )

}