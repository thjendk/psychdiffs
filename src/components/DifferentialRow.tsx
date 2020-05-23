import React, { useContext, useState } from 'react';
import { Differential } from 'types/generated';
import Diagnosis from 'classes/diagnosis.model';
import { DiagnosisContext } from './DiffTable';
import ConfirmationButton from './ConfirmationButton';
import { useDispatch, useSelector } from 'react-redux';
import diagnosesReducer from 'slices/diagnoses.slice';
import { ReduxState } from 'slices';

export interface DifferentialRowProps {
	differential: Differential;
}

const DifferentialRow: React.SFC<DifferentialRowProps> = ({ differential: d }) => {
	const user = useSelector((state: ReduxState) => state.auth.user);
	const dispatch = useDispatch();
	const [removing, setRemoving] = useState(false);
	const diagnosis = useContext(DiagnosisContext);

	const handleRemove = async () => {
		await Diagnosis.removeDiff({ diagnosisId: diagnosis.id, differentialId: d.diagnosis.id });
	};

	return (
		<li
			onMouseOver={() => setRemoving(true)}
			onMouseLeave={() => setRemoving(false)}
			onClick={() => dispatch(diagnosesReducer.actions.setSearch(d.diagnosis.name))}
		>
			<div style={{ display: 'flex', cursor: 'pointer' }}>
				<p style={{ margin: '0' }}>
					{d.diagnosis.name} ({d.diagnosis.icd}, s. {d.diagnosis.page}):{' '}
					<span style={{ color: 'grey' }}>{d.description}</span>
				</p>
				{removing && user && (
					<span style={{ marginLeft: '1rem' }}>
						<ConfirmationButton
							title="Fjern differential diagnose"
							text={`Er du sikker på du vil fjerne differentialdiagnosen "${d.diagnosis.name}" fra "${diagnosis.name}"?`}
							onConfirm={handleRemove}
							size="sm"
							variant="outline-danger"
						>
							Fjern
						</ConfirmationButton>
					</span>
				)}
			</div>
		</li>
	);
};

export default DifferentialRow;