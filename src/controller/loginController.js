import express from 'express';
import db from '../service/loginService.js';
import { generatePassword, generatedToken, sendEmail } from '../helpers/userFeatures.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const {userEmail, password} = req.body;

    try{
    const usersFind = await db.login(userEmail, password);
    if(usersFind.length > 0) {

        const {id_login, usuario} = usersFind[0]

        const token = generatedToken(id_login, usuario);
        res.status(200).send({
            message: 'Login efetuado com sucesso.', token
        })} else {
            res.status(401).send({
                messagem: 'Login incorreto.'
            })}
    } catch (err) {
        res.status(500).send({message: 'Internal server error.'});
    }
});

router.post('/reset', async (req, res) => {
    const {userEmail} = req.body;
    const newPassword = generatePassword();

    try {
    await db.changePassword(newPassword, userEmail);
    sendEmail(userEmail, 'Gabriel Assoria', newPassword);
    res.status(200).send({message: 'Senha alterada com sucesso. Enviada no seu email'});
    } catch(err) {
        res.status(500).send({message: 'Internal Server Error'});
    }
});

export default router;