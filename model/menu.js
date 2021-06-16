import { query } from '../lib/db'

export async function getMenu(context){
    
    const menu = await query(`
        SELECT * FROM pagecontent
        WHERE page = ? AND language = ?
        ORDER BY blockid
    `,["menu", context.locale])

    const menuData = menu && menu[0] && JSON.parse(menu[0].blockcontent)

    return menuData
}