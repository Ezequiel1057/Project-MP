const { User } = require('../models');

class UserController {
	async store(req, res) {
		const { email, cpf, password, confirm_password, user_name } = req.body;
		console.log(email);
		console.log(cpf);

		if (await User.findOne({ where: { email } })) {
			return res.status(400).json({ error: 'Já existe um Cadastro com esse email' });
		}

		if (await User.findOne({ where: { user_name } })) {
			return res.status(400).json({ error: 'Nome de usuario indisponivel' });
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
}

module.exports = new UserController();
