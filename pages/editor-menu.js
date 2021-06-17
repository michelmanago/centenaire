// libs
import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import SortableTree, {changeNodeAtPath, getVisibleNodeCount, removeNodeAtPath} from 'react-sortable-tree';

// components
import Header from '../components/header/header';
import {RemoveButton, UpdateButton, CloseButton} from '../components/editor-menu/editor-menu-buttons';
import FormMenuItem from '../components/editor-menu/editor-menu-form';

// models
import {getMenus} from '../model/menu';

const HEADER_NAV_DATA = [
    {
        label: 'Historique',
        href: '#',
        subMenu: [{label: 'Avant 1917', href: '/', subMenu: [{label: 'XXXX  - - Avant 1917', href: '/'}]}],
    },
    {
        label: 'Personnalités',
        href: '#',
        subMenu: [
            {label: 'Les saints', href: '/saints'},
            {label: 'Les primats', href: '/'},
            {label: 'Les évêques', href: '/'},
            {label: 'Les maîtres spirituels', href: '/maitrespirituels'},
            {label: 'Les laïcs', href: '/'},
        ],
    },
    {
        label: 'Paroisses',
        href: '#',
        subMenu: [
            {
                label: 'Liste de toutes les paroisses actuelles',
                href: '/paroisses',
                subMenu: [
                    {label: 'Notre-Dame Souveraine à Chaville', href: '/'},
                    {label: 'Notre Dame de la Dormition', href: '/'},
                    {label: 'Cathédrale Saint Alexandre Nevski', href: '/'},
                ],
            },
            {
                label: 'Profil des paroisses les plus typiques/intéressantes/ dynamiques (critères de sélection à débattre)',
                href: '/',
            },
            {label: 'La vie quotidienne', href: '/'},
        ],
    },
    {
        label: 'la théologie',
        href: '#',
        subMenu: [
            {label: "l'Institut Saint-Serge", href: '/'},
            {label: 'les grands théologiens et philosophes', href: '/'},
            {label: 'la querelle de la sophiologie', href: '/'},
            {label: 'les publications', href: '/'},
        ],
    },
    {
        label: 'Patrimoine artistique',
        href: '#',
        subMenu: [
            {label: 'les monuments historiques', href: '/'},
            {label: "l' œuvre architecturale", href: '/'},
            {label: 'les iconographes', href: '/'},
            {label: 'les compositeurs de musique liturgique', href: '/compositeurs'},
            {label: "artistes ayant collaboré à la vie culturelle de l'archevêché", href: '/'},
            {label: 'œuvre artistique mettant en valeur la vie des églises', href: '/'},
        ],
    },
    {
        label: "l'action culturelle",
        href: '#',
        subMenu: [
            {label: 'Les écoles paroissiales', href: '/'},
            {label: 'YMCA Press et les Editeurs Réunis', href: '/'},
            {label: 'les mouvements de jeunesse', href: '/'},
            {label: 'l’émission Orthodoxie', href: '/'},
            {label: 'Les pèlerinages', href: '/'},
        ],
    },
    {
        label: 'l’oecuménisme',
        href: '/',
    },
];

// format
const fromDBDataToTreedata = menu => {
    let format = (menuItem, index, prefix) => {
        let id = prefix + index;
        let hasChildren = menuItem.subMenu && menuItem.subMenu.length;

        return {
            id: id,
            title: menuItem.label,
            expanded: hasChildren ? true : false,
            href: menuItem.href || '#',
            children:
                hasChildren && menuItem.subMenu.map((subMenuItem, subIndex) => format(subMenuItem, subIndex, id + '-')),
        };
    };

    return menu.map((menuItem, index) => format(menuItem, index, 'item-'));
};

const fromTreedataToDBData = menu => {
    let format = (menuItem, index, prefix) => {
        let id = prefix + index;
        let hasChildren = menuItem.children && menuItem.children.length;

        return {
            label: menuItem.title,
            href: menuItem.href || '#',
            subMenu:
                hasChildren && menuItem.children.map((subMenuItem, subIndex) => format(subMenuItem, subIndex, id + '-')),
        };
    };

    return menu.map((menuItem, index) => format(menuItem, index, 'item-'));
};

export default function EditorMenu({menus}) {
    
    // states
    const [canSave, setCanSave] = useState(false)
    const [currentMenuIndex, setCurrentMenuIndex] = useState(0)
    const [editableMenus, setEditableMenus] = useState(menus && menus.map(menu => fromDBDataToTreedata(menu ? menu.data : [])))
    const currentMenu = editableMenus ? editableMenus[currentMenuIndex] : null

    // create form
    const [formCreateLabel, setFormCreateLabel] = useState('');
    const [formCreateHref, setFormCreateHref] = useState('');
    // update form
    const [editedMenuItem, setEditedMenuItem] = useState(null);
    const [formUpdateLabel, setFormUpdateLabel] = useState('');
    const [formUpdateHref, setFormUpdateHref] = useState('');

    // menu locale
    const [locale, setLocale] = useState(null)

    // utils
    const getNodeKey = ({treeIndex}) => treeIndex;
    const updateCurrentMenuState = nextState => setEditableMenus(editableMenus.map((menu, menuIndex) => menuIndex === currentMenuIndex ? nextState : menu))
    const closeModifyForm = () => {
        // close form
        setEditedMenuItem(null);

        // reset
        setFormUpdateHref('');
        setFormUpdateLabel('');
    }
    const formatNewMenuItem = (label, href) => {
        
        return {
            id: "new-item" + currentMenu.length,
            title: label,
            expanded: false,
            href: href || '#',
            children: []
        }
    }

    // listeners

    // via tree

    const onChangeTreedata = treeData => {
        updateCurrentMenuState(treeData)

        if(!canSave){
            setCanSave(true)
        }
    }

    const removeMenuItem = path => {

        console.log({path})
        if (confirm('Êtes vous sûr ? ')) {

            // update current state menu
            updateCurrentMenuState(removeNodeAtPath({
                treeData: currentMenu,
                path,
                getNodeKey,
            }))

            if(!canSave){
                setCanSave(true)
            }
        }
    };

    const modifiyMenuItem = (node, path) => {
        // close
        if (editedMenuItem && editedMenuItem.node.id === node.id) {
            closeModifyForm()
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

    // form
    const submitAddMenuItem = (stateLabel, stateHref) => {
        if (formCreateHref && formCreateLabel) {
            // add new item
            // update current state menu
            
            updateCurrentMenuState(
                [formatNewMenuItem(formCreateLabel, formCreateHref)].concat(currentMenu)
            )
            
            // // reset
            setFormCreateHref('');
            setFormCreateLabel('');

            if(!canSave){
                setCanSave(true)
            }
        }
    };

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
            
        }
    }

    const onSubmitSave = async () => {

        if(confirm("Êtes vous sûr de vouloir sauvegarder les nouveaux menus ? ")){

            let menusData = editableMenus.map((menu, menuIndex) => ({
                locale: menus[menuIndex].locale,
                data: fromTreedataToDBData(menu)
            }))

            let promiseSettingMenu = menusData.map(menuDataItem => 
                fetch("/api/menu", {
                    method: "PUT",
                    body: JSON.stringify(menuDataItem) 
                }).then(response => {
                    if(response.ok){
                        return response.json()
                    } else {
                        throw new Error(response.statusText);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            )

            let responses = await Promise.all(promiseSettingMenu)

            alert("Menus sauvegardé")

        }
    }

    const toggleTab = (selectedIndex) => {
        setCurrentMenuIndex(selectedIndex)
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
    const count = getVisibleNodeCount({treeData: currentMenu})
    const defaultLocaleMenu = menus && menus.length && menus.find(menu => menu.locale === "fr")

    return (
        <div>
            <Head>
                <title>Admin - Editeur de menu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            {defaultLocaleMenu && <Header menu={defaultLocaleMenu.data}/>}

            {/* Page home */}
            <div className="border p-8">

                <h1 className="text-4xl font-bold mb-10">Modifier le menu de navigation</h1>

                <div className="flex border">

                    {/* Column create/edit/save */}
                    <div className="p-5 w-1/4 flex flex-col">

                        {/* Form create */}
                        {!editedMenuItem && (
                            <FormMenuItem
                                // text
                                formTitle="Ajouter un lien"
                                formSubmitLabel="Ajouter au menu"
                                // submit
                                onSubmit={submitAddMenuItem}
                                // values
                                label={formCreateLabel}
                                onLabelChange={setFormCreateLabel}
                                href={formCreateHref}
                                onHrefChange={setFormCreateHref}
                            />
                        )}

                        {/* Form modify */}
                        {editedMenuItem && (
                            <FormMenuItem
                                // text
                                formTitle="Modifier un lien"
                                formSubmitLabel="Modifier le lien"
                                // submit
                                onSubmit={submitModifyMenuItem}
                                // values
                                label={formUpdateLabel}
                                onLabelChange={setFormUpdateLabel}
                                href={formUpdateHref}
                                onHrefChange={setFormUpdateHref}

                                afterSubmit={
                                    <CloseButton
                                        onClick={closeModifyForm}
                                    />
                                }
                            />
                        )}

                        {/* Save */}
                        <button 
                            onClick={onSubmitSave}
                            disabled={!canSave}
                            className={"mt-10 bg-blue-700 rounded px-5 py-4 text-2xl text-white font-bold " + (
                                canSave ? 
                                    "hover:bg-blue-800" 
                                    : "bg-gray-300 opacity-50 cursor-not-allowed"
                            )}
                        >Sauvegarder</button>
                    </div>

                    <div className="flex-1 p-5">

                        {/* Tabs */}
                        <div className="flex">
                            {
                                menus.map((menu, menuIndex) => {
                                    
                                    const isCurrentTab = menus[currentMenuIndex].locale === menu.locale

                                    return (
                                        <button
                                            onClick={() => toggleTab(menuIndex)}
                                            className={"w-1/8 h-10 px-6 uppercase rounded-t-lg text-lg " + (isCurrentTab ? "bg-purple-400 font-semibold" : "bg-purple-200")}
                                        >{menu.locale}</button>
                                    )

                                })
                            }
                        </div>
                                
                        {/* Tree */}
                        <div style={{height: count * 62}} className="">
                            <SortableTree
                                treeData={currentMenu}
                                onChange={onChangeTreedata}
                                generateNodeProps={({node, path}) => {
                                    let isEditing = editedMenuItem && editedMenuItem.node.id === node.id;

                                    return {
                                        buttons: [
                                            <UpdateButton
                                                label={isEditing ? 'Fermer' : 'Modifier'}
                                                onClick={() => modifiyMenuItem(node, path)}
                                            />,
                                            <RemoveButton onClick={() => removeMenuItem(path)} />,
                                        ],
                                        style: {
                                            boxShadow: isEditing ? '0 0 0 4px #34D399' : '',
                                        },
                                    };
                                }}
                            />
                        </div>
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
