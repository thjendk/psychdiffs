import React, { useEffect } from 'react';
import DiffTable from 'components/DiffTable';
import Layout from 'components/Layout';
import { Switch, Route } from 'react-router-dom';
import Login from 'components/Login';
import Logout from 'components/Logout';
import User from 'classes/user.model';

function App() {
	useEffect(() => {
		User.fetch();
	}, []);

	return (
		<Layout>
			<Switch>
				<Route path="/logout" component={Logout} />
				<Route path="/login" component={Login} />
				<Route path="/" component={DiffTable} />
			</Switch>
		</Layout>
	);
}

export default App;
