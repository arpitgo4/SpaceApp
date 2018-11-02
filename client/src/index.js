
import React from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';
import 'whatwg-fetch';


import './index.html';

// setting up fetch-interceptor
import './config/global-config';

import AppRouter from './layouts/App.Router';

import { getApiServerHealthStatus } from './config/utils';

const ONE_DAY = 86400;
export const renderApiServerDown = () => {
	ReactDOM.render(
		<div>
			{message.error(`API Server is down, contact administrator at arpit.go4@gmail.com`, ONE_DAY)}
		</div>,
		document.getElementById('react-app')
	);
};

export const renderApp = () => {
	ReactDOM.render(
		<AppRouter />,
		document.getElementById('react-app')
	);
};

/**
 * checking health status of api sever
 */
getApiServerHealthStatus()
.then(() => renderApp())
.catch(() => renderApiServerDown());


// for hot reloading this router component.
if(module.hot){
	module.hot.accept('./layouts/App.Router.js', () => {
		const AppRouter = require('./layouts/App.Router.js').default;
		console.log('>>>>>> Router Updated !! <<<<<<<')
		ReactDOM.render(
			<AppRouter />,
			document.getElementById('react-app')
		);
	});
}