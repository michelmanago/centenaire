import { query } from '../lib/db'

export async function getMenu(context){
    
    const menu = await query(`
        SELECT * FROM pagecontent
        WHERE page = ? AND language = ?
        ORDER BY blockid
    `,["menu", context.locale])
    

    const menuRow = menu && menu[0]

    return {
        data: JSON.parse(menuRow.blockcontent),
        id: menuRow.id,
    }
}

// export async function setMenu(menuData, menuLocale){
    
//     const menu = await query(`
//         SELECT * FROM pagecontent
//         WHERE page = ? AND language = ?
//         ORDER BY blockid
//     `,["menu", menuLocale])

//     const menuData = menu && menu[0] && JSON.parse(menu[0].blockcontent)

//     return menuData
// }