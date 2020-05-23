import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from 'slices';

export interface HeaderProps {}

export const StyledMenu = styled.div`
	background-color: darkgreen;
	margin: 0;
	width: 100%;
	text-align: center;
	color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const MenuItem = styled.div`
	margin: 0;
	padding: 5px 10px;
	white-space: nowrap;
	cursor: ${(props) => (props.onClick ? 'pointer' : null)};

	:hover {
		background-color: ${(props) => (props.onClick ? '#005700' : null)};
	}
`;

const Header: React.SFC<HeaderProps> = () => {
	const history = useHistory();
	const user = useSelector((state: ReduxState) => state.auth.user);

	return (
		<header>
			<StyledMenu>
				<MenuItem onClick={() => history.push('/')} style={{ width: '100%', textAlign: 'center' }}>
					<strong>Psyk Differentialdiagnoser</strong>
				</MenuItem>
				{!user && <MenuItem onClick={() => history.push('/login')}>Login</MenuItem>}
				{user && <MenuItem onClick={() => history.push('/logout')}>Log ud</MenuItem>}
			</StyledMenu>
		</header>
	);
};

export default Header;
