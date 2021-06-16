// libs
import React from "react"
import { useEffect, useState } from "react"

// styles
import styles from "../../styles/components/header.module.css"

// components
import HeaderNavLink from "./header-nav-link"


const HEADER_DATA = [
    {
        label: "Historique",
        href: "/",
        subMenu: [
            {label: "Avant 1917", href: "/"},
            {label: "Les prémices : l’exode", href: "/"},
            {label: "Les années de formation : 1921-1931", href: "/"},
            {label: "Les années 1930 : l’essor", href: "/"},
            {label: "Guerre et occupation", href: "/"},
            {label: "1946-1970", href: "/"},
            {label: "1970-1991", href: "/"},
            {label: "1991-2021 : les grands bouleversements", href: "/", subMenu: [
                {label: "Avant 1917", href: "/"},
                {label: "Les prémices : l’exode", href: "/"},
                {label: "Les années de formation : 1921-1931", href: "/"},
                {label: "Les années 1930 : l’essor", href: "/"},
                {label: "Guerre et occupation", href: "/"},
                {label: "1946-1970", href: "/"},
                {label: "1970-1991", href: "/"},
                {label: "1991-2021 : les grands bouleversements", href: "/"},
            ]},
        ]
    },
    {
        label: "Personnalités",
        href: "/",
        subMenu: [
            {label: "Les saints", href: "/saints"},
            {label: "Les primats", href: "/"},
            {label: "Les évêques", href: "/"},
            {label: "Les maîtres spirituels", href: "/maitrespirituels"},
            {label: "Les laïcs", href: "/"}
        ]
    },
    { 
        label: "Paroisses",
        href: "/",
        subMenu:[
            {label: "Liste de toutes les paroisses actuelles", href: "/paroisses"},
            {label: "Profil des paroisses les plus typiques/intéressantes/ dynamiques (critères de sélection à débattre)", href: "/"},
            {label: "La vie quotidienne", href: "/"},
        ]
    },
    { 
        label: "la théologie",
        href: "/",
        subMenu:[
            {label: "l'Institut Saint-Serge", href: "/"},
            {label: "les grands théologiens et philosophes", href: "/"},
            {label: "la querelle de la sophiologie", href: "/"},
            {label: "les publications", href: "/"},
        ]
    },
    { 
        label: "Patrimoine artistique",
        href: "/",
        subMenu:[
            {label: "les monuments historiques", href: "/"},
            {label: "l' œuvre architecturale", href: "/"},
            {label: "les iconographes", href: "/"},
            {label: "les compositeurs de musique liturgique", href: "/compositeurs"},
            {label: "artistes ayant collaboré à la vie culturelle de l'archevêché", href: "/"},
            {label: "œuvre artistique mettant en valeur la vie des églises", href: "/"},
        ]
    },
    { 
        label: "l'action culturelle",
        href: "/",
        subMenu:[
            {label: "Les écoles paroissiales", href: "/"},
            {label: "YMCA Press et les Editeurs Réunis", href: "/"},
            {label: "les mouvements de jeunesse", href: "/"},
            {label: "l’émission Orthodoxie", href: "/"},
            {label: "Les pèlerinages", href: "/"},
        ]
    },
    { 
        label: "l’oecuménisme",
        href: "/"
    }
]


const HeaderNav = ({navOpened}) => {

    // states
    const [openedMenu, setOpenedMenu] = useState(null)
    const [mode, setMode] = useState("desktop")

    // methods
    const onToggleMenu = (index, isSubMenu) => {


        if(openedMenu === index){
            setOpenedMenu(null)
        } else {
            setOpenedMenu(index)
        }
    }

    // Hooks
    useEffect(() => {

        // init mode
        setMode(window.innerWidth < 768 ? "mobile" : "desktop")
        
        // trigger mode desktop
        window.addEventListener("resize", () => {

            // console.log("resize", window.innerWidth, mode)

            if(window.innerWidth < 768){
                setMode("mobile")
                setOpenedMenu(null)
            }

            else if(window.innerWidth > 768){
                setMode("desktop")
                setOpenedMenu(null)
                
            }

        })

        // click outside
        window.addEventListener("click", event => {

            let clickedElement = event.target
            let hasClickedOutsideNav = !clickedElement.closest(".js__header-nav")

            if(hasClickedOutsideNav){
                setOpenedMenu(false)   
            }

        })

    }, [])

    const isHidden = mode === "mobile" && !navOpened


    const hiddenStyle = isHidden ? [
        "-translate-x-full"
    ].join(" ") : [
        "md:-translate-x-0"
    ].join(" ")

    return (
        <ul className={styles.headerNav + " js__header-nav bg-white md:bg-transparent rounded z-10 transform flex justify-center transform " + hiddenStyle}>
            {
                HEADER_DATA.map((link, index) => (
                    <HeaderNavLink
                        key={"header-link-" + index}
                        label={link.label}
                        href={link.href}
                        subMenu={link.subMenu}
                        onToggleMenu={onToggleMenu}
                        opened={index === openedMenu}
                        index={index}
                    />
                ))
            }
        </ul>
    )

}

export default HeaderNav