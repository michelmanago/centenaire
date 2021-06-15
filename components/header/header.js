// libs
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

// styles
import styles from "../../styles/components/header.module.css"

// components
import Image from "next/image"
import HeaderNav from "./header-nav"



export default function Header () {


    /** Hooks */
    const router = useRouter()
    const { locale, locales, defaultLocale } = router

    /** States */
    const [isLangMenuOpened, setIsLangMenuOpened] = useState(false)
    const [IsNavOpened, setIsNavOpened] = useState(false)


    /** Methods */
    const toggleMenuLang = () => {
        setIsLangMenuOpened(!isLangMenuOpened)
    }


    /** Methods */
    const toggleNavMenu = () => {
        setIsNavOpened(!IsNavOpened)
    }

    // Effects
    useEffect(() => {

        // click outside
        window.addEventListener("click", event => {

            let clickedElement = event.target
            let hasClickedOutsideNav = !clickedElement.closest(".js__nav")

            if(hasClickedOutsideNav){
                setIsNavOpened(false)   
            }

        })

    }, [])

  
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
            <div className={"w-full px-5 flex justify-between items-center bg-pblue " + styles.topBar}>

                {/* Nav */}
                <nav className="js__nav relative w-full flex">

                    {/* Trigger */}
                    <button onClick={toggleNavMenu} className={" md:hidden flex items-center text-white"}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="27" height="18" viewBox="0 0 27 18" className="fill-current"><path d="M4.5,27h27V24H4.5Zm0-7.5h27v-3H4.5ZM4.5,9v3h27V9Z" transform="translate(-4.5 -9)"/></svg>
                    </button>
                    
                    {/* Nav links */}
                    <HeaderNav
                        navOpened={IsNavOpened}
                    />
                </nav>


                {/* Multilang */}
                <button onClick={toggleMenuLang} className={"multilang relative flex items-center font-medium text-lg uppercase " + styles.multilang}>
                    {isLangMenuOpened && <div className={"multilang-list w-full shadow-md absolute left-0 bg-white rounded p-2 z-10 " + styles.multilangList}>
                        {
                            locales.filter(f => f !== locale).map((l, i) => (
                                <a href={"/"} key={i}>{l}</a>
                            ))
                        }
                    </div>}
                    <div className="mr-1 text-white multilang-label">{locale}</div>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23.616" height="8.503" viewBox="0 0 23.616 13.503"><path fill="white" d="M18,20.679l8.93-8.937a1.681,1.681,0,0,1,2.384,0,1.7,1.7,0,0,1,0,2.391L19.2,24.258a1.685,1.685,0,0,1-2.327.049L6.68,14.14a1.688,1.688,0,0,1,2.384-2.391Z" transform="translate(-6.188 -11.246)"/></svg>
                    </div>
                </button>
            </div>
            

            {/* Logo */}
            {/* <img className={"my-3 " + styles.logo} src="/logo.svg" alt="logo"/> */}
 
        </header>
    )

}