import { Diagnosis as DiagnosisType, DiagnosisInput, DifferentialInput } from 'types/generated';
import { gql } from '@apollo/client';
import Apollo from './apollo.model';
import { store } from 'index';
import diagnosesReducer from 'slices/diagnoses.slice';

interface Diagnosis extends DiagnosisType {}

class Diagnosis {
	static differentialFragment = gql`
		fragment Differential on Differential {
			diagnosis {
				id
				name
				icd
				page
			}
		}
	`;

	static fragment = gql`
		fragment Diagnosis on Diagnosis {
			id
			name
			icd
			page
			parent {
				id
			}
			children {
				id
			}
			differentialsHere {
				description
				...Differential
			}
			differentialsThere {
				...Differential
			}
		}
		${Diagnosis.differentialFragment}
	`;

	static fetch = async () => {
		const query = gql`
			query Diagnoses {
				diagnoses {
					...Diagnosis
				}
			}
			${Diagnosis.fragment}
		`;

		const diagnoses = await Apollo.query<Diagnosis[]>('diagnoses', query);
		return store.dispatch(diagnosesReducer.actions.addDiagnoses(diagnoses));
	};

	static create = async (data: DiagnosisInput) => {
		const mutation = gql`
			mutation CreateDiagnosis($data: DiagnosisInput) {
				createDiagnosis(data: $data) {
					...Diagnosis
				}
			}
			${Diagnosis.fragment}
		`;

		const diagnosis = await Apollo.mutate<Diagnosis>('createDiagnosis', mutation, { data });
		return store.dispatch(diagnosesReducer.actions.addDiagnoses(diagnosis));
	};

	static addDiff = async (data: DifferentialInput) => {
		const mutation = gql`
			mutation AddDifferential($data: DifferentialInput) {
				addDifferential(data: $data) {
					...Diagnosis
				}
			}
			${Diagnosis.fragment}
		`;

		const diagnosis = await Apollo.mutate<Diagnosis>('addDifferential', mutation, { data });
		return store.dispatch(diagnosesReducer.actions.addDiagnoses(diagnosis));
	};

	static removeDiff = async (data: DifferentialInput) => {
		const mutation = gql`
			mutation RemoveDifferential($data: DifferentialInput) {
				removeDifferential(data: $data) {
					...Diagnosis
				}
			}
			${Diagnosis.fragment}
		`;

		const diagnosis = await Apollo.mutate<Diagnosis>('removeDifferential', mutation, { data });
		return store.dispatch(diagnosesReducer.actions.addDiagnoses(diagnosis));
	};
}

export default Diagnosis;
