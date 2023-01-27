import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MiraiClientContext from './components/context/MiraiClientContext';
import LandingPage from './pages/LandingPage';
import { MiraiClient } from './logic/MiraiHibernateClient';
import './index.css';
import UserConfigContext from './components/context/UserConfigContext';
import UserConfigManager from './logic/UserConfigManager';
import ConfigPage from './pages/ConfigPage';
import MessageLogPage from './pages/MessageLogPage';

function App() {
	return (
		<UserConfigContext.Provider value={UserConfigManager}>
			<MiraiClientContext.Provider value={MiraiClient}>
				<div className="App">
					<Routes>
						<Route path={'/'} element={<LandingPage/>}/>
						<Route path={'/config'} element={<ConfigPage/>}/>
						<Route path={'/log/:botId'} element={<MessageLogPage/>}/>
					</Routes>
				</div>
			</MiraiClientContext.Provider>
		</UserConfigContext.Provider>
	);
}

export default App;
