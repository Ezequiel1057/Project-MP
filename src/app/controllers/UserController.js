const { User } = require('../models');

class UserController {
	async store(req, res) {
		const { email, cpf, password, confirm_password, user_name } = req.body;

		if (await User.findOne({ where: { email } })) {
			return res.status(400).json({ error: 'Já existe um Cadastro com esse email' });
		}

		if (await User.findOne({ where: { user_name } })) {
			return res.status(400).json({ error: 'Já existe um Cadastro com esse Nome de usuario' });
		}

		if (await User.findOne({ where: { cpf } })) {
			return res.status(400).json({ error: 'Já existe um Cadastro com esse CPF' });
		}

		if ((await password) != confirm_password) {
			return res.status(400).json({ error: 'Senha e confirmar senha devem ser iguais' });
		}

		const user = await User.create(req.body);

		return res.json(user);
	}


	async update(req, res){
		const {email, oldPassword } = req.body

		const user = await User.findByPk(req.userId);
		
		if(email != user.email){

			if (await User.findOne({ where: { email } })) {
				return res.status(401).json({ error: 'Já existe um Cadastro com esse email' });
			}
		}

		
		if(oldPassword && !(await user.checkPassword(oldPassword))){
			return res.status(401).json({error: "Senha atual incorreta"})
		}

		 const newUser = await user.update(req.body);

		return res.status(200).json(newUser);
	}
}

module.exports = new UserController();
