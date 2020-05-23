import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import User from 'classes/user.model';
import { useHistory } from 'react-router-dom';
import LoadingButton from './LoadingButton';

export interface LoginProps {}

const Login: React.SFC<LoginProps> = () => {
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		try {
			await User.login({ username, password });
			history.push('/');
		} catch (error) {}
		setLoading(false);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Card style={{ minWidth: '400px' }}>
				<Card.Header style={{ textAlign: 'center' }}>
					<Card.Title>Login</Card.Title>
				</Card.Header>
				<Card.Body>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<Form.Group>
							<Form.Label>Brugernavn</Form.Label>
							<Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Kodeord</Form.Label>
							<Form.Control
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
							/>
						</Form.Group>
						<Form.Group>
							<LoadingButton
								loading={loading}
								onClick={handleSubmit}
								type="submit"
								block
								variant="outline-success"
							>
								Login
							</LoadingButton>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Login;
