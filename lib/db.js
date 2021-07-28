import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
    },
})

export async function query(q, values) {
    try {
        const results = await db.query(q, values)
        await db.end()
        return results
    } catch (e) {
        console.log("before")
        console.log(e)
        console.log("after")
        throw new Error(e.sqlMessage ? e.message : e.sqlMessage)
    }
}