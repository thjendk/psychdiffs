import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { ReduxState } from 'slices';
import { DiagnosisContext } from './DiffTable';
import { Form, Button } from 'react-bootstrap';
import Diagnosis from 'classes/diagnosis.model';

export interface DiffInputProps {}

const DiffInput: React.SFC<DiffInputProps> = () => {
	const user = useSelector((state: ReduxState) => state.auth.user);
	const [selectValue, setSelectValue] = useState(null);
	const [description, setDescription] = useState(null);
	const diagnosis = useContext(DiagnosisContext);
	const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
	const options = diagnoses
		.slice()
		.filter((d) => !diagnosis.differentialsHere.map((d) => d.diagnosis.id).includes(d.id) && diagnosis.id !== d.id)
		.sort((a, b) => a.name.localeCompare(b.name))
		.map((d) => ({ value: d.id, label: `${d.icd}: ${d.name}` }));

	const handleSubmit = async () => {
		await Diagnosis.addDiff({ description, diagnosisId: diagnosis.id, differentialId: selectValue.value });
		setDescription('');
		setSelectValue(null);
	};

	if (!user) return null;
	return (
		<Form>
			<Select
				placeholder="Vælg differentialdiagnose..."
				options={options}
				onChange={(e) => setSelectValue(e)}
				value={selectValue}
			/>
			<Form.Group>
				<Form.Label>Beskrivelse</Form.Label>
				<Form.Control onChange={(e) => setDescription(e.target.value)} value={description} />
			</Form.Group>
			<Form.Group>
				<Button variant="outline-secondary" onClick={handleSubmit}>
					Tilføj
				</Button>
			</Form.Group>
		</Form>
	);
};

export default DiffInput;
