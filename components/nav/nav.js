// libs
import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from "react"

// style
import styles from "./nav.module.css"

const HEADER_DATA = [
    {
        label: "Historique",
        href: "#",
        subMenu: [
            {label: "Avant 1917", href: "/"},
            {label: "Les prémices : l’exode", href: "/"},
            {label: "Les années de formation : 1921-1931", href: "/"},
            {label: "Les années 1930 : l’essor", href: "/"},
            {label: "Guerre et occupation", href: "/"},
            {label: "1946-1970", href: "/"},
            {label: "1970-1991", href: "/"},
            {label: "1991-2021 : les grands bouleversements", href: "/"},
        ]
    },
    {
        label: "Personnalités",
        href: "#",
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
        href: "#",
        subMenu:[
            {label: "Liste de toutes les paroisses actuelles", href: "/paroisses", subMenu: [
                {label: "Notre-Dame Souveraine à Chaville", href: "/"},
                {label: "Notre Dame de la Dormition", href: "/"},
                {label: "Cathédrale Saint Alexandre Nevski", href: "/"},

            ]},
            {label: "Profil des paroisses les plus typiques/intéressantes/ dynamiques (critères de sélection à débattre)", href: "/"},
            {label: "La vie quotidienne", href: "/"},
        ]
    },
    { 
        label: "la théologie",
        href: "#",
        subMenu:[
            {label: "l'Institut Saint-Serge", href: "/"},
            {label: "les grands théologiens et philosophes", href: "/"},
            {label: "la querelle de la sophiologie", href: "/"},
            {label: "les publications", href: "/"},
        ]
    },
    { 
        label: "Patrimoine artistique",
        href: "#",
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
        href: "#",
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


const NavLink = ({item}) => {

    let has_children = !!item.subMenu


    if(has_children){
  
        return (
            <li> 
                <a href={item.href}>

                    <span>{item.label}</span>
                    <svg className="parent-icon" viewBox="0 0 1024 1024">
                        <path d="M316 334l196 196 196-196 60 60-256 256-256-256z"></path>
                    </svg>
                    <svg className="parent-toggle" viewBox="0 0 1024 1024">
                        <path d="M316 334l196 196 196-196 60 60-256 256-256-256z"></path>
                    </svg>
                </a>
                <ul className="subnav md:bg-pblue"> 
                    {
                        item.subMenu.map((subItem, index) => <NavLink key={"subitem-" + index} item={subItem}/>)
                    }
                </ul>
            </li>
        )
  
    }
  
    else {
      return (
        <li><a href={item.href}>{item.label}</a></li> 
      )
    }

}

const Nav = () => {


    // methods
    const renderItem = (item) => {

    }

    // ref
    const refContainer = useRef()

    // Effect
    
    useEffect(async () => {

        const Navbar = (await import("navbar.js")).default

        new Navbar(refContainer.current, {
            breakpoint: 992,
            toggleSiblings: true,
            delay: 500
        })
        // console.log({refContainer})
    }, [refContainer])

    return (
        <nav ref={refContainer} className="navbar flex items-center bg-pblue">
            <button className="navbar-toggle">
                <svg className="menu-icon" viewBox="0 0 1024 1024">
                    <path d="M128 277.333h768v86h-768v-86z m0 298v-84h768v84h-768z m0 214v-86h768v86h-768z"/>
                </svg>
            </button>
            <div className={styles.navContainer}>
                <ul className="nav">
                {
                    HEADER_DATA.map((item, index) => <NavLink key={"item-" + index} item={item} />)
                }
                </ul>
            </div>
        </nav>
    )
}

export default Nav