import nodemailer from 'nodemailer';

async function sendEmail(message) {
    return new Promise((res, rej) => {
        try {
            /*const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_PROVIDER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });*/
            const transporter = nodemailer.createTransport({
                host: 'mail.gandi.net',
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: process.env.EMAIL_PROVIDER,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            });

            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    rej(error);
                } else {
                    console.log('Server is ready to take our messages');
                }
            });

            transporter.sendMail(message, function (err, info) {
                if (err) {
                    rej(err);
                } else {
                    res(info);
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    });
}

export const sendConfirmationEmail = function ({toUser, hash}) {
    const message = {
        /*from: process.env.GOOGLE_USER,
        // to: toUser.email // in production uncomment this
        to: process.env.GOOGLE_USER,
        subject: 'Your App - Activate Account',
        html: `
        <h3> Hello ${toUser.username} </h3>
        <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
        <p>Cheers</p>
        <p>Your Application Team</p>
      `,*/
        from: `${process.env.EMAIL_PROVIDER}`,
        to: `${toUser.email}`,
        subject: `Eglise Russe Ste Genevieve Des Bois - Activé votre compte`,
        html: `
            <h3> Bonjour ${toUser.name} </h3>
            <p>Merci de vous être inscrit sur le site du cimetière de l'église russe de sainte Genevieve des Bois.</p>
            <p>Pour activer votre compte, merci de suivre le lien suivant: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">lien d'activation</a></p>
            <p>Merci d'avance</p>
        `,
    };

    return sendEmail(message);
};

export const sendResetPasswordEmail = ({toUser, hash}) => {
    const message = {
        from: `${process.env.EMAIL_PROVIDER}`,
        to: toUser.email, // in production uncomment this
        //to: process.env.GOOGLE_USER,
        subject: 'Centenaire - Réinitialisation du mot de passe',
        html: `
            <h3>Bonjour ${toUser.username} </h3>
            <p>Pour réinisialiser votre mot de passe, merci de suivre ce lien: <a target="_" href="${process.env.DOMAIN}/newpassword/${hash}">Réinitialisation du mot de passe</a></p>
            <p>Merci d'avance</p>
            <p>L'équipe technique</p>
        `,
    };

    return sendEmail(message);
};
