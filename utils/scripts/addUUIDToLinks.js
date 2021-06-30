import generateUUID from "../generateUUID"

export default function addUUIDToLinks(menus){


    function traverseLinks(links){        
        return links.map(data => ({
            ...data,
            subMenu: data.subMenu ? traverseLinks(data.subMenu) : undefined,
            uuid: generateUUID()
        }))
    }

    return menus.map(menu => {

        return ({
            ...menu,
            data: traverseLinks(menu.data)

        })

    })

}