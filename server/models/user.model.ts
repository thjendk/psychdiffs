import { Model } from 'objection';

interface User {
	userId: number;
}

class User extends Model {}

export default User;
