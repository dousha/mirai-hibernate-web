import React, { useContext } from 'react';
import UserConfigManager from '../../logic/UserConfigManager';

const UserConfigContext = React.createContext(UserConfigManager);
export default UserConfigContext;

export function useUserConfig() {
	return useContext(UserConfigContext);
}
