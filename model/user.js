import {query} from '../lib/db';
import {compare, compareSync, hash} from 'bcryptjs';

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

export async function createUser(user) {
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
