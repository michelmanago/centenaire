//import { NextApiHandler } from 'next'
import prisma from '../../lib/prisma';
import {compare, compareSync, hash} from 'bcryptjs';
import {createUser} from '../../model/user';

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
                // const results = await query(
                //     `
                //     INSERT INTO user_table (username, email, password, role)
                //     VALUES (?, ?, ?, ?)
                //     `,
                //     [name, email, hash, role],
                // );

                let results = await createUser({username: name, email, password: hash, role, provider: 'custom'});

                return res.json(results);
            });
        } else {
            // const results = await query(`
            //     SELECT * FROM user_table
            //     ORDER BY id DESC
            // `);
            const results = await prisma.user_table.findMany();

            return res.json(results);
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
