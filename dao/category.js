import { query } from "../lib/db";

export async function selectAllCategories(){

    const res = await query(`
        SELECT * FROM category
    `)

    return JSON.parse(JSON.stringify(res))

}