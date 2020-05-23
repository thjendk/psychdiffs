import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Diagnosis } from 'types/generated';
import { insertOrReplace, removeFromState } from './utils';

const initialState = {
	diagnoses: [] as Diagnosis[],
	search: ''
};

const diagnosesReducer = createSlice({
	name: 'diagnoses',
	initialState,
	reducers: {
		addDiagnoses: (state, action: PayloadAction<Diagnosis[] | Diagnosis>) => {
			insertOrReplace(state.diagnoses, action.payload);
		},
		removeDiagnosis: (state, action: PayloadAction<number>) => {
			removeFromState(state.diagnoses, action.payload);
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		}
	}
});

export default diagnosesReducer;
