// libs
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from "react"

// style
import styles from "./nav.module.css"

// utils
import { resolveMenuHref } from '../../utils/utils'




const NavLink = ({item}) => {

    let has_children = !!item.subMenu
    let href = resolveMenuHref(item.href)

    if(has_children){
  
        return (
            <li> 
                <a href={href}>

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
        <li><a href={href}>{item.label}</a></li> 
      )
    }

}

const Nav = ({menu = []}) => {

    // methods

    // ref
    const refContainer = useRef()

    // Effect
    
    useEffect(async () => {

        if(!refContainer.current) return

        const Navbar = (await import("navbar.js")).default

        new Navbar(refContainer.current, {
            breakpoint: 768,
            toggleSiblings: true,
            delay: 0
        })
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
                    menu.map((item, index) => <NavLink key={"item-" + index} item={item} />)
                }
                </ul>
            </div>
        </nav>
    )
}

export default Nav