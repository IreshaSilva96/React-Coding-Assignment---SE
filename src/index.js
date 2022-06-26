import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/*' element={<App />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// "electron:serve": "concurrently -k \"cross-env BROWSER=none yarn start\" \"yarn electron:start\"",
// "electron:build": "yarn build && electron-builder -c.extraMetadata.main=build/main.js",
// "electron:start": "wait-on tcp:3001 && electron .",

// "dist/**/*",
