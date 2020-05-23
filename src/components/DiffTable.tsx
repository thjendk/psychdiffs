import React, { useEffect } from 'react';
import DiagnosisRow from './DiagnosisRow';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from 'slices';
import Diagnosis from 'classes/diagnosis.model';
import DiagnosisInput from './DiagnosisInput';
import { Form } from 'react-bootstrap';
import { Divider } from './Layout';
import diagnosesReducer from 'slices/diagnoses.slice';
export const DiagnosisContext = React.createContext<Diagnosis>(null);

export interface DiffTableProps {}

const DiffTable: React.SFC<DiffTableProps> = () => {
	const dispatch = useDispatch();
	const search = useSelector((state: ReduxState) => state.diagnoses.search);
	const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses)
		.slice()
		.sort((a, b) => a.icd.localeCompare(b.icd));

	useEffect(() => {
		Diagnosis.fetch();

		setInterval(() => {
			Diagnosis.fetch();
		}, 1000 * 30);
	}, []);

	return (
		<div>
			<Form.Control
				placeholder="Søg"
				onChange={(e) => dispatch(diagnosesReducer.actions.setSearch(e.target.value))}
				value={search}
			/>
			{diagnoses.map((d) => (
				<div style={{ margin: '1rem auto' }}>
					<DiagnosisContext.Provider value={d}>
						<DiagnosisRow />
					</DiagnosisContext.Provider>
				</div>
			))}
			<Divider />
			<DiagnosisInput />
		</div>
	);
};

export default DiffTable;
