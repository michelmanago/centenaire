import prisma from '../lib/prisma';
import {compare, compareSync, hash} from 'bcryptjs';

export async function authUser({username, password}) {
    try {
        let user = await prisma.user_table.findMany({
            where: {
                username,
                provider: 'custom',
            },
        });
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
        // let user = await query('SELECT id, username, email, avatar, role FROM user_table WHERE email LIKE ?', [email]);
        let user = await prisma.user_table.findMany({
            where: {
                email,
            },
        });
        return user[0];
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getUserByHash(hash) {
    try {
        // let user = await query('SELECT id, username, email, avatar, role FROM user_table WHERE hash LIKE ?', [hash]);
        let user = await prisma.user_table.findMany({
            where: {
                hash,
            },
        });
        return JSON.parse(JSON.stringify(user[0]));
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function createUser(user) {
    const {username, email, password, provider, avatar, role} = user;
    try {
        // const results = await query(
        //     `
        //     INSERT INTO user_table (username, email, password, provider, avatar, role)
        //     VALUES (?, ?, ?, ?, ?, ?)
        //     `,
        //     [username, email, password, provider, avatar, role],
        // );

        const res = await prisma.user_table.create({
            data: {
                username,
                email,
                password,
                role,
                provider,
                avatar,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}
