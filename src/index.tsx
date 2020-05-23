import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'index.scss';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'slices';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === 'production' ? false : true
});

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
