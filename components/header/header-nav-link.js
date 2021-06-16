// libs
import React from "react"
import { useEffect, useState } from "react"

// styles
import styles from "../../styles/components/header.module.css"

const HeaderNavLink = ({label, href, subMenu, index, onToggleMenu, opened, inSubMenu}) => {


    // state
    const [subMenuOpen, setSubMenuOpen] = useState(false)

    // Methods
    const toggleSubMenu = event => {
        setSubMenuOpen(!subMenuOpen)
    }

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
        <li className={styles.headerNavLink + " md:mr-5 flex items-center " + (inSubMenu ? "md:text-black" : "md:text-white")}>
            {
                isSubMenu ? (
                    <>
                        <div className={styles.headerLink + " js__header-nav-link uppercase px-2 py-3 md:py-0 md:pb-0 text-xs block w-full"}>
                            
                            {/* Label container */}
                            <div onClick={() => onToggleMenu(index)} className={"flex items-center cursor-pointer " + (isSubMenu ? "pb-1" : "") + " md:pb-0"}> 
                                
                                {/* Label */}
                                <span className={"text-sm font-medium "}>{label}</span>
                                
                                {/* Icon */}
                                <svg className="inline-block ml-0" xmlns="http://www.w3.org/2000/svg" width="23.616" height="7" viewBox="0 0 23.616 13.503">
                                    <path fill="currentColor" d="M18,20.679l8.93-8.937a1.681,1.681,0,0,1,2.384,0,1.7,1.7,0,0,1,0,2.391L19.2,24.258a1.685,1.685,0,0,1-2.327.049L6.68,14.14a1.688,1.688,0,0,1,2.384-2.391Z" transform="translate(-6.188 -11.246)"/>
                                </svg>
                            </div>

                            {/* Sub menu */}
                            <ul style={{display: opened ? "block" : ""}} className={"bg-white p-5 pt-4 " + styles.headerSubNav + " md:text-black"}>
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
                                            />
                                        )
                                    } else {
                                        return (
                                            <a key={index + "-submenu"} className={"block uppercase text-xs px-3 py-1.5"} href={link.href}>{link.label}</a>
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