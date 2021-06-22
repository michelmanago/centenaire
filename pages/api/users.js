//import { NextApiHandler } from 'next'
import {query} from '../../lib/db';
import {compare, compareSync, hash} from 'bcryptjs';

export default async function handler(req, res) {
    const {name, email, password, role} = req.body;
    //console.log(name, email, password);
    try {
        if (req.method === 'POST') {
            // Process a POST request
            if (!name || !password) {
                return res.status(400).json({message: '`name` and `password` are both required'});
            }
            hash(password, 10, async function (err, hash) {
                const results = await query(
                    `
                    INSERT INTO user_table (username, email, password, role)
                    VALUES (?, ?, ?, ?)
                    `,
                    [name, email, hash, role],
                );

                return res.json(results);
            });
        } else {
            const results = await query(`
                SELECT * FROM user_table
                ORDER BY id DESC
            `);

            return res.json(results);
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export async function authUser({username, password}) {
    try {
        let user = await query('SELECT * FROM user_table WHERE username LIKE ? AND provider LIKE ?', [
            username,
            'custom',
        ]);
        if (user.length === 0) return null;

        const result = compareSync(password, user[0].password);

        if (result) return user[0];
        else return null;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getUserByEmail(email) {
    try {
        let user = await query('SELECT id, username, email, avatar FROM user_table WHERE email LIKE ?', [email]);
        return user[0];
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function createUer(user) {
    const {username, email, password, provider, avatar} = user;
    try {
        const results = await query(
            `
            INSERT INTO user_table (username, email, password, provider, avatar)
            VALUES (?, ?, ?, ?, ?)
            `,
            [username, email, password, provider, avatar],
        );

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}
