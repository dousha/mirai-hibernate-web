import React from 'react';
import { MiraiClient } from '../../logic/MiraiHibernateClient';

const MiraiClientContext = React.createContext(MiraiClient);
export default MiraiClientContext;
