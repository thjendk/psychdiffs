import { Model } from 'objection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secret = process.env.SECRET || '';

interface User {
	id: number;
	username: string;
	password: string;
}

class User extends Model {
	static tableName = 'users';

	$beforeInsert() {
		this.password = bcrypt.hashSync(this.password, 10);
	}

	verify(password: string) {
		return bcrypt.compare(password, this.password);
	}

	signToken() {
		const { id, username } = this;

		return jwt.sign({ id, username }, secret);
	}
}

export default User;
