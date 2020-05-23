import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

export interface LayoutProps {}

const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

export const Divider = styled.div<{ small?: boolean }>`
	width: 100%;
	height: ${(props) => (props.small ? '5px' : '1rem')};
`;

const Layout: React.SFC<LayoutProps> = ({ children }) => {
	return (
		<StyledLayout>
			<Header />
			<div style={{ maxWidth: 1200, margin: '1rem auto', width: '100%' }}>{children}</div>
			<div style={{ flexGrow: 1 }} />
			<Footer />
		</StyledLayout>
	);
};

export default Layout;
