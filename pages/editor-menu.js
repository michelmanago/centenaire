// libs
import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {changeNodeAtPath, insertNode, removeNodeAtPath, getNodeAtPath} from 'react-sortable-tree';

// components
import Header from '../components/header/header';
import MenuEditorSubmit from '../components/editor-menu/inputs/MenuEditorSubmit';
import MenuEditorTree from '../components/editor-menu/tree/menu-editor-tree';

// models
import {getMenus} from '../model/menu';
import MenuEditorSidebar from '../components/editor-menu/sidebar/MenuEditorSidebar';

// format
import { formatNewMenuItem, fromDBDataToTreedata } from '../utils/editor-menu-formats';
import { recursiveMapTreeData } from '../utils/utils';

// utils
import addUUIDToLinks from "../utils/scripts/addUUIDToLinks"

const retrieveTranslationsFrom = (pages = [], original_id, language) => {

    // all translations of page
    let translations = pages.filter(page => page.original_id === original_id)


    // translation with language = language
    return translations.find(page => page.language === language)
}

export default function EditorMenu({menus}) {

    // states
        const [canSave, setCanSave] = useState(false)
        const [currentMenuIndex, setCurrentMenuIndex] = useState(0)
        const [editableMenus, setEditableMenus] = useState(menus && menus.map(menu => fromDBDataToTreedata(menu ? menu.data : [])))
        const [synchronizedActions, setSynchronizedActions] = useState([])
        const currentMenu = editableMenus ? editableMenus[currentMenuIndex] : null

        // create form
        // update form
        const [editedMenuItem, setEditedMenuItem] = useState(null);
        const [formUpdateLabel, setFormUpdateLabel] = useState('');
        const [formUpdateHref, setFormUpdateHref] = useState('');

        // menu locale
        const [locale, setLocale] = useState(null)

        // existing pages - pages created by admin/page/create
        const [availablePages, setAvailablePages] = useState([])


    // utils
        const getNodeKey = ({treeIndex}) => treeIndex
        const updateCurrentMenuState = nextState => setEditableMenus(editableMenus.map((menu, menuIndex) => menuIndex === currentMenuIndex ? nextState : menu))
        const closeEditModal = () => {
            // close form
            setEditedMenuItem(null);

            // reset
            setFormUpdateHref('');
            setFormUpdateLabel('');
        }




    // lifecyle
        useEffect(() => {

            const url = new URL(window.location.origin + "/api/page/all")
    
            // fetch all pages
            fetch(url.toString())
            .then(response => {
                if(response.ok){
                    return response.json()
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(body => (
                setAvailablePages(body.map(page => ({...page, selected: false})))
            ))
            .catch(err => {
                console.log("err", err)
            })


            // scripts
            window.addUUId = () => {

                const menuWithUUID = addUUIDToLinks(menus)

                // print
                menuWithUUID.forEach(m => {

                    console.log(m.locale)
                    console.log(JSON.stringify(m.data))

                })
            }
    
        }, [])

    // via tree

    const onAddLinks = (links = []) => {

        const menusWithNewLinks = (editableMenus.map((menuLinks, menuIndex) => {

            let addedLinks = links.map(link => {

                // link is existing page and have translation
                // synchronize pages translations
                if(link.original_id){

                    const retrievedTranslationLink = retrieveTranslationsFrom(availablePages, link.original_id, menus[menuIndex].locale)
                    return retrievedTranslationLink ? formatNewMenuItem(retrievedTranslationLink.pageName, retrievedTranslationLink.pageSlug) : null
                }

                return link

            })

            // in case one link has not been found just ignore translation
            addedLinks = addedLinks.filter(f => f)

            return [...addedLinks, ...menuLinks]

        }))

        setEditableMenus(menusWithNewLinks)
        
        if(!canSave){
            setCanSave(true)
        }
    }

    const submitModifyMenuItem = () => {
        if (formUpdateHref && formUpdateLabel) {

            let {path, node} = editedMenuItem;

            updateCurrentMenuState(changeNodeAtPath({
                treeData: currentMenu,
                path,
                getNodeKey,
                newNode: {
                    ...node,
                    title: formUpdateLabel,
                    href: formUpdateHref,
                },
            }))

            if(!canSave){
                setCanSave(true)
            }
            
            closeEditModal()
            
        }
    }

    const onVisibilityToggle = ({path, expanded, node}) => {

        // not synchronized
        setEditableMenus(editableMenus.map(menu => {

            let correspondingNode = getNodeAtPath({
                treeData: menu,
                path: path,
                getNodeKey,
            })

            if(correspondingNode && correspondingNode.node){

                correspondingNode = correspondingNode.node

                const changedTree = changeNodeAtPath({
                    treeData: menu,
                    path: path,
                    newNode: {
                        ...correspondingNode,
                        expanded: expanded
                    },
                    getNodeKey, 
                })

                return changedTree
            }

            return menu
        }))
    }
    const onMoveNode = ({prevPath, nextPath, nextTreeIndex }) => {


        // moving nodes is synchronized
        const menus = editableMenus.map(menu => {

            let correspondingNode = getNodeAtPath({
                treeData: menu,
                path: prevPath,
                getNodeKey,
            })

            if(correspondingNode && correspondingNode.node){

                correspondingNode = correspondingNode.node

                const treeTheWithoutNode = removeNodeAtPath({
                    treeData: menu,
                    path: prevPath,
                    getNodeKey,
                })
    
    
                const finalTreeData = insertNode({
                    treeData: treeTheWithoutNode,
                    newNode: correspondingNode,
                    depth: nextPath.length - 1,
                    minimumTreeIndex: nextTreeIndex,
                    expandParent: true,
                    getNodeKey: getNodeKey,
                })

                return finalTreeData.treeData

            }
    
            return menu

        })
        

        setEditableMenus(menus)

        if(!canSave){
            setCanSave(true)
        }

    }


    const removeMenuItem = path => {

        if (confirm('Êtes vous sûr de vouloir supprimer cet élements et ses enfants dans toutes les traductions ?')) {

            // update current state menu
            
            // remove is synchronized
            // remove in all languages
            setEditableMenus(editableMenus.map(menuData => 
                removeNodeAtPath({
                    treeData: menuData,
                    path,
                    getNodeKey,
            })))

            
            if(!canSave){
                setCanSave(true)
            }
        }
    };

    const toggleModifySection = (node, path) => {
        
        // close
        if (editedMenuItem && editedMenuItem.node.uuid === node.uuid) {
            closeEditModal()
        }

        // open
        else {
            // is editing
            setEditedMenuItem({node, path});

            // states
            setFormUpdateHref(node.href);
            setFormUpdateLabel(node.title);
        }
    };

    const onChangeLocale = (selectedIndex) => {
        setCurrentMenuIndex(selectedIndex)
        closeEditModal()
    }

    // Effets

    useEffect(() => {
        if(canSave){
            // Prevent leaving page without saving
            window.onbeforeunload = () => "Êtes vous sûr de vouloir quitter l'éditeur ?";
        } else {
            window.onbeforeunload = null
        }
    }, [canSave]);


    // other
    const defaultLocaleMenu = menus && menus.length && menus.find(menu => menu.locale === "fr")
    const currentLocale = menus[currentMenuIndex].locale

    return (
        <div>
            <Head>
                <title>Admin - Editeur de menu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            {defaultLocaleMenu && <Header menu={defaultLocaleMenu.data}/>}

            {/* Page home */}
            <div className="bg-white p-8 pb-20 max-w-screen-xl mx-auto py-10 px-10 border">

                <h1 className="text-4xl font-bold mb-10">Modifier le menu de navigation</h1>

                <div className="flex">

                    {/* Bottom bar */}
                    <MenuEditorSubmit
                        menuLocales={menus.map(m => m.locale)}
                        form={editableMenus}
                        canSave={canSave}
                        setCanSave={setCanSave}
                    />


                    {/* Sidebar */}
                    <div className="p-5 w-1/3 flex flex-col">
                        <MenuEditorSidebar
                            onAddLinks={onAddLinks}
                            currentMenu={currentMenu}
                            currentLocale={currentLocale}
                            availablePages={availablePages}
                            setAvailablePages={setAvailablePages}
                        />
                    </div>

                    {/* Tree */}
                    <div className="flex-1 p-5">
                        <MenuEditorTree
                            currentLocale={menus[currentMenuIndex].locale}
                            currentMenuData={currentMenu}

                            locales={menus.map(menu => menu.locale)}

                            editedMenuItem={editedMenuItem}

                            onChangeLocale={onChangeLocale}
                            onModifyItem={toggleModifySection}
                            onRemoveItem={removeMenuItem}
                            closeEditModal={closeEditModal}
                            onSubmitEdit={submitModifyMenuItem}
                            onMoveNode={onMoveNode}
                            onVisibilityToggle={onVisibilityToggle}

                            label={formUpdateLabel}
                            href={formUpdateHref}
                            setHref={setFormUpdateHref}
                            setLabel={setFormUpdateLabel}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {

    const {locales} = context
    const menus = await getMenus(locales)

    return {
        props: {
            menu: menus && menus.find(menu => menu.locale === context.defaultLocale),
            menus: menus
        },
    };
}