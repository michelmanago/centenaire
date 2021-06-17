import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { authUser, createUser, getUserByEmail } from '../../../model/user';

export default NextAuth({
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: {label: 'Username', type: 'text', placeholder: 'jsmith'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                let user = null;
                user = await authUser(credentials);
                if (user) {
                    // Any user object returned here will be saved in the JSON Web Token
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    // Optional SQL or MongoDB database to persist users
    database: {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },

    secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    callbacks: {
        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        // async session(session, user) { return session },
        // async jwt(token, user, account, profile, isNewUser) { return token }
        async signIn(user, account, profile) {
            const userBase = await getUserByEmail(user.email);
            if (!userBase) {
                const userSend = {
                    username: user.name,
                    email: profile.email,
                    provider: account.provider,
                    avatar: profile.image_url,
                };
                const userCreate = await createUser(userSend);
            }
            return true;
        },
        async session(session, user) {

            const userBase = await getUserByEmail(user.email);
            const sendSession = {...session, userBase};

            return sendSession;
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        },
    },
});
