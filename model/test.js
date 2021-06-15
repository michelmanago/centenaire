import { query } from "../lib/db";

export default async function getTests() {
    const res = await query('SELECT * from test');

    return JSON.parse(JSON.stringify(res));
}