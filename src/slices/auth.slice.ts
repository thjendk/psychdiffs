import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from 'classes/user.model';

const initialState = {
	user: null as User
};

const authReducer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		}
	}
});

export default authReducer;
