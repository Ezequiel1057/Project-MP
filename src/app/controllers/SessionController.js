const { User } = require("../models")
const jwt = require('jsonwebtoken');
const authCongif = require("../config/auth");
class SessionController{

    async store(req, res){
        const {email, password, id} = req.body

        const user =  await User.findOne({where:{ email }});

        if(!user){
            return res.status(401).json({error: "Usuario não encontrado"});
        }

        if(!await user.checkPassword(password)){
            return res.status(401).json({error: "Senha Incorreta"});
        }

        //Gera token deveria estar no session controller  ou na camada de modal(USER)
        return res.json({user, token: jwt.sign({ id }, authCongif.secret, {
            expiresIn: authCongif.ttl})
        });




    }
}


module.exports = new SessionController();
