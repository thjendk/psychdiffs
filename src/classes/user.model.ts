import { User as UserType, LoginInput } from 'types/generated';
import { gql } from '@apollo/client';
import Apollo from './apollo.model';
import { store } from 'index';
import authReducer from 'slices/auth.slice';

interface User extends UserType {}

class User {
	static fragment = gql`
		fragment User on User {
			id
			username
		}
	`;

	static fetch = async () => {
		const query = gql`
			query User {
				user {
					...User
				}
			}
			${User.fragment}
		`;

		const user = await Apollo.query<User>('user', query);
		return store.dispatch(authReducer.actions.setUser(user));
	};

	static login = async (data: LoginInput) => {
		const mutation = gql`
			mutation Login($data: LoginInput) {
				login(data: $data)
			}
		`;

		await Apollo.mutate('login', mutation, { data });
		await User.fetch();
	};

	static logout = async () => {
		const mutation = gql`
			mutation logout {
				logout
			}
		`;

		await Apollo.mutate('logout', mutation);
		await User.fetch();
	};
}

export default User;
