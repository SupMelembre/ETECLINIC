import express from 'express';
import db from '../service/registerService.js';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/',[
    body('email').isEmail().withMessage('Informe um email válido.'),
    body('password').isLength({min: 8}).withMessage('Informe uma senha com no mínimo 8 caracteres.'),
    body('password').isNumeric().withMessage('A senha deve ser númerica.'),
    body('userName').custom((userName) => {
        if(userName !== 'Gabriel') {
            return Promise.reject('Nome de usuário invalido.');
        }
        return true;
    })
] ,async(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).send({errros: errors.array()})
    }

    //Para cadastrar informe email, senha e nome de usuário.

    const {email, password, userName} = req.body;

    try {
        await db.insertUser(email, password, `usuario.${userName}`);
        res.status(201).send({message: 'Usuário cadastrado com sucesso'});
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`})
    }
});

router.put('/', (req, res) => {

    const {email, password, userName, id_login} = req.body;

    db.updateUser(email, password, userName, id_login);
})

router.get('/', (req, res) => {
    db.selectUsers();
})

router.get('/', (req, res) => {
    const email = req.body.email;
    db.selectUser(email);
})

router.delete('/', (req, res) => {

    const id_login = req.body.id_login;
    db.deleteUser(id_login);
})

export default router;