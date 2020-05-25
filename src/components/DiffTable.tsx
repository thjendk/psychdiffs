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
	const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
	const sortedDiagnoses = diagnoses.slice().sort((a, b) => a.icd?.localeCompare(b?.icd));

	useEffect(() => {
		Diagnosis.fetch();

		setInterval(() => {
			Diagnosis.fetch();
		}, 1000 * 30);
	}, []);

	const exists = (d: Diagnosis): boolean => {
		if (
			!d.name.toLowerCase().includes(search.toLowerCase()) &&
			!d.icd?.toLowerCase().includes(search.toLowerCase())
		)
			return false;
		return true;
	};

	const isInSearch = (d: Diagnosis): boolean => {
		d = diagnoses.find((diag) => diag.id === d.id);

		if (!exists(d)) return false;
		return true;
	};

	const childInSearch = (d: Diagnosis): boolean => {
		d = diagnoses.find((diag) => diag.id === d.id);

		if (d.children.length === 0) return false;
		if (d.children.some((d) => isInSearch(d))) return true;
		return d.children.some((d) => childInSearch(d));
	};

	return (
		<div>
			<Form.Control
				placeholder="Søg"
				onChange={(e) => dispatch(diagnosesReducer.actions.setSearch(e.target.value))}
				value={search}
			/>
			{sortedDiagnoses
				.filter((d) => !d.parent && (isInSearch(d) || childInSearch(d)))
				.map((d) => (
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
