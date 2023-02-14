import prisma from '../lib/prisma';
export async function selectAllCategories() {
    const res = await prisma.category.findMany();
    return JSON.parse(JSON.stringify(res));
}
