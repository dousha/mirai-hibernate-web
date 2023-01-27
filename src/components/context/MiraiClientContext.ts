import React, { useContext } from 'react';
import { MiraiClient } from '../../logic/MiraiHibernateClient';

const MiraiClientContext = React.createContext(MiraiClient);

export default MiraiClientContext;

export function useMiraiClient() {
	return useContext(MiraiClientContext);
}
