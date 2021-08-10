import { selectAllCategories } from "../dao/category";

export async function getAllCategories(){

    const categories = await selectAllCategories()

    return categories

} 