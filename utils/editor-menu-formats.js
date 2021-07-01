// utils
import generateUUID from "./generateUUID";

export const fromDBDataToTreedata = menu => {
    let format = (menuItem, index, prefix) => {
        let id = prefix + index;
        let hasChildren = menuItem.subMenu && menuItem.subMenu.length;

        return {
            id: id,
            uuid: menuItem.uuid,
            title: menuItem.label,
            expanded: hasChildren ? true : false,
            href: menuItem.href || '#',
            children:
                hasChildren ? menuItem.subMenu.map((subMenuItem, subIndex) => format(subMenuItem, subIndex, id + '-')) : null,
        };
    };

    return menu.map((menuItem, index) => format(menuItem, index, 'item-'));
};

export const fromTreedataToDBData = menu => {
    let format = (menuItem, index, prefix) => {
        let id = prefix + index;
        let hasChildren = menuItem.children && menuItem.children.length;

        return {
            label: menuItem.title,
            href: menuItem.href || '#',
            uuid: menuItem.uuid,
            subMenu:
                hasChildren ? menuItem.children.map((subMenuItem, subIndex) => format(subMenuItem, subIndex, id + '-')) : null,
        };
    };

    return menu.map((menuItem, index) => format(menuItem, index, 'item-'));
};


export const formatNewMenuItem = (label, href) => {
    
    return {
        uuid: generateUUID(),
        title: label,
        href: href || '#'
    }
}