 import express from 'express';
 import user from './controller/registerController.js';
 import selectOne from './controller/registerController.js';
 import login from './controller/loginController.js';

 const router = express.Router();

 router.use('/register', user)
 router.use('/update', user)
 router.use('/selectAll', user)
 router.use('/disable', user)
 router.use('/selectOne', selectOne)
 router.use('/login', login)

 router.use('/*' ,  (req, res) => {
     res.status(404).send({
         message: 'Caminho não encontrado.'
     })
 })

 export default router;