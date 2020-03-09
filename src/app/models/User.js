const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authCongif = require("../config/auth")


module.exports = (sequelize, Datatypes) => {
	const User = sequelize.define(
		'User',
		{
			name: Datatypes.STRING,
			email: Datatypes.STRING,
			cpf: Datatypes.STRING,
			user_name: Datatypes.STRING,
			birth_date: Datatypes.STRING,
			password: Datatypes.VIRTUAL,
			confirm_password: Datatypes.VIRTUAL,
			password_hash: Datatypes.STRING
		},
		{
			hooks: {
				beforeSave: async user => {
					if (user.password) {
						user.password_hash = await bcrypt.hash(user.password, 8);
					}
				}
			}
		}
	);

	User.prototype.checkPassword = function(password) {
		return bcrypt.compare(password, this.password_hash);
	};

	
	return User;
};
