// libs
import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {changeNodeAtPath, removeNodeAtPath} from 'react-sortable-tree';

// components
import Header from '../components/header/header';
import MenuEditorSubmit from '../components/editor-menu/inputs/MenuEditorSubmit';
import MenuEditorTree from '../components/editor-menu/tree/menu-editor-tree';

// models
import {getMenus} from '../model/menu';
import MenuEditorSidebar from '../components/editor-menu/sidebar/MenuEditorSidebar';

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


export default function EditorMenu({menus}) {
    
    // states
    const [canSave, setCanSave] = useState(false)
    const [currentMenuIndex, setCurrentMenuIndex] = useState(0)
    const [editableMenus, setEditableMenus] = useState(menus && menus.map(menu => fromDBDataToTreedata(menu ? menu.data : [])))
    const currentMenu = editableMenus ? editableMenus[currentMenuIndex] : null
    // create form
    // update form
    const [editedMenuItem, setEditedMenuItem] = useState(null);
    const [formUpdateLabel, setFormUpdateLabel] = useState('');
    const [formUpdateHref, setFormUpdateHref] = useState('');

    // menu locale
    const [locale, setLocale] = useState(null)

    // utils
    const getNodeKey = ({treeIndex}) => treeIndex;
    const updateCurrentMenuState = nextState => setEditableMenus(editableMenus.map((menu, menuIndex) => menuIndex === currentMenuIndex ? nextState : menu))
    const closeEditModal = () => {
        // close form
        setEditedMenuItem(null);

        // reset
        setFormUpdateHref('');
        setFormUpdateLabel('');
    }


    // listeners

    // via tree

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
            
            console.log("ffafa")
            closeEditModal()
            
        }
    }

    const onChangeTreedata = treeData => {
        updateCurrentMenuState(treeData)

        if(!canSave){
            setCanSave(true)
        }
    }

    const removeMenuItem = path => {

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

    const toggleModifySection = (node, path) => {
        

        // close
        if (editedMenuItem && editedMenuItem.node.id === node.id) {
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

    // useEffect(() => {
    //     if(canSave){
    //         // Prevent leaving page without saving
    //         window.onbeforeunload = () => "Êtes vous sûr de vouloir quitter l'éditeur ?";
    //     } else {
    //         window.onbeforeunload = null
    //     }
    // }, [canSave]);


    // other
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
            <div className="bg-white p-8 pb-20">

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
                            editedItem={editedMenuItem}
                            canSave={canSave}
                            setCanSave={setCanSave}
                            updateCurrentMenuState={updateCurrentMenuState}
                            currentMenu={currentMenu}
                        />
                    </div>

                    {/* Tree */}
                    <div className="flex-1 p-5">
                        <MenuEditorTree
                            currentLocale={menus[currentMenuIndex].locale}
                            currentMenuData={currentMenu}

                            locales={menus.map(menu => menu.locale)}

                            editedMenuItem={editedMenuItem}

                            onChangeTreedata={onChangeTreedata}
                            onChangeLocale={onChangeLocale}
                            onModifyItem={toggleModifySection}
                            onRemoveItem={removeMenuItem}
                            closeEditModal={closeEditModal}
                            onSubmitEdit={submitModifyMenuItem}

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
