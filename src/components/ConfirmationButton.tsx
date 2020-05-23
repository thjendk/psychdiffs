import React, { useState } from 'react';
import { Button, ButtonProps, Modal } from 'react-bootstrap';

export interface ConfirmationButtonProps extends ButtonProps {
	onConfirm: Function;
	title: string;
	text: string;
}

const ConfirmationButton: React.SFC<ConfirmationButtonProps> = ({ children, onConfirm, title, text, ...props }) => {
	const [show, setShow] = useState(false);

	return (
		<>
			<Button onClick={() => setShow(true)} {...props}>
				{children}
			</Button>

			<Modal centered show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{text}</Modal.Body>
				<Modal.Footer>
					<Button style={{ width: '100px' }} variant="outline-danger" onClick={() => setShow(false)}>
						Nej
					</Button>
					<Button
						style={{ width: '100px' }}
						variant="outline-success"
						onClick={() => {
							setShow(false);
							onConfirm();
						}}
					>
						Ja
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ConfirmationButton;
