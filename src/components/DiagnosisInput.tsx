import React, { useState, useContext } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import Diagnosis from 'classes/diagnosis.model';
import { DiagnosisContext } from './DiffTable';
import { ReduxState } from 'slices';
import { useSelector } from 'react-redux';

export interface DiagnosisInputProps {
	onSubmit?: Function;
}

const DiagnosisInput: React.SFC<DiagnosisInputProps> = ({ onSubmit }) => {
	const user = useSelector((state: ReduxState) => state.auth.user);
	const [adding, setAdding] = useState(false);
	const diagnosis = useContext(DiagnosisContext);
	const [icd, setIcd] = useState(diagnosis?.icd);
	const [name, setName] = useState(diagnosis?.name);
	const [page, setPage] = useState(diagnosis?.page);

	const clearForm = () => {
		setIcd('');
		setName('');
		setPage('');
	};

	const handleSubmit = async () => {
		await Diagnosis.create({ icd, name, page, id: diagnosis?.id });
		clearForm();
		if (onSubmit) onSubmit();
	};

	const handleClose = () => {
		clearForm();
		setAdding(false);
	};

	if (!user) return null;
	if (!adding)
		return (
			<Button variant="outline-secondary" onClick={() => setAdding(true)} block>
				Tilføj diagnose
			</Button>
		);
	return (
		<Card>
			<Card.Header>Tilføj ny diagnose</Card.Header>
			<Card.Body>
				<Form.Group>
					<Form.Label>Navn</Form.Label>
					<Form.Control value={name} onChange={(e) => setName(e.target.value)} />
				</Form.Group>
				<Form.Group>
					<Form.Label>ICD-10 kode</Form.Label>
					<Form.Control value={icd} onChange={(e) => setIcd(e.target.value)} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Side i ICD-10</Form.Label>
					<Form.Control value={page} onChange={(e) => setPage(e.target.value)} />
				</Form.Group>
				<Form.Group>
					<Button onClick={handleSubmit} block variant="outline-success">
						Tilføj
					</Button>
				</Form.Group>
				<Form.Group>
					<Button onClick={handleClose} block variant="outline-secondary">
						Annuller
					</Button>
				</Form.Group>
			</Card.Body>
		</Card>
	);
};

export default DiagnosisInput;
