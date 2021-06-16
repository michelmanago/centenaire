// libs
import React from "react"
import { useEffect, useState } from "react"

// styles
import styles from "../../styles/components/header.module.css"

const HeaderNavLink = ({label, href, subMenu, index, onToggleMenu, opened, inSubMenu, level}) => {


    // state
    const [subMenuOpen, setSubMenuOpen] = useState(true)

    // Methods
    const toggleSubMenu = event => {
        setSubMenuOpen(!subMenuOpen)
    }

    const applyForLevel = (_level, style = "", elseStyle = "") => level === _level ? style : elseStyle

    // Hooks
    // close sub menu when parent menu is closed
    useEffect(() => {
        if(!opened){
            setSubMenuOpen(false)
        }
    }, [opened])

    // Conditions
    const isSubMenu = subMenu ? true : false

    return (
        <li className={styles.headerNavLink + " flex items-center text-white " + applyForLevel(1, " mr-3") + applyForLevel(1, " ")}>
            {
                isSubMenu ? (
                    <>
                        <div className={styles.headerLink + " js__header-nav-link uppercase text-xs block w-full h-full flex items-center "}>
                            
                            {/* Label container */}
                            <div onClick={() => onToggleMenu(index)} className={"flex w-full items-center cursor-pointer " + (isSubMenu ? "pb-1" : "") + " md:pb-0"}> 
                                
                                {/* Label */}
                                <span className={"text-sm w-full " + applyForLevel(1, " font-medium ", " pl-4") }>{label}</span>
                                
                                {/* Icon */}
                                <svg className="inline-block ml-1" xmlns="http://www.w3.org/2000/svg" width="23.616" height="7" viewBox="0 0 23.616 13.503">
                                    <path fill="currentColor" d="M18,20.679l8.93-8.937a1.681,1.681,0,0,1,2.384,0,1.7,1.7,0,0,1,0,2.391L19.2,24.258a1.685,1.685,0,0,1-2.327.049L6.68,14.14a1.688,1.688,0,0,1,2.384-2.391Z" transform="translate(-6.188 -11.246)"/>
                                </svg>
                            </div>

                            {/* Sub menu */}
                            <ul style={{display: opened ? "block" : ""}} className={"bg-pblue top-0 " + styles.headerSubNav + (inSubMenu ? " md:left-full" : "") + applyForLevel(1, " top-full ")}>
                                {subMenu.map((link, index) => {

                                    if(link.subMenu){
                                        return (
                                            <HeaderNavLink
                                                key={index + "-submenu"}
                                                label={link.label}
                                                href={link.href}
                                                subMenu={link.subMenu}
                                                onToggleMenu={toggleSubMenu}
                                                opened={subMenuOpen}
                                                inSubMenu={true}
                                                level={level + 1}
                                            />
                                        )
                                    } else {
                                        return (
                                            <a key={index + "-submenu"} className={styles.headerSubLink + " block uppercase text-xs py-1.5 pl-4 "} href={link.href}>{link.label}</a>
                                        )
                                    }

                                })}
                            </ul>
                        </div>
                    </>
                ) : (
                    <a className={"uppercase px-3 py-3 block w-full font-medium text-sm"} href={href}>{label}</a>
                )
            }
            
        </li>
    )

}

export default HeaderNavLink