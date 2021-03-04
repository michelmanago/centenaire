import { useState } from "react"
import styles from "../styles/components/header.module.css"
import { useRouter } from 'next/router'


const HeaderNavLink = ({label, href, subMenu}) => {

    const isSubMenu = subMenu ? true : false

    return (
        <li className={styles.headerNavLink + " "}>
            {
                isSubMenu ? (
                    <>
                        <button className={"uppercase px-3 py-3 text-xs block w-full "}>
                            <div className={"flex items-center " + (isSubMenu ? "pb-1" : "")}> 
                                <span className="font-medium text-sm">{label}</span>
                                <svg className="inline-block ml-auto" xmlns="http://www.w3.org/2000/svg" width="23.616" height="7" viewBox="0 0 23.616 13.503"><path fill="black" d="M18,20.679l8.93-8.937a1.681,1.681,0,0,1,2.384,0,1.7,1.7,0,0,1,0,2.391L19.2,24.258a1.685,1.685,0,0,1-2.327.049L6.68,14.14a1.688,1.688,0,0,1,2.384-2.391Z" transform="translate(-6.188 -11.246)"/></svg>
                            </div>

                            {/* Sub menu */}
                            <ul className={"bg-white p-5 pt-4 " + styles.headerSubNav}>
                                {subMenu.map((link, index) => {
                                    return (
                                        <a key={index + "-submenu"} className={"block uppercase text-xs px-3 py-1.5"} href={link.href}>{link.label}</a>
                                    )
                                })}
                            </ul>
                        </button>
                    </>
                ) : (
                    <a className={"uppercase text-xs px-3 py-3 block w-full font-medium text-sm"} href={href}>{label}</a>
                )
            }
            
        </li>
    )

}

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

  
    return (

        <header className="bg-pyellow">
            <div className="container sm:mx-auto bg-white max-w-screen-xl">

            <div className="flex sm:items-center">
                <div className="flex justify-end w-1/4">
                    <img className="m-2 w-36" src="/logo.svg" />
                </div>
                <div className="w-3/4">
                    <div>                    
                        <span className="text-pred font-logotitle text-4xl font-bold ml-2">Exposition du centenaire de l'archevêché des églises  </span> 
                    </div>
                    <div> 
                        <span className="text-pred font-logotitle text-4xl font-bold ml-2">Orthodoxes de tradition russe en Europe occidentale</span> 
                    </div>
                </div>
            </div>
            </div>

            {/* Top bar */}
            <div className={"w-full px-5 flex justify-between items-center bg-pblue " + styles.topBar}>

                {/* Nav */}
                <nav className=" relative ">

                    {/* Trigger */}
                    <button onClick={toggleNavMenu} className={styles.headerNavTrigger + " flex items-center text-white"}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="27" height="18" viewBox="0 0 27 18" className="fill-current"><path d="M4.5,27h27V24H4.5Zm0-7.5h27v-3H4.5ZM4.5,9v3h27V9Z" transform="translate(-4.5 -9)"/></svg>
                    </button>

                    <ul className={styles.headerNav + " bg-white border rounded z-10 " + (IsNavOpened ? " " : "hidden")}>
                        <HeaderNavLink label="Historique" href="/" subMenu={[
                            {label: "Avant 1917", href: "/"},
                            {label: "Les prémices : l’exode", href: "/"},
                            {label: "Les années de formation : 1921-1931", href: "/"},
                            {label: "Les années 1930 : l’essor", href: "/"},
                            {label: "Guerre et occupation", href: "/"},
                            {label: "1946-1970", href: "/"},
                            {label: "1970-1991", href: "/"},
                            {label: "1991-2021 : les grands bouleversements", href: "/"},
                        ]}/>
                        <HeaderNavLink label="Les grandes personnalités" href="/" subMenu={[
                            {label: "Les saints", href: "/saints"},
                            {label: "Les primats", href: "/"},
                            {label: "Les évêques", href: "/"},
                            {label: "Les maîtres spirituels", href: "/"},
                            {label: "Les laïcs", href: "/"}
                        ]}/>
                        <HeaderNavLink label="Les paroisses" href="/" subMenu={[
                            {label: "Liste de toutes les paroisses actuelles", href: "/"},
                            {label: "Profil des paroisses les plus typiques/intéressantes/ dynamiques (critères de sélection à débattre)", href: "/"},
                            {label: "La vie quotidienne", href: "/"},
                        ]}/>
                        <HeaderNavLink label="la théologie" href="/" subMenu={[
                            {label: "l'Institut Saint-Serge", href: "/"},
                            {label: "les grands théologiens et philosophes", href: "/"},
                            {label: "la querelle de la sophiologie", href: "/"},
                            {label: "les publications", href: "/"},
                        ]}/>
                        <HeaderNavLink label="Patrimoine - œuvre artistique et culturelle" href="/" subMenu={[
                            {label: "les monuments historiques", href: "/"},
                            {label: "l' œuvre architecturale", href: "/"},
                            {label: "les iconographes", href: "/"},
                            {label: "artistes ayant collaboré à la vie culturelle de l'archevêché", href: "/"},
                            {label: "œuvre artistique mettant en valeur la vie des églises", href: "/"},
                        ]}/>
                        <HeaderNavLink label="l'action culturelle" href="/" subMenu={[
                            {label: "Les écoles paroissiales", href: "/"},
                            {label: "YMCA Press et les Editeurs Réunis", href: "/"},
                            {label: "les mouvements de jeunesse", href: "/"},
                            {label: "l’émission Orthodoxie", href: "/"},
                            {label: "Les pèlerinages", href: "/"},
                        ]}/>
                        <HeaderNavLink label="l’oeucuménisme" href="/"/>

                    </ul>
                </nav>


                {/* Multilang */}
                <button onClick={toggleMenuLang} className={"multilang relative flex items-center font-medium text-lg uppercase " + styles.multilang}>
                    {isLangMenuOpened && <div className={"multilang-list w-full shadow-md absolute left-0 bg-white rounded p-2 " + styles.multilangList}>
                        {
                            locales.filter(f => f !== locale).map(l => (
                                <a href={"/"}>{l}</a>
                            ))
                        }
                    </div>}
                    <div className="text-white multilang-label mr-1">{locale}</div>
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