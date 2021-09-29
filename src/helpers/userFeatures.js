import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { config } from './smtp.js'

const transport = nodemailer.createTransport(config);

function generatePassword() {
    const key = (Math.random() + 1).toString(36).substring(2);
    
    const newPassword = key
    .replace('a', '@')
    .replace('w', '!')
    .replace('n', '#')
    .replace('q', '$')

    return newPassword;
}

function generatedToken(id_login, usuario) {
    const secret = '$dinheiro$'

    return jwt.sign({infoUser: {
        id_login,
        usuario
    }}, secret, {expiresIn: 60 * 60 * 5})
}

function sendEmail(email, name, password) {
    transport.sendMail({
        subject: 'Redefinição de Senha - Eteclinic',
        from:    'Suporte Eteclinic <httpg44b@gmail.com>',
        to:      email,
        html: `
        <html>
           <body>
              <p>Olá, ${name}! Tudo bem?</p>
              <p>Você solicitou uma redefinição de senha para acessar
              o site Eteclinic.</p>
              <p>Sua nova senha de acesso é: <strong>${password}</strong></p>
           </body>
        </html
        `
    });
}

export {generatePassword, generatedToken, sendEmail};