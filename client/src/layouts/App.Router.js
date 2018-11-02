import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import initialState from '../config/initialState.config';
import configureStore from '../config/store.config';

import AppLayout from './App.layout';

export const reduxStore = configureStore({ initialState });

import SpaceLayout from '../layouts/Space.layout';

const AppRouter = () => (
	<Provider store={reduxStore}>
		<Router history={browserHistory}>
			<Route path="/space" component={AppLayout}>	
				<Route path="/space/:spaceId" component={SpaceLayout} />
			</Route>

			{/* 'undefined' <- as spaceId is reserved for redirection */}
			<Redirect from="*" to="/space/undefined" />
		</Router>
	</Provider>
);


export default AppRouter;