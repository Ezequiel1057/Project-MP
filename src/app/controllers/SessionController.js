const { User } = require("../models")

class SessionController{

    async store(req, res){
        const {email, password} = req.body

        const user =  await User.findOne({where:{ email }});

        if(!user){
            return res.status(400).json({error: "Usuario não encontrado"});
        }

        if(!await user.checkPassword(password)){
            return res.status(400).json({error: "Senha Incorreta"});
        }

        return res.json({user})


    }
}


module.exports = new SessionController();
