import React, { useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ReduxState } from 'slices';
import { DiagnosisContext } from './DiffTable';
import DiffInput from './DiffInput';
import { Divider } from './Layout';
import DiagnosisInput from './DiagnosisInput';
import DifferentialRow from './DifferentialRow';
import { subDifferentials } from 'utils';

export interface DiagnosisRowProps {}

const DiagnosisRow: React.SFC<DiagnosisRowProps> = () => {
	const user = useSelector((state: ReduxState) => state.auth.user);
	const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
	const [adding, setAdding] = useState(false);
	const [editing, setEditing] = useState(false);
	const diagnosis = useContext(DiagnosisContext);

	if (editing) return <DiagnosisInput onLeaveEdit={() => setEditing(false)} />;
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
				<hr />
				<p>Tilføjet fra subdiagnoser:</p>
				<ul>
					{subDifferentials(diagnosis).map((d) => (
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
			{diagnosis.children.length > 0 && (
				<Card.Footer>
					<p>Underdiagnoser:</p>
					{diagnosis.children.map((d) => {
						d = diagnoses.find((diag) => diag.id === d.id);

						return (
							<DiagnosisContext.Provider value={d}>
								<DiagnosisRow />
							</DiagnosisContext.Provider>
						);
					})}
				</Card.Footer>
			)}
		</Card>
	);
};

export default DiagnosisRow;
