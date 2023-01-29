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
import MessageLogEmpty from './pages/fragments/MessageLogEmpty';
import GroupMessageLog from './pages/fragments/GroupMessageLog';

function App() {
	return (
		<UserConfigContext.Provider value={UserConfigManager}>
			<MiraiClientContext.Provider value={MiraiClient}>
				<div className="App">
					<Routes>
						<Route index element={<LandingPage/>}/>
						<Route path={'config'} element={<ConfigPage/>}/>
						<Route path={'log'}>
							<Route path={':botId'} element={<MessageLogPage/>}>
								<Route index element={<MessageLogEmpty/>}/>
								<Route path={'group/:groupId'} element={<GroupMessageLog/>}/>
							</Route>
						</Route>
					</Routes>
				</div>
			</MiraiClientContext.Provider>
		</UserConfigContext.Provider>
	);
}

export default App;
