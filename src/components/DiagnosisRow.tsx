import React, { useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ReduxState } from 'slices';
import { DiagnosisContext } from './DiffTable';
import DiffInput from './DiffInput';
import { Divider } from './Layout';
import DiagnosisInput from './DiagnosisInput';
import DifferentialRow from './DifferentialRow';
import Diagnosis from 'classes/diagnosis.model';

export interface DiagnosisRowProps {}

const DiagnosisRow: React.SFC<DiagnosisRowProps> = () => {
	const user = useSelector((state: ReduxState) => state.auth.user);
	const [adding, setAdding] = useState(false);
	const [editing, setEditing] = useState(false);
	const diagnosis = useContext(DiagnosisContext);
	const search = useSelector((state: ReduxState) => state.diagnoses.search);

	const exists = (d: Diagnosis) => {
		if (
			!d.name.toLowerCase().includes(search.toLowerCase()) &&
			!d.icd?.toLowerCase().includes(search.toLowerCase())
		)
			return false;
		return true;
	};

	const isInSearch = () => {
		if (!exists(diagnosis)) return false;
		return true;
	};

	if (!isInSearch()) return null;
	if (editing) return <DiagnosisInput onSubmit={() => setEditing(false)} />;
	return (
		<Card style={{ margin: '5px auto' }}>
			<Card.Header>
				{diagnosis.name} ({diagnosis.icd}, s. {diagnosis.page})
			</Card.Header>
			<Card.Body>
				<p>Tilføjet her:</p>
				<ul>
					{diagnosis.differentialsHere.map((d) => (
						<DifferentialRow belongs differential={d} />
					))}
				</ul>
				<hr />
				<p>Tilføjet fra andre steder:</p>
				<ul>
					{diagnosis.differentialsThere.map((d) => (
						<DifferentialRow differential={d} />
					))}
				</ul>
				{user && (
					<>
						<hr />
						<div style={{ display: 'flex' }}>
							<Button onClick={() => setAdding(!adding)} size="sm" variant="outline-secondary">
								{adding ? 'Annuller' : 'Tilføj differentialdiagnose'}
							</Button>
							<Button
								style={{ marginLeft: '5px' }}
								size="sm"
								variant="outline-info"
								onClick={() => setEditing(!editing)}
							>
								Rediger
							</Button>
						</div>
					</>
				)}
				{adding && (
					<>
						<Divider />
						<DiffInput />
					</>
				)}
			</Card.Body>
		</Card>
	);
};

export default DiagnosisRow;
