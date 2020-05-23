import React from 'react';
import { StyledMenu } from 'components/Header';

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => {
	return (
		<footer>
			<StyledMenu>
				<strong style={{ width: '100%', textAlign: 'center' }}>Af Thomas Jensen</strong>
			</StyledMenu>
		</footer>
	);
};

export default Footer;
