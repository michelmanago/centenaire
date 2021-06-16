// libs
import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import SortableTree, {changeNodeAtPath, removeNodeAtPath} from 'react-sortable-tree';

// components
import Header from '../components/header/header';

// models
import {getMenu} from '../model/menu';

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
const getMenuDataToTree = menu => {
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

const getTreeDataToMenuData = menu => {
    let format = (menuItem, index, prefix) => {
        let id = prefix + index;
        let hasChildren = menuItem.children && menuItem.children.length;

        return {
            title: menuItem.label,
            href: menuItem.href || '#',
            subMenu:
                hasChildren && menuItem.children.map((subMenuItem, subIndex) => format(subMenuItem, subIndex, id + '-')),
        };
    };

    return menu.map((menuItem, index) => format(menuItem, index, 'item-'));
};

export default function EditorMenu({menu}) {
    
    // states
    const [editableMenu, setEditableMenu] = useState(getMenuDataToTree(menu.data));

    // create
    const [formCreateLabel, setFormCreateLabel] = useState('');
    const [formCreateHref, setFormCreateHref] = useState('');
    // update
    const [editedMenuItem, setEditedMenuItem] = useState(null);
    const [formUpdateLabel, setFormUpdateLabel] = useState('');
    const [formUpdateHref, setFormUpdateHref] = useState('');

    // utils
    const getNodeKey = ({treeIndex}) => treeIndex;

    // methods

    // via tree
    const removeTreeItem = path => {
        if (confirm('Êtes vous sûr ? ')) {
            setEditableMenu(
                removeNodeAtPath({
                    treeData: editableMenu,
                    path,
                    getNodeKey,
                }),
            );
        }
    };

    const modifiyMenuItem = (node, path) => {
        // close
        if (editedMenuItem && editedMenuItem.node.id === node.id) {
            // close form
            setEditedMenuItem(null);

            // reset
            setFormUpdateHref('');
            setFormUpdateLabel('');
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
            setEditableMenu(
                editableMenu.concat({
                    title: formCreateLabel,
                }),
            );

            // // reset
            setFormCreateHref('');
            setFormCreateLabel('');
        }
    };

    const submitModifyMenuItem = () => {
        if (formUpdateHref && formUpdateLabel) {
            console.log('x');

            let {path, node} = editedMenuItem;

            setEditableMenu(
                changeNodeAtPath({
                    treeData: editableMenu,
                    path,
                    getNodeKey,
                    newNode: {
                        ...node,
                        title: formUpdateLabel,
                        href: formUpdateHref,
                    },
                }),
            );
        }
    }

    const onSubmitSave = () => {

        let menuData = getTreeDataToMenuData(editableMenu)
        menuData = JSON.stringify(menuData)

        alert(menuData)
    }

    // Effets

    useEffect(() => {
        // Prevent leaving page without saving
        // window.onbeforeunload = () => "Êtes vous sûr de vouloir quitter l'éditeur ?";
    }, []);


    // other
    const canSave = true

    return (
        <div>
            <Head>
                <title>Editeur - Menu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            <Header menu={menu.data} />

            {/* Page home */}
            <div className="border p-8">

                <h1 className="text-4xl font-bold mb-10">Modifier le menu de navigation</h1>

                <div className="flex">

                    {/* Column create/edit/save */}
                    <div className="p-5 w-1/4 flex flex-col justify-between">

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
                            />
                        )}

                        {/* Save */}
                        <button 
                            onClick={onSubmitSave}
                            disabled={!canSave}
                            className={"mt-auto bg-blue-700 rounded px-5 py-4 text-2xl text-white font-bold " + (
                                canSave ? 
                                    "hover:bg-blue-800" 
                                    : "bg-gray-300 opacity-50 cursor-not-allowed"
                            )}
                        >Sauvegarder</button>
                    </div>

                    {/* Tree */}
                    <div style={{height: 500}} className="border flex-1 p-5">
                        <SortableTree
                            treeData={editableMenu}
                            onChange={treeData => setEditableMenu(treeData)}
                            generateNodeProps={({node, path}) => {
                                let isEditing = editedMenuItem && editedMenuItem.node.id === node.id;

                                return {
                                    buttons: [
                                        <UpdateButton
                                            label={isEditing ? 'Fermer' : 'Modifier'}
                                            onClick={() => modifiyMenuItem(node, path)}
                                        />,
                                        <RemoveButton onClick={() => removeTreeItem(path)} />,
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
    );
}

// Forms
const FormMenuItem = ({
    formTitle,
    formSubmitLabel,

    onSubmit,

    label,
    onLabelChange,
    href,
    onHrefChange,
}) => {
    return (
        <form>
            <p className="text-xl mb-4 font-bold text-2xl">{formTitle}</p>
            <hr className="mb-5" />

            <div className="flex items-center mb-5">
                <label className="font-semibold w-1/3" htmlFor="inputLabel">
                    Label
                </label>
                <input
                    value={label}
                    onChange={event => onLabelChange(event.target.value)}
                    className="ml-auto bg-gray-100 p-3 rounded w-full"
                    type="text"
                    id="inputLabel"
                    placeholder="Titre de page"
                />
            </div>

            {/* URL */}
            <div className="flex items-center">
                <label className="font-semibold w-1/3" htmlFor="inputHref">
                    URL
                </label>
                <input
                    value={href}
                    onChange={event => onHrefChange(event.target.value)}
                    className="ml-auto bg-gray-100 p-3 rounded w-full"
                    type="text"
                    id="inputHref"
                    placeholder="https://"
                />
            </div>

            <button
                type="button"
                onClick={onSubmit}
                className="bg-green-400 hover:bg-green-500 p-3 rounded text-white font-semibold text-lg mt-10"
            >
                {formSubmitLabel}
            </button>
        </form>
    );
};

// Buttons
const RemoveButton = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center bg-red-600 text-white border rounded px-3 py-0 hover:bg-red-800"
        >
            Retirer
        </button>
    );
};

const UpdateButton = ({onClick, label = 'Modifier'}) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center bg-gray-600 text-white border rounded px-3 py-0 hover:bg-gray-700"
        >
            {label}
        </button>
    );
};

export async function getStaticProps(context) {
    const menu = await getMenu(context);

    return {
        props: {
            menu: menu,
        },
    };
}
