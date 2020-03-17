const express = require('express');
const routes = express.Router();
const multer = require('multer');

// import multerConfig from './config/multer';
const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require("./app/middlewares/auth");

const upload = multer(multerConfig);
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.post('/files', upload.single('file'), (req, res) =>{
    return res.json({ok: true});
})
routes.use(authMiddleware);// rotas a baixo pedem autenticação 
routes.put('/users', UserController.update);

module.exports = routes;
