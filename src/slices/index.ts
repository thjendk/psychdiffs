import { combineReducers } from 'redux';
import diagnosesReducer from './diagnoses.slice';
import authReducer from './auth.slice';

const rootReducer = combineReducers({
	diagnoses: diagnosesReducer.reducer,
	auth: authReducer.reducer
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;
