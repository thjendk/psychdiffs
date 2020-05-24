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
	belongs?: boolean;
}

const DifferentialRow: React.SFC<DifferentialRowProps> = ({ differential: d, belongs }) => {
	const user = useSelector((state: ReduxState) => state.auth.user);
	const dispatch = useDispatch();
	const [removing, setRemoving] = useState(false);
	const diagnosis = useContext(DiagnosisContext);

	const handleRemove = async () => {
		await Diagnosis.removeDiff({ diagnosisId: diagnosis.id, differentialId: d.diagnosis.id });
	};

	return (
		<li onMouseOver={() => setRemoving(true)} onMouseLeave={() => setRemoving(false)}>
			<div style={{ display: 'flex', cursor: 'pointer' }}>
				<p
					onClick={() => dispatch(diagnosesReducer.actions.setSearch(d.diagnosis.name))}
					style={{ margin: '0' }}
				>
					{d.diagnosis.name} ({d.diagnosis.icd}
					{d.diagnosis.page && <span>, s. {d.diagnosis.page}</span>})
					{d.description && (
						<span>
							: <span style={{ color: 'grey' }}>{d.description}</span>
						</span>
					)}{' '}
				</p>
				{belongs && user && removing && (
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
