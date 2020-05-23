import React, { useEffect } from 'react';
import User from 'classes/user.model';
import { useHistory } from 'react-router-dom';

export interface LogoutProps {}

const Logout: React.SFC<LogoutProps> = () => {
	const history = useHistory();

	useEffect(() => {
		User.logout().then(() => {
			history.push('/');
		});
	}, [history]);

	return null;
};

export default Logout;
