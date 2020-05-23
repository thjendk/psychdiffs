import React from 'react';
import { ButtonProps, Button, Spinner } from 'react-bootstrap';

export interface LoadingButtonProps extends ButtonProps {
	onClick: Function;
	loading: boolean;
}

const LoadingButton: React.SFC<LoadingButtonProps> = ({ onClick, children, loading, ...props }) => {
	return (
		<Button disabled={loading} onClick={() => onClick()} {...props}>
			{loading ? <Spinner size="sm" animation="grow" /> : children}
		</Button>
	);
};

export default LoadingButton;
